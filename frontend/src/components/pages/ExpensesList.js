import React from 'react'
import { Table, Space, Layout } from 'antd'
import { dateFormatter, toTime } from '../../functions/helperFunctions'
import { useDispatch } from 'react-redux'
import { removeExpense } from '../../reducers/personalReducer'
import RemoveButton from '../shared/RemoveButton'
import ModifyButton from '../shared/ModifyButton'
import '../../styles.css'

// Component that displays list of personal/ family expenses

const ExpensesList = ({ expenses }) => {

    const dispatch = useDispatch()
    const { Column, ColumnGroup } = Table
    const { Content, Footer } = Layout
    
    expenses.forEach((obj) => {
        
        // RegEx that will ignore already formatted dates
        const reqPattern = /[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]/

        if (!reqPattern.test(obj.date)){
            obj.date = dateFormatter(obj.date)
        }
   
        return obj.key = obj.id
    })

    return (
        <div>
            <Layout style={{ height: '100%'}}>
                <Content>
                    <Table dataSource={expenses}>
                        <ColumnGroup>
                            <Column title='Title' dataIndex='title' key='title'/>
                            <Column title='Spent' dataIndex='amountSpent' key='amountSpent' sorter={(a, b) => a.amountSpent - b.amountSpent}/>
                            <Column title='Category' dataIndex='type' key='type' />
                            <Column title='Date' dataIndex='date' key='date' defaultSortOrder='descend' sorter={(a, b) => toTime(a.date) - toTime(b.date)}/>
                            <Column
                            title='Actions'
                            key='actions'
                            render={(_text, record) => (
                                <Space size='middle'>
                                    <RemoveButton onClick={() => dispatch(removeExpense(record.id))}/>
                                    <ModifyButton expense={record}/>
                                </Space>
                            )}
                        />
                        </ColumnGroup>
                    </Table>
                </Content>
            </Layout>
            <Footer className='footer'>Created by Artjom Savin, University of Helsinki</Footer>
        </div>
    )

}

export default ExpensesList