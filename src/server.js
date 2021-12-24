const express = require('express')
const server = express()

// pegar o banco de dados
const db = require('./database/db')

// configurar pasta publica
server.use(express.static('public'))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando temple engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

// configurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: resposta
server.get('/', (req, res) => {
  //res.sendFile(__dirname + '/views/index.html')
  return res.render('index.html', {
    title: 'Seu marketplace de coleta de resíduo'
  })
})

server.get('/create-point', (req, res) => {
  //res.sendFile(__dirname + '/views/create-point.html')
  return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {
  //req.body: O corpo do nosso formulário
  //console.log(req.body)

  const data = req.body
  const query = `
  INSERT INTO places(name, image, address, address2, state, city, items) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  const values = [
    data.name,
    data.image,
    data.address,
    data.address2,
    data.state,
    data.city,
    data.itens
  ]

  db.run(query, values, function (err) {
    // mostrar caso exista um erro
    if (err) {
      console.log(err)

      return res.render('create-point.html', { error: true })
    }

    console.log('Cadastrado com sucesso')
    // this é a resposta do function, não podemos usar
    // this com arrow function
    console.log(this)

    return res.render('create-point.html', { saved: true })
  })
})

server.get('/search-results', (req, res) => {
  const search = req.query.search //pega o elemento search da url

  if (search == '') {
    // pesquisa vazia
    return res.render('search-results.html', {
      total: 0
    })
  }

  // pegar os dados do banco de dados
  db.all(
    `SELECT * FROM places WHERE city LIKE '%${search}%';`,
    function (err, rows) {
      if (err) {
        console.log(err)
      }

      const total = rows.length

      //res.sendFile(__dirname + '/views/search-results.html')
      // mostrar a página HTML colocando as linhas do banco de dados
      // em places
      return res.render('search-results.html', {
        places: rows,
        total: total,
        search: search
      })
    }
  )
})

// ligar o servidor
server.listen(3000)
