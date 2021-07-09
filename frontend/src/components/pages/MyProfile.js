import React, { useState } from 'react'
import { Card, Popover, Spin } from 'antd'
import { RedoOutlined } from '@ant-design/icons'
import ChangePassword from '../shared/ChangePassword'
import '../../styles.css'


// TODO component that should provide some features like
// Changing password, general information, and some other functions would be added further on
const MyProfile = ({ user }) => {

    const { Meta } = Card
    // State that handles visibility of Popover
    const [ visibility, setVisibility ] = useState(false)

    // If user refreshesh page at the tab, component shloud receive user first
    if (!user) {
        return (
            <div className='center-elements-in-div' style={{height: '100vh'}}>
                <Spin tip='Loading'></Spin>
            </div>
        )
    }

    return( 
        <Card
            actions={[
                <Popover
                    trigger='click'
                    title='Change password'
                    visibility={visibility}
                    content={<ChangePassword type='loggedIn' username={user.username} setVisibility={setVisibility}/>}
                >
                    <RedoOutlined />
                </Popover>
            ]}
        >
            <Meta
                title={user.name}
                description={`username: ${user.username}`}
            />
        </Card>
    )

}

export default MyProfile