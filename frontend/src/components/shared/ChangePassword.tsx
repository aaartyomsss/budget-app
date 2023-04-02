import React from 'react'
import userService from '../../services/userService'
import { Button, Form, Input, message } from 'antd'
// Following component will have different logic
// depending on whether we forgot password
// or simply want to change it
// Current implementation: only logged in user is able to change password
const ChangePassword = ({ type, username, setVisibility }) => {

  // For clearing form fields
  const [form] = Form.useForm()

  // Styles for form
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 10,
    },
  }


  // TODO on finish after success form should close automatically
  const onFinish = async values => {
    const creds = {
      newPassword: values.newPassword,
      currentPassword: values.currentPassword,
      username
    }
    try {
      const res = await userService.changePassword(creds)
      message.success(`${res.data.message}`)
      form.resetFields()
      setVisibility(false)
    } catch (error) {
      message.error('Current password is incorrect')
    }
  }

  return (
    <Form onFinish={onFinish} {...layout} form={form}>
      {/* if user logged in he should enter current password */}
      {type === 'loggedIn' ?
        <Form.Item
          label='Current password'
          name='currentPassword'
          rules={[
            {
              required: true,
              message: 'Please enter current password'
            }

          ]}
        >
          <Input.Password/>
        </Form.Item>
        : null
      }

      <Form.Item
        label='New password'
        name='newPassword'
        rules={[
          {
            required: true,
            message: 'Please enter new password'
          }
        ]}
      >

        <Input.Password min={6}/>

      </Form.Item>

      <Form.Item
        label='Confirm password'
        name='confirm'
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm password'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Passwords do not match'))
            }
          })
        ]}
      >

        <Input.Password min={6}/>

      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button htmlType='submit' type='primary'>Change Password</Button>
      </Form.Item>
    </Form>
  )

}

export default ChangePassword