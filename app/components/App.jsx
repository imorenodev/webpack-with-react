import uuid from 'node-uuid';
import React from 'react';
import Note from './Note.jsx';

export default class App extends React.Component {
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
        <li className='list-group-item active'>Task Items List:</li>
        <ol className='list-group'>
          {notes.map(note =>
          <li className='list-group-item' key={note.id}>{note.task}</li>)}
        </ol>
      </div>
    );
  }
}
