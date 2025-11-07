'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { buscarStatusLinhas } from '../../api'

interface LinhaStatus {
  id: string
  nome: string
  tipo: 'Metro' | 'Trem'
  cor: string
  status: 'Normal' | 'Velocidade Reduzida' | 'Paralisada' | 'Operação Encerrada'
  descricao?: string
  ultimaAtualizacao: string
}

interface StatusResponse {
  sucesso: boolean
  total: number
  linhas: LinhaStatus[]
  ultimaConsulta: string
}

export default function StatusLinhasPage() {
  const [statusData, setStatusData] = useState<StatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroTipo, setFiltroTipo] = useState<'Todos' | 'Metro' | 'Trem'>('Todos')

  const carregarStatus = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const tipo = filtroTipo === 'Todos' ? undefined : filtroTipo
      const data = await buscarStatusLinhas(tipo)
      setStatusData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar status')
    } finally {
      setLoading(false)
    }
  }, [filtroTipo])

  useEffect(() => {
    carregarStatus()
  }, [carregarStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-500'
      case 'Velocidade Reduzida':
        return 'bg-yellow-500'
      case 'Paralisada':
        return 'bg-red-500'
      case 'Operação Encerrada':
        return 'bg-gray-500'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'text-green-600'
      case 'Velocidade Reduzida':
        return 'text-yellow-600'
      case 'Paralisada':
        return 'text-red-600'
      case 'Operação Encerrada':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const formatarHora = (isoString: string) => {
    const data = new Date(isoString)
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  const extrairNumeroLinha = (nome: string): number => {
    const match = nome.match(/Linha (\d+)/)
    return match ? parseInt(match[1]) : 999
  }

  const ordenarLinhas = (linhas: LinhaStatus[]): LinhaStatus[] => {
    return [...linhas].sort((a, b) => {
      const numA = extrairNumeroLinha(a.nome)
      const numB = extrairNumeroLinha(b.nome)
      return numA - numB
    })
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-between bg-[#F7F7FF] text-[#181818] pt-36">

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col items-center flex-1 px-6">

        <h1
          className="text-[38px] md:text-[52px] font-extrabold text-[#5E22F3] mb-6 text-center"
          style={{ fontFamily: 'Unbounded, sans-serif' }}
        >
          Status das Linhas
        </h1>

        <p className="text-gray-600 text-lg mb-8 text-center">
          Acompanhe em tempo real a situação operacional das linhas de metrô e trem
        </p>

        {/* FILTROS */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-10 flex flex-wrap gap-3 justify-center max-w-[900px] w-full border border-[#d8c9ff]">
          <button
            onClick={() => setFiltroTipo('Todos')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filtroTipo === 'Todos'
                ? 'bg-[#5E22F3] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas as Linhas
          </button>

          <button
            onClick={() => setFiltroTipo('Metro')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filtroTipo === 'Metro'
                ? 'bg-[#5E22F3] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Metrô
          </button>

          <button
            onClick={() => setFiltroTipo('Trem')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              filtroTipo === 'Trem'
                ? 'bg-[#5E22F3] text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Trem (CPTM)
          </button>

          <button
            onClick={carregarStatus}
            className="px-6 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            ↻ Atualizar
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Carregando status das linhas...</p>
          </div>
        )}

        {/* ERRO */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              onClick={carregarStatus}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* LISTAGEM */}
        {!loading && !error && statusData && (
          <>
            <div className="text-center mb-6 text-sm text-gray-500">
              Última atualização: {formatarHora(statusData.ultimaConsulta)} • {statusData.total}{' '}
              {statusData.total === 1 ? 'linha' : 'linhas'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ordenarLinhas(statusData.linhas).map((linha) => (
                <div
                  key={linha.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4"
                  style={{ borderLeftColor: linha.cor }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {linha.tipo}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(linha.status)}`}></div>
                  </div>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: linha.cor, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {linha.nome}
                  </h3>

                  <div className="mb-4">
                    <p className={`text-sm font-bold ${getStatusTextColor(linha.status)}`}>
                      {linha.status}
                    </p>
                    {linha.descricao && (
                      <p className="text-xs text-gray-500 mt-1">{linha.descricao}</p>
                    )}
                  </div>

                  <div className="text-xs text-gray-400 border-t pt-2">
                    Atualizado às {formatarHora(linha.ultimaAtualizacao)}
                  </div>
                </div>
              ))}
            </div>

            {/* LEGENDA */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6 mb-20 max-w-[1100px] w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Legenda</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Operação Normal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Velocidade Reduzida</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Paralisada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Operação Encerrada</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </section>
  )
}
