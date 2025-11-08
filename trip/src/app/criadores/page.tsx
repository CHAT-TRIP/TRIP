"use client";

import Image from "next/image";
import Link from "next/link";

export default function CriadoresPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#5E22F3] to-[#2b0b73] text-white">
      {/* ----- HERO ----- */}
      <section className="relative animate-fade-up">
        <div className="mx-auto max-w-7xl px-6 pt-32 pb-16">
          <div className="flex flex-col items-center text-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Projeto finalista do <b className="tracking-wide ml-1">NEXT</b>
            </span>

            <h1 className="text-3xl sm:text-5xl font-semibold">
              Criadores do <span className="text-violet-200">TRIP</span>
            </h1>

            <p className="max-w-3xl text-base sm:text-lg text-violet-100/90">
              Um assistente virtual para transporte/metrô com foco em rapidez,
              segurança e acessibilidade. Aqui você conhece o projeto, o evento
              NEXT da FIAP e os criadores do TRIP.
            </p>
          </div>
        </div>
      </section>

      {/* ----- SEÇÃO TRIP E NEXT ----- */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Card: O QUE É O TRIP */}
          <GlassCard className="animate-fade-up delay-1">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">O que é o TRIP?</h2>

            <p className="text-neutral-800 leading-relaxed mb-4">
              O TRIP é um sistema 100% online que integra um front-end moderno em{" "}
              <b>Next.js + TypeScript + Tailwind</b>, uma API REST em{" "}
              <b>Java (Spring Boot)</b> com banco de dados <b>Oracle</b> e um chatbot em{" "}
              <b>Python (Flask)</b>, com deploy em <b>Vercel</b> e <b>Render</b>.
            </p>

            <p className="text-neutral-800 leading-relaxed">
              O usuário pode consultar rotas e horários utilizando a{" "}
              <b>API Google Maps</b>, conversar com o chatbot alimentado pela{" "}
              <b>API Anthropic</b> e acessar dados em tempo real da{" "}
              <b>API DiretodosTrens</b>.
            </p>

            <h3 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-700">
              Tecnologias usadas
            </h3>

            <TechChips
              items={[
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Spring Boot",
                "Oracle DB",
                "Flask (Python)",
                "API Google Maps",
                "API Anthropic",
                "API DiretodosTrens",
                "Vercel",
                "Render",
              ]}
            />
          </GlassCard>

          {/* Card: O QUE É O NEXT */}
          <GlassCard className="relative animate-fade-up delay-2">
            <div className="absolute -top-4 right-4 bg-[#5E22F3] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Evento oficial FIAP
            </div>

            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">O que é o NEXT?</h3>

            <p className="text-neutral-800 leading-relaxed mb-4">
              O <b>NEXT</b> é um festival de inovação da{" "}
              <Link
                href="https://www.fiap.com.br/"
                target="_blank"
                className="text-[#5E22F3] font-semibold hover:underline"
              >
                FIAP
              </Link>{" "}
              que celebra tecnologia, arte e entretenimento. É um evento onde alunos
              apresentam projetos, participam de desafios, fazem networking com empresas
              e concorrem a prêmios.
            </p>

            <p className="text-neutral-800 leading-relaxed">
              O TRIP foi selecionado entre os destaques do evento, competindo como um dos
              melhores projetos da graduação.
            </p>

            <p className="mt-6 text-sm font-medium text-[#5E22F3]">
             
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ----- CARDS DOS INTEGRANTES ----- */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Quem construiu</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <CreatorCard
            className="animate-fade-up delay-1"
            name="Maria Eduarda Fernandes"
            imageSrc="/Duda.jpg"
            description="Integrante da equipe responsável pelo desenvolvimento do TRIP. Atuou no design, implementação e melhoria contínua do sistema."
            linkedinHref="https://www.linkedin.com/in/dudafernanndes/"
            githubHref="https://github.com/dudafernanndes"
          />

          <CreatorCard
            className="animate-fade-up delay-2"
            name="Madjer Finamor"
            imageSrc="/Madjer.jpg"
            description="Integrante da equipe responsável pelo desenvolvimento do TRIP. Atuou na arquitetura do back-end, integração com APIs e otimização do sistema."
            linkedinHref="https://www.linkedin.com/in/madjer-finamor-51196117b/"
            githubHref="https://github.com/MadjerFin"
          />
        </div>
      </section>

      {/* ----- CRÉDITOS ----- */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <GlassCard className="animate-fade-up delay-2">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Créditos</h2>

          <ul className="space-y-2 text-neutral-800">
            <li>
              • Projeto acadêmico desenvolvido com apoio da{" "}
              <Link
                href="https://www.fiap.com.br/"
                target="_blank"
                className="text-[#5E22F3] font-semibold hover:underline"
              >
                FIAP
              </Link>.
            </li>
            <li>• Front-end: Next.js + TypeScript + Tailwind.</li>
            <li>• Back-end: Spring Boot (Java) + Oracle Database.</li>
            <li>• Chatbot: Python (Flask) + API Anthropic (Claude).</li>
            <li>• APIs integradas: Google Maps, DiretodosTrens, Anthropic.</li>
            <li>• Deploy: Vercel (front) e Render (back/chatbot).</li>
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="https://github.com/CHAT-TRIP/TRIP"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-sm ring-1 ring-[#5E22F3]/40 text-[#1A1A1A]
                         hover:bg-[#5E22F3] hover:text-white hover:shadow-[0_0_14px_rgba(94,34,243,0.4)] transition-all"
            >
              <Image src="/git.png" alt="GitHub" width={20} height={20} />
              Repositório do Projeto
            </Link>

         
          </div>
        </GlassCard>
      </section>

      {/* CSS das animações (sem Tailwind plugin) */}
      <style jsx global>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp .6s ease-out both; }
        .delay-1 { animation-delay: .15s; }
        .delay-2 { animation-delay: .30s; }
      `}</style>
    </main>
  );
}

/* ========== COMPONENTES REUTILIZADOS (sem libs externas) ========== */

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "relative rounded-2xl bg-white/80 backdrop-blur-md text-[#1A1A1A] shadow-xl ring-1 ring-white/25 p-6 sm:p-8 " +
        className
      }
    >
      {children}
    </div>
  );
}

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="text-sm rounded-full px-4 py-2 bg-white/70 ring-1 ring-[#5E22F3]/30 text-neutral-800
                     hover:bg-[#5E22F3] hover:text-white hover:shadow-[0_0_15px_rgba(94,34,243,0.4)]
                     transition-all cursor-default"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function CreatorCard({
  name,
  imageSrc,
  description,
  linkedinHref,
  githubHref,
  className = "",
}: {
  name: string;
  imageSrc: string;
  description: string;
  linkedinHref: string;
  githubHref: string;
  className?: string;
}) {
  return (
    <div className={"group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md text-[#1A1A1A] shadow-xl ring-1 ring-white/25 p-5 sm:p-6 transition " + className}>
      <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center">
        <div className="shrink-0">
          <div className="relative h-40 w-40 rounded-xl ring-1 ring-[#5E22F3]/25 overflow-hidden">
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="160px"
              priority
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="mt-2 text-neutral-800 leading-relaxed">{description}</p>

          <div className="mt-4 flex items-center gap-3">
            <SocialButton href={linkedinHref} icon="/Linkedin.svg" label="LinkedIn" />
            <SocialButton href={githubHref} icon="/git.png" label="GitHub" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-sm ring-1 ring-[#5E22F3]/40 text-[#1A1A1A]
                 hover:bg-[#5E22F3] hover:text-white transition"
    >
      <Image src={icon} alt={label} width={20} height={20} />
      {label}
    </Link>
  );
}
