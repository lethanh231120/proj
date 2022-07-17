import React, { useState } from 'react'
import moment from 'moment'
import Navbar from './navbar'
import Banner from './banner'
import Content from './content'
import ListTab from './tabs'
import Menu from './menu'
import parse from 'html-react-parser'
import Slider from 'react-slick'
import './style.scss'
import { VIDEO, TEXT } from '../constants/TypeConstants'
import _ from 'lodash'
import "slick-carousel/slick/slick.css"
const Router = () => {
  const [itemModal, setItemModal] = useState()
  const[isModal, setIsModal] = useState(false)
  const[postType, setPostType] = useState(TEXT)
  const[indexItemPost, setIndeItemPost] = useState()
  const [posts, setPosts] = useState()
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
  const handleClickPost = (item, index) => {
    setItemModal(item)
    setIsModal(true)
    setIndeItemPost(index)
  }
  const handleClickCloseModal = () => {
    setIsModal(false)
    setItemModal()
  }
  const renderSlides = () =>
    !_.isEmpty(posts) && posts.map((item) => (
      <>
        {postType === TEXT ? (
          <div className='slide-abc'>
            <div className='modal-content'>
              <div className='modal-navbar'>
                <div className='modal-info'>
                  <div className='modal-navbar-image'>
                    <img src={item.publisher.avatar} alt='img-bell'/>
                  </div>
                  <div className='modal-navbar-content'>
                    <div className='modal-navbar-title'>{item.postLinkTitle}</div>
                    <span className='modal-navbar-name'>{item?.publisher?.name}</span>
                  </div>
                </div>
                <div className='modal-navbar-icon'>
                  <img src='/dots.png' alt='img-user'/>
                </div>
                <div className='modal-navbar-icon' onClick={handleClickCloseModal}>
                  <img src='/close.png' alt='img-setting'/>
                </div>
              </div>
              <div className='modal-item'>
                <div className='modal-item-time'>
                  {moment.unix(item.time).format('LLLL')}
                </div>
                <div className={`${item.postLinkTitle !== '' ? 'modal-item-title' : 'modal-item-title-none'}`}>
                  {item.postLinkTitle}
                </div>
                <div className={`${item?.postLinkContent === '' ? 'modal-item-post-text' : 'modal-item-post-none'}`}>
                  {parse(`${item.postText}`)}
                </div>
                <div className={`${item?.postText !== '' ? 'modal-item-event' : 'modal-item-event-none'}`}>
                  Sự kiện: {parse(item?.postText)}
                </div>
                {item.postLinkImage !== '' ? (
                  <div className='modal-item-image'>
                    <img src={item.postLinkImage} alt='img-post'/>
                  </div>
                ) : !_.isEmpty(item?.photo_multi) ? (
                  item?.photo_multi.map((item, index) => (
                    <div className='modal-item-image' key={index}>
                      <img src={item.image} alt='img-post'/>
                    </div>
                  ))
                ) : ''}
              </div>
            </div>
          </div>
        ) : (
          <div className='slide-abc'>
            <div className='modal-content'>
              <div className='modal-navbar'>
                <div className='modal-navbar-image'>
                  <img src={item.publisher.avatar} alt='img-bell'/>
                </div>
                <div className='modal-navbar-content'>
                  <div className='modal-navbar-title'>{item?.postFileName !== '' ? item?.postFileName : item?.postText}</div>
                  <span className='modal-navbar-name'>{item?.publisher?.username}</span>
                </div>
                <div className='modal-navbar-icon'>
                  <img src='/dots.png' alt='img-user'/>
                </div>
                <div className='modal-navbar-icon' onClick={handleClickCloseModal}>
                  <img src='/close.png' alt='img-setting'/>
                </div>
              </div>
              <div className='modal-item'>
                <div className='modal-item-time'>
                  {moment.unix(item.time).format('LLLL')}
                </div>
                <div className={`${item.postText !== '' || (item?.postFileName !== '') ? 'modal-item-title' : 'modal-item-title-none'}`}>
                  {parse(item?.postFileName !== '' ? item?.postFileName : item?.postText)}
                </div>
                <div className={`${item?.postText !== '' ? 'modal-item-event' : 'modal-item-event-none'}`}>
                  Sự kiện: {parse(item?.postText)}
                </div>
                <div className='modal-item-image'>
                  <video controls>
                    <source src={item?.postFile !== '' && item?.postFile} type={`${item?.postFile !== '' && 'video/mp4' }`}/>
                  </video>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    ));
  return (
    <>
      <div className='relative'>
        <div className={`${isModal && 'container-hidden'} container`}>
          <div className='navbar'>
            <Navbar/>
          </div>
          <div className='banner'>
            <Banner/>
          </div>
          <div className='content'>
            <Content 
              postType={postType}
              handleClickPost={handleClickPost}
              posts={posts}
              setPosts={setPosts}
            />
          </div>
          <div className='tab'>
            <ListTab tabs={tabs} handleChangeTab={handleChangeTab} postType={postType}/>
          </div>
          <div className='menu'>
            <Menu/>
          </div>
        </div>
        {isModal && (
          <div className='box-modal'></div>
        )}
        {itemModal &&  (
          <>
            {postType === TEXT ? (
              <>
                <div className={`${isModal ? 'modal-visible' : 'modal-none'} modal`}>
                  <Slider dots={false} arrows={false} initialSlide={indexItemPost}>{renderSlides()}</Slider>
                </div>
              </>
          ) : (
            <>
              <div className={`${isModal ? 'modal-visible' : 'modal-none'} modal`}>
                <Slider dots={false} arrows={false} initialSlide={indexItemPost}>{renderSlides()}</Slider>
              </div>
            </>
          )}
        </>
        )}
      </div>
    </>
  )
}

export default Router
