import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Navbar } from 'react-daisyui'
import ThemeButton from './theme'
import ThunderTradePanel from './components/ThunderTradePanel/ThunderTradePanel'


function App() {
  return (
    <div className="w-screen h-screen touch-none">
      <div className="h-full w-full">
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
        <div className='flex'>
          <ThunderTradePanel></ThunderTradePanel>
        </div>
      </div>
    </div>
  )
}

export default App
