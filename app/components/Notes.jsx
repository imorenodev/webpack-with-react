import React from 'react';
import Note from './Note.jsx';

export default ({notes, onEdit}) => {
  return (
    <ol className='list-group'>
      {notes.map(note =>
      <li className='list-group-item' key={note.id}>
        <Note task={note.task} />
      </li>)}
    </ol>
  )
}
