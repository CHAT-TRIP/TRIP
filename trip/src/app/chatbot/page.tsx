'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

export default function Chatbot() {
  const router = useRouter()
  const jaVerificou = useRef(false) // evita múltiplas execuções no Strict Mode

  function getCookie(nome: string) {
    const match = document.cookie.match(new RegExp('(^| )' + nome + '=([^;]+)'))
    return match ? match[2] : null
  }

  useEffect(() => {
    if (jaVerificou.current) return
    jaVerificou.current = true

    const token = getCookie('token')
    if (!token) {
      alert('Você precisa estar logado para acessar o chatbot.')
      router.push('/login')
    }
  }, [router])

  const [mensagens, setMensagens] = useState([
    {
      remetente: 'bot',
      texto: 'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação à linha 8 e 9, como posso te ajudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [gravando, setGravando] = useState(false)
  const recognitionRef = useRef<any>(null)
  const fimDasMensagensRef = useRef<HTMLDivElement | null>(null)

  const formatarTexto = (texto: string) => {
    return texto
      .replace(/<a (?![^>]*class=)/g, '<a class="text-blue-600 underline" ')
      .replace(/(?<!href=")(https?:\/\/[^\s"')<>]+)(?=[\s"')<>]|$)/g, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">${url}</a>`
      })
      .replace(/\n/g, '<br>')
  }

  const enviarMensagem = async () => {
    if (!input.trim()) return

    const novaMensagem = { remetente: 'user', texto: input }
    setMensagens([...mensagens, novaMensagem, { remetente: 'bot', texto: 'Analisando...' }])
    setInput('')
    setEnviando(true)
    setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)

    try {
      const resposta = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: novaMensagem.texto }),
      })
      const texto = await resposta.text()
      setMensagens((msgs) => {
        const novasMsgs = [...msgs.slice(0, -1), { remetente: 'bot', texto: formatarTexto(texto) }]
        setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
        return novasMsgs
      })
    } catch {
      setMensagens((msgs) => {
        const novasMsgs = [...msgs.slice(0, -1), { remetente: 'bot', texto: 'Desculpe, ocorreu um erro ao processar sua mensagem.' }]
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
        texto: 'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação à linha 8 e 9, como posso te ajudar?',
      },
    ])
    setInput('')
    await fetch('http://localhost:5000/limpar_historico', { method: 'POST' })
  }

  const handleMicrofoneClick = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return alert('Seu navegador não suporta reconhecimento de voz.')

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

      recognition.onresult = (event: any) => setInput(event.results[0][0].transcript)

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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;800;900&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-[#DA3368]/90 p-4 px-10 flex justify-between items-center border-b border-[#FEA3C0]">
        <div className="flex items-center">
          <img src="/Logo.png" alt="Trip Logo" className="h-[40px] mr-4" />
        </div>
        <div className="flex gap-3">
          <a href="/" className="text-white px-4 py-2 rounded-full bg-pink-300/50 hover:bg-pink-300/70 font-semibold">Voltar</a>
          <button onClick={limparConversa} className="text-white px-4 py-2 rounded-full bg-pink-300/50 hover:bg-pink-300/70 font-semibold">Limpar Conversa</button>
          <button
            onClick={() => {
              document.cookie = 'token=; Max-Age=0; path=/'
              router.push('/')
            }}
            className="text-white px-4 py-2 rounded-full bg-pink-300/50 hover:bg-pink-300/70 font-semibold"
          >
            Sair
          </button>
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
            onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
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
