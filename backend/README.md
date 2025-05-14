# Projeto Trip - Assistente Virtual para Transporte Ferroviário

## Visão Geral
O Trip é um assistente virtual inteligente que facilita a vida dos usuários de transporte ferroviário, oferecendo informações sobre linhas, estações e rotas, além de auxiliar com outras demandas relacionadas ao transporte público.

## Funcionalidades

### Landing Page
- Design moderno com identidade visual em rosa
- Banner rotativo automático
- Seções informativas sobre as funcionalidades do chatbot
- Formulários de cadastro e login
- Carrossel de demonstração das funcionalidades
- Informações sobre parceria com a CCR
- Página de equipe com informações dos desenvolvedores

### Chatbot
- Interface de chat interativa
- Responde perguntas sobre as linhas 8 e 9 de transporte ferroviário
- Suporte multilíngue (identifica e responde no idioma da pergunta)
- Informações sobre bilhetes, rotas, acessibilidade e mais
- Integração com a API da Anthropic (Claude) para processamento de linguagem natural

## Tecnologias Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python, Flask

## Estrutura do Projeto

```
TRIP/
├── css/
│   └── style.css
├── imgs/
│   ├── bannerApresentacao.png
│   ├── bannerAlternativo.png
│   ├── trip-cabeca.png
│   ├── carrosselBilhete.png
│   ├── carrosselDenuncia.png
│   ├── carrosselAcessibilidade.png
│   ├── carrosselRota.png
│   └── ... (demais imagens)
├── js/
│   └── script.js
├── templates/
│   └── chat.html
├── .env
├── duvidas.py
├── main.py
└── index.html
```

## Instalação e Configuração

### Pré-requisitos
- Python 3.8+
- pip (gerenciador de pacotes Python)
- Chave de API da Anthropic

### Passos para Instalação

1. Clone o repositório ou baixe os arquivos para seu computador
2. Instale as dependências do Python:
```
pip install flask anthropic python-dotenv
```
3. Execute o servidor Flask:
```
python main.py
```
5. Acesse o "Running on...." no seu navegador

## Uso do Chatbot

O assistente virtual Trip está programado para responder perguntas sobre:
- Rotas entre estações das linhas 8 e 9
- Informações sobre bilhetes e preços
- Dados sobre acessibilidade
- Redirecionamento para serviços específicos
- Suporte em múltiplos idiomas

## Carrossel de Funcionalidades

O carrossel na seção "Fique por dentro" mostra as seguintes funcionalidades:
1. **Bilhetes**: Informações sobre os bilhetes disponíveis
2. **Denúncias**: Como reportar problemas nas estações
3. **Acessibilidade**: Recursos para pessoas com deficiência
4. **Rotas**: Orientações sobre trajetos entre estações

## Responsáveis pelo Projeto

- Madjer Henrique Almeida Finamor
- Maria Eduarda Fernandes Rocha
- Guilherme Santos Falcão

## Licença
© 2025 Trip - Assistente Virtual para Transporte Ferroviário. Todos os direitos reservados.