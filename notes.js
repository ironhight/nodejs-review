//debugger trong NodeJS: dung console.log hoac node --inspect-brk server.js roi vao chrome://inspect va tim remote target 127.0.0.1

const fs = require('fs');
const chalk = require('chalk');
const addNotes = (title, body) => {
  const notes = loadNotes();
  //add kiem tra title trung nhau: filter || find
  // const duplicateNotes = notes.filter((note) => {
  //   return note.title === title;
  // });
  const duplicateNote = notes.find((note) => {
    return note.title === title;
  });

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log('Add new note success!!!');
  } else {
    console.log('Note title taken!!');
  }
};

const getNotes = () => {
  return 'Your Note....';
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataJSON = fs.readFileSync('notes.json');
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const remoteNotes = (title) => {
  const notes = loadNotes();
  let notesToKeep = notes.filter((note) => note.title !== title);
  console.log('remoteNotes -> notesToKeep', notesToKeep);
  if (notesToKeep.length === notes.length)
    console.log(chalk.red('title not exits'));
  else {
    console.log(chalk.green.inverse('remove', title));
    saveNotes(notesToKeep);
  }
};

const listNodes = () => {
  const notes = loadNotes();
  notes.forEach((note) => console.log(chalk.green(note.title)));
};

const readNotes = (title) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  !duplicateNote
    ? console.log(chalk.red('Note not found!'))
    : console.log(
        chalk.green(
          `styled: ${duplicateNote.title} \nbody: ${duplicateNote.body}`
        )
      );
};

module.exports = {
  addNotes,
  getNotes,
  remoteNotes,
  listNodes,
  readNotes,
};
