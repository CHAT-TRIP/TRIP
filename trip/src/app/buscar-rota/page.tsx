'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Trecho {
  tipo: string
  linha: string
  sentido: string
  embarque: string
  desembarque: string
}

interface RotaResponse {
  sucesso: boolean
  origem?: string
  destino?: string
  tempoTotal?: string
  trechos?: Trecho[]
  mensagem?: string
  erro?: string
  detalhes?: string
}

interface LinhaInfo {
  cor: string
  corTexto: string
  nome: string
}

// Lista de estações do sistema metroferroviário de SP (remove duplicadas)
const estacoesArray = [
  // Linha 1 - Azul
  'Jabaquara', 'Conceição', 'São Judas', 'Saúde', 'Praça da Árvore', 'Santa Cruz',
  'Vila Mariana', 'Ana Rosa', 'Paraíso', 'Vergueiro', 'São Joaquim', 'Liberdade',
  'Sé', 'São Bento', 'Luz', 'Tiradentes', 'Armênia', 'Portuguesa-Tietê', 'Carandiru',
  'Santana', 'Jardim São Paulo-Ayrton Senna', 'Parada Inglesa', 'Tucuruvi',

  // Linha 2 - Verde
  'Vila Prudente', 'Tamanduateí', 'Sacoma', 'Alto do Ipiranga', 'Santos-Imigrantes',
  'Chácara Klabin', 'Consolação', 'Clínicas', 'Sumaré', 'Vila Madalena',

  // Linha 3 - Vermelha
  'Corinthians-Itaquera', 'Artur Alvim', 'Patriarca', 'Guilhermina-Esperança',
  'Vila Matilde', 'Penha', 'Carrão', 'Tatuapé', 'Belém', 'Bresser-Mooca',
  'Brás', 'Pedro II', 'República', 'Anhangabaú', 'Santa Cecília', 'Marechal Deodoro',
  'Palmeiras-Barra Funda', 'Barra Funda',

  // Linha 4 - Amarela
  'Higienópolis-Mackenzie', 'Paulista', 'Fradique Coutinho',
  'Faria Lima', 'Pinheiros', 'Butantã', 'São Paulo-Morumbi', 'Vila Sônia',

  // Linha 5 - Lilás
  'Capão Redondo', 'Campo Limpo', 'Vila das Belezas', 'Giovanni Gronchi',
  'Santo Amaro', 'Largo Treze', 'Adolfo Pinheiro', 'Alto da Boa Vista',
  'Borba Gato', 'Brooklin', 'Campo Belo', 'Eucaliptos', 'Moema', 'AACD-Servidor',
  'Hospital São Paulo',

  // Linha 15 - Prata
  'Oratório', 'São Lucas', 'Camilo Haddad', 'Vila Tolstói',
  'Vila União', 'Jardim Planalto', 'Sapopemba', 'Fazenda da Juta', 'São Mateus',
  'Jardim Colonial',

  // Linha 7 - Rubi (CPTM)
  'Jundiaí', 'Várzea Paulista', 'Campo Limpo Paulista', 'Botujuru', 'Francisco Morato',
  'Baltazar Fidélis', 'Franco da Rocha', 'Caieiras', 'Perus', 'Jaraguá',
  'Vila Aurora', 'Vila Clarice', 'Água Branca', 'Lapa',

  // Linha 8 - Diamante (CPTM)
  'Júlio Prestes', 'Domingos de Moraes', 'Imperatriz Leopoldina',
  'Presidente Altino', 'Osasco', 'Comandante Sampaio', 'Quitaúna', 'General Miguel Costa',
  'Carapicuíba', 'Santa Terezinha', 'Antônio João', 'Barueri', 'Jardim Belval',
  'Jardim Silveira', 'Jandira', 'Sagrado Coração', 'Engenheiro Cardoso', 'Itapevi',
  'Santa Rita', 'Amador Bueno',

  // Linha 9 - Esmeralda (CPTM)
  'Ceasa', 'Villa-Lobos-Jaguaré', 'Cidade Universitária',
  'Hebraica-Rebouças', 'Cidade Jardim', 'Vila Olímpia', 'Berrini',
  'Morumbi', 'Granja Julieta', 'Socorro', 'Jurubatuba', 'Autódromo',
  'Primavera-Interlagos', 'Grajaú',

  // Linha 10 - Turquesa (CPTM)
  'Mooca', 'Ipiranga', 'São Caetano do Sul', 'Utinga',
  'Prefeito Saladino', 'Prefeito Celso Daniel-Santo André', 'Capuava', 'Mauá',
  'Guapituba', 'Ribeirão Pires',

  // Linha 11 - Coral (CPTM)
  'Dom Bosco', 'José Bonifácio',
  'Guaianases', 'Antonio Gianetti Neto', 'Ferraz de Vasconcelos', 'Poá',
  'Calmon Viana', 'Suzano', 'Jundiapeba', 'Braz Cubas', 'Mogi das Cruzes',
  'Estudantes',

  // Linha 12 - Safira (CPTM)
  'Engenheiro Goulart', 'USP Leste', 'Comendador Ermelino',
  'São Miguel Paulista', 'Jardim Helena-Vila Mara', 'Itaim Paulista', 'Jardim Romano',
  'Engenheiro Manoel Feio', 'Itaquaquecetuba', 'Aracaré',

  // Linha 13 - Jade (CPTM)
  'Guarulhos-Cecap', 'Aeroporto-Guarulhos'
]

