import uuid from 'node-uuid';
import React from 'react';
import Note from './Note.jsx';
import Notes from './Notes.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Make Dinner'
        },
        {
          id: uuid.v4(),
          task: 'Do Laundry'
        }
      ]
    }
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
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New Task'
      }])
    }, () => console.log('added a new task!'));
  };
  editNote = (id, task) => {
    // don't let user set task to empty string
    if (!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if (note.id === id && task) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  }
  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    this.setState({
      // filter and return any note whose id does not match
      // id that was passed in, deleting note which matches
      // id from the notes array
      notes: this.state.notes.filter(note => note.id !== id)
    }, () => console.log('deleted a task!'));
  };
}

export default App;
