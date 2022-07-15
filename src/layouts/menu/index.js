import React from 'react'
import './style.scss'

const Menu = () => {
  return (
    <div className='menu-bottom'>
      <div className='menu-item'>
        <img src='/left-arrow.png' alt='img-menu-icon'/>
      </div>
      <div className='menu-item'>
        <img src='/right-arrow.png' alt='img-menu-icon'/>
      </div>
      <div className='menu-item'>
        <img src='/home.png' alt='img-menu-icon'/>
      </div>
      <div className='menu-item'>
        <img src='/one.png' alt='img-menu-icon'/>
      </div>
      <div className='menu-item'>
        <img src='/menu.png' alt='img-menu-icon'/>
      </div>
    </div>
  )
}
export default Menu
