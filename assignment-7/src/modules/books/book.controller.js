
import {Router} from "express";
import * as booksServices from "./book.services.js";

const booksRouter = Router()


booksRouter.post("/collection/books",booksServices.createBook)
booksRouter.post("/collection/books/index",booksServices.createIndex)
booksRouter.post("/books",booksServices.insertBook)
booksRouter.post("/multipleBooks",booksServices.insertMultipleBook)
booksRouter.patch("/books/:title",booksServices.updateBookBytitle)
booksRouter.get("/books/years-intger",booksServices.findBooksWithIntegerYear)
booksRouter.get("/books/genre",booksServices.FindABookWithSpecificGenre)
booksRouter.get("/books",booksServices.FindAllBooksWithSpecificRangeAge)
booksRouter.get("/books/skip-limit",booksServices.getBooksWithSkipAndLimit)
booksRouter.get("/books/exclude-genres",booksServices.excludeGenres)
booksRouter.delete("/books/beforeYear",booksServices.deleteAllBooksBublishedBeforeInsertedYear)
booksRouter.get("/books/aggregate1",booksServices.aggregateBooksAfterYear)
booksRouter.get("/books/aggregate2",booksServices.agrregateToFindAllBooksAfterInsertdedYear)
booksRouter.get("/books/aggregate3",booksServices.agrregateToFindAllBooks3)
booksRouter.get("/books/aggregate4",booksServices.aggregateJoinBookWithLog)
booksRouter.get("/books/:title",booksServices.FindABookWithSpecificTitle)





export default booksRouter