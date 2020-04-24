const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
  command: 'add',
  description: 'add new note!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, //bat buoc phai co title
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  description: 'remove new note!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, //bat buoc phai co title
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.remoteNotes(argv.title);
  },
});

yargs.command({
  command: 'list',
  description: 'list note!',
  handler() {
    notes.listNodes();
  },
});

yargs.command({
  command: 'read',
  description: 'read note!',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, //bat buoc phai co title
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.readNotes(argv.title);
  },
});

yargs.parse();
