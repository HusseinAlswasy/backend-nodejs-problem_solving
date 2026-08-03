import express from 'express'
import booksRouter from './modules/books/book.controller.js'
import authersRouter from './modules/auther/auther.controller.js'
import logRouter from './modules/log/log.controller.js'
import { applyBooksValidation } from './model/books.model.js'
import connect from './DB/connectionDB.js'
const app = express()
const port = 3000



const bootStarp = async () => {

    app.use(express.json())

    app.use( booksRouter)
    app.use("/collection", authersRouter)
    app.use( logRouter)
    await connect()
    

    app.get('/', (req, res, next) => {
        res.status(200).json({ message: `App Work Successfuly` });
    })

    app.use('{/*demo}', (req, res, next) => {
        res.status(404).json({ message: `Not Found This Url` });
    })

    app.listen(port, () => {
        console.log(`MongoDB App listening on port ${port}`)
    })


}

export default bootStarp
