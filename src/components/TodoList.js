import React from 'react';
import ListItem from './ListItem';

function TodoList({ todos, handleRemove, updateAfterEdit }) {
  return (
    <ul className="todos">
      {todos.map((todo) => {
        return (
          <ListItem
            key={todo.id}
            {...todo}
            handleRemove={handleRemove}
            updateAfterEdit={updateAfterEdit}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
