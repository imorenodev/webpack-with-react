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
    const notes = this.state.notes;
    return (
      <div className='container'>
        <li className='list-group-item active'>Task Items List:
          <button onClick={this.addNote} className='btn btn-success btn-sm float-right'>+</button>
          <button onClick={this.removeNote} className='btn btn-danger btn-sm float-right'>-</button>
        </li>
        <Notes notes={notes} onEdit={this.editNote} />
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
  removeNote = () => {
    this.setState({
      notes: this.state.notes.slice(0,-1)
    }, () => console.log('removed a task!'))
  };
}

export default App;
