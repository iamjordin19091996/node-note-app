var fs = require('fs');

var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
    return notes = JSON.parse(noteString);
  } catch(e) {
    return [];
  }

};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};


var getAll = () => {
  var notes = fetchNotes();
  return notes;
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return filteredNotes.length !== notes.length;
}

var readNote = (title) => {
  var notes = fetchNotes();
  var selectedNote = notes.filter((note) => note.title === title);

  return selectedNote[0];
}

var logNote = (note) => {
  console.log('-----------');
  console.log(`Note Title : ${note.title}`);
  console.log(`Note Body : ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  removeNote,
  readNote,
  logNote
};
