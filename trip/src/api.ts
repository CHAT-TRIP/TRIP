const BASE_URL = 'https://triprenderjava.onrender.com'

// Registro de usuário com tratamento de erro
export async function cadastrarUsuario(dados: {
  nome: string
  email: string
  senha: string
}) {
  try {
    const res = await fetch(`${BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    const conteudo = await res.text()

    if (!res.ok) {
      const msg = conteudo.toLowerCase()
      if (
        res.status === 409 ||
        msg.includes('e-mail já cadastrado') ||
        msg.includes('email já cadastrado') ||
        msg.includes('ora-00001') ||
        msg.includes('unique constraint')
      ) {
        throw new Error('Este e-mail já está cadastrado. Tente outro ou faça login.')
      }

      throw new Error(conteudo || 'Erro ao registrar. Tente novamente.')
    }

    try {
      return JSON.parse(conteudo)
    } catch {
      return {}
    }

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Erro no cadastro:', err.message)
      throw err
    } else {
      console.error('Erro desconhecido no cadastro')
      throw new Error('Erro inesperado ao cadastrar. Tente novamente.')
    }
  }
}

// Login de usuário com exibição direta da mensagem do back-end
export async function loginUsuario(email: string, senha: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    })

    const texto = await res.text()

    if (!res.ok) {
      // Exibe a mensagem exata retornada do back-end
      throw new Error(texto || 'Erro ao logar. Tente novamente.')
    }

    const data = JSON.parse(texto)

    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.token)
    }

    return data

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Erro no login:', err.message)
      throw err
    } else {
      console.error('Erro desconhecido no login')
      throw new Error('Erro inesperado ao logar. Tente novamente.')
    }
  }
}
