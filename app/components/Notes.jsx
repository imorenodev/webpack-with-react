import React from 'react';
import Note from './Note.jsx';

export default ({notes, onEdit}) => {
  return (
    <ul className='list-group' style={{marginBottom: 0}}>
      {notes.map(note =>
        <li key={note.id} className='list-group-item'>
          <Note task={note.task} />
        </li>
      )}
    </ul>
  )
}
