import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useMobile } from '../../hooks/useMobile'
import {
  setReceivedRequests,
  setSentRequests,
} from '../../reducers/invitationReducer'
import { initialPersonalPlan } from '../../reducers/personalReducer'
import { login } from '../../reducers/userReducer'
import loginService from '../../services/userService'
import '../../styles.css'
import './Login.css'

const Login = () => {
  const isMobile = useMobile(768)
  const dispatch = useDispatch()
  const history = useHistory()
  // TODO Refactor this
  const handleSubmit = async (values) => {
    try {
      // TODO Save only token and make request to server
      const user = await loginService.login(values)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      dispatch(login(user))
      dispatch(setSentRequests(user.id))
      dispatch(setReceivedRequests(user.id))
      dispatch(initialPersonalPlan())
      history.push('/personal-plan')
    } catch (error: any) {
      if (error.message === 'Request failed with status code 401') {
        message.error('Invalid credentials')
      }
    }
  }

  window.addEventListener('popstate', () => {
    history.push('/')
  })

  const layout = {
    labelCol: {
      span: !isMobile ? 8 : 4,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      span: 16,
      offset: !isMobile ? 8 : 0,
    },
  }

  return (
    <div className='login-form-container'>
      <Form onFinish={handleSubmit} {...layout} style={{ width: 300 }}>
        <Form.Item
          name='username'
          label='Username'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button htmlType='submit' type='primary'>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
