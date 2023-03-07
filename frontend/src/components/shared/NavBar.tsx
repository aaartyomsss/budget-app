import React, { useEffect, useState } from 'react'
import { PageHeader } from 'antd'
import DropdownMenu from './DropdownMenu'
import { useLocation, useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const NavBar = ({ user }) => {
  const location = useLocation()
  const history = useHistory()
  const subTitle = user === null ? '' : `Welcome ${user.name}`
  const [currentPage, setCurrentPage] = useState(null)

  // Following hook checks what is the location and therefore
  // Based on it displays neccessary extras, i.e. buttons
  useEffect(() => {
    setCurrentPage(location.pathname)
  }, [location.pathname])

  const returnAddSpending = () => {
    return currentPage === '/personal-plan' ? (
      <Button key="2" onClick={() => history.push('/spending-form')}>
        <PlusOutlined />
        Add expense
      </Button>
    ) : null
  }

  return (
    <div style={{ border: '1px solid black' }}>
      <PageHeader
        title="Budget App"
        subTitle={subTitle}
        extra={[returnAddSpending(), user ? <DropdownMenu key="1" /> : null]}
      />
    </div>
  )
}

export default NavBar
