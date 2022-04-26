const search = document.querySelector('#action-search');
const select = document.querySelector('#action-select');
const container = document.querySelector('#list-inner-container');
const button = document.querySelector('#list-button');

// const sort = Sortable.create(container);
// console.log(sort);

const sort = new Sortable(container, {
    ghostClass: 'list-sort'
});

class Note {
    constructor(id, title, body, timeStamp) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = timeStamp;
        this.updatedAt = timeStamp;
    }

    static createNote() {
        let note = new Note(uuidv4(), '', '', moment().valueOf());
        // console.log(note);
        storeNote(note);
        location.assign(`entry.html#${note.id}`);
    }

    static appendNote(note, startTimer) {
        let list = document.createElement('a');
        list.setAttribute('href', `entry.html#${note.id}`);
        list.classList.add('list-inner-wrapper');
        list.innerHTML = `
        <h3>${note.title == '' ? 'Unnamed Note' : note.title}</h3>
        <p id='${note.updatedAt}' class='list-stamp'>${parseStamp(note.updatedAt)}</p>`;
        container.append(list);
        startTimer();
    }

    static renderNotes() {
        let notes = this.sortNotes(select.value);
        let count = document.querySelector('.list-null');

        // console.log(select.value);

        let lists = notes.filter(note => {
            let title = note.title.toLowerCase();
            let value = search.value.toLowerCase().trim();
            return title.includes(value);
        });

        container.replaceChildren();

        if (lists.length === 0) {
            if (count !== null) return;
            let elem = document.createElement('div');
            let text = document.createTextNode('No note to show');
            elem.appendChild(text)
            elem.classList.add('list-null');
            container.insertAdjacentElement('beforebegin', elem);
        } else {
            if (count !== null) count.remove();
            lists.forEach(list => this.appendNote(list, () => {
                let stamps = document.querySelectorAll('.list-stamp');
                stamps.forEach((stamp) => frameStamp(stamp, stamp.id));
            }));
        }
    }

    static sortNotes(option) {
        let notes = fetchNotes();
        switch(option) {
            case 'sort_a':
                notes = notes.sort((a, b) => b.updatedAt - a.updatedAt);
                break;
            case 'sort_b':
                notes = notes.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'sort_c':
                notes = notes.sort((a, b) => {
                    let case_a = a.title.toLowerCase();
                    let case_b = b.title.toLowerCase();
                    return case_a.localeCompare(case_b, 'en');
                });
                break;
        }
        return notes;
    }
}

window.addEventListener('DOMContentLoaded', () => Note.renderNotes());

search.addEventListener('input', () => Note.renderNotes());

select.addEventListener('change', (e) => {
    this.value = e.target.value;
    Note.renderNotes();
});

button.addEventListener('click', () => Note.createNote());

