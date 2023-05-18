import React, { useEffect, useRef, useState } from 'react'
import { Select, Divider, Input, Button, message } from 'antd'
import { capitalizeString } from '../../functions/helperFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { initialPersonalPlan } from '../../reducers/personalReducer'
import { Store } from '../../store'

// Following component will allow user to pick already entered previously category,
// Or add new one

type Props = {
  value?: any
  onChange?: (o: any) => void
}

const CustomSelectCategory = ({ value = {}, onChange }: Props) => {
  // To add existing categories to the form-field
  const dispatch = useDispatch()
  const categories = useSelector((state: Store) =>
    state.personalExpenses.map((exp) => capitalizeString(exp.type))
  )

  useEffect(() => {
    const getExpenses = async () => {
      console.log('CALLED HERE IN EPXS')
      dispatch(initialPersonalPlan())
      console.log('DONE CALLING')
    }
    getExpenses()
  }, [])

  const categoriesWithoutDuplicates = [...new Set(categories)]
  const { Option } = Select

  const [items, setItems] = useState(categoriesWithoutDuplicates)
  const [type, setValue] = useState('')

  // Handling form field behavior
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        type,
        ...value,
        ...changedValue,
      })
    }
  }

  const concatOptions = () => {
    setItems([...items, capitalizeString(type)])
    setValue('')
  }

  const addedCategory = (event) => {
    setValue(event.target.value)
    triggerChange({
      type: type,
    })
  }

  // Select field value change
  const onCategoryChange = (category) => {
    setValue(category)

    triggerChange({
      type: category,
    })
  }

  return (
    <Select
      placeholder="Choose existing category or add new one"
      onChange={onCategoryChange}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div>
            <Input value={type} onChange={addedCategory} />
            <Button disabled={type === ''} onClick={concatOptions}>
              Add new category
            </Button>
          </div>
        </div>
      )}
    >
      {items.map((item, i) => (
        <Option key={`${item}${i}`} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  )
}

export default CustomSelectCategory
