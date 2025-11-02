import axios from 'axios';
import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface RequestBody {
    origem: string;
    destino: string;
}

interface TransitDetails {
    transitLine?: {
        nameShort?: string;
        name?: string;
        vehicle?: {
            type?: string;
        };
    };
    headsign?: string;
    stopDetails?: {
        departureStop?: {
            name?: string;
        };
        arrivalStop?: {
            name?: string;
        };
    };
}

interface Step {
    travelMode?: string;
    transitDetails?: TransitDetails;
}

interface Leg {
    steps?: Step[];
}

interface Route {
    duration?: string;
    legs?: Leg[];
}

interface Trecho {
    tipo: string;
    linha: string;
    sentido: string;
    embarque: string;
    desembarque: string;
}

interface RotaProcessada {
    tempoTotal: string;
    trechos: Trecho[];
    temTransitoValido: boolean;
}

function normalizarEndereco(local: string): string {
    local = local.trim();
    const localLower = local.toLowerCase();

    if (!localLower.includes('sao paulo') && !localLower.includes(', sp')) {
        if (!local.includes(',') &&
            !localLower.includes('estacao') &&
            !localLower.includes('rua') &&
            !localLower.includes('avenida') &&
            !localLower.includes('av')) {
            local = `Estacao ${local}, Sao Paulo, SP`;
        } else {
            local = `${local}, Sao Paulo, SP`;
        }
    }

    return local;
}

function formatarDuracao(segundos: string | number): string {
    const minutos = Math.floor(parseInt(String(segundos)) / 60);
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    if (horas > 0) {
        return `${horas}h ${minutosRestantes}min`;
    }
    return `${minutos}min`;
}

function processarRota(rota: Route): RotaProcessada {
    const duracaoTotal = rota.duration ? rota.duration.replace('s', '') : '0';
    const resultado: RotaProcessada = {
        tempoTotal: formatarDuracao(duracaoTotal),
        trechos: [],
        temTransitoValido: false
    };

    if (rota.legs && rota.legs.length > 0) {
        const leg = rota.legs[0];

        if (leg.steps) {
            leg.steps.forEach(step => {
                if (step.travelMode === 'TRANSIT') {
                    const transit = step.transitDetails || {};
                    const transitLine = transit.transitLine || {};
                    const vehicle = transitLine.vehicle || {};
                    const vehicleType = vehicle.type || 'UNKNOWN';

                    if (vehicleType === 'SUBWAY') {
                        resultado.temTransitoValido = true;
                        resultado.trechos.push({
                            tipo: 'Metro',
                            linha: transitLine.nameShort || transitLine.name || '',
                            sentido: transit.headsign || '',
                            embarque: transit.stopDetails?.departureStop?.name || '',
                            desembarque: transit.stopDetails?.arrivalStop?.name || ''
                        });
                    } else if (['HEAVY_RAIL', 'COMMUTER_TRAIN', 'RAIL'].includes(vehicleType)) {
                        resultado.temTransitoValido = true;
                        resultado.trechos.push({
                            tipo: 'Trem',
                            linha: transitLine.nameShort || transitLine.name || '',
                            sentido: transit.headsign || '',
                            embarque: transit.stopDetails?.departureStop?.name || '',
                            desembarque: transit.stopDetails?.arrivalStop?.name || ''
                        });
                    }
                }
            });
        }
    }

    return resultado;
}

export async function POST(request: Request) {
    try {
        const body: RequestBody = await request.json();
        const { origem: origemRaw, destino: destinoRaw } = body;

        if (!origemRaw || !destinoRaw) {
            return NextResponse.json({
                erro: 'Origem e destino sao obrigatorios'
            }, { status: 400 });
        }

        const origem = normalizarEndereco(origemRaw);
        const destino = normalizarEndereco(destinoRaw);

        const response = await axios.post(
            'https://routes.googleapis.com/directions/v2:computeRoutes',
            {
                origin: { address: origem },
                destination: { address: destino },
                travelMode: 'TRANSIT',
                transitPreferences: {
                    allowedTravelModes: ['SUBWAY', 'RAIL'],
                    routingPreference: 'FEWER_TRANSFERS'
                },
                computeAlternativeRoutes: false,
                languageCode: 'pt-BR',
                units: 'METRIC'
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': API_KEY,
                    'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.steps,routes.legs.localizedValues,routes.polyline.encodedPolyline'
                }
            }
        );

        if (!response.data.routes || response.data.routes.length === 0) {
            return NextResponse.json({
                sucesso: false,
                mensagem: 'Nenhuma rota encontrada usando metro/trem.'
            });
        }

        const rotaProcessada = processarRota(response.data.routes[0]);

        if (!rotaProcessada.temTransitoValido) {
            return NextResponse.json({
                sucesso: false,
                mensagem: 'Nenhuma rota de metro/trem disponivel para este trajeto.'
            });
        }

        return NextResponse.json({
            sucesso: true,
            origem: origem,
            destino: destino,
            ...rotaProcessada
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        const errorData = (error as { response?: { data?: unknown } })?.response?.data;

        console.error('Erro ao buscar rota:', errorData || errorMessage);
        return NextResponse.json({
            erro: 'Erro ao buscar rotas',
            detalhes: errorData || errorMessage
        }, { status: 500 });
    }
}
