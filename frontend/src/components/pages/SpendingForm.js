import React from 'react'
import { Form, DatePicker, Input, Button } from 'antd'
import { serverDateFormatter } from '../../functions/helperFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { addExpense, modifyExpense } from '../../reducers/personalReducer'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { clearCache } from '../../reducers/cacheReducer'
import '../../styles.css'
import CustomSelectCategory from '../forms/CustomSelectCategory'

const SpendingForm = () => {
  const dispatch = useDispatch()
  // To modify expense
  const cache = useSelector((state) => state.cache)

  const history = useHistory()

  const onAdd = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      type: fieldsValue['type'].type,
      date: serverDateFormatter(fieldsValue['date'].format('DD/MM/YYYY')),
    }
    dispatch(addExpense(values))
    history.push('/personal-plan')
  }

  const onModify = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      type: fieldsValue['type'].type,
      date: serverDateFormatter(fieldsValue['date'].format('DD/MM/YYYY')),
    }
    const passID = cache.id
    dispatch(modifyExpense(passID, values))
    dispatch(clearCache())
    history.push('/personal-plan')
  }

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  }

  return (
    <div style={{ margin: '2em 0em' }} className="center-div border-form">
      <Form
        onFinish={cache ? onModify : onAdd}
        {...layout}
        initialValues={{
          ['title']: cache ? cache.title : '', // eslint-disable-line
          ['type']: '', // eslint-disable-line
          ['amountSpent']: cache ? cache.amountSpent : '', // eslint-disable-line
          ['date']: cache ? moment(cache.date, 'DD/MM/YYYY') : moment(), // eslint-disable-line
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Amount spent"
          name="amountSpent"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="type"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <CustomSelectCategory />
        </Form.Item>
        <Form.Item label="Date" name="date">
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            {cache ? 'Modify' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SpendingForm
