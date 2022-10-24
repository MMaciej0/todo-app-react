import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ListItem from './components/ListItem';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      const newTodo = {
        id: uuidv4(),
        text: todo,
        createdAt: new Date().toDateString(),
      };
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  const handleRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleRemoveAll = () => {
    setTodos([]);
  };

  const updateAfterEdit = (id, editValue) => {
    const newTodos = [...todos];
    const selectedTodo = newTodos.find((todo) => todo.id === id);
    selectedTodo.text = editValue;
    setTodos(newTodos);
    // todo: after editing add update date to item
  };

  return (
    <div className="App">
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="input todo.."
            value={todo}
            onChange={handleInput}
          />
          <button type="submit">ADD TODO</button>
        </form>
      </header>
      <ul>
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
      <button type="button" onClick={handleRemoveAll}>
        Remove all
      </button>
    </div>
  );
}

export default App;
