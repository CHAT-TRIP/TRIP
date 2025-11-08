'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { loginUsuario } from '../../api'

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({ email: '', senha: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { email, senha } = formData

    if (!email || !senha) return setError('⚠️ Preencha todos os campos.')
    if (!emailRegex.test(email)) return setError('❌ E-mail inválido.')
    if (senha.length < 6) return setError('🔒 A senha deve ter pelo menos 6 caracteres.')

    setLoading(true)
    setError('')

    try {
      const resposta = await loginUsuario(email, senha)
      console.log('Login bem-sucedido:', resposta)
      setSuccess(true)
      setTimeout(() => router.push('/chatbot'), 1500)
    } catch (err) {
      setSuccess(false)
      setError(err instanceof Error ? err.message : '❌ Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="
        fixed inset-0 w-full h-[100dvh]
        flex justify-center items-start lg:items-center
        bg-gradient-to-br from-[#5E22F3] to-[#DCC2FF]
        overflow-hidden
        px-4 pt-24 sm:pt-28 md:pt-0 lg:pt-16
      "
    >
      {/* Mascote Desktop */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Image
          src="/mascote-footer.svg"
          alt="Mascote TRIP"
          width={760}
          height={760}
          className="w-[75%] h-auto object-contain select-none drop-shadow-[0_0_60px_rgba(94,34,243,0.5)]"
          priority
        />
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center">
        <div
          className="
            w-full max-w-[600px]
            bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30
            p-6 sm:p-8 md:p-10
            my-auto
          "
        >
          <h1
            className="
              text-center font-unbounded font-extrabold
              text-[32px] sm:text-[40px] md:text-[54px]
              leading-[1.1] text-[#5E22F3]
              pt-4 md:pt-6 mb-3
            "
          >
            Bem-vindo <br /> de volta
          </h1>

          <p className="text-center text-[#5E22F3]/80 mb-10 font-montserrat text-base sm:text-lg md:text-xl">
            Faça login para continuar sua jornada com a TRIP.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-montserrat">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="h-14 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-lg"
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className="h-14 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-lg"
              minLength={6}
            />

            {error && (
              <p className="text-center text-red-600 font-medium bg-red-100/60 py-2 px-3 rounded-lg border border-red-300 animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={success || loading}
              className={`
                mt-1 h-14 rounded-md font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg
                ${
                  success
                    ? 'bg-green-500 cursor-default'
                    : loading
                    ? 'bg-[#5E22F3]/70 cursor-wait'
                    : 'bg-[#5E22F3] hover:bg-[#4c18c8]'
                } text-white active:scale-95
              `}
            >
              {success ? 'Login realizado!' : loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center mt-10 text-base text-[#5E22F3]">
            Ainda não tem uma conta?
            <br />
            <Link href="/register" className="font-bold hover:underline hover:text-[#4c18c8] transition text-lg">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
