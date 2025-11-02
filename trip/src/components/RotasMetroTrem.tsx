'use client';

import { useState, FormEvent } from 'react';
import styles from './RotasMetroTrem.module.css';

interface Trecho {
  tipo: string;
  linha: string;
  sentido: string;
  embarque: string;
  desembarque: string;
}

interface ResultadoRota {
  sucesso: boolean;
  mensagem?: string;
  origem?: string;
  destino?: string;
  tempoTotal?: string;
  trechos?: Trecho[];
}

const coresLinhas: Record<string, string> = {
  '1': '#0455a1', '1-Azul': '#0455a1', 'Linha 1': '#0455a1', 'Linha 1-Azul': '#0455a1',
  '2': '#007e5e', '2-Verde': '#007e5e', 'Linha 2': '#007e5e', 'Linha 2-Verde': '#007e5e',
  '3': '#ee372f', '3-Vermelha': '#ee372f', 'Linha 3': '#ee372f', 'Linha 3-Vermelha': '#ee372f',
  '4': '#ffd700', '4-Amarela': '#ffd700', 'Linha 4': '#ffd700', 'Linha 4-Amarela': '#ffd700',
  '5': '#9b3894', '5-Lilás': '#9b3894', '5-Lilas': '#9b3894', 'Linha 5': '#9b3894', 'Linha 5-Lilás': '#9b3894', 'Linha 5-Lilas': '#9b3894',
  '7': '#b7a099', '7-Rubi': '#b7a099', 'Linha 7': '#b7a099', 'Linha 7-Rubi': '#b7a099',
  '8': '#97a098', '8-Diamante': '#97a098', 'Linha 8': '#97a098', 'Linha 8-Diamante': '#97a098',
  '9': '#00a88e', '9-Esmeralda': '#00a88e', 'Linha 9': '#00a88e', 'Linha 9-Esmeralda': '#00a88e',
  '10': '#009ade', '10-Turquesa': '#009ade', 'Linha 10': '#009ade', 'Linha 10-Turquesa': '#009ade',
  '11': '#f68b1f', '11-Coral': '#f68b1f', 'Linha 11': '#f68b1f', 'Linha 11-Coral': '#f68b1f',
  '12': '#133d7c', '12-Safira': '#133d7c', 'Linha 12': '#133d7c', 'Linha 12-Safira': '#133d7c',
  '13': '#00a88e', '13-Jade': '#00a88e', 'Linha 13': '#00a88e', 'Linha 13-Jade': '#00a88e',
  '15': '#c0c0c0', '15-Prata': '#c0c0c0', 'Linha 15': '#c0c0c0', 'Linha 15-Prata': '#c0c0c0'
};

function getCorLinha(linha: string): string {
  if (coresLinhas[linha]) return coresLinhas[linha];
  const linhaLimpa = linha.replace(/^Linha\s+/i, '').trim();
  if (coresLinhas[linhaLimpa]) return coresLinhas[linhaLimpa];
  const numeroLinha = linhaLimpa.split('-')[0].split(' ')[0].trim();
  if (coresLinhas[numeroLinha]) return coresLinhas[numeroLinha];
  return '#667eea';
}

export default function RotasMetroTrem() {
  const [origem, setOrigem] = useState<string>('');
  const [destino, setDestino] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resultado, setResultado] = useState<ResultadoRota | null>(null);
  const [erro, setErro] = useState<string>('');

  const buscarRota = async (e?: FormEvent) => {
    e?.preventDefault();

    if (!origem.trim() || !destino.trim()) {
      setErro('Por favor, preencha origem e destino');
      return;
    }

    setResultado(null);
    setErro('');
    setLoading(true);

    try {
      const response = await fetch('/api/rotas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origem, destino })
      });

      const data: ResultadoRota = await response.json();
      setLoading(false);

      if (!data.sucesso) {
        setErro(data.mensagem || 'Erro ao buscar rota');
        return;
      }

      setResultado(data);
    } catch (error) {
      setLoading(false);
      setErro('Erro ao conectar com o servidor');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Rotas Metro e Trem</h1>
        <p>Encontre a melhor rota de metro e trem em Sao Paulo</p>
      </header>

      <form className={styles.searchBox} onSubmit={buscarRota}>
        <div className={styles.inputGroup}>
          <label htmlFor="origem">Origem</label>
          <input
            type="text"
            id="origem"
            placeholder="Ex: Paulista"
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="destino">Destino</label>
          <input
            type="text"
            id="destino"
            placeholder="Ex: Se"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button type="submit" className={styles.btnBuscar}>
          Buscar Rota
        </button>
      </form>

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Buscando melhor rota...</p>
        </div>
      )}

      {resultado && resultado.trechos && (
        <div className={styles.resultado}>
          <div className={styles.tempoTotal}>
            <span className={styles.label}>Tempo total:</span>
            <span className={styles.tempo}>{resultado.tempoTotal}</span>
          </div>

          <div className={styles.trechos}>
            {resultado.trechos.map((trecho, index) => {
              const corLinha = getCorLinha(trecho.linha);
              return (
                <div
                  key={index}
                  className={`${styles.trecho} ${styles[trecho.tipo.toLowerCase()]}`}
                  style={{ borderLeftColor: corLinha }}
                >
                  <div className={styles.trechoHeader}>
                    <span className={styles.trechoTipo} style={{ backgroundColor: corLinha }}>
                      {trecho.tipo}
                    </span>
                    <span className={styles.trechoLinha}>Linha {trecho.linha}</span>
                  </div>
                  {trecho.sentido && (
                    <div className={styles.trechoSentido}>Sentido: {trecho.sentido}</div>
                  )}
                  <div className={styles.estacoes}>
                    <div className={`${styles.estacao} ${styles.embarque}`}>
                      <div className={styles.estacaoIcone} style={{ backgroundColor: corLinha }}></div>
                      <div>
                        <span className={styles.estacaoLabel}>Embarque:</span>
                        <span className={styles.estacaoNome}>{trecho.embarque}</span>
                      </div>
                    </div>
                    <div className={`${styles.estacao} ${styles.desembarque}`}>
                      <div className={styles.estacaoIcone} style={{ backgroundColor: corLinha }}></div>
                      <div>
                        <span className={styles.estacaoLabel}>Desembarque:</span>
                        <span className={styles.estacaoNome}>{trecho.desembarque}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {erro && <div className={styles.erro}>{erro}</div>}
    </div>
  );
}
