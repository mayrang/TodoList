import React, {useRef, useState, useCallback, useReducer} from 'react';
import './App.css';
import TodoTemplate from './componants/TodoTemplate';
import TodoInsert from './componants/TodoInsert';
import TodoList from './componants/TodoList';

const todoReducer = (todos, action) => {
  switch(action.type){
    case 'INSERT':
      return [...todos, action.todo];
    case 'REMOVE':
      return action.newTodo;
    case 'TOGGLE':
      return action.newTodo;
    default:
      return todos;

  }
}


function App() {
  const [todos, dispatch] = useReducer(todoReducer, [
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text, 
      checked: false,
    };
    dispatch({type: "INSERT", todo: todo});
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    const newTodo = todos.filter((todo) => todo.id !== id)
    dispatch({type: "REMOVE", newTodo: newTodo});
  }, []);

  const onToggle = useCallback((id) => {
    const newTodo = todos.map((todo) => todo.id === id ? {...todo, checked: !todo.checked} : todo);
    dispatch({type: "TOGGLE", newTodo: newTodo});
  }, []);
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
