import React, { useEffect, useState } from 'react'
import './content.scss'
import axios from 'axios'
import parse from 'html-react-parser'
import moment from 'moment'
import { VIDEO, TEXT } from '../../constants/TypeConstants'
import _ from 'lodash'
const Content = ({ postType, handleClickPost, posts, setPosts }) => {
  const colors = [
    '#00CC99', '#111111', '#666666', '#555555', '#444444', '#333333', '#0099FF', '#336666', '#006666', '#006699', '#336600', 'CC3333', '#333333', '#003333', '#006600', '#0000CC', '#660000', '#660066', '#000066', '#006600', '#009900' 
  ]
  const random = () => {
    return colors[Math.ceil(Math.random() * colors.length)]
  }
  useEffect(() => {
    const formData = new FormData()
    formData.append('server_key', '83f0fa958d10392fd10bc8bb377a044c')
    formData.append('type', 'get_news_feed')
    formData.append('post_type', postType && postType)
    formData.append('limit', -1)
    const callData = async() => {
      const formData2 = new FormData()
      formData2.append('server_key', '83f0fa958d10392fd10bc8bb377a044c')
      formData2.append('password', 'Thanhlan12')
      formData2.append('username', 'username')
      const { data } = await axios.post('url/api/auth', formData2)
      const data2 = await axios.post(
        'url/api/posts', 
        formData, 
        {
          
          params: {
            access_token: data.access_token
          }
        }
      )
      setPosts(data2?.data?.data)
    }
    callData()
  }, [postType])

  console.log(posts)
  const CURENT_TIME = moment().format()
  const renderHours = (time, endTime) => {
    const years = parseInt(((moment(endTime).diff(moment.unix(time).format(), 'years')) / 365).toString().split(".")[0])
    const months = parseInt(((moment(endTime).diff(moment.unix(time).format(), 'months')) / 12).toString().split(".")[0])
    const days = parseInt(((moment(endTime).diff(moment.unix(time).format(), 'days')) / 30).toString().split(".")[0])
    const hours = parseInt(((moment(endTime).diff(moment.unix(time).format(), 'hours')) / 24).toString().split(".")[0])
    return <span className='time-create-post'>
      <span>
        {years > 0 ? `${years} years` : months > 0 ? `${months} months` : days > 0 ? `${days} days ` : hours > 0 && `${hours} hours `}
      </span>
    </span>
  }


  return (
    <div className='content-box'>
      <div className='content-header'>
        <p>Tin tức</p>
        <img src='/menu.png' alt='img-list'/>
      </div>
      <div className='content-center'>
        {posts && posts.map((item, index) => (
            <div 
              key={index}
              className={`${postType === VIDEO && item?.postFile === '' ? 'content-item-none' : 'content-item'}`} 
              style={{ 
                backgroundImage: `url(${item.postLinkImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <>
                {postType && postType === TEXT ? (
                  <div onClick={() => handleClickPost(item, index)}>
                    <div 
                      className='content-background-color' 
                      style={{ 
                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.297), ${random()} 80%)`,
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0'
                      }}
                    >
                    </div>
                    <div className={`${item.postLinkImage === '' ? 'content-item-image' : 'content-item-none'}`}>
                      <img src={item.postLinkImage === '' && !_.isEmpty(item.photo_multi) && item.photo_multi[0].image} alt='img-post'/>
                    </div>
                    <div className={`${item.postLinkImage === '' &&  item?.photo_multi ? 'content-item-image-number' : 'content-item-number-none'}`}>
                      {item?.photo_multi?.length} +
                    </div>
                    <div className='content-main'>
                      <div className='content-title'>{item.postLinkTitle}</div>
                      <div className='content-text'>{item.postLinkContent}</div>
                    </div>
                    <div className={`${item?.postLinkContent === '' ? 'content-item-post-text' : 'content-item-post-none'}`}>
                      {parse(`${item.postText}`)}
                    </div>
                    <div className='content-item-publisher'>
                      <div className='content-item-publisher-user'>
                        <div className='content-item-publisher-image'>
                          <a href={item.publisher.url} target='_blank'>
                            <img src={item.publisher.avatar} alt='avatar'></img>
                          </a>
                        </div>
                        <span className='content-item-publisher-name'>
                          <a href={item.publisher.url} target='_blank'>
                            {item?.publisher?.name}
                          </a>
                        </span>
                        <span className='content-item-publisher-hours'>
                          {renderHours(item.time, CURENT_TIME)}
                        </span>
                      </div>
                      <div className='content-item-more-setting'>
                        <img src='/dots.png' alt='more-post'/>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={`${item?.postFile !== '' ? '' : 'content-video-none'}`}>
                      <div className='content-video-url' onClick={() => handleClickPost(item, index)}></div>
                      <div className='content-video'>
                        <video className='content-video-item' controls>
                          <source src={item?.postFile !== '' && item?.postFile} type={`${item?.postFile !== '' && 'video/mp4' }`}/>
                        </video>
                      </div>
                      <div className='content-video-main'>
                        <div className='content-video-publisher'>
                          <div className='content-video-avatar'>
                            <a href={item?.publisher?.url} >
                              <img src={item.publisher.avatar} alt='avatar-publisher'/>
                            </a>
                          </div>
                          <div className='content-video-name'>
                            {item?.publisher?.username}  
                          </div>
                        </div>
                        <div className='content-video-text'>
                          {item?.postFileName ? item?.postFileName : item?.postText}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            </div>
        ))}
      </div>
    </div>
  )
}
export default Content
