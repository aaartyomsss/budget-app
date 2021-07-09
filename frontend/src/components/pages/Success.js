import React from 'react'
import { Button, Result } from 'antd'
import { useHistory } from 'react-router-dom'
import '../../styles.css'

const Success = ({ button }) => {

    const history = useHistory()

    const extras = button ? [<Button key='proceed' onClick={() => history.push('/login')}>Proceed to login</Button>] : []

    return (
        <div className='center-div'>
            <Result 
                status='success'
                title='Registration completed'
                subTitle='Activation link was sent to your e-mail'
                extra={extras}
            />
        </div>
    )

}

export default Success