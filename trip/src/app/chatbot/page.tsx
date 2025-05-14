'use client'
import { useState } from 'react'
import Head from 'next/head'

export default function Chatbot() {
  const [mensagens, setMensagens] = useState([
    {
      remetente: 'bot',
      texto: 'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação a linha 8 e 9, como posso te ajudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [enviando, setEnviando] = useState(false)

  const enviarMensagem = async () => {
    if (!input.trim()) return

    const novaMensagem = {
      remetente: 'user',
      texto: input,
    }

    setMensagens([...mensagens, novaMensagem, { remetente: 'bot', texto: 'Analisando...' }])
    setInput('')
    setEnviando(true)

    try {
      const resposta = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: novaMensagem.texto }),
      })
      const texto = await resposta.text()
      setMensagens((msgs) => [
        ...msgs.slice(0, -1),
        { remetente: 'bot', texto: texto.replace(/\n/g, '<br>') },
      ])
    } catch (err) {
      setMensagens((msgs) => [
        ...msgs.slice(0, -1),
        { remetente: 'bot', texto: 'Desculpe, ocorreu um erro ao processar sua mensagem.' },
      ])
    }

    setEnviando(false)
  }

  const limparConversa = async () => {
    setMensagens([
      {
        remetente: 'bot',
        texto: 'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação a linhas dos trens, como posso te ajudar?',
      },
    ])
    await fetch('http://localhost:5000/limpar_historico', { method: 'POST' })
  }

  const handleMicrofoneClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de voz.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.start()

    recognition.onresult = (event) => {
      const voz = event.results[0][0].transcript
      setInput(voz)
    }

    recognition.onerror = (event) => {
      console.error('Erro no reconhecimento de voz:', event.error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#DA3368] text-white font-[Poppins]">
      <Head>
        <title>Trip Assistente Virtual</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="bg-[#DA3368] p-4 px-10 flex justify-between items-center border-b border-[#FEA3C0]">
        <div className="flex items-center">
          <img src="/imgs/trip-cabeca.png" alt="Trip Logo" className="h-[70px] mr-4" />
          <span className="font-black text-2xl">TRIP</span>
        </div>
        <div className="flex gap-3">
          <a href="/" className="text-white px-4 py-2 rounded-full bg-pink-300/50 hover:bg-pink-300/70 font-semibold">Voltar</a>
          <button onClick={limparConversa} className="text-white px-4 py-2 rounded-full bg-pink-300/50 hover:bg-pink-300/70 font-semibold">Limpar Conversa</button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto p-5 w-full flex flex-col">
        <div className="flex-1 flex flex-col overflow-y-auto gap-4 max-h-[70vh] mb-4">
          {mensagens.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-4 rounded-lg ${
                msg.remetente === 'bot'
                  ? 'bg-white text-gray-900 self-start'
                  : 'bg-pink-300 text-white self-end text-right'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.texto }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 bg-pink-300/30 p-4 rounded-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
            placeholder="Enviar uma mensagem"
            className="flex-1 p-3 rounded-full text-black outline-none"
          />
          <button
            onClick={handleMicrofoneClick}
            className="bg-pink-300 text-white rounded-full px-4 py-2"
          >
            🎤
          </button>
          <button
            onClick={enviarMensagem}
            className="bg-pink-300 text-white rounded-full px-4 py-2 font-bold disabled:opacity-50"
            disabled={enviando}
          >
            Enviar
          </button>
        </div>
      </main>
    </div>
  )
}
