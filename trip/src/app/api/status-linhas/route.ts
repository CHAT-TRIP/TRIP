import { NextResponse } from 'next/server';

// Tipos de status possíveis
type StatusOperacao = 'Normal' | 'Velocidade Reduzida' | 'Paralisada' | 'Operação Encerrada';

interface LinhaStatus {
  id: string;
  nome: string;
  tipo: 'Metro' | 'Trem';
  cor: string;
  status: StatusOperacao;
  descricao?: string;
  ultimaAtualizacao: string;
}

// Tipo dos dados retornados pela API DiretoDosTrens
interface ApiLinha {
  codigo: string | number;
  situacao?: string;
  modificado?: string;
  [key: string]: unknown; // permite campos extras sem erro
}

// Mapeamento das cores oficiais das linhas
const coresLinhas: Record<string, { cor: string; tipo: 'Metro' | 'Trem' }> = {
  '1': { cor: '#0455A1', tipo: 'Metro' }, // Azul
  '2': { cor: '#007E5E', tipo: 'Metro' }, // Verde
  '3': { cor: '#EE372F', tipo: 'Metro' }, // Vermelha
  '4': { cor: '#FFD100', tipo: 'Metro' }, // Amarela
  '5': { cor: '#9B3894', tipo: 'Metro' }, // Lilás
  '15': { cor: '#A8A9AD', tipo: 'Metro' }, // Prata
  '7': { cor: '#CA016B', tipo: 'Trem' }, // Rubi
  '8': { cor: '#97A098', tipo: 'Trem' }, // Diamante
  '9': { cor: '#01A89E', tipo: 'Trem' }, // Esmeralda
  '10': { cor: '#017C8B', tipo: 'Trem' }, // Turquesa
  '11': { cor: '#F68368', tipo: 'Trem' }, // Coral
  '12': { cor: '#133C8D', tipo: 'Trem' }, // Safira
  '13': { cor: '#00AE5C', tipo: 'Trem' }, // Jade
};

// Mapear status da API DiretoDosTrens para nosso formato
function mapearStatus(statusApi: string): StatusOperacao {
  const statusLower = statusApi.toLowerCase();

  if (statusLower.includes('normal') || statusLower.includes('normalizada')) {
    return 'Normal';
  }
  if (statusLower.includes('reduzida')) {
    return 'Velocidade Reduzida';
  }
  if (statusLower.includes('paralisada') || statusLower.includes('interrompida')) {
    return 'Paralisada';
  }
  if (statusLower.includes('encerrada') || statusLower.includes('encerrado')) {
    return 'Operação Encerrada';
  }

  return 'Normal'; // Padrão
}

// GET - Retorna o status de todas as linhas buscando da API DiretoDosTrens
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipoFiltro = searchParams.get('tipo'); // 'Metro' ou 'Trem'
    const linhaId = searchParams.get('id'); // ID específico de uma linha

    // Buscar dados da API DiretoDosTrens
    const response = await fetch('https://www.diretodostrens.com.br/api/status', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store', // Sempre buscar dados atualizados
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API DiretoDosTrens');
    }

    const data = await response.json();
    const linhasApi: ApiLinha[] = Array.isArray(data) ? data : (data.linhas || []);

    // Transformar dados da API para nosso formato
    const statusLinhas: LinhaStatus[] = linhasApi.map((linha: ApiLinha, index: number) => {
      const numeroLinha = linha.codigo?.toString() || `${index + 1}`;

      const infoLinha = coresLinhas[numeroLinha] || { cor: '#CCCCCC', tipo: 'Metro' as const };

      const nomesLinhas: Record<string, string> = {
        '1': 'Linha 1 - Azul',
        '2': 'Linha 2 - Verde',
        '3': 'Linha 3 - Vermelha',
        '4': 'Linha 4 - Amarela',
        '5': 'Linha 5 - Lilás',
        '7': 'Linha 7 - Rubi',
        '8': 'Linha 8 - Diamante',
        '9': 'Linha 9 - Esmeralda',
        '10': 'Linha 10 - Turquesa',
        '11': 'Linha 11 - Coral',
        '12': 'Linha 12 - Safira',
        '13': 'Linha 13 - Jade',
        '15': 'Linha 15 - Prata',
      };

      const nomeCompleto = nomesLinhas[numeroLinha] || `Linha ${numeroLinha}`;

      return {
        id: `${infoLinha.tipo.toLowerCase()}-${numeroLinha}`,
        nome: nomeCompleto,
        tipo: infoLinha.tipo,
        cor: infoLinha.cor,
        status: mapearStatus(linha.situacao || 'Normal'),
        descricao: undefined,
        ultimaAtualizacao: linha.modificado || new Date().toISOString(),
      };
    });

    let resultado = statusLinhas;

    // Filtro por tipo
    if (tipoFiltro && (tipoFiltro === 'Metro' || tipoFiltro === 'Trem')) {
      resultado = resultado.filter(linha => linha.tipo === tipoFiltro);
    }

    // Filtro por ID
    if (linhaId) {
      resultado = resultado.filter(linha => linha.id === linhaId);
    }

    return NextResponse.json({
      sucesso: true,
      total: resultado.length,
      linhas: resultado,
      ultimaConsulta: new Date().toISOString(),
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar status das linhas:', errorMessage);

    return NextResponse.json({
      sucesso: false,
      erro: 'Erro ao buscar status das linhas',
      detalhes: errorMessage,
    }, { status: 500 });
  }
}
