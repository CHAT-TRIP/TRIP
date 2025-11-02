const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://trip-backend-6whw.onrender.com'

// Registro de usuário com tratamento de erro
export async function cadastrarUsuario(dados: {
  nome: string
  email: string
  senha: string
}) {
  try {
    console.log('=== CADASTRO - DEBUG ===')
    console.log('URL:', `${BASE_URL}/api/users/register`)
    console.log('Dados:', dados)

    const res = await fetch(`${BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dados)
    })

    console.log('Status:', res.status)
    const conteudo = await res.text()
    console.log('Resposta:', conteudo)

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

      // Detecta erro de CORS/Network
      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        throw new Error('Erro de conexão com o servidor. Verifique sua internet ou tente novamente.')
      }

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
    console.log('=== LOGIN - DEBUG ===')
    console.log('URL:', `${BASE_URL}/api/users/login`)
    console.log('Dados:', { email, senha: '***' })

    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    })

    console.log('Status:', res.status)
    const texto = await res.text()
    console.log('Resposta:', texto)

    if (!res.ok) {
      // Exibe a mensagem exata retornada do back-end
      throw new Error(texto || 'Erro ao logar. Tente novamente.')
    }

    const data = JSON.parse(texto)

    if (typeof window !== 'undefined' && data.token) {
      localStorage.setItem('token', data.token)
      console.log('Token salvo no localStorage')
    }

    return data

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Erro no login:', err.message)

      // Detecta erro de CORS/Network
      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        throw new Error('Erro de conexão com o servidor. Verifique sua internet ou tente novamente.')
      }

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
    // Validação adicional para garantir que todos os campos têm valores
    if (!dados.name?.trim()) throw new Error('Nome do responsável é obrigatório')
    if (!dados.company?.trim()) throw new Error('Nome da empresa é obrigatório')
    if (!dados.phone?.trim()) throw new Error('Telefone é obrigatório')
    if (!dados.email?.trim()) throw new Error('E-mail é obrigatório')
    if (!dados.description?.trim()) throw new Error('Descrição é obrigatória')
    if (!dados.preview?.trim()) throw new Error('Prévia é obrigatória')

    // Mapeia os campos do frontend para o formato esperado pelo backend
    // Garantindo que são strings limpas sem espaços extras
    const dadosBackend = {
      nomeResponsavel: dados.name.trim(),
      nomeEmpresa: dados.company.trim(),
      telefone: dados.phone.trim(),
      email: dados.email.trim(),
      descricaoProposta: dados.description.trim(),
      previaUrl: dados.preview.trim()
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
