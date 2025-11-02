const BASE_URL = 'https://trip-backend-6whw.onrender.com'

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

// Envio de proposta
export async function enviarProposta(dados: {
  name: string
  company: string
  phone: string
  email: string
  description: string
  preview: string
}) {
  try {
    // Mapeia os campos do frontend para o formato esperado pelo backend
    const dadosBackend = {
      nomeResponsavel: dados.name,
      nomeEmpresa: dados.company,
      telefone: dados.phone,
      email: dados.email,
      descricaoProposta: dados.description,
      previaUrl: dados.preview
    }

    console.log('=== DEBUG PROPOSTA ===')
    console.log('Dados recebidos do formulário:', dados)
    console.log('Dados mapeados para backend:', dadosBackend)
    console.log('JSON que será enviado:', JSON.stringify(dadosBackend, null, 2))
    console.log('Enviando proposta para:', `${BASE_URL}/api/propostas`)
    console.log('======================')


    const res = await fetch(`${BASE_URL}/api/propostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dadosBackend)
    })

    console.log('Status da resposta:', res.status)

    const conteudo = await res.text()
    console.log('Resposta do servidor:', conteudo)

    if (!res.ok) {
      throw new Error(conteudo || 'Erro ao enviar proposta. Tente novamente.')
    }

    try {
      return JSON.parse(conteudo)
    } catch {
      return { mensagem: conteudo }
    }

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Erro ao enviar proposta:', err.message)

      // Se for erro de rede/CORS
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error('Erro de conexão. Verifique se o backend está rodando e se o CORS está configurado corretamente.')
      }

      throw err
    } else {
      console.error('Erro desconhecido ao enviar proposta')
      throw new Error('Erro inesperado ao enviar proposta. Tente novamente.')
    }
  }
}
