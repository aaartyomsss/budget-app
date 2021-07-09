import React from 'react'
import { Radio } from 'antd'
import './OverviewFilterNavbar.css'

const OverviewFilterNavbar = ({ setFilter, filter }) => {

    return (
        <Radio.Group onChange={({ target }) => setFilter(target.value)} defaultValue={filter} className="radio-btns-navbar">
                <Radio.Button value="year" className="radio-btn" block>Year</Radio.Button>
                <Radio.Button value="month" className="radio-btn" block>Month</Radio.Button>
        </Radio.Group>
    )

}

export default OverviewFilterNavbar