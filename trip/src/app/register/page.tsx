'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BotaoAnimado from '../../components/BotaoAnimado'
import { cadastrarUsuario, loginUsuario } from '../../api'

export default function CadastroPage() {
  const router = useRouter()
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    setForm({ nome: '', email: '', senha: '' })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)

    try {
      await cadastrarUsuario(form)

      const data = await loginUsuario(form.email, form.senha)
      document.cookie = `token=${data.token}; path=/; max-age=3600`

      alert('Conta criada com sucesso!')
      setForm({ nome: '', email: '', senha: '' })
      router.push('/chatbot')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro(err.message)
      } else {
        setErro('Erro inesperado')
      }
    }
  }

  return (
    <section
      className="relative w-full h-screen flex flex-col bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/background-cadastro.png')" }}
    >
      <header className="w-full px-6 md:px-10 pt-4 flex items-center justify-between">
        <Image src="/Logo.png" alt="Logo TRIP" width={140} height={80} priority />
        <div className="flex gap-4">
          <BotaoAnimado href="/" variant="outlined">INÍCIO</BotaoAnimado>
          <BotaoAnimado href="/login" variant="filled">LOGIN</BotaoAnimado>
        </div>
      </header>

      <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 pt-8 lg:pt-10 gap-6 lg:gap-0">
        <div className="flex flex-col items-center lg:items-start justify-center gap-6 w-full max-w-[500px] pt-4 lg:pt-20 xl:pt-15 lg:ml-36 xl:ml-100 text-center lg:text-left">
          <h1 className="text-[24px] sm:text-[28px] md:text-[32px] text-white leading-snug" style={{ fontFamily: 'Poppins', fontWeight: 700 }}>
            Crie sua conta e embarque <br className="hidden sm:block" />
            com a TRIP: <span style={{ fontWeight: 300 }}>
              o assistente que te guia em cada estação da sua jornada!
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full px-1" autoComplete="off">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
              required
            />
            <input
              name="senha"
              type="password"
              value={form.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
              required
            />
            <input
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
              required
            />
            <button
              type="submit"
              className="border border-white px-6 py-2 sm:py-3 rounded-md text-white text-sm sm:text-base hover:bg-white hover:text-[#DA3368] transition"
              style={{ fontFamily: 'Poppins', fontWeight: 900 }}
            >
              CADASTRAR
            </button>
          </form>

          {erro && <p className="text-red-300">{erro}</p>}

          <p className="text-sm text-white -mt-4" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
            Já tem uma conta?{' '}
            <Link href="/login" className="underline hover:text-gray-300" style={{ fontWeight: 700 }}>
              Entrar
            </Link>
          </p>

          <div className="flex justify-center lg:justify-start -mt-6">
            <Image src="/parcerias-login.svg" alt="Parcerias" width={160} height={40} className="w-auto h-8 md:h-10" />
          </div>
        </div>

        <div className="flex lg:hidden justify-center -mt-10 -mb-3">
          <Image src="/trip-cadastro.svg" alt="Mascote Trip" width={300} height={300} className="w-[230px] h-auto" priority />
        </div>

        <div className="hidden lg:flex items-end justify-end h-full pr-20 lg:pr-32 xl:pr-40">
          <Image src="/trip-cadastro.svg" alt="Mascote Trip" width={700} height={680} priority className="max-w-[320px] xl:max-w-[450px] 2xl:max-w-[550px] w-full" />
        </div>
      </div>
    </section>
  )
}
