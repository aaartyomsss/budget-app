import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../reducers/userReducer'
import { useHistory, Link } from 'react-router-dom'
import { logoutClear } from '../../reducers/personalReducer'
import { LogoutOutlined } from '@ant-design/icons'

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logout())
    dispatch(logoutClear())
    history.push('/')
  }

  return (
    <Link onClick={handleLogout} to="/">
      <LogoutOutlined />
      Logout
    </Link> // eslint-disable-line
  )
}

export default Logout
