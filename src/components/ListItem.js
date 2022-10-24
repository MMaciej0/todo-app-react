import React, { useState } from 'react';

function ListItem({ id, text, createdAt, handleRemove, updateAfterEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (id, inputValue) => {
    updateAfterEdit(id, inputValue);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={() => setIsEditing(false)}>cencel</button>
          <button onClick={() => handleEdit(id, editValue)}>change TODO</button>
        </>
      ) : (
        <>
          <span>{text}</span>
          <button onClick={() => handleRemove(id)}>remove</button>
          <button onClick={() => setIsEditing(true)}>edit</button>
        </>
      )}
      <p>Created at: {createdAt}</p>
    </li>
  );
}

export default ListItem;
