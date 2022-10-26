import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ListItem from './components/ListItem';
import { deleteData, getData, postData, updateData } from './utils/http';

function App() {
  const URL = 'http://localhost:3004/todos';
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(URL);
      if (data) {
        setTodos(data);
      }
    };
    fetchData();
  }, []);

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
        createdAt: new Date().toString(),
      };
      postData(URL, newTodo);
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  const handleRemove = (id) => {
    deleteData(URL, id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleRemoveAll = () => {
    const IDs = todos.map((todo) => todo.id);
    IDs.forEach((id) => {
      deleteData(URL, id);
    });
    setTodos([]);
  };

  const updateAfterEdit = (id, editValue) => {
    const newTodos = [...todos];
    const selectedTodo = newTodos.find((todo) => todo.id === id);
    selectedTodo.text = editValue;
    selectedTodo.updateDate = new Date().toString();
    updateData(URL, id, selectedTodo);
    setTodos(newTodos);
  };

  return (
    <div className="app-container">
      <header className="header">
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
      </header>
      {todos.length > 0 && (
        <main>
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
          <button
            className="remove-all"
            type="button"
            onClick={handleRemoveAll}
          >
            Remove all
          </button>
        </main>
      )}
    </div>
  );
}

export default App;
