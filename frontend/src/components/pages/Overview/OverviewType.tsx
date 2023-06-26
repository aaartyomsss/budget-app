import { Button } from 'antd'
import React from 'react'
import { SetState } from '../../../types/common'
import { EOverviewType } from './Overview'
import './OverviewType.css'

type Props = {
  selectedType: EOverviewType
  setOverviewType: SetState<EOverviewType>
}

const OverviewType = (props: Props) => {
  const returnBtnVariant = (t: EOverviewType) => {
    return t === props.selectedType ? 'primary' : 'default'
  }

  return (
    <div className='overview-type-container'>
      <Button
        className='overview-type-button'
        type={returnBtnVariant(EOverviewType.ALL)}
        onClick={() => props.setOverviewType(EOverviewType.ALL)}
      >
        All expenses
      </Button>
      <Button
        className='overview-type-button'
        type={returnBtnVariant(EOverviewType.PERSONAL)}
        onClick={() => props.setOverviewType(EOverviewType.PERSONAL)}
      >
        Only personal
      </Button>
      <Button
        className='overview-type-button'
        type={returnBtnVariant(EOverviewType.FAMILY)}
        onClick={() => props.setOverviewType(EOverviewType.FAMILY)}
      >
        Only family expenses
      </Button>
    </div>
  )
}

export default OverviewType
