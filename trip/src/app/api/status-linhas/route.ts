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

// Dados simulados - Em produção, isso viria de uma API real da CPTM/Metrô
// Cores oficiais baseadas no padrão visual do Metrô de SP e CPTM
const statusLinhas: LinhaStatus[] = [
  // Linhas de Metrô
  {
    id: 'metro-1',
    nome: 'Linha 1 - Azul',
    tipo: 'Metro',
    cor: '#0455A1', // Azul oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'metro-2',
    nome: 'Linha 2 - Verde',
    tipo: 'Metro',
    cor: '#007E5E', // Verde oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'metro-3',
    nome: 'Linha 3 - Vermelha',
    tipo: 'Metro',
    cor: '#EE372F', // Vermelho oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'metro-4',
    nome: 'Linha 4 - Amarela',
    tipo: 'Metro',
    cor: '#FFD100', // Amarelo oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'metro-5',
    nome: 'Linha 5 - Lilás',
    tipo: 'Metro',
    cor: '#9B3894', // Lilás oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'metro-15',
    nome: 'Linha 15 - Prata (Monotrilho)',
    tipo: 'Metro',
    cor: '#A8A9AD', // Prata oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  // Linhas de Trem (CPTM)
  {
    id: 'trem-7',
    nome: 'Linha 7 - Rubi',
    tipo: 'Trem',
    cor: '#CA016B', // Rubi oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'trem-8',
    nome: 'Linha 8 - Diamante',
    tipo: 'Trem',
    cor: '#97A098', // Diamante oficial (cinza esverdeado)
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'trem-9',
    nome: 'Linha 9 - Esmeralda',
    tipo: 'Trem',
    cor: '#01A89E', // Esmeralda oficial (verde água)
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'trem-10',
    nome: 'Linha 10 - Turquesa',
    tipo: 'Trem',
    cor: '#017C8B', // Turquesa oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'trem-11',
    nome: 'Linha 11 - Coral',
    tipo: 'Trem',
    cor: '#F68368', // Coral oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'trem-12',
    nome: 'Linha 12 - Safira',
    tipo: 'Trem',
    cor: '#133C8D', // Safira oficial (azul escuro)
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  },
  {
    id: 'trem-13',
    nome: 'Linha 13 - Jade',
    tipo: 'Trem',
    cor: '#00AE5C', // Jade oficial
    status: 'Normal',
    descricao: 'Operação normal em toda a linha',
    ultimaAtualizacao: new Date().toISOString()
  }
];

// GET - Retorna o status de todas as linhas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo'); // 'Metro' ou 'Trem'
    const linhaId = searchParams.get('id'); // ID específico de uma linha

    let resultado = statusLinhas;

    // Filtrar por tipo se especificado
    if (tipo && (tipo === 'Metro' || tipo === 'Trem')) {
      resultado = resultado.filter(linha => linha.tipo === tipo);
    }

    // Filtrar por ID se especificado
    if (linhaId) {
      resultado = resultado.filter(linha => linha.id === linhaId);
    }

    return NextResponse.json({
      sucesso: true,
      total: resultado.length,
      linhas: resultado,
      ultimaConsulta: new Date().toISOString()
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao buscar status das linhas:', errorMessage);

    return NextResponse.json({
      sucesso: false,
      erro: 'Erro ao buscar status das linhas',
      detalhes: errorMessage
    }, { status: 500 });
  }
}
