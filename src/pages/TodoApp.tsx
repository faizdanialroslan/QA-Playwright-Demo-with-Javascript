import { useState, useEffect } from 'react'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos)
        setTodos(parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })))
      } catch (error) {
        console.error('Error loading todos:', error)
      }
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
        createdAt: new Date()
      }
      
      setTodos(prev => [newTodo, ...prev])
      setInputText('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="todo-app">
      <h1>Todo Application</h1>
      <p>Comprehensive UI testing with Playwright</p>
      
      <form onSubmit={addTodo} className="todo-input" data-testid="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What needs to be done?"
          data-testid="todo-input"
          autoFocus
        />
        <button 
          type="submit" 
          data-testid="add-todo-btn"
          disabled={!inputText.trim()}
        >
          Add Todo
        </button>
      </form>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => setFilter('all')}
          data-testid="filter-all"
          style={{ backgroundColor: filter === 'all' ? '#646cff' : '#f0f0f0' }}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          data-testid="filter-active"
          style={{ backgroundColor: filter === 'active' ? '#646cff' : '#f0f0f0' }}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          data-testid="filter-completed"
          style={{ backgroundColor: filter === 'completed' ? '#646cff' : '#f0f0f0' }}
        >
          Completed ({completedCount})
        </button>
      </div>

      {completedCount > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <button 
            onClick={clearCompleted}
            data-testid="clear-completed-btn"
            style={{ backgroundColor: '#e74c3c', color: 'white' }}
          >
            Clear Completed ({completedCount})
          </button>
        </div>
      )}

      {filteredTodos.length === 0 ? (
        <div data-testid="empty-state" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          {todos.length === 0 
            ? "No todos yet. Add one above to get started!" 
            : `No ${filter} todos found.`
          }
        </div>
      ) : (
        <ul className="todo-list" data-testid="todo-list">
          {filteredTodos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              data-testid={`todo-item-${todo.id}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
                className="todo-checkbox"
              />
              
              <span 
                className="todo-text"
                data-testid={`todo-text-${todo.id}`}
              >
                {todo.text}
              </span>
              
              <small style={{ color: '#666', marginLeft: 'auto', marginRight: '1rem' }}>
                {todo.createdAt.toLocaleDateString()}
              </small>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                data-testid={`delete-todo-${todo.id}`}
                className="todo-delete"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Test Scenarios Covered:</h3>
        <ul style={{ textAlign: 'left', margin: '0.5rem 0' }}>
          <li>✅ Add new todo items</li>
          <li>✅ Mark todos as complete/incomplete</li>
          <li>✅ Delete individual todos</li>
          <li>✅ Filter todos (All/Active/Completed)</li>
          <li>✅ Clear all completed todos</li>
          <li>✅ Persistent storage (localStorage)</li>
          <li>✅ Empty state handling</li>
          <li>✅ Form validation</li>
        </ul>
      </div>
    </div>
  )
}
