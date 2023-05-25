import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import './App.css'
import { TodoList } from './components/TodoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoList />
      {}
    </>
  )
}

export default App