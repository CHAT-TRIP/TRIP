'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

declare global {
  interface Window {
    webkitSpeechRecognition: new () => ISpeechRecognition
    SpeechRecognition: new () => ISpeechRecognition
  }

  interface ISpeechRecognition extends EventTarget {
    lang: string
    interimResults: boolean
    maxAlternatives: number
    start: () => void
    stop: () => void
    onresult: ((event: ISpeechRecognitionEvent) => void) | null
    onerror: ((event: Event) => void) | null
    onend: (() => void) | null
  }

  interface ISpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }

  interface ISpeechRecognitionResult {
    0: ISpeechRecognitionAlternative
    isFinal: boolean
    length: number
  }

  interface ISpeechRecognitionResultList {
    0: ISpeechRecognitionResult
    length: number
  }

  interface ISpeechRecognitionEvent extends Event {
    results: ISpeechRecognitionResultList
  }
}

export default function Chatbot() {
  const router = useRouter()
  const [mensagens, setMensagens] = useState([
    {
      remetente: 'bot',
      texto:
        'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [gravando, setGravando] = useState(false)
  const [logado, setLogado] = useState(false)
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null)

  const recognitionRef = useRef<ISpeechRecognition | null>(null)
  const fimDasMensagensRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token) {
      alert('Você precisa estar logado para acessar o assistente virtual.')
      router.push('/')
    } else {
      setLogado(true)
      const nome = localStorage.getItem('nome')
      setNomeUsuario(nome)
    }
  }, [router])

  const formatarTexto = (texto: string) => {
  const negrito = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  const comLinks = negrito.replace(
    /<a href="(.*?)"(.*?)>(.*?)<\/a>/g,
    `<a href="$1" $2 class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">$3</a>`
  )
  return comLinks.replace(/\n/g, '<br>')
}

  const enviarMensagem = async () => {
    if (!input.trim()) return
    const novaMensagem = { remetente: 'user', texto: input }
    setMensagens((prev) => [...prev, novaMensagem, { remetente: 'bot', texto: 'Analisando...' }])
    setInput('')
    setEnviando(true)
    setTimeout(() => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)

    try {
      const resposta = await fetch('https://chatbot-trip.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: novaMensagem.texto }),
      })

      const data = await resposta.json()
      const texto = data.resposta || 'Erro: resposta vazia'

      setMensagens((msgs) => [...msgs.slice(0, -1), { remetente: 'bot', texto: formatarTexto(texto) }])
    } catch {
      setMensagens((msgs) => [...msgs.slice(0, -1), { remetente: 'bot', texto: 'Desculpe, ocorreu um erro.' }])
    }

    setEnviando(false)
  }

  const limparConversa = async () => {
    setMensagens([
      {
        remetente: 'bot',
        texto:
          'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
      },
    ])
    try {
      await fetch('https://chatbot-trip.onrender.com/limpar_historico', { method: 'POST' })
    } catch (e) {
      console.error('Erro ao limpar histórico', e)
    }
  }

  const handleMicrofoneClick = () => {
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition)

  if (!SpeechRecognition) {
    alert('Seu navegador não suporta reconhecimento de voz.')
    return
  }

  if (!gravando) {
    const recognition = new SpeechRecognition()
    recognition.lang = 'pt-BR'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognitionRef.current = recognition
    recognition.start()
    setGravando(true)

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInput((prev) => prev + ' ' + transcript)
    }

    recognition.onerror = (error: Event) => {
      console.error('Erro no reconhecimento de voz:', error)
    }

    // Não usamos onend para evitar parada automática
    // O reconhecimento só para ao clicar novamente no botão
  } else {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setGravando(false)
  }
}


  return (
    <section
      className="relative w-full min-h-screen flex flex-col bg-[#DA3368] bg-no-repeat bg-center bg-cover overflow-x-hidden font-[Poppins]"
      style={{ backgroundImage: "url('/background-chatbot.png')" }}
    >
      <header className="w-full px-6 md:px-10 pt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <Image src="/Logo.png" alt="Logo TRIP" width={120} height={60} priority />
          {nomeUsuario && (
            <span className="text-white text-sm sm:text-base font-semibold">
              Olá, {nomeUsuario.split(' ')[0]}!
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="text-white text-xs sm:text-sm px-4 py-2 rounded-md border border-white font-bold hover:bg-white hover:text-[#DA3368] shadow-md transition"
          >
            INÍCIO
          </Link>
          <button
            onClick={limparConversa}
            className="bg-white text-[#DA3368] text-xs sm:text-sm font-bold px-4 py-2 rounded-md hover:opacity-90 shadow-md transition"
          >
            LIMPAR CONVERSA
          </button>
          {logado && (
            <button
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('nome')
                localStorage.removeItem('id')
                router.push('/')
              }}
              className="text-white text-xs sm:text-sm px-4 py-2 rounded-md border border-white font-bold hover:bg-white hover:text-[#DA3368] shadow-md transition"
            >
              SAIR
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-end w-full max-w-5xl px-4 sm:px-6 py-10 mx-auto">
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] mb-6">
          {mensagens.map((msg, i) => (
            <div
              key={i}
              className={`w-fit max-w-[85%] px-6 py-3 rounded-3xl text-sm md:text-base font-medium break-words whitespace-pre-line ${
                msg.remetente === 'user'
                  ? 'bg-white text-black self-start'
                  : 'bg-white/30 text-white self-end'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.texto }}
            ></div>
          ))}
          {gravando && (
            <div className="w-fit max-w-[85%] px-6 py-3 rounded-3xl text-sm md:text-base font-medium bg-yellow-200 text-black self-end animate-pulse">
              Gravando...
            </div>
          )}
          <div ref={fimDasMensagensRef} />
        </div>

        <div className="w-full flex justify-center px-2">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 w-full max-w-3xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 rounded-full bg-white/20 text-white placeholder:text-gray-300 outline-none"
            />
            <button
              onClick={handleMicrofoneClick}
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition duration-300 ${
                gravando ? 'bg-red-500 animate-pulse' : 'bg-white'
              }`}
            >
              <Image src="/microfone.svg" alt="Microfone" width={20} height={20} />
            </button>
            <button
              onClick={enviarMensagem}
              disabled={enviando}
              className="bg-white text-[#DA3368] px-5 py-2 rounded-full font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    </section>
  )
}
