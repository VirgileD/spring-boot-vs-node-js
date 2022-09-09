const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: process.env.IS_DOCKER ? 'bench-node-spring-db-service' : "localhost",
    database: 'postgres',
    password: 'postgres',
    port: 5432
})

async function query (q) {
    const client = await pool.connect()
    let res
    try {
      await client.query('BEGIN')
      try {
        res = await client.query(q)
        await client.query('COMMIT')
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    } finally {
      client.release()
    }
    return res
  }
  

const getBooks = async (request, response) => {
    console.log(request.id, 'get books called')
    try {
        const { rows } = await query('SELECT * FROM library.books ORDER BY book_id ASC')
        response.status(200).json(rows)
    } catch (err) {
        response.status(500).json(err)
    }
}

const getBookByISBN = async (request, response) => {
    console.log(request.id, 'getBookByISBN called')
    try {
        const { rows } = await query(`SELECT * FROM library.books WHERE isbn = '${request.params.isbn}'`)
        response.status(200).json(rows)
    } catch (err) {
        response.status(500).json(err)
    }
}

const createBook = async (request, response) => {
    console.log(request.id, 'before createbook')

    const { title, author, isbn, year } = request.body
    try {
        console.log(`INSERT INTO library.books (book_id, title, author, isbn, year) VALUES (nextval(\'library.books_book_id_seq\'),  '${title}', '${author}', '${isbn}', ${year})`)
        const { rows } = await query(`INSERT INTO library.books (book_id, title, author, isbn, year) VALUES (nextval(\'library.books_book_id_seq\'),  '${title}', '${author}', '${isbn}', ${year})`)
        response.status(200).json(rows)
    } catch (err) {
        response.status(500).json(err)
    }
}

module.exports = {
    getBooks,
    getBookByISBN,
    createBook
}