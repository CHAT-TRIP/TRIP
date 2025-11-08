'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Msg = { remetente: 'bot' | 'user'; texto: string }

export default function Chatbot() {
  const router = useRouter()
  const [mensagens, setMensagens] = useState<Msg[]>([
    {
      remetente: 'bot',
      texto:
        'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [autenticado, setAutenticado] = useState(false)
  const fimDasMensagensRef = useRef<HTMLDivElement | null>(null)

  // autenticação
  useEffect(() => {
    const verificarAutenticacao = () => {
      const user = localStorage.getItem('user')
      const loginTime = localStorage.getItem('loginTime')
      if (!user || !loginTime) {
        router.push('/login')
        return
      }
      const tempoDecorrido = Date.now() - parseInt(loginTime)
      const horasDecorridas = tempoDecorrido / (1000 * 60 * 60)
      if (horasDecorridas > 24) {
        localStorage.removeItem('user')
        localStorage.removeItem('loginTime')
        router.push('/login')
      } else {
        setAutenticado(true)
      }
    }
    verificarAutenticacao()
  }, [router])

  // ouve "limpar chat" vindo do Navbar
  useEffect(() => {
    const clearHandler = () => {
      setMensagens([
        {
          remetente: 'bot',
          texto:
            'Olá! Eu sou o assistente virtual Trip ~\n\nEm relação às linhas de trens e metrôs, como posso te ajudar?',
        },
      ])
    }
    window.addEventListener('trip:clear-chat', clearHandler)
    return () => window.removeEventListener('trip:clear-chat', clearHandler)
  }, [])

  // enviar mensagem
  const enviarMensagem = async () => {
    const textoUsuario = input.trim()
    if (!textoUsuario) return

    const novaMensagem: Msg = { remetente: 'user', texto: textoUsuario }
    setMensagens((prev) => [
      ...prev,
      novaMensagem,
      { remetente: 'bot', texto: 'Digitando...' },
    ])
    setInput('')
    setEnviando(true)

    setTimeout(
      () => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }),
      50
    )

    try {
      const resposta = await fetch('https://chatbot-trip.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ msg: textoUsuario }),
      })
      const data = await resposta.json()
      const texto = data?.resposta || 'Erro: resposta vazia'
      setMensagens((msgs) => [
        ...msgs.slice(0, -1),
        { remetente: 'bot', texto },
      ])
    } catch {
      setMensagens((msgs) => [
        ...msgs.slice(0, -1),
        { remetente: 'bot', texto: 'Desculpe, ocorreu um erro.' },
      ])
    } finally {
      setEnviando(false)
      setTimeout(
        () => fimDasMensagensRef.current?.scrollIntoView({ behavior: 'smooth' }),
        50
      )
    }
  }

  if (!autenticado) return null

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .mensagem-bot {
            margin-right: auto !important;
            align-self: flex-start !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            white-space: pre-wrap !important;
          }
          .mensagem-user {
            margin-left: auto !important;
            align-self: flex-end !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            white-space: pre-wrap !important;
            font-weight: 600 !important;
          }
          .mensagem-bot a {
            color: #60A5FA !important;
            text-decoration: underline !important;
            font-weight: 600 !important;
            transition: all 0.2s ease !important;
          }
          .mensagem-bot a:hover {
            color: #93C5FD !important;
            text-shadow: 0 0 8px rgba(96, 165, 250, 0.6) !important;
          }
          .mensagem-user a {
            color: #5E22F3 !important;
            text-decoration: underline !important;
            font-weight: 600 !important;
          }
          .mensagem-user a:hover {
            color: #3D16A8 !important;
          }
        `,
        }}
      />
      <section
        className="relative w-full min-h-[100svh] flex flex-col font-[Poppins]
                   bg-gradient-to-br from-[#5E22F3] to-[#DCC2FF] overflow-hidden"
      >
        {/* mascote */}
        <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
          <Image
            src="/mascote-footer.svg"
            alt="Mascote TRIP"
            width={750}
            height={750}
            className="object-contain select-none"
            priority
          />
        </div>

        {/* sem header aqui; usamos o Navbar fixo global */}

        {/* chat */}
        <main
          className="relative z-10 flex-1 flex flex-col justify-end
                     w-full max-w-3xl px-4 sm:px-6 py-10 mx-auto pt-24
                     pb-[88px]"
        >
          <div
            className="flex flex-col gap-4 overflow-y-auto
                       max-h-[calc(100svh-96px-88px)]
                       mb-6 scrollbar-thin scrollbar-thumb-[#9F86FF]/40 scrollbar-track-transparent w-full"
          >
            {mensagens.map((msg, i) => (
              <div
                key={i}
                className={`w-fit max-w-[85%] px-6 py-3 rounded-3xl text-sm md:text-base font-medium shadow-lg break-words ${
                  msg.remetente === 'user'
                    ? 'mensagem-user bg-white text-[#5E22F3] self-end'
                    : 'mensagem-bot bg-white/30 text-white self-start backdrop-blur-sm'
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.texto.replace(/\n/g, '<br/>'),
                }}
              />
            ))}
            <div ref={fimDasMensagensRef} />
          </div>

          {/* input */}
          <div className="w-full flex justify-center px-2">
            <div
              className="md:static fixed bottom-0 left-0 right-0 md:left-auto md:right-auto
                         mx-auto md:mx-0 md:w-full
                         flex items-center gap-3
                         bg-white/20 backdrop-blur-md px-4 py-3
                         rounded-none md:rounded-full
                         shadow-[0_-4px_20px_rgba(0,0,0,0.15)] md:shadow-lg
                         border-t border-white/15 md:border-0
                         max-w-3xl safe-pad-bottom"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(ev) => { if (ev.key === 'Enter') enviarMensagem() }}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent text-white placeholder:text-white/70
                           outline-none text-base md:text-base"
              />
              <button
                onClick={enviarMensagem}
                disabled={enviando}
                className="bg-white text-[#5E22F3] text-base font-bold
                           px-6 py-2 rounded-full shadow-md hover:shadow-lg transition"
              >
                Enviar
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}
