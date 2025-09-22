/*teste aaa*/ 
'use client'

export default function Funcionalidades() {
  return (
    <section
      className="w-full py-24 text-white"
      style={{
        backgroundImage: "url('/background-funcionalidades.svg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '540px',
        backgroundPosition: 'top center',
        backgroundColor: '#5E22F3',
      }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        {/* TÍTULO */}
        <div className="mb-12 md:mb-16">
          <h2
            className="text-[44px] md:text-6xl font-extrabold leading-none tracking-tight"
            style={{ fontFamily: 'Unbounded, sans-serif' }}
          >
            Fique por dentro
          </h2>
        </div>

        {/* GRID */}
        <div className="relative grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* ROTAS — fecha logo após o texto; badge fora do card */}
          <div
            className="
              relative lg:col-span-1 overflow-visible
              rounded-[14px] border border-white/90
              p-6 md:p-8
              transition-shadow hover:shadow-[0_0_30px_rgba(220,194,255,0.35)]
            "
          >
            <h3
              className="text-[38px] md:text-5xl mb-3 leading-none"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              Rotas
            </h3>

            <p
              className="max-w-xl text-white/90 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Fornecer informações sobre rotas, horários e atualizações em caso de
              atrasos, manutenções, obras, ou greves.
            </p>

            {/* +43 milhões — FORA do card */}
            <div
              className="hidden md:flex items-center justify-center
                         absolute left-1/2 -bottom-6 -translate-x-1/2
                         rounded-xl px-10 py-5 z-[2] pointer-events-none text-2xl font-bold"
              style={{
                background: 'rgba(255,255,255,0.98)',
                color: '#5E22F3',
                boxShadow: '0 0 80px 24px rgba(255,255,255,0.95)',
                fontFamily: 'Unbounded, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              +43 milhões de clientes
            </div>

            {/* mobile: dentro do fluxo */}
            <div
              className="md:hidden inline-flex items-center rounded-xl px-6 py-3 mt-6 pointer-events-none text-lg font-semibold"
              style={{
                background: 'rgba(255,255,255,0.98)',
                color: '#5E22F3',
                boxShadow: '0 0 45px 14px rgba(255,255,255,0.75)',
                fontFamily: 'Unbounded, sans-serif',
              }}
            >
              +43 milhões de clientes
            </div>
          </div>

          {/* ACESSIBILIDADE */}
          <div className="rounded-[14px] border border-white/90 p-7 transition-shadow hover:shadow-[0_0_22px_rgba(220,194,255,0.28)]">
            <h4
              className="text-3xl md:text-4xl mb-2 leading-none"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              Acessibilidade
            </h4>
            <p className="text-white/90" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Promover acessibilidade com orientações para usuários portadores de deficiência.
            </p>
          </div>

          {/* BILHETES */}
          <div className="rounded-[14px] border border-white/90 p-7 transition-shadow hover:shadow-[0_0_22px_rgba(220,194,255,0.28)]">
            <h4
              className="text-3xl md:text-4xl mb-2 leading-none"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              Bilhetes
            </h4>
            <p className="text-white/90" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Facilitar a compra de bilhetes e direcionamento ao site/app do TOP para finalização.
            </p>
          </div>

          {/* DENÚNCIAS */}
          <div className="rounded-[14px] border border-white/90 p-7 transition-shadow hover:shadow-[0_0_22px_rgba(220,194,255,0.28)]">
            <h4
              className="text-3xl md:text-4xl mb-2 leading-none"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              Denúncias
            </h4>
            <p className="text-white/90" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Suporte inicial para denúncias com formulários de relato e coleta de informações essenciais.
            </p>
          </div>

          {/* SEGURANÇA */}
          <div
            className="rounded-[14px] p-7 flex items-center"
            style={{
              background: 'rgba(255,255,255,0.97)',
              boxShadow: '0 0 60px 18px rgba(255,255,255,0.8)',
            }}
          >
            <h4
              className="text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: 'Unbounded, sans-serif', color: '#5E22F3' }}
            >
              Segurança e informação
              <br /> no mundo todo!
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}
