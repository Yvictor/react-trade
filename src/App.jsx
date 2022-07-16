import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button, useTheme, Navbar, Swap } from 'react-daisyui'
import { FiMoon, FiSun } from 'react-icons/fi'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const iconSize = 24
  return (
    <div className='p-1'>
      <Swap onChange={() => setTheme((theme) => (theme === "light" ? "dark" : "light"))}
        rotate={true} onElement={<FiMoon size={iconSize} />}
        offElement={<FiSun size={iconSize} />}>
      </Swap>
    </div>

  )
}

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex h-full">
        <div className='flex w-full'>
          <div className='flex w-full h-16 bg-base-200 p-0 items-start'>
            <Navbar>
              <div className='flex-1'>
                <p className='font-serif normal-case text-xl p-2'>ReactTrade</p>
              </div>
              <div className='ml-auto items-center p-1'>
                <ThemeButton />
              </div>
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
