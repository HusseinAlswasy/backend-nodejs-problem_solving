import { db } from "../DB/connectionDB.js";

export const booksCollection = db.collection("books");

export const applyBooksValidation = async () => {
    await db.createCollection(
        "books",
        {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            minLength: 1,
                            description: "Title is required and must be a string",
                        },
                    },
                },
            },

        });
};
