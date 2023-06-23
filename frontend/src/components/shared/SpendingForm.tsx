import { Button, DatePicker, Form, Input, Modal, message } from 'antd'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverDateFormatter } from '../../functions/helperFunctions'
import { clearCache } from '../../reducers/cacheReducer'
import { addExpense, modifyExpense } from '../../reducers/personalReducer'
import familyPlanService from '../../services/familyPlanService'
import personalService from '../../services/personalService'
import { Store } from '../../store'
import '../../styles.css'
import type { SetState } from '../../types/common'
import { CreateExpense, Expense } from '../../types/expense'
import CustomSelectCategory from '../forms/CustomSelectCategory'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: SetState<boolean>
  familyPlanId?: string
  onAddFamilyExpenses?: (e: Expense) => void
  onModifyFamilyExpense?: (e: Expense) => void
}

const SpendingForm = (props: Props) => {
  const dispatch = useDispatch()
  // To modify expense
  const cache = useSelector((state: Store) => state.cache)
  const [form] = Form.useForm()

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

    props.familyPlanId && props.onAddFamilyExpenses
      ? props.onAddFamilyExpenses(res.data)
      : dispatch(addExpense(res.data))

    props.setIsModalOpen(false)
  }

  const onModify = async (fieldsValue) => {
    const values = {
      ...fieldsValue,
      type: fieldsValue['type'].type,
      date: serverDateFormatter(fieldsValue['date'].format('DD/MM/YYYY')),
    }
    const passID = cache.id
    const res = props.familyPlanId
      ? await familyPlanService.modifyExpenseFromThePlan(
          props.familyPlanId,
          passID,
          values
        )
      : await personalService.modifyExpense(passID, values)

    if (![200, 201].includes(res.status)) {
      message.error(res.data.error)
      return
    }

    props.familyPlanId && props.onModifyFamilyExpense
      ? props.onModifyFamilyExpense(res.data)
      : dispatch(modifyExpense(res.data))

    props.setIsModalOpen(false)
  }

  const onModalCancel = () => {
    dispatch(clearCache())
    form.resetFields()
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
    <Modal
      open={props.isModalOpen}
      title='Add expense'
      footer={null}
      onCancel={onModalCancel}
    >
      <Form
        onFinish={cache ? onModify : onAdd}
        form={form}
        {...layout}
        initialValues={{
          ['title']: cache ? cache.title : '', // eslint-disable-line
          ['type']: '', // eslint-disable-line
          ['amountSpent']: cache ? cache.amountSpent : '', // eslint-disable-line
          ['date']: cache ? moment(cache.date) : moment(), // eslint-disable-line
        }}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Amount spent'
          name='amountSpent'
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Category'
          name='type'
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <CustomSelectCategory familyPlanId={props.familyPlanId} />
        </Form.Item>
        <Form.Item label='Date' name='date'>
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType='submit' type='primary'>
            {cache ? 'Modify' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SpendingForm
