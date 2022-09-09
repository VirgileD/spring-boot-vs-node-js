const { PgAsync } = require ('pg-async');

console.log(PgAsync)
// using default connection
const pgAsync = new PgAsync({
    user: 'postgres',
    host: process.env.IS_DOCKER ? 'bench-node-spring-db-service' : "localhost",
    database: 'postgres',
    password: 'postgres',
    port: 5432
})

const getBooks = async (request, response) => {
    console.log(request.id, 'get books called')
    let results = await pgAsync.query("SELECT * FROM library.books ORDER BY book_id ASC")
    // FIXME: catch errors? -> response.status(500).json(error)
    response.status(200).json(results.rows)
}

const getBookByISBN = async (request, response) => {
    console.log(request.id, 'getBookByISBN called')
    let results = await pgAsync.query(PgAsync.SQL`SELECT * FROM library.books WHERE isbn = ${request.params.isbn}`)
    // FIXME: catch errors? -> response.status(500).json(error)
    response.status(200).json(results.rows)
}

const createBook = async  (request, response) => {
    console.log(request.id, 'before createbook')

    const { title, author, isbn, year } = request.body
    let results = await pgAsync.query(PgAsync.SQL`INSERT INTO library.books (book_id, title, author, isbn, year) VALUES (nextval(\'library.books_book_id_seq\'), ${title}, ${author}, ${isbn}, ${year})`)
    // FIXME: catch errors? -> response.status(500).json(error)
    console.log(request.id,`Book added`)
    response.status(200).json(results.rows)
}

module.exports = {
    getBooks,
    getBookByISBN,
    createBook
}