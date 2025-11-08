'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { cadastrarUsuario } from '../../api'

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
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
    const { nome, email, senha, confirmarSenha } = formData

    if (!nome || !email || !senha || !confirmarSenha)
      return setError('⚠️ Todos os campos são obrigatórios.')
    if (!emailRegex.test(email)) return setError('❌ E-mail inválido.')
    if (senha.length < 6) return setError('🔒 A senha deve ter pelo menos 6 caracteres.')
    if (senha !== confirmarSenha) return setError('🚫 As senhas não coincidem.')

    setLoading(true)
    setError('')

    try {
      const resposta = await cadastrarUsuario({ nome, email, senha })
      console.log('Cadastro bem-sucedido:', resposta)
      setSuccess(true)
      setTimeout(() => router.push('/login'), 1800)
    } catch (err) {
      setSuccess(false)
      setError(err instanceof Error ? err.message : '❌ Erro ao cadastrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="
        fixed inset-0 w-full h-[100dvh]
        flex flex-col md:flex-row
        items-center justify-center
        bg-gradient-to-br from-[#5E22F3] to-[#DCC2FF]
        overflow-hidden
        px-4 pt-[110px] md:pt-0
      "
    >
    {/* Mascote (desktop) */}
    <div className="hidden md:flex flex-1 items-center justify-center md:mt-10">
      <Image
        src="/mascote-footer.svg"
        alt="Mascote TRIP"
        width={620}   // antes 760
        height={620}  // antes 760
        className="w-[70%] h-auto object-contain select-none drop-shadow-[0_0_60px_rgba(94,34,243,0.5)]"
        priority
      />
    </div>

      {/* Card de cadastro */}
      <div className="flex flex-1 items-center justify-center md:pt-10">
        <div
          className="
            w-full max-w-[640px]
            bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30
            p-6 sm:p-8 md:p-10
          "
        >
          <h1 className="text-center font-unbounded font-extrabold text-[32px] sm:text-[40px] md:text-[48px] text-[#5E22F3] leading-tight mb-2">
            Crie sua conta
          </h1>

          <p className="text-center text-[#5E22F3]/80 font-montserrat text-base sm:text-lg mb-6">
            Cadastre-se e viaje com facilidade pelo TRIP.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-montserrat">
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
              className="h-12 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-base"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="h-12 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-base"
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className="h-12 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-base"
              minLength={6}
            />
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="h-12 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-base"
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
                mt-2 h-12 rounded-md font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg
                ${success ? 'bg-green-500 cursor-default' : loading ? 'bg-[#5E22F3]/70 cursor-wait' : 'bg-[#5E22F3] hover:bg-[#4c18c8]'}
                text-white active:scale-95
              `}
            >
              {success ? 'Cadastro realizado!' : loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="text-center mt-6 text-base text-[#5E22F3]">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-bold hover:underline hover:text-[#4c18c8] transition">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
