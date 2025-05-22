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

      {/* Área principal */}
      <div className="flex flex-1 w-full flex-col lg:flex-row items-center justify-between px-6 md:px-30">
        <div className="flex flex-col justify-center items-center lg:items-start gap-8 max-w-[500px] w-full h-full pt-4 lg:pt-20 lg:ml-36 xl:ml-48 text-center lg:text-left">
          <h1 className="text-[28px] sm:text-[32px] md:text-[35px] text-white leading-snug"
            style={{ fontFamily: 'Poppins', fontWeight: 680 }}>
            Crie sua conta e embarque
            com a TRIP: o assistente
            que te guia em cada
            estação da sua jornada!
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full px-1" autoComplete="off">
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={form.nome}
              onChange={handleChange}
              autoComplete="off"
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
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
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
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
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
              required
            />
            <button
              type="submit"
              className="border border-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-white text-sm sm:text-base hover:bg-white hover:text-[#DA3368] transition"
              style={{ fontFamily: 'Poppins', fontWeight: 900 }}
            >
              CRIAR CONTA
            </button>
          </form>

          {erro && <p className="text-red-300">{erro}</p>}

          <p className="text-sm text-white -mt-4" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
            Já tem uma conta?{' '}
            <Link href="/login" className="underline hover:text-gray-300" style={{ fontWeight: 700 }}>
              Entrar
            </Link>
          </p>

          <div className="flex justify-center lg:justify-start">
            <Image src="/parcerias-login.svg" alt="Parcerias" width={140} height={40} className="w-auto h-8 md:h-10" />
          </div>
        </div>

        {/* Mascote: só aparece no desktop */}
        <div className="hidden lg:flex items-end justify-end h-full pr-20 lg:pr-32 xl:pr-40">
          <Image
            src="/trip-conta.svg"
            alt="Mascote Trip"
            width={700}
            height={680}
            priority
            className="w-auto h-auto max-h-[900px]"
          />
        </div>
      </div>
    </section>
  )
}
