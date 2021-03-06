// importar a dependencia

const sqlite3 = require('sqlite3').verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
  // criar uma tabela

  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, 
      image TEXT, 
      address TEXT, 
      address2 TEXT, 
      state TEXT, 
      city TEXT, 
      items TEXT
    );
  `)

  // inserir dados na tabela
  const query = `
  INSERT INTO places(name, image, address, address2, state, city, items) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  const values = [
    'Papersider',
    'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'Guilherme Genballa, Jardim América',
    'Nº 260',
    'Santa Catarina',
    'Rio do Sul',
    'Papéis e Papelão'
  ]

  function afterInsertData(err) {
    // mostrar caso exista um erro
    if (err) {
      return console.log(err)
    }

    console.log('Cadastrado com sucesso')
    // this é a resposta do function, não podemos usar
    // this com arrow function
    console.log(this)
  }

  //db.run(query, values, afterInsertData)

  // consultar os dados da tabela
  db.all(`SELECT * FROM places;`, function (err, rows) {
    if (err) {
      return console.log(err)
    }

    // rows é onde está as linhas da tabela
    console.log('Aqui estão os seus registros')
    console.log(rows)
  })
  // deletar um dado da tabela
  /* db.run(`DELETE FROM places WHERE id = ?`, [6], function (err) {
    if (err) {
      return console.log(err)
    }

    console.log('Registro deletado com sucesso')
  }) */
})
