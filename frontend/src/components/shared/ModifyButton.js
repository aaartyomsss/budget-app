import React from 'react'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { setCache } from '../../reducers/cacheReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Modify button in list to change info about expense
const ModifyButton = ({expense}) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const handleModify = obj => {
        dispatch(setCache(obj))
        history.push('/spending-form')
    }

    return (
        <Button onClick={() => handleModify(expense)}><EditOutlined /></Button>
    )

}

export default ModifyButton