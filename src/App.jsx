import { useEffect, useState } from 'react'
import { LuChevronLeft } from "react-icons/lu";
import './App.css'
import Objects from './Matter'
import gsap from 'gsap';

function App() {
  const refresh = () => {
    gsap.to([".para__btn", ".para__header", ".para__container"], {
      y: 100,
      opacity: 0,
      ease: "power4.in",
      duration: 1,
      stagger: 0.2,
      onComplete: () => {
        window.location.reload(); // Reload the page after the animation completes
      }
    });
  };

useEffect(() => {
  const tl = gsap.timeline()
  tl.from([".para__container", ".para__header", ".para__btn"], {y: 70, opacity: 0, ease: "power4.in", duration: 1, stagger: 0.3})
  
  
}, [])
  return (
    <>
    <section>
     <div className='container'> 
      <p className='para__container'>opps! 404 Error!</p>
      <h1 className='para__header'>Page Not Found</h1>
      <button onClick={refresh} className='para__btn'><span> <LuChevronLeft /></span> Back to Home </button>
     </div>
      <Objects />
    </section>
    </>
  )
}

export default App
