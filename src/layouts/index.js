import React, { useState } from 'react'
// import Blogs from '../pages/blog'
// import Header from './header'
// import { Route, Routes } from 'react-router-dom'
// import HomePage from '../pages/home'
// import PortfolioPage from '../pages/portfolio'
// import SwapPage from '../pages/swap'
// import Cryptocurrencies from '../pages/cryptocurrencies'
// import PricingPage from '../pages/price'
// import ProfilePage from '../pages/profile'
// import EditProfilePage from '../pages/profile/edit-profile'
// import PageNotFound from '../pages/404'
// import ConnectWalletPage from '../pages/connect-wallet'
// import { Layout } from 'antd'
import Navbar from './navbar'
import Banner from './banner'
import Content from './content'
import ListTab from './tabs'
import Menu from './menu'
// import './header/index.scss'
import './style.scss'
// const { Content } = Layout
import { VIDEO, TEXT } from '../constants/TypeConstants'
const Router = () => {
  const[postType, setPostType] = useState('text')
  const tabs = [
    {
      name: 'Bài viết',
      type: TEXT
    },
    {
      name: 'Video',
      type: VIDEO
    }
  ]
  const handleChangeTab = (type) => {
    setPostType(type)
  }
  console.log(postType)
  return (
    <div className='container'>
      <div className='navbar'>
        <Navbar/>
      </div>
      <div className='banner'>
        <Banner/>
      </div>
      <div className='content'>
        <Content postType={postType}/>
      </div>
      <div className='tab'>
        <ListTab tabs={tabs} handleChangeTab={handleChangeTab} postType={postType}/>
      </div>
      <div className='menu'>
        <Menu/>
      </div>
      {/* <HomePage/>  */}
      {/* <Header/>
      <Content style={{ margin: '0 6%' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='portfolio' element={<PortfolioPage />} />
          <Route path='swap' element={<SwapPage />} />
          <Route path='cryptocurrencies' element={<Cryptocurrencies />} />
          <Route path='price' element={<PricingPage />} />
          <Route path='blog' element={<Blogs />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='edit-profile' element={<EditProfilePage />} />
          <Route path='connect-wallet' element={<ConnectWalletPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Content> */}
    </div>
  )
}

export default Router
