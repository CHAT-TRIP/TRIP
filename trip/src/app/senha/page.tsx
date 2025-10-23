'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function EsqueciSenhaPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('⚠️ Por favor, insira seu e-mail.')
      return
    }

    if (!emailRegex.test(email)) {
      setError('❌ E-mail inválido. Digite um e-mail válido.')
      return
    }

    // Se tudo estiver certo
    setError('')
    setSuccess(true)

    // Simula envio de e-mail e volta ao login depois de 3s
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }

  return (
    <section
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #5E22F3 0%, #DCC2FF 100%)',
      }}
    >
      {/* Lado esquerdo - Mascote (somente desktop) */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Image
          src="/mascote-footer.svg"
          alt="Mascote TRIP"
          width={760}
          height={760}
          className="w-[80%] h-auto object-contain select-none drop-shadow-[0_0_60px_rgba(94,34,243,0.5)]"
          priority
        />
      </div>

      {/* Lado direito - Card de redefinição */}
      <div className="flex flex-1 items-center justify-center p-10 md:p-0">
        <div className="w-full max-w-[640px] bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-14 border border-white/30">
          {/* Título */}
          <h1 className="text-center font-unbounded font-extrabold text-[48px] md:text-[56px] mb-4 text-[#5E22F3] leading-tight">
            Esqueceu sua senha?
          </h1>
          <p className="text-center text-[#5E22F3]/80 mb-10 font-montserrat text-lg md:text-xl">
            Insira seu e-mail e enviaremos um link para redefinir sua senha.
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 font-montserrat">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              className="h-14 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-lg"
              required
            />

            {/* Mensagem de erro */}
            {error && (
              <p className="text-center text-red-600 font-medium bg-red-100/60 py-2 px-3 rounded-lg border border-red-300 animate-pulse">
                {error}
              </p>
            )}

            {/* Botão de envio */}
            <button
              type="submit"
              disabled={success}
              className={`mt-4 h-14 rounded-md font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg 
                ${
                  success
                    ? 'bg-green-500 hover:bg-green-500 text-white cursor-default'
                    : 'bg-[#5E22F3] hover:bg-[#4c18c8] text-white active:scale-95'
                }`}
            >
              {success ? 'E-mail enviado com sucesso!' : 'Enviar link de redefinição'}
            </button>
          </form>

          {/* Link de retorno */}
          <div className="text-center mt-8 text-base text-[#5E22F3]">
            <Link
              href="/login"
              className="font-bold hover:underline hover:text-[#4c18c8] transition"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
