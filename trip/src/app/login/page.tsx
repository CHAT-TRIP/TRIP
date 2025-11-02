'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { loginUsuario } from '../../api'

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })
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

    // Validação básica
    if (!email || !senha) {
      setError('⚠️ Preencha todos os campos.')
      return
    }

    if (!emailRegex.test(email)) {
      setError('❌ E-mail inválido. Digite um e-mail válido.')
      return
    }

    if (senha.length < 6) {
      setError('🔒 A senha deve ter pelo menos 6 caracteres.')
      return
    }

    // Chamada ao backend
    setLoading(true)
    setError('')

    try {
      const resposta = await loginUsuario(email, senha)
      console.log('Login bem-sucedido:', resposta)

      setSuccess(true)

      // Redireciona pra tela do chatbot
      setTimeout(() => {
        router.push('/chatbot')
      }, 1500)
    } catch (err) {
      setSuccess(false)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('❌ Erro ao fazer login. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #5E22F3 0%, #DCC2FF 100%)',
      }}
    >
      {/* Lado esquerdo - Mascote (desktop) */}
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

      {/* Lado direito - Card de login */}
      <div className="flex flex-1 items-center justify-center p-10 md:p-0">
        <div className="w-full max-w-[640px] bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-14 border border-white/30">
          {/* Título */}
          <h1 className="text-center font-unbounded font-extrabold text-[48px] md:text-[56px] mb-4 text-[#5E22F3] leading-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-center text-[#5E22F3]/80 mb-10 font-montserrat text-lg md:text-xl">
            Faça login para continuar sua jornada com a TRIP.
          </p>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-montserrat">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="h-14 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-lg"
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className="h-14 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-lg"
              required
              minLength={6}
            />

            {/* Mensagem de erro */}
            {error && (
              <p className="text-center text-red-600 font-medium bg-red-100/60 py-2 px-3 rounded-lg border border-red-300 animate-pulse">
                {error}
              </p>
            )}

            {/* Botão de login */}
            <button
              type="submit"
              disabled={success || loading}
              className={`mt-4 h-14 rounded-md font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg
                ${
                  success
                    ? 'bg-green-500 hover:bg-green-500 text-white cursor-default'
                    : loading
                    ? 'bg-[#5E22F3]/70 text-white cursor-wait'
                    : 'bg-[#5E22F3] hover:bg-[#4c18c8] text-white active:scale-95'
                }`}
            >
              {success ? 'Login realizado com sucesso!' : loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Links extras */}
          <div className="text-center mt-8 text-base text-[#5E22F3]">
            <p>
              Ainda não tem uma conta?{' '}
              <Link
                href="/register"
                className="font-bold hover:underline hover:text-[#4c18c8] transition"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
