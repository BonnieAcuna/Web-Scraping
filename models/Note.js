const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    body: String,
    article_id: String
});



const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;