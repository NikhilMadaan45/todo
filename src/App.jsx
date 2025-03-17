import './App.css'
import { useEffect, useState } from 'react'
import { TodoContextProvider } from './context'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  }); // State to store todos

  const addTodo = (title) => {
    // Add todo to the list
    setTodos((prev) => [{
      id: prev.length + 1,
      title,
      completed: false
    }, ...prev ]);
  }

  const deleteTodo = (id) => {
    // Delete todo from the list
    setTodos((prev) => prev.filter(todo => todo.id !== id));
  }

  const toggleComplete = (id) => {
    // Toggle todo completion status
    setTodos((prev) => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const updateTodo = (id, title) => {
    // Update todo title
    setTodos((prev) => prev.map(todo => todo.id === id ? { ...todo, title } : todo));
  }

  // Fetch todos from local storage
  useEffect(() => { 
    const todos = localStorage.getItem('todos');
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  // Save todos to local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  } , [todos]);

  return (
    <TodoContextProvider value={{ todos, updateTodo, deleteTodo, addTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />)
              )
            }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
