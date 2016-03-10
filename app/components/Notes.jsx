import React from 'react';
import Note from './Note.jsx';

export default ({notes, onEdit, onDelete}) => {
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