const estacoes = [...new Set(estacoesArray)].sort()

// Mapeamento das cores oficiais das linhas do sistema metroferroviário de SP
const coresLinhas: Record<string, LinhaInfo> = {
  '1': { cor: '#0455A1', corTexto: '#FFFFFF', nome: 'Azul' },
  '2': { cor: '#007E5E', corTexto: '#FFFFFF', nome: 'Verde' },
  '3': { cor: '#EE372F', corTexto: '#FFFFFF', nome: 'Vermelha' },
  '4': { cor: '#FFD100', corTexto: '#000000', nome: 'Amarela' },
  '5': { cor: '#9B3894', corTexto: '#FFFFFF', nome: 'Lilás' },
  '15': { cor: '#C0C0C0', corTexto: '#000000', nome: 'Prata' },
  '7': { cor: '#97005C', corTexto: '#FFFFFF', nome: 'Rubi' },
  '8': { cor: '#97A098', corTexto: '#FFFFFF', nome: 'Diamante' },
  '9': { cor: '#00A88E', corTexto: '#FFFFFF', nome: 'Esmeralda' },
  '10': { cor: '#00A5CE', corTexto: '#FFFFFF', nome: 'Turquesa' },
  '11': { cor: '#F68368', corTexto: '#000000', nome: 'Coral' },
  '12': { cor: '#133C8D', corTexto: '#FFFFFF', nome: 'Safira' },
  '13': { cor: '#00AB4E', corTexto: '#FFFFFF', nome: 'Jade' },
}

function obterCorLinha(nomeLinha: string): LinhaInfo {
  // Extrai o número da linha (ex: "Linha 3-Vermelha" -> "3")
  const numeroMatch = nomeLinha.match(/\d+/)
  const numeroLinha = numeroMatch ? numeroMatch[0] : ''

  return coresLinhas[numeroLinha] || {
    cor: '#5E22F3',
    corTexto: '#FFFFFF',
    nome: nomeLinha
  }
}

