import React from 'react'
import { Form, Input, Button, message } from 'antd'
import userService from '../../services/userService'
import '../../styles.css'
import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  }

  const handleSubmit = async (values) => {
    const newUser = await userService.register(values)
    if (newUser.error) {
      message.error(newUser.error)
    } else {
      history.push('/successful-registration')
    }
  }

  window.addEventListener('popstate', () => {
    history.push('/')
  })

  return (
    <div className="center-div" style={{ marginTop: '10rem' }}>
      <Form form={form} onFinish={handleSubmit} {...layout}>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'This is not a valid e-mail',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters long',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject('Passwords do not match')
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SignUp
