'use client'

import { useEffect, useState, useCallback } from 'react'
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

  // Extrai o número da linha do nome (ex: "Linha 1 - Azul" -> 1)
  const extrairNumeroLinha = (nome: string): number => {
    const match = nome.match(/Linha (\d+)/)
    return match ? parseInt(match[1]) : 999
  }

  // Ordena as linhas por número
  const ordenarLinhas = (linhas: LinhaStatus[]): LinhaStatus[] => {
    return [...linhas].sort((a, b) => {
      const numA = extrairNumeroLinha(a.nome)
      const numB = extrairNumeroLinha(b.nome)
      return numA - numB
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#5E22F3] mb-4"
            style={{ fontFamily: 'Unbounded, sans-serif' }}
          >
            Status das Linhas
          </h1>
          <p className="text-gray-600 text-lg">
            Acompanhe em tempo real a situação operacional das linhas de metrô e trem
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-3 justify-center">
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
            className="px-6 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            ↻ Atualizar
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Carregando status das linhas...</p>
          </div>
        )}

        {/* Error */}
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

        {/* Linhas */}
        {!loading && !error && statusData && (
          <>
            {/* Info */}
            <div className="text-center mb-6 text-sm text-gray-500">
              <p>
                Última atualização: {formatarHora(statusData.ultimaConsulta)} • {statusData.total}{' '}
                {statusData.total === 1 ? 'linha' : 'linhas'}
              </p>
            </div>

            {/* Grid de Linhas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ordenarLinhas(statusData.linhas).map((linha) => (
                <div
                  key={linha.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4"
                  style={{ borderLeftColor: linha.cor }}
                >
                  {/* Tipo Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {linha.tipo}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(linha.status)}`}></div>
                  </div>

                  {/* Nome da Linha */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: linha.cor, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {linha.nome}
                  </h3>

                  {/* Status */}
                  <div className="mb-4">
                    <p className={`text-sm font-bold ${getStatusTextColor(linha.status)}`}>
                      {linha.status}
                    </p>
                    {linha.descricao && (
                      <p className="text-xs text-gray-500 mt-1">{linha.descricao}</p>
                    )}
                  </div>

                  {/* Horário */}
                  <div className="text-xs text-gray-400 border-t pt-2">
                    Atualizado às {formatarHora(linha.ultimaAtualizacao)}
                  </div>
                </div>
              ))}
            </div>

            {/* Legenda */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
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
    </div>
  )
}
