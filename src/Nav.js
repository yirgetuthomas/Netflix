import React, { useEffect, useState } from 'react'
import './Nav.css'


function Nav() {
    const [show, handleShow] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
             handleShow(true)
        } else handleShow(false)
    })
    return () => {
        window.removeEventListener('scroll',this)
    }
  }, [])  
  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img className='nav__logo' src="https://www.syfy.com/sites/syfy/files/2021/11/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png" alt="Netflix Logo" />
      <img className='nav__avatar ' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatar logo" />
    </div>
  )
}

export default Nav
