import React from 'react'
import { PageHeader } from 'antd'
import DropdownMenu from './DropdownMenu'

const NavBar = ({ user }) => {
  const subTitle = !user ? '' : `Welcome ${user.name}`

  // Following hook checks what is the location and therefore
  // Based on it displays neccessary extras, i.e. buttons

  return (
    <div style={{ border: '1px solid black' }}>
      <PageHeader
        title="Budget App"
        subTitle={subTitle}
        extra={[user ? <DropdownMenu key="1" /> : null]}
      />
    </div>
  )
}

export default NavBar
