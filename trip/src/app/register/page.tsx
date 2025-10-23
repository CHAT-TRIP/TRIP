'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { nome, email, senha, confirmarSenha } = formData

    if (!nome || !email || !senha || !confirmarSenha) {
      setError('⚠️ Todos os campos são obrigatórios.')
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

    if (senha !== confirmarSenha) {
      setError('🚫 As senhas não coincidem.')
      return
    }

    // Tudo certo!
    setSuccess(true)
    setError('')

    // Simula um feedback bonito e redireciona em 3s
    setTimeout(() => {
      router.push('/chatbot')
    }, 3000)
  }

  return (
    <section
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #5E22F3 0%, #DCC2FF 100%)',
      }}
    >
      {/* Lado esquerdo - Mascote */}
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

      {/* Lado direito - Card de cadastro */}
      <div className="flex flex-1 items-center justify-center p-10 md:p-0">
        <div className="w-full max-w-[640px] bg-white/60 backdrop-blur-2xl rounded-2xl shadow-2xl p-14 border border-white/30">
          <h1 className="text-center font-unbounded font-extrabold text-[48px] md:text-[56px] mb-4 text-[#5E22F3] leading-tight">
            Crie sua conta
          </h1>
          <p className="text-center text-[#5E22F3]/80 mb-10 font-montserrat text-lg md:text-xl">
            Cadastre-se e viaje com facilidade pelo TRIP.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-montserrat">
            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
              className="h-14 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-lg"
              required
            />
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
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="h-14 rounded-lg border border-[#5E22F3]/60 bg-white/40 px-4 text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:ring-[#5E22F3] outline-none transition-all text-lg"
              required
            />

            {/* Mensagem de erro */}
            {error && (
              <p className="text-center text-red-600 font-medium bg-red-100/60 py-2 px-3 rounded-lg border border-red-300 animate-pulse">
                {error}
              </p>
            )}

            {/* Botão com estado de sucesso */}
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
              {success ? 'Cadastro realizado com sucesso!' : 'Cadastrar'}
            </button>
          </form>

          <div className="text-center mt-8 text-base text-[#5E22F3]">
            Já tem uma conta?{' '}
            <Link
              href="/login"
              className="font-bold hover:underline hover:text-[#4c18c8] transition"
            >
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
