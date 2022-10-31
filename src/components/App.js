import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { deleteData, getData, updateData } from '../utils/http';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import url from '../utils/urls';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(url.todos);
      if (data) {
        setTodos(data);
      }
    };
    fetchData();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleRemove = (id) => {
    deleteData(url.todos, id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleRemoveAll = () => {
    const IDs = todos.map((todo) => todo.id);
    IDs.forEach((id) => {
      deleteData(url.todos, id);
    });
    setTodos([]);
  };

  const updateAfterEdit = (id, editValue) => {
    const newTodos = [...todos];
    const selectedTodo = newTodos.find((todo) => todo.id === id);
    selectedTodo.text = editValue;
    selectedTodo.updateDate = new Date().toString();
    updateData(url.todos, id, selectedTodo);
    setTodos(newTodos);
  };

  return (
    <div className="app-container">
      <header className="header">
        <TodoForm addTodo={addTodo} />
      </header>
      {todos.length > 0 && (
        <main>
          <TodoList
            todos={todos}
            updateAfterEdit={updateAfterEdit}
            handleRemove={handleRemove}
          />
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
