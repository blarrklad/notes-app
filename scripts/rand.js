let counter;

const fetchNotes = () => {
    let notes;
    if (localStorage.getItem('notes') == null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes'));
    }
    return notes;
}

const storeNote = (note) => {
    let notes = fetchNotes();
    notes.push(note);
    cacheNotes(notes);
}

const cacheNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const deleteNote = (id) => {
    let notes = fetchNotes().filter(note => {
        return note.id !== id;
    });
    // notes.splice(idx, 1);
    cacheNotes(notes);
}

const frameStamp = (stamp, timeStamp) => {
    counter = setInterval(() => {
        stamp.innerText = parseStamp(timeStamp);
    }, 1000);
}

const parseStamp = (timeStamp) => {
    return `Last edited ${moment(Number(timeStamp)).fromNow()}`;
}
