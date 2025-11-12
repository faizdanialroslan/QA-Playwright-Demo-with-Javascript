import { useState, useEffect } from 'react'
import { Version } from '../components/Version'

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
  const [isLoaded, setIsLoaded] = useState(false)

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
    setIsLoaded(true)
  }, [])

  // Save todos to localStorage whenever todos change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isLoaded])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputText.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
        createdAt: new Date()
      }
      
      setTodos(prev => [...prev, newTodo])
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
    <div style={{ textAlign: 'center', padding: '2rem', minHeight: '100vh' }}>
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

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#DAA520', borderRadius: '4px', color: '#000' }}>
        <h3>Scenarios Covered:</h3>
        <div style={{ textAlign: 'left', display: 'inline-block' }}>
          <p>✅ Add new todo items</p>
          <p>✅ Mark todos as complete/incomplete</p>
          <p>✅ Delete individual todos</p>
          <p>✅ Filter todos (All/Active/Completed)</p>
          <p>✅ Clear all completed todos</p>
          <p>✅ Persistent storage (localStorage)</p>
          <p>✅ Empty state handling</p>
          <p>✅ Form validation</p>
        </div>
      </div>
      
      <Version showDetails={true} />
    </div>
  )
}
