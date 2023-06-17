import React from 'react'
import { Form, DatePicker, Input, Button, message, Modal } from 'antd'
import { serverDateFormatter } from '../../functions/helperFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { addExpense, modifyExpense } from '../../reducers/personalReducer'
import personalService from '../../services/personalService'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { clearCache } from '../../reducers/cacheReducer'
import '../../styles.css'
import CustomSelectCategory from '../forms/CustomSelectCategory'
import { Store } from '../../store'
import { CreateExpense } from '../../types/expense'
import familyPlanService from '../../services/familyPlanService'
import { SetState } from '../../types/common'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: SetState<boolean>
  familyPlanId?: string
}

const SpendingForm = (props: Props) => {
  const dispatch = useDispatch()
  // To modify expense
  const cache = useSelector((state: Store) => state.cache)

  const history = useHistory()

  const onAdd = async (fieldsValue) => {
    const values = {
      ...fieldsValue,
      type: fieldsValue['type'].type,
      date: serverDateFormatter(fieldsValue['date'].format('DD/MM/YYYY')),
    } as CreateExpense

    const res = props.familyPlanId
      ? await familyPlanService.addExpensesToThePlan(props.familyPlanId, values)
      : await personalService.addExpense(values)

    if (res.status !== 201) {
      message.error(res.data.error)
      return
    }
    dispatch(addExpense(res.data))
    props.setIsModalOpen(false)
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
    props.setIsModalOpen(false)
  }

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
  }

  return (
    <Modal open={props.isModalOpen} title="Add expense">
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
    </Modal>
  )
}

export default SpendingForm
