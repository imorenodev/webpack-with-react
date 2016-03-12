import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  storeChanged = (state) => {
    // Without a property initializer, 'this' wouldn't point to the correct
    // context because it defaults to undefined in strict mode.
    this.setState(state);
  }
  render() {
    //property initializer
    const notes = this.state.notes;

    return (
      <div className='container'>
        <li className='list-group-item active'>
          <button onClick={this.addNote} className='btn btn-success btn-sm float-left'>+</button>
          <span>Todo List</span>
        </li>
        <Notes notes={notes}
               onEdit={this.editNote}
               onDelete={this.deleteNote} />
      </div>
    );
  }
  addNote = () => {
    NoteActions.create({task: 'New Task'});
  };
  editNote = (id, task) => {
    // don't let user set task to empty string
    if (!task.trim()) {
      return;
    }
    NoteActions.update({id, task});
  }
  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    NoteActions.delete(id);
  };
}

export default App;
