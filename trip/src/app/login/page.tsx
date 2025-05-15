// src/app/login/page.tsx

'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  return (
    <section
      className="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background-login.png')" }}
    >
      <div className="max-w-[1400px] w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-16 gap-12">
        {/* Texto e formulário */}
        <div className="max-w-xl text-white">
          <h2 className="text-3xl md:text-5xl font-bold leading-snug font-poppins">
            Bem-vindo(a) de volta! <br />
            Faça login e continue sua <br />
            viagem com a TRIP ao seu lado.
          </h2>

          <form className="mt-10 flex flex-col gap-4 w-full max-w-md">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="rounded-full px-6 py-3 bg-white/10 text-white placeholder-white font-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="rounded-full px-6 py-3 bg-white/10 text-white placeholder-white font-light"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="submit"
              className="border border-white text-white font-black rounded-full py-3 hover:bg-white hover:text-[#DA3368] transition"
            >
              ENTRAR
            </button>
            <p className="text-xs text-white text-center">
              Não possui uma conta?{' '}
              <Link href="#" className="font-bold text-white">Criar</Link>
            </p>
          </form>
        </div>

        {/* Boneco Trip */}
        <div className="hidden lg:flex">
          <Image
            src="/trip-login.svg"
            alt="Boneco Trip"
            width={420}
            height={420}
            className="object-contain"
          />
        </div>
      </div>

      {/* Parcerias */}
      <div className="w-full flex justify-center items-center gap-6 mt-6 mb-2">
        <Image
          src="/parcerias-login.svg"
          alt="Parcerias"
          width={160}
          height={40}
          className="object-contain"
        />
      </div>
    </section>
  )
}
