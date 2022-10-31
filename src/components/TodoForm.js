import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import url from '../utils/urls';
import { postData } from '../utils/http';

function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState('');

  const handleInput = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    const newTodo = {
      id: uuidv4(),
      text: todo,
      createdAt: new Date().toString(),
    };
    postData(url.todos, newTodo);
    addTodo(newTodo);
    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="header__input"
        type="text"
        placeholder="input todo.."
        value={todo}
        onChange={handleInput}
      />
      <button type="submit" className="header__btn">
        ADD TODO
      </button>
    </form>
  );
}

export default TodoForm;
