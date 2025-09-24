'use client'

import { useMemo, useState } from 'react'

type Errors = {
  name?: string
  company?: string
  phone?: string
  email?: string
  description?: string
  preview?: string
}

function formatPhoneBR(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function isValidPhoneBR(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
}

export default function PropostaForm() {
  // campos
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [preview, setPreview] = useState('')

  // erros e loading
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  // máscara telefone
  const phoneFormatted = useMemo(() => formatPhoneBR(phone), [phone])

  // validações pontuais só quando blur
  function touchField(field: keyof Errors, value: string) {
    setErrors((prev) => {
      const next = { ...prev }
      if (!value.trim()) next[field] = 'Campo obrigatório'
      else delete next[field]
      return next
    })
  }

  function handlePhoneChange(v: string) {
    const only = v.replace(/\D/g, '')
    setPhone(only)
  }

  function handleEmailChange(v: string) {
    setEmail(v)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // valida tudo na tentativa de envio
    const newErrors: Errors = {}
    if (!name.trim()) newErrors.name = 'Campo obrigatório'
    if (!company.trim()) newErrors.company = 'Campo obrigatório'
    if (!description.trim()) newErrors.description = 'Campo obrigatório'
    if (!preview.trim()) newErrors.preview = 'Campo obrigatório'

    if (!isValidPhoneBR(phone)) newErrors.phone = 'Informe um telefone válido (10 ou 11 dígitos).'
    if (!isValidEmail(email)) newErrors.email = 'E-mail inválido.'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    // “envio”
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Proposta enviada com sucesso!')
    }, 1100)
  }

  // classes utilitárias
  const baseInput =
    'w-full h-12 rounded-lg border px-4 outline-none bg-[rgba(255,255,255,0.2)] text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:border-[#5E22F3] focus:ring-[#5E22F3]'
  const baseTextArea =
    'w-full min-h-[110px] rounded-lg border px-4 py-3 outline-none bg-[rgba(255,255,255,0.2)] text-[#5E22F3] placeholder-[#9F86FF] focus:ring-2 focus:border-[#5E22F3] focus:ring-[#5E22F3]'

  return (
    <section
      className="relative w-full min-h-screen flex items-start md:items-center justify-center px-6 py-16 md:py-24"
      style={{ backgroundColor: '#E9E9E9' }}
    >
      {/* fundo com pattern */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/background-formulario.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.55,
        }}
      />

      <div className="relative z-10 w-full max-w-[1100px] mx-auto">
        <h1
          className="text-center text-[36px] leading-[1.05] md:text-[64px] md:leading-[1.08] font-extrabold text-[#5E22F3] mb-10 md:mb-12"
          style={{ fontFamily: 'Unbounded, sans-serif' }}
        >
          <span className="inline bg-[linear-gradient(180deg,transparent_62%,#DCC2FF_0)]">Envie</span>{' '}
          sua proposta
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {/* Nome do responsável */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nome do responsável"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => touchField('name', name)}
              className={`${baseInput} ${errors.name ? 'border-[#E63946] focus:ring-[#E63946]' : 'border-[#5E22F3]'}`}
            />
            {errors.name && <span className="text-xs text-[#E63946] mt-1">{errors.name}</span>}
          </div>

          {/* Nome da empresa */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Nome da empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onBlur={() => touchField('company', company)}
              className={`${baseInput} ${errors.company ? 'border-[#E63946] focus:ring-[#E63946]' : 'border-[#5E22F3]'}`}
            />
            {errors.company && <span className="text-xs text-[#E63946] mt-1">{errors.company}</span>}
          </div>

          {/* Telefone */}
          <div className="flex flex-col">
            <input
              type="tel"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Telefone"
              value={phoneFormatted}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({
                  ...prev,
                  phone: isValidPhoneBR(phone) ? undefined : 'Informe um telefone válido.',
                }))
              }
              className={`${baseInput} ${errors.phone ? 'border-[#E63946] focus:ring-[#E63946]' : 'border-[#5E22F3]'}`}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span className="text-xs text-[#E63946] mt-1">{errors.phone}</span>}
          </div>

          {/* E-mail */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={() =>
                setErrors((prev) => ({
                  ...prev,
                  email: isValidEmail(email) ? undefined : 'E-mail inválido.',
                }))
              }
              className={`${baseInput} ${errors.email ? 'border-[#E63946] focus:ring-[#E63946]' : 'border-[#5E22F3]'}`}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="text-xs text-[#E63946] mt-1">{errors.email}</span>}
          </div>

          {/* Descrição */}
          <div className="flex flex-col md:col-span-2">
            <textarea
              placeholder="Descreva um pouco sobre sua empresa e detalhes da sua proposta..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => touchField('description', description)}
              className={`${baseTextArea} ${errors.description ? 'border-[#E63946] focus:ring-[#E63946]' : 'border-[#5E22F3]'}`}
            />
            {errors.description && <span className="text-xs text-[#E63946] mt-1">{errors.description}</span>}
          </div>

          {/* Prévia do anúncio */}
          <div className="flex flex-col md:col-span-2">
            <textarea
              placeholder="Envie uma prévia do seu anúncio"
              value={preview}
              onChange={(e) => setPreview(e.target.value)}
              onBlur={() => touchField('preview', preview)}
              className={`${baseTextArea} ${errors.preview ? 'border-[#E63946] focus:ring-[#E63946]' : 'border-[#5E22F3]'}`}
            />
            {errors.preview && <span className="text-xs text-[#E63946] mt-1">{errors.preview}</span>}
          </div>

          {/* Botão */}
          <div className="md:col-span-2 flex items-center justify-center mt-2">
            <button
              type="submit"
              disabled={loading}
              className={`min-w-[180px] rounded-md px-8 py-3 font-bold text-white transition-all duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.03] active:scale-95'}`}
              style={{
                backgroundColor: loading ? '#9F86FF' : '#9F86FF', // roxo claro padrão
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5E22F3')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#9F86FF')}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
