import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Divider, Row, Col } from 'antd'
import '../../styles.css'
import { GoogleLogin } from 'react-google-login'
import userService from '../../services/userService'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/userReducer'
import personalService from '../../services/personalService'
import { initialPersonalPlan } from '../../reducers/personalReducer'

const Homepage = () => {
  const { Title } = Typography
  const dispatch = useDispatch()

  const responseGoogle = async (response) => {
    // TODO Save only token and make request to server
    const user = await userService.postGoogle(response.profileObj)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    dispatch(login(user))
    dispatch(initialPersonalPlan())
  }

  return (
    <div className="center-div border text-align-center homepage">
      <Typography>
        <Title>Budget App</Title>
        <Title type="secondary" level={4}>
          Simple money management solution
        </Title>
      </Typography>
      <Divider>
        <Title type="secondary" level={5}>
          CHOOSE
        </Title>
      </Divider>
      <div style={{ padding: 'auto', margin: '0 4em' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Button type="primary" block={true}>
              <Link to="/login">Login</Link>
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block={true}>
              <Link to="/sign-up">Sing Up</Link>
            </Button>
          </Col>
        </Row>
      </div>
      <Divider>
        <Title type="secondary" level={5}>
          OR
        </Title>
      </Divider>
      <div className="google-btn">
        <GoogleLogin
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          clientId={import.meta.env.REACT_APP_CLIENT_ID}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}

export default Homepage
