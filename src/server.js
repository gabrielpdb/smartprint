// Chamar o Express
const express = require('express')
// Chamar o Nunjucks
const nunjucks = require('nunjucks')
// Chamar as rotas do "routes.js"
const routes = require('./routes')
// Chamar o method override
const methodOverride = require('method-override')

// Criar o servidor
const server = express()

// Faz funcionar o req.body
server.use(express.urlencoded({ extended: true }))

// Arquivos estáticos da pasta public
server.use(express.static('public'))

// O express passa a usar o method override
server.use(methodOverride('_method'))

// O servidor passa a usar as rotas aqui
server.use(routes)

// Setar a view engine
server.set('view engine', 'njk')

// Configurar alguma coisa
nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false, // Funciona, por exemplo, quando tem tags HTML no meio de uma string
    noCache: true // Desativa o cache do Nunjucks
})

// Iniciar o servidor, que passa a escutar a porta definida
// A função callback é executada assim que a conexão é estabelecida
server.listen(4000, function () {
    console.log('server is running')
})