import React, { useState } from 'react'
import { Select, Divider, Input, Button } from 'antd'
import { capitalizeString } from '../../functions/helperFunctions'
import { useSelector } from 'react-redux'
import { Store } from '../../store'

// Following component will allow user to pick already entered previously category,
// Or add new one
const CustomSelectCategory = ({ value = {}, onChange }) => {
  // To add existing categories to the form-field
  const categories = useSelector((state: Store) =>
    state.personalExpenses.map((exp) => capitalizeString(exp.type))
  )
  const categoriesWithoutDuplicates = [...new Set(categories)]
  const { Option } = Select

  const [items, setItems] = useState(categoriesWithoutDuplicates)
  const [type, setValue] = useState('')

  // Handling form field behavior
  const triggerChange = (changedValue) => {
    onChange({
      type,
      ...value,
      ...changedValue,
    })
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
            <Button onClick={concatOptions}>Add new category</Button>
          </div>
        </div>
      )}
    >
      {items.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  )
}

export default CustomSelectCategory
