import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button, Navbar } from 'react-daisyui'
import ThemeButton from './theme'
import ThunderTradePanel from './components/ThunderTradePanel/ThunderTradePanel'
import { useDispatch } from 'react-redux'
import { SUBSCRIBE, UNSUBSCRIBE } from './redux/reducers'
import { FiZap, FiZapOff } from 'react-icons/fi'

function App() {
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-screen touch-none">
      <div className="h-full w-full bg-secondary">
        <div className='flex w-full h-16 bg-base-100 p-0 items-start'>
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
          <Button color="ghost" onClick={(e)=>{
            dispatch(SUBSCRIBE({}), "SUB")
          }}><FiZap>subscribe</FiZap></Button>
          <Button color='ghost' onClick={(e)=>{
            dispatch(UNSUBSCRIBE({}), "UNSUB")
          }}><FiZapOff>unsubscribe</FiZapOff></Button>
        </div>
      </div>
    </div>
  )
}

export default App
