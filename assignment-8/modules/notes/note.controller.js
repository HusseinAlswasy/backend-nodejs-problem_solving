import { Router } from "express";
import * as noteServices from './note.services.js';
import { auth } from "../../middlewares/auth.middleware.js";

const noteRouter = Router();

noteRouter.post("/", auth, noteServices.createNote);
noteRouter.patch("/all", auth, noteServices.editAllNoteToUserSpecefied);
noteRouter.patch("/:noteId", auth, noteServices.updateNote);
noteRouter.put("/replace/:noteId", auth, noteServices.replaceNote);
noteRouter.delete("/:noteId", auth, noteServices.deleteNoteById);
noteRouter.get("/paginate-sort", noteServices.retrivePaginateNote);
noteRouter.get("/get-content", auth, noteServices.getContentById);
noteRouter.get("/aggregate",auth,noteServices.getNoteWithAgg);
noteRouter.get("/getAllNote", auth, noteServices.getAllNote);
noteRouter.get("/:noteId", auth, noteServices.getNoteById);
noteRouter.delete("/",auth,noteServices.deleteAllNotes);

export default noteRouter