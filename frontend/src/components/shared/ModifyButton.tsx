import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setCache } from '../../reducers/cacheReducer'
// Modify button in list to change info about expense
const ModifyButton = ({ expense, onClick }) => {
  const dispatch = useDispatch()

  const handleModify = (obj) => {
    dispatch(setCache(obj))
    onClick()
  }

  return (
    <Button onClick={() => handleModify(expense)}>
      <EditOutlined />
    </Button>
  )
}

export default ModifyButton
