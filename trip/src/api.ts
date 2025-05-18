const BASE_URL = 'https://apicadastro-production-7b8d.up.railway.app/api'

// Registro sem usar cookies
export async function cadastrarUsuario(dados: {
  nome: string
  email: string
  senha: string
}) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
    // ❌ REMOVIDO: credentials: 'include'
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

  return await res.json()
}

// Login que salva o token manualmente
export async function loginUsuario(email: string, senha: string) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
    // ❌ REMOVIDO: credentials: 'include'
  })

  if (!res.ok) {
    const texto = await res.text()
    throw new Error(texto || 'Erro ao logar')
  }

  const data = await res.json()

  // ✅ Salva o token no localStorage
  localStorage.setItem('token', data.token)

  return data
}
