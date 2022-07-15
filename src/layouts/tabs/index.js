import React from 'react'
import './style.scss'


const ListTab = ({ tabs, handleChangeTab, postType }) => { 
  return (
    <div className='tab-list'>
        <div className='customization-new'>
            <img src='/menu.png' alt='img-menu-icon'/>
        </div>
        <div className='tab-list-item'>
            {tabs && tabs.map((item) => (
                <div 
                    className={`${postType === item.type ? 'active-tab' : ''} tab-item`}
                    key={item.type}
                    onClick={() => handleChangeTab(item.type)}
                >{item.name}</div>
            ))}
            {/* <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div>
            <div className='tab-item'>Pháp luật</div> */}
        </div>
    </div>
  )
}
export default ListTab
