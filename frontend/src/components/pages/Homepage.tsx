import { useGoogleLogin } from '@react-oauth/google'
import { Button, Col, Divider, Row, Typography } from 'antd'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initialPersonalPlan } from '../../reducers/personalReducer'
import { login as _login } from '../../reducers/userReducer'
import userService from '../../services/userService'
import '../../styles.css'

const Homepage = () => {
  const { Title } = Typography
  const dispatch = useDispatch()
  const login = useGoogleLogin({
    scope: 'email profile',
    onSuccess: async (res) => {
      console.log(res)
      await handleLoginSuccess(res.access_token)
    },
  })

  const handleLoginSuccess = async (googleAuthToken) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {
            Authorization: `Bearer ${googleAuthToken}`,
          },
        }
      )

      if (response.ok) {
        const _user = await response.json()

        const reqData = {
          googleId: _user.id,
          email: _user.email,
          name: _user.name,
          image: _user.picture,
        }

        const user = await userService.postGoogle(reqData)
        if (user) {
          window.localStorage.setItem('loggedInUser', JSON.stringify(user))
          axios.defaults.headers.common[
            'Authorization'
          ] = `bearer ${user.token}`
          dispatch(_login(user))
          dispatch(initialPersonalPlan())
        }
      } else {
        console.error('Failed to fetch user data:', response.status)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  return (
    <div className='center-div border text-align-center homepage'>
      <Typography>
        <Title>Budget App</Title>
        <Title type='secondary' level={4}>
          Simple money management solution
        </Title>
      </Typography>
      <Divider>
        <Title type='secondary' level={5}>
          CHOOSE
        </Title>
      </Divider>
      <div style={{ padding: 'auto', margin: '0 4em' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Button type='primary' block={true}>
              <Link to='/login'>Login</Link>
            </Button>
          </Col>
          <Col span={12}>
            <Button type='primary' block={true}>
              <Link to='/sign-up'>Sing Up</Link>
            </Button>
          </Col>
        </Row>
      </div>
      <Divider>
        <Title type='secondary' level={5}>
          OR
        </Title>
      </Divider>
      <div className='google-btn'>
        <Button onClick={() => login()}>Sing in with google</Button>
      </div>
    </div>
  )
}

export default Homepage
