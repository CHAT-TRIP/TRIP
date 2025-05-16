'use client'

import Link from 'next/link'
import Image from 'next/image'
import BotaoAnimado from '../../components/BotaoAnimado'

export default function LoginPage() {
  return (
    <section
      className="relative w-full h-screen flex flex-col bg-cover bg-center overflow-x-hidden"
      style={{ backgroundImage: "url('/background-login.png')" }}
    >
      {/* Header */}
      <header className="w-full px-6 md:px-10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/Logo.png" alt="Logo TRIP" width={140} height={80} priority />
        </div>
        <div className="flex gap-4">
          <BotaoAnimado href="/" variant="outlined">
            INÍCIO
          </BotaoAnimado>
          <BotaoAnimado href="/register" variant="filled">
            CRIAR CONTA
          </BotaoAnimado>
        </div>
      </header>

      {/* Área principal */}
      <div className="flex flex-1 w-full items-center justify-between px-6 md:px-30">
        {/* Texto e formulário  */}
        <div className="flex flex-col justify-center gap-8 max-w-[500px] w-full h-full pt- lg:ml-140">
          <h1
            className="text-[32px] md:text-[36px] text-white leading-snug"
            style={{ fontFamily: 'Poppins', fontWeight: 700 }}
          >
            Bem-vindo(a) de volta!
            <br />
            Faça login e continue sua <br />
            viagem com a TRIP ao seu lado.
          </h1>

          <form className="flex flex-col gap-4 w-full">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              className="px-6 py-3 rounded-md bg-white/20 placeholder-white text-white outline-none text-base"
              style={{ fontFamily: 'Poppins', fontWeight: 300 }}
            />
            <button
              type="submit"
              className="border border-white px-6 py-3 rounded-md text-white text-base hover:bg-white hover:text-[#DA3368] transition"
              style={{ fontFamily: 'Poppins', fontWeight: 900 }}
            >
              ENTRAR
            </button>
          </form>

          <p className="text-sm text-white text-center" style={{ fontFamily: 'Poppins', fontWeight: 300 }}>
            Não possui uma conta?{' '}
            <Link href="/register" className="underline hover:text-gray-300" style={{ fontWeight: 700 }}>
              Criar
            </Link>
          </p>

          {/* Parcerias */}
          <div className="flex justify-start mt-3">
            <Image src="/parcerias-login.svg" alt="Parcerias" width={140} height={35} className="w-auto h-8 md:h-10" />
          </div>
        </div>

        {/* Mascote  */}
        <div className="hidden lg:flex items-end justify-end h-full pr-10">
          <Image
            src="/trip-login.svg"
            alt="Mascote Trip"
            width={600} 
            height={580}
            priority
            className="w-auto h-auto max-h-[800px]"
          />
        </div>
      </div>
    </section>
  )
}
