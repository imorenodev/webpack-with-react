import React from 'react';
import Note from './Note.jsx';

export default ({notes, onEdit, onDelete}) => {
  // We use .bind to literally bind data to the onEdit function.
  // We bind the 'note.id' as the first argument, then in Note component
  // we callback onEdit with 'value' as its second argument, and pass to App component
  return (
    <ol className='list-group'>
      {notes.map(note =>
        <li className='list-group-item' key={note.id}>
          <Note task={note.task}
                onEdit={onEdit.bind(null, note.id)}
                onDelete={onDelete.bind(null, note.id)} />
        </li>)}
    </ol>
  )
}
