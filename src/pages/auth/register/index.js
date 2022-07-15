import React, { useState } from 'react'
// import React, { useState, useEffect } from 'react'
// import { Button, Form, Input, Image, Select, Spin } from 'antd'
import { setCookie, STORAGEKEY } from '../../../utils/storage'
import { Button, Form, Input } from 'antd'
import { post } from '../../../api/BaseRequest'
import { useDispatch } from 'react-redux/es/exports'
import { getUserInfo } from '../../../redux/useInfo'
// import { validateAddress, validatePhone, validateEmail, validatePassword, validateMaxLength } from '../../../utils/regex'
import { validateEmail, validatePassword } from '../../../utils/regex'
// import phones from '../../../utils/phoneCode.json'
// import axios from 'axios'
// const { Option } = Select
export const Signup = ({ setIsModalSignup }) => {
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  // const [image, setImage] = useState()
  const [open, setOpen] = useState(false)
  // const [countryCode, setCountryCode] = useState()
  // const [listPhoneCode, setListPhoneCode] = useState(phones)
  // const [phoneCode, setPhoneCode] = useState()
  // const [typeSearch, setTypeSearch] = useState('number')
  const dispatch = useDispatch()
  const onFinish = async(values) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        // 'Accept': 'application/json'
      }
    }
    console.log(values)
    try {
      // const formData = new FormData()
      // Object.keys(values).forEach(key => formData.append(`${key}`, values[key]))
      // formData.append('image', image)
      // formData.append('isAdmin', false)
      const res = await post('create-account', values.user)
      console.log(res)
      const token = res.data.token
      await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
      await dispatch(getUserInfo())
      setMessage('Đăng ký thành công! Kiểm tra email của bạn để lấy thông tin đăng nhập')
      setOpen(true)
      setIsModalSignup(false)
    } catch (error) {
      error?.response?.data && setError(error.response.data.message)
    }
  }

  // const handleChangePhoneCode = (value) => {
  //   setPhoneCode(value)
  // }

  // const handleSearchPhoneCode = (value) => {
  //   const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  //   number.some((item) => {
  //     if (parseInt(value.slice(0, 1)) === item) {
  //       setTypeSearch('number')
  //       setListPhoneCode(phones.filter((phone) => ((phone.dial_code.slice(1).slice(0, value.length) === value))))
  //       return true
  //     } else {
  //       setTypeSearch('string')
  //       setListPhoneCode(phones.filter((phone) => (phone.code.slice(0, value.length).toLowerCase() === value.toLowerCase())))
  //       return false
  //     }
  //   })
  // }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // useEffect(() => {
  //   axios.get(`https://ip.nf/me.json`).then(({ data }) => setCountryCode({ ...data.ip })).catch((error) => console.log(error))
  // }, [])

  // useEffect(() => {
  //   const getPhoneCode = () => {
  //     countryCode && listPhoneCode && listPhoneCode.map((item) => {
  //       if (item.code === countryCode.country_code) {
  //         setPhoneCode(item.dial_code.slice(1))
  //       }
  //     })
  //   }
  //   getPhoneCode()
  // }, [countryCode])

  // const prefixSelector = (
  //   <Form.Item name='prefix' noStyle>
  //     {console.log(listPhoneCode)}
  //     <Select
  //       style={{ width: 120 }}
  //       onChange={handleChangePhoneCode}
  //       defaultValue={phoneCode !== '' ? phoneCode : ''}
  //       showSearch={true}
  //       onSearch={handleSearchPhoneCode}
  //     >
  //       {listPhoneCode.map((item, index) => (
  //         <Option key={index} value={typeSearch === 'number' ? `${item.dial_code.slice(1)}` : item.code}>
  //           <span className='country-code'>{item.code}</span>
  //           <span className='country-symbol'>{item.dial_code}</span>
  //         </Option>
  //       ))}
  //     </Select>
  //   </Form.Item>
  // )

  return (
    <>
      {/* // phoneCode !== undefined ? (<Form labelCol={{ span: 8 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}> */}
      <Form labelCol={{ span: 8 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {message && message}
        {open && open}
        {/* <div>
          <Image
            width={200}
            src={image ? (URL.createObjectURL(image)) : '/images/user.png'}
          />
        </div>
        <div>
          <Input
            type='file'
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div> */}
        {/* <Form.Item
          name={['user', 'name']}
          label='Name'
          rules={[
            {
              required: true,
              message: 'Please input your name!'
            }
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          name={['user', 'username']}
          label='User Name'
          rules={[
            {
              required: true,
              message: 'Please input your user name!',
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label='Email'
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
              pattern: new RegExp(validateEmail)
            }
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name={['user', 'phone']}
          label='Phone'
          rules={[
            {
              required: true,
              pattern: new RegExp(validatePhone),
              message: 'Format is wrong'
            },
            {
              pattern: validateMaxLength,
              message: 'Số điện thoại tối đa 12 số'
            }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%'
            }}
          />
        </Form.Item> */}
        {/* <Form.Item
          name={['user', 'address']}
          label='Address'
          rules={[
            {
              required: true,
              message: 'Please input your address!',
              pattern: new RegExp(validateAddress)
            }
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
        name={['user', 'password']}
        label='Password'
        rules={[
          {
            required: true,
            message: 'Please input your password! '
          },
          {
            message: 'Your password must have atleast 8 characters with 1 Upper Case character',
            pattern: new RegExp(validatePassword)
          }
        ]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item
        name={['user', 'confirm_password']}
        label='Confirm Password'
        dependencies={['user', 'password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue(['user', 'password']) === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'))
            }
          })
        ]}
      >
        <Input.Password/>
      </Form.Item>


        {error && error}
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* // : (<div
      //   className='example'
      //   style={{
      //     margin: '20px 0',
      //     marginBottom: '20px',
      //     padding: '30px 50px',
      //     textAlign: 'center',
      //     background: 'rgba(0, 0, 0, 0.05)',
      //     borderRadius: '4px'
      //   }}
      // >
      //   <Spin size='large' />
      // </div>) */}
    </>
  )
}
