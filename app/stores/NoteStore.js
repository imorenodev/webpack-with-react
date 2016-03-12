import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    // call bindActions to map each action to a method by name.
    this.bindActions(NoteActions);

    this.notes = [];
  }
  create(note) {
    const notes = this.notes;

    note.id = uuid.v4();
    // this.setState is a feature of Alt that allows us to signify that we're going
    // to alter the store state. Alt will signal the change to possible listeners.
    this.setState({
      notes: notes.concat(note)
    });

  }
  update(updatedNote) {
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        // Object.assign is used ot patch the note data. It mutates the target (first parameter),
        // So to avoid that we use {} empty object as its target and apply data on it.
        // Example: Object.assign({}, {a: 5, b: 3}, {a: 17}) ->returns->  {a: 17, b: 3}
        return Object.assign({}, note, updatedNote);
      }
      return note;
    });
    // This is same as this.setState({notes: notes})
    // ES6 property shorthand. It is equivalent to {notes: notes}.
    this.setState({notes});
  }
  delete(id) {
    // this.notes.filter returns new array of notes that satisfy condition true:
    // (the note.id does not equal the id passed in). All notes except deleted note.
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
}
// Connect the store with Alt using alt.createStore and assign a label.
// Assigning a label is not necessary but is important for persisting data.
export default alt.createStore(NoteStore, 'NoteStore');
