const BASE_URL = 'https://apicadastro-production-7b8d.up.railway.app/api' // Altere aqui quando mudar de ambiente

export async function cadastrarUsuario(dados: {
  nome: string
  email: string
  senha: string
}) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })

  if (!res.ok) {
    const textoErro = await res.text()
    if (
      res.status === 409 ||
      textoErro.toLowerCase().includes('e-mail já cadastrado') ||
      textoErro.toLowerCase().includes('email já cadastrado')
    ) {
      throw new Error('Este e-mail já está cadastrado. Tente outro ou faça login.')
    }
    throw new Error(textoErro || 'Erro ao registrar')
  }

  return await res.json() // ✅ agora só executa .json() após verificar res.ok
}

export async function loginUsuario(email: string, senha: string) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  })

  if (!res.ok) {
    const texto = await res.text()
    throw new Error(texto || 'Erro ao logar')
  }

  return await res.json()
}
