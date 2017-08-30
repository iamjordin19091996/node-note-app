var fs = require('fs');
var _ = require('lodash')
var yargs = require('yargs');

var notes = require('./notes.js');

var titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

var bodyOptions = {
  describe: 'body of the note',
  demand: true,
  alias: 'b'
};

var argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('remove', 'Delete A Note', {
    title: titleOptions
  })
  .command('list', 'Listing all Note(s)')
  .command('read', 'Reading all Notes', {
    title: titleOptions
  })
  .help()
  .argv;
var command = process.argv[2];

if(command === 'add') {
  console.log('Note added successfully!!!')
  var note = notes.addNote(argv.title, argv.body);
  if(note) {
    notes.logNote(note);
  } else {
    console.log('Title Already Taken');
  }
} else if (command === 'remove') {
  var note = notes.removeNote(argv.title);
  if (note) {
    console.log('Note Deleted successfully!');
  } else {
    console.log('Note doesnot exists');
  }
} else if (command === 'list') {

  var allNote = notes.getAll();
  console.log(`Listing ${allNote.length} note(s)`);
  allNote.forEach((note) => notes.logNote(note));

} else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if(note) {
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else {
  console.log('Command Not recognized');
}
