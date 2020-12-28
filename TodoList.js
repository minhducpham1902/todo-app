import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const fakeTodos = [];
    async function fetchData() {
      const result = await fetch(
        "http://wsp8pw.course.tamk.cloud/api/v1/task/random"
      );
      const data = await result.json();
      console.log("data fetched", data);
      fakeTodos.push({ value: data[0]});
    }
    fetchData()
      .then(() => fetchData())
      .then(() => fetchData())
      .then(() => setTodos(fakeTodos));
  }, []);
  
  return (
    <>
      <h1>To Do List</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;