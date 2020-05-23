const fs = require('fs');
const chalk = require('chalk');

// below functions loads the notes with given name, add new title and body to the existing notes, saves the notes.

//load the notes
loadNotes = () => {
    try{
        const readJSONData = fs.readFileSync('notes.json');
        return JSON.parse(readJSONData);
    }
    catch(e){
        return [];
    }
}

const addNotes = (title,body) => {
    const newNotes = {
        title : title,
        body : body
    }

    const notes = loadNotes();
    const duplicateNotes = notes.find(note => note.title === title);

    debugger

    if(!duplicateNotes){
        notes.push(newNotes);
        //call saveNotes here
        saveNotes(notes);
        console.log('New notes is successfully added!');
    }
    else{
        console.log('A note with the provided title alreay exists.')
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

const removeNotes = (title) => {
    let notes = loadNotes();
    if(notes.findIndex(note => note.title.toLowerCase() === title.toLowerCase()) > -1){
        const updatedNotes = notes.filter(note => note.title.toLowerCase() !== title.toLowerCase());
        saveNotes(updatedNotes);
        console.log(chalk.inverse.green('Note Removed!'));
    }
    else console.log(chalk.inverse.red('No Note Found'));
}

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length >= 1){
        notes.forEach(note => console.log(note.title))
    }
    else{
        console.log('Notes is empty');
    }
}

const readNotes = (title) => {
    const notes = loadNotes();
    const titleIndex = notes.findIndex(note => note.title.toLowerCase() === title.toLowerCase());
    if(titleIndex > -1){
        console.log(chalk.bold.green(title));
        console.log(notes[titleIndex].body);
    }
    else{
        console.log(chalk.red('No title Found'));
    }
}

module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
};