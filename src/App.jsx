import { useState } from 'react'
import { LuChevronLeft } from "react-icons/lu";
import './App.css'
import Objects from './Matter'

function App() {
  const refresh = () => {
    window.location.reload()
  }

  return (
    <>
    <section>
     <div className='container'> 
      <p>opps! 404 Error!</p>
      <h1>Page Not Found</h1>
      <button onClick={refresh}><span> <LuChevronLeft /></span> Back to Home </button>
     </div>
      <Objects />
    </section>
    </>
  )
}

export default App
