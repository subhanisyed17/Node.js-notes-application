const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');


yargs.command({
    command : 'add',
    describe : 'Adding a new note',
    builder : {
        title : {
            describe : 'adding a 2nd level description',
            demandOption : true,
            type : String
        },
        body : {
            describe : 'This is body',
            demandOption : true,
            type : String
        }
    },
    handler : (argv) => {
        notes.addNotes(argv.title,argv.body);
    }
})

yargs.command({
    command : 'remove',
    describe : 'Removes the note with given title',
    builder : {
        title : {
            describe : 'Removes the note with given title',
            demandOption : true,
            type : String
        }
    },
    handler : (argv) => {
        notes.removeNotes(argv.title);
    }
})

yargs.command({
    command: 'read',
    describe : 'Reads a note with the given title',
    builder : {
        title : {
            describe : 'Reads a note',
            demandOption : true,
            type : String
        }
    },
    handler : (argv) => notes.readNotes(argv.title)
})

yargs.command({
    command : 'list',
    describe : 'Lists out all the notes',
    handler : () => notes.listNotes()
})

yargs.parse()

// create commands for add,remove,read,list
//console.log(yargs.argv);