  

# 🎧 AudioLearn - Plataforma de Aprendizagem de Idiomas com Áudio

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)  
![React](https://img.shields.io/badge/Spring_Boot-3.0-6DB33F?style=for-the-badge&logo=springboot)  
![React](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwindcss)

**Transforme textos em experiências de áudio imersivas para aprender idiomas**

Demo • Funcionalidades • Tecnologias • Instalação • Uso

</div>

## 📖 Sobre o Projeto

O **AudioLearn** é uma plataforma inovadora que combina tecnologia Text-to-Speech (TTS) com métodos comprovados de aprendizagem de idiomas. Crie, gerencie e ouça diálogos, vocabulários e conteúdos educacionais em múltiplos idiomas com áudio de alta qualidade.

### 🎯 Objetivo

Democratizar o acesso a materiais de áudio educacionais de qualidade para estudantes de idiomas, professores e entusiastas.

## 🚀 Funcionalidades

### 🎵 Geração de Áudio

- **TTS Integrado**: Conversão de texto para áudio com vozes naturais
    
- **Múltiplos Idiomas**: Suporte para Inglês, Português, Espanhol e mais
    
- **Configurações Avançadas**: Controle de velocidade, tom e tipo de voz
    
- **Preview em Tempo Real**: Ouça o áudio antes de salvar
    

### 📚 Gestão de Conteúdo

- **Categorização**: Diálogos, Podcasts, Vocabulários, Debates e mais
    
- **Sistema de Filtros**: Encontre conteúdos por tipo e idioma
    
- **Carrossel Interativo**: Navegação suave entre áudios
    
- **Modal de Detalhes**: Visualização completa com texto e tradução
    

### 🎨 Interface Moderna

- **Design Responsivo**: Funciona em desktop, tablet e mobile
    
- **Animações Fluidas**: Experiência de usuário premium com Framer Motion
    
- **Tema Acessível**: Cores contrastantes e tipografia legível
    
- **Dark Mode Ready**: Pronto para implementação de tema escuro
    

## 🛠 Tecnologias

### Frontend

- **React 18** + TypeScript
    
- **Tailwind CSS** - Estilização
    
- **Framer Motion** - Animações
    
- **Lucide React** - Ícones
    
- **Axios** - Cliente HTTP
    

### Backend

- **Spring Boot 3** + Java
    
- **Spring Security** - Autenticação
    
- **Spring Data JPA** - Persistência
    
- **ElevenLabs API** - TTS de alta qualidade
    
- **MySQL/PostgreSQL** - Banco de dados
    

### DevOps

- **Docker** - Containerização
    
- **GitHub Actions** - CI/CD
    
- **Railway/Vercel** - Deploy
    

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
    
- Java 17+
    
- MySQL 8.0+ ou PostgreSQL
    
- Conta no [ElevenLabs](https://elevenlabs.io/) para API key
    

### 1. Clone o Repositório

``` bash

git clone https://github.com/Leovigildo-Loureiro-Joao/audiolearn.git
cd audiolearn
``` 
### 2. Backend (Spring Boot)

``` bash

cd backend

# Configure application.properties
echo "
spring.datasource.url=jdbc:mysql://localhost:3306/audiolearn
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
elevenlabs.api.key=sua_api_key_elevenlabs
" > src/main/resources/application.properties

# Execute a aplicação
./mvnw spring-boot:run
``` 
### 3. Frontend (React)
``` bash

cd frontend

# Instale as dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Execute em desenvolvimento
npm run dev
``` 
## 🎮 Uso

### Criando seu Primeiro Áudio

1. **Acesse a Plataforma**
    
    - Abra `http://localhost:3000`
        
    - Clique em "Criar Áudio"
        
2. **Configure o Conteúdo**
    
  ``` text
    Título: Diálogo em Restaurante
    Idiomas: Inglês-Português  
    Categoria: Diálogos
    Texto: "Hello, I would like to order a coffee and a sandwich."
    Tradução: "Olá, eu gostaria de pedir um café e um sanduíche." 
   ``` 
3. **Personalize a Voz**
    
    - Selecione voz feminina/masculina
        
    - Ajuste velocidade: 1.0x
        
    - Configure tom: 0.0
        
4. **Gere e Salve**
    
    - Clique em "Preview" para ouvir
        
    - Ajuste configurações se necessário
        
    - Salve o áudio
        

### Navegando pelos Áudios

- **Filtros**: Use os botões para filtrar por categoria
    
- **Carrossel**: Navegue com setas ou indicadores
    
- **Detalhes**: Clique em qualquer card para abrir o modal completo
    
- **Download**: Baixe áudios para uso offline
    

## 🔧 API Endpoints

### Áudios

|Método|Endpoint|Descrição|
|---|---|---|
|`GET`|`/api/audios`|Lista todos os áudios|
|`POST`|`/api/audios`|Cria novo áudio|
|`GET`|`/api/audios/{id}`|Busca áudio por ID|
|`PUT`|`/api/audios/{id}`|Atualiza áudio|

### TTS

|Método|Endpoint|Descrição|
|---|---|---|
|`POST`|`/api/tts/generate`|Gera áudio from texto|
|`GET`|`/api/tts/voices`|Lista vozes disponíveis|

## 🎨 Estrutura do Projeto

``` text

audiolearn/
├── backend/                 # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/audiolearn/
│   │       ├── controller/  # REST Controllers
│   │       ├── service/     # Business Logic
│   │       ├── repository/  # Data Access
│   │       └── model/       # Entities
│   └── src/main/resources/
│       └── application.properties
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── hooks/           # Custom Hooks
│   │   ├── services/        # API Services
│   │   ├── types/           # TypeScript Types
│   │   └── assets/          # Images, Styles
│   └── public/
└── README.md
``` 

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estos passos:

1. Fork o projeto
    
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
    
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
    
4. Push para a branch: `git push origin feature/nova-funcionalidade`
    
5. Abra um Pull Request
    

### Guidelines

- Siga o padrão de código existente
    
- Adicione testes para novas funcionalidades
    
- Atualize a documentação
    
- Use commits semânticos
    

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](https://license/) para detalhes.

## 👨‍💻 Autor

**Leovigildo Loureiro João**

- GitHub: [@Leovigildo-Loureiro-Joao](https://github.com/Leovigildo-Loureiro-Joao)
    
- Email: leovigildoloureirojoao@gmail.com
    

## 🙏 Agradecimentos

- [ElevenLabs](https://elevenlabs.io/) pela incrível API de TTS
    
- Comunidade React e Spring Boot
    
- Todos os contribuidores e testadores
    

---

<div align="center">

**⭐️ Considera dar uma estrela se este projeto te ajudou!**

[Reportar Bug](https://github.com/Leovigildo-Loureiro-Joao/audiolearn/issues) • [Pedir Funcionalidade](https://github.com/Leovigildo-Loureiro-Joao/audiolearn/issues)

</div>