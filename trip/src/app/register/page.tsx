'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cadastrarUsuario } from '../../api'
import BotaoAnimado from '../../components/BotaoAnimado'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const [erro, setErro] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)

    try {
      await cadastrarUsuario(form)
      alert('Cadastro realizado com sucesso!')
      router.push('/login')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message)
      } else {
        setErro('Erro desconhecido')
      }
    }
  }

  return (
    <section
      className={`${poppins.className} relative w-full h-screen flex flex-col bg-cover bg-center overflow-x-hidden`}
      style={{ backgroundImage: "url('/background-conta.png')" }}
    >
      {/* Header */}
      <header className="w-full px-6 md:px-10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/Logo.png" alt="Logo TRIP" width={140} height={80} priority />
        </div>
        <div className="flex gap-4">
          <BotaoAnimado href="/" variant="outlined">INÍCIO</BotaoAnimado>
          <BotaoAnimado href="/login" variant="filled">ENTRAR</BotaoAnimado>
        </div>
      </header>

      {/* Conteúdo central */}
      <div className="flex flex-1 w-full items-center justify-center px-6 md:px-30">
        <div className="flex flex-col justify-center items-center gap-10 max-w-[700px] w-full h-full pt-20 text-center">
          <h1 className="text-[32px] sm:text-[38px] md:text-[42px] text-white leading-snug"
            style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
            Crie sua conta e embarque
            com a TRIP: o assistente
            que te guia em cada
            estação da sua jornada!
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full px-1" autoComplete="off">
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={form.nome}
              onChange={handleChange}
              autoComplete="off"
              className="px-6 py-4 rounded-md bg-white/20 placeholder-white text-white outline-none text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              className="px-6 py-4 rounded-md bg-white/20 placeholder-white text-white outline-none text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={form.senha}
              onChange={handleChange}
              autoComplete="new-password"
              className="px-6 py-4 rounded-md bg-white/20 placeholder-white text-white outline-none text-lg"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
              required
            />
            <button
              type="submit"
              className="border border-white px-4 py-3 sm:px-6 sm:py-4 rounded-md text-white text-base sm:text-lg hover:bg-white hover:text-[#DA3368] transition"
              style={{ fontFamily: 'Poppins', fontWeight: 900 }}
            >
              CRIAR CONTA
            </button>
          </form>

          {erro && <p className="text-red-300">{erro}</p>}

          <p className="text-base text-white -mt-4" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
            Já tem uma conta?{' '}
            <Link href="/login" className="underline hover:text-gray-300" style={{ fontWeight: 700 }}>
              Entrar
            </Link>
          </p>

          <div className="flex justify-center">
            <Image src="/parcerias-login.svg" alt="Parcerias" width={180} height={50} className="w-auto h-10 md:h-12" />
          </div>
        </div>
      </div>
    </section>
  )
}
