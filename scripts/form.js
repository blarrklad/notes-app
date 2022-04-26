const link = document.querySelector('#navbar-link');
const stamp = document.querySelector('#navbar-stamp');
const title = document.querySelector('#form-title');
const body = document.querySelector('#form-body');
const button = document.querySelector('#form-button');

const id = location.hash.substring(1);
// const note = fetchNotes().find(note => note.id === id);

const handleEvent = (el, prop) => {
    el.addEventListener('change', () => setField(el, prop));
}

const readForm = () => {
    try {
        const note = fetchNotes().find(note => note.id === id);
        title.value = note.title;
        body.value = note.body;
        stamp.innerText = parseStamp(note.updatedAt);
        frameStamp(stamp, note.updatedAt);
    } catch(err) {
        location.replace('index.html');
    }
}

const setField = (el, prop) => {
    let timeStamp;
    let notes = fetchNotes().map(note => {
        timeStamp = moment().valueOf();
        if (note.id === id) {
            note[prop] = el.value.trim();
            return { ...note, updatedAt: timeStamp }
        } else {
            return note;
        }
    });
    cacheNotes(notes);
    clearInterval(counter);
    frameStamp(stamp, timeStamp);
}

const clearNote = () => {
    // let idx = fetchNotes().findIndex(note => note.id === id);
    deleteNote(id);
    location.replace('index.html');
}

window.addEventListener('DOMContentLoaded', () => readForm());

link.addEventListener('click', () => location.replace('index.html'));

// title.addEventListener('change', () => setField(e.target, 'title'));
// body.addEventListener('change', () => setField(e.target, 'body'));

handleEvent(title, 'title');

handleEvent(body, 'body');

button.addEventListener('click', () => clearNote());