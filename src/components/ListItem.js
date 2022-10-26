import React, { useState } from 'react';

function ListItem({
  id,
  text,
  createdAt,
  updateDate,
  handleRemove,
  updateAfterEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (id, inputValue) => {
    updateAfterEdit(id, inputValue);
    setIsEditing(false);
  };

  return (
    <li>
      <div className="todo">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div className="todo_btns">
              <button onClick={() => setIsEditing(false)}>cencel</button>
              <button onClick={() => handleEdit(id, editValue)}>
                change TODO
              </button>
            </div>
          </>
        ) : (
          <>
            <h4>{text}</h4>
            <div className="todo_btns">
              <button onClick={() => handleRemove(id)}>remove</button>
              <button onClick={() => setIsEditing(true)}>edit</button>
            </div>
          </>
        )}
      </div>
      <p>
        {updateDate ? `Edited at: ${updateDate}` : `Created at: ${createdAt}`}{' '}
      </p>
    </li>
  );
}

export default ListItem;
