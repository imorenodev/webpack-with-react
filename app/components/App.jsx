import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';

class App extends React.Component {
  // AltContainer allows us to bind data to its immediate children.
  // In this case, it injects the notes property into Notes.
  render() {
    return (
      <div className='container'>
        <li className='list-group-item active'>
          <button onClick={this.addNote} className='btn btn-success btn-sm float-left'>+</button>
          <span>Todo List</span>
        </li>
        <AltContainer stores={[NoteStore]}
                      inject={{notes: () => NoteStore.getState().notes}}>
          <Notes onEdit={this.editNote}
                 onDelete={this.deleteNote} />
        </AltContainer>
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