export default function BuscarRota() {
  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [resultado, setResultado] = useState<RotaResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const buscarRota = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!origem || !destino) {
      setResultado({
        sucesso: false,
        mensagem: 'Por favor, selecione origem e destino.'
      })
      return
    }

    if (origem === destino) {
      setResultado({
        sucesso: false,
        mensagem: 'A origem e o destino não podem ser iguais.'
      })
      return
    }

    setLoading(true)
    setResultado(null)

    try {
      const response = await fetch('/api/rotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origem, destino }),
      })

      const data = await response.json()

      // Validação adicional
      if (data.sucesso && (!data.trechos || data.trechos.length === 0)) {
        setResultado({
          sucesso: false,
          mensagem: 'Nenhuma rota de metrô/trem foi encontrada para este trajeto. Verifique se os locais digitados estão corretos.'
        })
      } else {
        setResultado(data)
      }
    } catch (error) {
      setResultado({
        sucesso: false,
        erro: 'Erro ao conectar com a API',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-between bg-[#E9E9E9] text-[#181818] pt-36">
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col items-center flex-1 px-6 py-16">
        <h1
          className="text-[38px] md:text-[52px] font-extrabold text-[#5E22F3] mb-10 text-center"
          style={{ fontFamily: 'Unbounded, sans-serif' }}
        >
          Buscar Rota
        </h1>

        {/* FORMULÁRIO */}
        <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl p-8 border border-[#d8c9ff]">
          <form onSubmit={buscarRota} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="origem"
                className="block text-sm font-semibold text-[#5E22F3] mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Origem
              </label>
              <select
                id="origem"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                className="w-full px-4 py-3 border border-[#d8c9ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E22F3] text-[#181818] bg-white cursor-pointer"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <option value="">Selecione a estação de origem</option>
                {estacoes.map((estacao) => (
                  <option key={`origem-${estacao}`} value={estacao}>
                    {estacao}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="destino"
                className="block text-sm font-semibold text-[#5E22F3] mb-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Destino
              </label>
              <select
                id="destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className="w-full px-4 py-3 border border-[#d8c9ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E22F3] text-[#181818] bg-white cursor-pointer"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <option value="">Selecione a estação de destino</option>
                {estacoes.map((estacao) => (
                  <option key={`destino-${estacao}`} value={estacao}>
                    {estacao}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5E22F3] text-white font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              {loading ? 'Buscando...' : 'Buscar Rota'}
            </button>
          </form>
        </div>

        {/* RESULTADO */}
        {resultado && (
          <div className="w-full max-w-[800px] mt-8 bg-white rounded-2xl shadow-2xl p-8 border border-[#d8c9ff]">
            {resultado.sucesso ? (
              <div>
                <h2
                  className="text-2xl font-bold text-[#5E22F3] mb-4"
                  style={{ fontFamily: 'Unbounded, sans-serif' }}
                >
                  Rota Encontrada!
                </h2>

                <div className="mb-6">
                  <p className="text-sm text-[#181818]/70 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <strong>Origem:</strong> {resultado.origem}
                  </p>
                  <p className="text-sm text-[#181818]/70 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <strong>Destino:</strong> {resultado.destino}
                  </p>
                  <p className="text-lg font-semibold text-[#5E22F3]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <strong>Tempo Total:</strong> {resultado.tempoTotal}
                  </p>
                </div>

                {resultado.trechos && resultado.trechos.length > 0 && (
                  <div>
                    <h3
                      className="text-xl font-bold text-[#5E22F3] mb-4"
                      style={{ fontFamily: 'Unbounded, sans-serif' }}
                    >
                      Trechos da Viagem
                    </h3>
                    <div className="space-y-4">
                      {resultado.trechos.map((trecho, index) => {
                        const linhaInfo = obterCorLinha(trecho.linha)
                        return (
                          <div
                            key={index}
                            className="p-4 bg-[#F5F0FF] rounded-lg border-l-4"
                            style={{ borderLeftColor: linhaInfo.cor }}
                          >
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-bold"
                                style={{
                                  backgroundColor: linhaInfo.cor,
                                  color: linhaInfo.corTexto,
                                  fontFamily: 'Unbounded, sans-serif'
                                }}
                              >
                                {trecho.tipo}
                              </span>
                              <span
                                className="px-2 py-0.5 rounded text-sm font-bold"
                                style={{
                                  backgroundColor: linhaInfo.cor,
                                  color: linhaInfo.corTexto,
                                  fontFamily: 'Montserrat, sans-serif'
                                }}
                              >
                                {trecho.linha}
                              </span>
                              <span
                                className="text-sm font-semibold"
                                style={{
                                  color: linhaInfo.cor,
                                  fontFamily: 'Montserrat, sans-serif'
                                }}
                              >
                                {linhaInfo.nome}
                              </span>
                            </div>
                            <p className="text-sm text-[#181818]/80 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              <strong>Sentido:</strong> {trecho.sentido}
                            </p>
                            <p className="text-sm text-[#181818]/80 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              <strong>Embarque:</strong> {trecho.embarque}
                            </p>
                            <p className="text-sm text-[#181818]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              <strong>Desembarque:</strong> {trecho.desembarque}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2
                  className="text-2xl font-bold text-red-600 mb-4"
                  style={{ fontFamily: 'Unbounded, sans-serif' }}
                >
                  {resultado.erro ? 'Erro' : 'Aviso'}
                </h2>
                <p className="text-[#181818]/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {resultado.mensagem || resultado.erro}
                </p>
                {resultado.detalhes && (
                  <p className="text-sm text-[#181818]/60 mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {typeof resultado.detalhes === 'string'
                      ? resultado.detalhes
                      : JSON.stringify(resultado.detalhes)}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ RODAPÉ NOVO */}
      <footer className="w-full bg-[#181818] text-white py-6 md:py-7">
        <div className="mx-auto w-full max-w-[1300px] px-6">
          {/* MOBILE */}
          <div className="md:hidden flex flex-col items-center justify-center gap-4">
            <Image
              src="/mascote-footer.svg"
              alt="Mascote TRIP"
              width={120}
              height={120}
              className="w-[110px] h-auto select-none pointer-events-none"
            />
            <p
              className="text-[13px] text-[#D5D5D5] leading-relaxed text-center max-w-[320px]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Edifício Eldorado Business Tower – Av. Dra. Ruth Cardoso, 8.501 – 5º andar,
              Pinheiros – São Paulo – SP – CEP: 05425-070 • © 2025 Motiva
            </p>

            <div className="flex flex-col items-center gap-2 mt-2">
              <span className="text-[#AFC7E3] text-sm">Acompanhe-nos:</span>
              <div className="flex items-center gap-3">
                <Link href="https://www.youtube.com/user/GrupoCCROficial" target="_blank">
                  <Image
                    src="/youtube.png"
                    alt="YouTube"
                    width={38}
                    height={38}
                    className="hover:scale-110 transition-transform"
                  />
                </Link>
                <Link href="https://www.linkedin.com/company/motivamobilidade/" target="_blank">
                  <Image
                    src="/Linkedin.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="hover:scale-110 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center justify-between gap-8">
            <div className="flex items-center gap-5 min-w-0 flex-1">
              <div className="relative h-[130px] w-[190px] overflow-visible">
                <Image
                  src="/mascote-footer.svg"
                  alt="Mascote TRIP"
                  width={220}
                  height={220}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-auto"
                />
              </div>

              <p className="text-sm text-[#D5D5D5] leading-snug">
                Edifício Eldorado Business Tower – Av. Dra. Ruth Cardoso, 8.501 – 5º andar,
                Pinheiros – São Paulo – SP – CEP: 05425-070 • © 2025 Motiva
              </p>
            </div>

            <div className="flex items-start gap-14">
              <span className="block h-20 w-px bg-white/40" />
              <div className="min-w-[350px]">
                <span className="block text-[#AFC7E3] text-sm">Acompanhe-nos:</span>
                <div className="mt-2 flex items-center gap-3">
                  <Link href="https://www.youtube.com/user/GrupoCCROficial" target="_blank">
                    <Image
                      src="/youtube.png"
                      alt="YouTube"
                      width={44}
                      height={44}
                      className="hover:scale-110 transition-transform"
                    />
                  </Link>
                  <Link href="https://www.linkedin.com/company/motivamobilidade/" target="_blank">
                    <Image
                      src="/Linkedin.svg"
                      alt="LinkedIn"
                      width={28}
                      height={28}
                      className="hover:scale-110 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
