import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button, useTheme } from 'react-daisyui'

function App() {
  const [count, setCount] = useState(0)
  const { theme, setTheme } = useTheme()
  return (
    <div className="container mx-auto items-center">
      <div className="flex">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}>
          theme {theme}
        </Button>
      </div>
    </div>
  )
}

export default App
