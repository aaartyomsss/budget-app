import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutClear } from '../../reducers/personalReducer'
import { logout } from '../../reducers/userReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.clear()
    axios.defaults.headers.common['Authorization'] = undefined
    dispatch(logout())
    dispatch(logoutClear())
    history.push('/')
  }

  return (
    <Link onClick={handleLogout} to='/'>
      Logout
    </Link> // eslint-disable-line
  )
}

export default Logout
