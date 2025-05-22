const BASE_URL = 'https://trip-java-production.up.railway.app/api'

// Registro de usuário com tratamento de erro
export async function cadastrarUsuario(dados: {
  nome: string
  email: string
  senha: string
}) {
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    const textoErro = await res.text()

    if (!res.ok) {
      if (
        res.status === 409 ||
        textoErro.toLowerCase().includes('e-mail já cadastrado') ||
        textoErro.toLowerCase().includes('email já cadastrado')
      ) {
        throw new Error('Este e-mail já está cadastrado. Tente outro ou faça login.')
      }

      throw new Error(textoErro || 'Erro ao registrar. Tente novamente.')
    }

    return await res.json()

  } catch (err: any) {
    console.error('Erro no cadastro:', err)
    throw err
  }
}

// Login de usuário com tratamento refinado
export async function loginUsuario(email: string, senha: string) {
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    })

    const texto = await res.text()

    if (!res.ok) {
      // Tratamento de mensagens personalizadas
      if (res.status === 401) {
        if (texto.toLowerCase().includes('senha')) {
          throw new Error('Senha incorreta')
        } else if (texto.toLowerCase().includes('email')) {
          throw new Error('E-mail não cadastrado')
        } else {
          throw new Error('E-mail ou senha inválidos')
        }
      }

      throw new Error(texto || 'Erro ao logar. Tente novamente.')
    }

    const data = JSON.parse(texto)

    // Salva token local
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', data.token)
    }

    return data

  } catch (err: any) {
    console.error('Erro no login:', err)
    throw err
  }
}
