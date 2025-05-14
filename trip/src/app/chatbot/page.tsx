'use client'

import { useState, useRef } from 'react'
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
  const [gravando, setGravando] = useState(false)
  const recognitionRef = useRef<any>(null)
  const fimDasMensagensRef = useRef<HTMLDivElement | null>(null)

    const formatarTexto = (texto: string) => {
  // Adiciona classe azul e sublinhado a todos os <a> que não têm "class"
  const textoCorrigido = texto
    // Adiciona a classe somente se ainda não houver
    .replace(/<a (?![^>]*class=)/g, '<a class="text-blue-600 underline" ')

    // Adiciona links clicáveis para URLs soltas, ignorando se já estiver dentro de <a>
    .replace(/(?<!href=")(https?:\/\/[^\s"')<>]+)(?=[\s"')<>]|$)/g, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">${url}</a>`
    })

    // Substitui \n por <br>
    .replace(/\n/g, '<br>')

  return textoCorrigido
}



  const enviarMensagem = async () => {
  if (!input.trim()) return

  const novaMensagem = {
    remetente: 'user',
    texto: input,
  }

  setMensagens([...mensagens, novaMensagem, { remetente: 'bot', texto: 'Analisando...' }])
  setInput('')
  setEnviando(true)

  // Scroll logo após o usuário enviar
  setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)

  try {
    const resposta = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: novaMensagem.texto }),
    })
    const texto = await resposta.text()
    setMensagens((msgs) => {
      const novasMsgs = [
        ...msgs.slice(0, -1),
        { remetente: 'bot', texto: formatarTexto(texto) },
      ]
      setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      return novasMsgs
    })
  } catch (err) {
    setMensagens((msgs) => {
      const novasMsgs = [
        ...msgs.slice(0, -1),
        { remetente: 'bot', texto: 'Desculpe, ocorreu um erro ao processar sua mensagem.' },
      ]
      setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      return novasMsgs
    })
  }

  setEnviando(false)
}


  const limparConversa = async () => {
    setMensagens([
      {
        remetente: 'bot',
        texto: 'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação a linha 8 e 9, como posso te ajudar?',
      },
    ])
    setInput('')
    await fetch('http://localhost:5000/limpar_historico', { method: 'POST' })
  }

  const handleMicrofoneClick = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de voz.')
      return
    }

    if (gravando && recognitionRef.current) {
      recognitionRef.current.stop()
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = 'pt-BR'
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      recognition.continuous = false

      recognitionRef.current = recognition

      recognition.start()
      setGravando(true)

      recognition.onresult = (event: any) => {
        const voz = event.results[0][0].transcript
        setInput(voz)
      }

      recognition.onerror = (event: any) => {
        console.warn('Erro no reconhecimento de voz:', event.error)
        setGravando(false)
        recognition.stop()
        recognitionRef.current = null
      }

      recognition.onend = () => {
        setGravando(false)
        recognitionRef.current = null
      }
    } catch (err) {
      console.error('Erro ao iniciar reconhecimento:', err)
      setGravando(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-poppins bg-[url('/background%20-%20chat.png')] bg-cover bg-center text-white">
      <Head>
        <title>Trip Assistente Virtual</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="bg-[#DA3368]/90 p-4 px-10 flex justify-between items-center border-b border-[#FEA3C0]">
        <div className="flex items-center">
          <img src="/imgs/trip-cabeca.png" alt="Trip Logo" className="h-[70px] mr-4" />
          <span className="font-black text-2xl bg-gradient-to-r from-[#DA3368] to-[#741B37] bg-clip-text text-transparent">TRIP</span>
        </div>
        <div className="flex gap-3">
          <a href="/" className="text-white px-4 py-2 rounded-full bg-pink-300/50 hover:bg-pink-300/70 font-semibold">Voltar</a>
          <button onClick={limparConversa} className="text-white px-4 py-2 rounded-full bg-pink-300/50 hover:bg-pink-300/70 font-semibold">Limpar Conversa</button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto p-5 w-full flex flex-col backdrop-blur-sm bg-[#da3368]/30 rounded-xl my-6">
        <div className="flex-1 flex flex-col overflow-y-auto gap-4 max-h-[65vh] mb-4 scrollbar-hide">
          {mensagens.map((msg, index) => (
            <div
              key={index}
              className={`w-fit max-w-[80%] p-4 rounded-2xl shadow ${
                msg.remetente === 'bot'
                  ? 'bg-white text-gray-900 self-start'
                  : 'bg-pink-300 text-white self-end text-right'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.texto }}
            ></div>
          ))}
          <div ref={fimDasMensagensRef} />
        </div>
        <div className="flex items-center gap-2 bg-white/20 p-4 rounded-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
            placeholder="Enviar uma mensagem"
            className="flex-1 p-3 rounded-full text-black outline-none bg-white/90"
          />
          <button
            onClick={handleMicrofoneClick}
            className={`rounded-full px-4 py-2 font-bold ${
              gravando ? 'bg-red-500 animate-pulse' : 'bg-pink-300 hover:bg-pink-400'
            } text-white`}
          >
            {gravando ? 'Parar' : '🎤'}
          </button>
          <button
            onClick={enviarMensagem}
            className="bg-pink-300 hover:bg-pink-400 text-white rounded-full px-4 py-2 font-bold disabled:opacity-50"
            disabled={enviando}
          >
            Enviar
          </button>
        </div>
      </main>
    </div>
  )
}
