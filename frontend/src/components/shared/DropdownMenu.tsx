import {
  DownOutlined,
  EuroCircleOutlined,
  IdcardOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Badge, Button, Dropdown } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Store } from '../../store'
import Logout from './Logout'

const REQUEST_SENT = 'SENT'

const DropdownMenu = () => {
  const invitationsReceived = useSelector((state: Store) => {
    return state.invitationReducer.received.filter(
      (invitation) => invitation.status === REQUEST_SENT
    )
  })

  const items: MenuProps['items'] = [
    {
      key: 'my-profile',
      label: <Link to='my-profile'>My profile</Link>,
      icon: <IdcardOutlined />,
    },
    {
      key: 'personal-plan',
      label: <Link to='/personal-plan'>Personal expenses</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'family-plans',
      label: (
        <Badge dot={!!invitationsReceived.length}>
          <Link to='/family-plans' style={{ color: 'black' }}>
            Family plan
          </Link>
        </Badge>
      ),
      icon: <TeamOutlined />,
    },
    {
      key: 'personal-overview',
      label: <Link to='/personal-overview'>Overview</Link>,
      icon: <PieChartOutlined />,
    },
    {
      key: 'my-earning',
      label: <Link to='/'>My earnings</Link>,
      icon: <EuroCircleOutlined />,
      disabled: true,
    },
    {
      key: 'logout',
      label: <Logout />,
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <Dropdown key='more' menu={{ items }}>
      <Button
        onClick={(e) => e.preventDefault()}
        type='default'
        style={{
          display: 'inline-block',
        }}
      >
        Menu <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default DropdownMenu
