import { applyBooksValidation, booksCollection } from "../../model/books.model.js";
import { logCollection } from "../../model/log.model.js";

export const createBook = async (req, res) => {
    try {
        await applyBooksValidation();
        res.status(201).json({ message: "Book created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error: error.message });
    }
}

export const createIndex = async (req, res) => {
    try {
        const result = await booksCollection.createIndex({ title: 1 });
        res.status(201).json({ message: "Index created successfully", result });

    } catch (error) {
        res.status(500).json({ message: "Error creating index", error: error.message });
    }
}

export const insertBook = async (req, res) => {
    try {
        const data = req.body;
        const newBook = await booksCollection.insertOne(data);
        res.status(201).json({ message: "Inserted Added successfully", result: newBook });

    } catch (error) {
        res.status(500).json({ message: "Error Inserted Failed", error: error.message });
    }
}

export const insertMultipleBook = async (req, res) => {
    try {
        const data = req.body;
        const newBook = await booksCollection.insertMany(data);
        return res.status(201).json({ message: "Inserted Added successfully", result: newBook });

    } catch (error) {
        res.status(500).json({ message: "Error Inserted Failed", error: error.message });
    }
}

export const updateBookBytitle = async (req, res) => {
    try {
        const { title } = req.params;
        const { age } = req.body;
        const getBook = await booksCollection.updateOne({ title: title }, { $set: { age: age } });
        return res.status(201).json({ message: "Updated Added successfully", result: getBook });

    } catch (error) {
        res.status(500).json({ message: "Error Updated Failed", error: error.message });
    }
}

export const FindABookWithSpecificTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const getBook = await booksCollection.findOne({ title: title });
        return res.status(201).json({ message: "Geted successfully", result: getBook });

    } catch (error) {
        res.status(500).json({ message: "Error Geted Failed", error: error.message });
    }
}

export const FindAllBooksWithSpecificRangeAge = async (req, res) => {
    try {
        const getBook = await booksCollection.find({ age: { $gte: 26, $lte: 30 } }).toArray();
        return res.status(201).json({ message: "Geted successfully", result: getBook });

    } catch (error) {
        res.status(500).json({ message: "Error Geted Failed", error: error.message });
    }
}

export const FindABookWithSpecificGenre = async (req, res) => {
    try {
        const { geners } = req.query;
        const getG = await booksCollection.find({ geners: geners }).toArray();
        return res.status(201).json({ message: "Geted successfully", result: getG });

    } catch (error) {
        res.status(500).json({ message: "Error Geted Failed", error: error.message });
    }
}

export const getBooksWithSkipAndLimit = async (req, res) => {
    try {
        const books = await booksCollection.find({}).sort({ year: -1 }).skip(2).limit(3).toArray();
        return res.status(201).json({ message: "Geted successfully", result: books });
    } catch (error) {
        res.status(500).json({ message: "Error Geted Failed", error: error.message });
    }
}

export const findBooksWithIntegerYear = async (req, res) => {
    try {
        const books = await booksCollection.find({ year: { $type: "int" } }).toArray();
        return res.status(201).json({ message: "Geted successfully", result: books });
    } catch (error) {
        res.status(500).json({ message: "Error Geted Failed", error: error.message });
    }
}

export const excludeGenres = async (req, res) => {
    try {
        const genresExc = ["Science Fiction"];
        const books = await booksCollection.find({ geners: { $nin: genresExc } }).toArray();
        return res.status(201).json({ message: "Geted successfully", result: books });
    } catch (error) {
        res.status(500).json({ message: "Error Geted Failed", error: error.message });
    }
}

export const deleteAllBooksBublishedBeforeInsertedYear = async (req, res) => {
    try {
        const { year } = req.query;
        const books = await booksCollection.deleteMany({ year: { $lt: year } });
        return res.status(201).json({ message: "Deleted successfully", result: books });
    } catch (error) {
        res.status(500).json({ message: "Error Deleted Failed", error: error.message });
    }
}

export const aggregateBooksAfterYear = async (req, res) => {
    try {
        const { year } = req.query;
        const books = await booksCollection.aggregate([
            { $match: { year: { $gt: year } } }, { $sort: { year: -1 } }]).toArray();
        return res.status(201).json({ message: "Aggregated successfully", result: books });
    } catch (error) {
        res.status(500).json({ message: "Error Aggregated Failed", error: error.message });
    }
}

export const agrregateToFindAllBooksAfterInsertdedYear = async (req, res) => {

    try {
        const { year } = req.body;
        const books = await booksCollection.aggregate([
            { $match: { year: { $gt: year } } },
            { $project: { _id: 0, title: 1, year: 1, geners: 1 } },
        ]).toArray();
        return res.status(201).json({ message: "Aggregated successfully", result: books });
    } catch (error) {
        res.status(500).json({ message: "Error Aggregated Failed", error: error.message });
    }
}

export const agrregateToFindAllBooks3 = async (req, res) => {

    try {
        const { year } = req.body;
        const books = await booksCollection.aggregate([
            { $unwind: "$geners" },
            { $project: { _id: 0, title: 1, geners: "$geners" } },
        ]).toArray();
        return res.status(201).json({ message: "Aggregated successfully", result: books });
    } catch (error) {
        res.status(500).json({ message: "Error Aggregated Failed", error: error.message });
    }
}


export const aggregateJoinBookWithLog = async (req, res) => {

    try {

        const logs = await logCollection.aggregate([
            {
                $addFields: {
                    book_id: { $toObjectId: "$book_id" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $project: {
                    _id: 0,
                    action: "$actione",
                    book: 1
                }
            }
        ]).toArray();
        return res.status(201).json({ message: "Aggregated successfully", result: logs });
    } catch (error) {
        res.status(500).json({ message: "Error Aggregated Failed", error: error.message });
    }
}