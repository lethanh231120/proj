import React from 'react'
// import { BellOutlined } from '@ant-design/icons'
import './navbar.scss'
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-notification'>
        <div className='navbar-icon'>
          <img src='/bell.png' alt='img-bell'/>
        </div>
      </div>
      <div className='navbar-other'>
        <div className='navbar-icon'>
          <img src='/chrome.png' alt='img-notification'/>
        </div>
        <div className='navbar-icon'>
          <img src='/user.png' alt='img-user'/>
        </div>
        <div className='navbar-icon'>
          <img src='/settings.png' alt='img-setting'/>
        </div>
      </div>
    </div>
  ) 
}
export default Navbar
