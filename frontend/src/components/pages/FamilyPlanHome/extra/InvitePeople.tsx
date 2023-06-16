import React, { useState, useEffect, useMemo } from 'react'
import { Input, Select, Spin, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import familyPlanService from '../../../../services/familyPlanService'
import debounce from 'lodash.debounce'
import InviteUserCard from './InviteUserCard'
import { sendRequest } from '../../../../reducers/invitationReducer'
import '../assets/InvitePeople.css'
import { Store } from '../../../../store'
import { IInvitation } from '../../../../types/invitation'
import { FamilyPlan } from '../../../../types/expense'
import { User } from '../../../../types/user'

const InvitePeople = ({ user }) => {
  const { Option } = Select
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [queryResults, setQueryResults] = useState([])
  const [planForInvitation, setPlanForInvitation] = useState<string | null>(
    null
  )

  const invitations = useSelector<Store, IInvitation[]>(
    ({ invitationReducer }) => invitationReducer.sent
  )
  const familyPlans = useSelector<Store, FamilyPlan[]>(
    ({ familyPlanReducer }) => familyPlanReducer
  )

  const onSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    const value = e.target.value
    if (value !== '') {
      const { data } = await familyPlanService.searchUser(value),
        { foundUsers } = data
      if (foundUsers) {
        const result = foundUsers.filter(
          (foundUser) => foundUser.id !== user.id
        )
        setQueryResults(result)
      }
    }
    setLoading(false)
  }

  const sendInvite = (recepientId) => {
    if (!planForInvitation) return message.error('You have not selected a plan')

    const [id, planName] = planForInvitation.split(':')
    const params = {
      recepientId,
      planId: id,
      requester: user.id,
      planName: planName,
    }
    dispatch(sendRequest(params))
  }

  const handlePlanSelection = (val: string) => {
    setPlanForInvitation(val)
  }

  const debounceHandler = useMemo(() => debounce(onSearch, 300), [])

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => debounceHandler.cancel()
  }, []) // eslint-disable-line

  const renderInputs = () => {
    return (
      <>
        <Input placeholder="Enter username" onChange={debounceHandler} />
        <Select
          placeholder="Select a plan to which you want to invite the user"
          onChange={handlePlanSelection}
        >
          {familyPlans.map((plan) => {
            return (
              <Option key={plan.id} value={`${plan.id}:${plan.planName}`}>
                {plan.planName}
              </Option>
            )
          })}
        </Select>
      </>
    )
  }

  const renderContent = () => {
    if (loading)
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10rem',
          }}
        >
          <Spin size="large" />
        </div>
      )

    return (
      <>
        <div className="text-container">
          <span className="secondary-text">
            Users found: {queryResults.length}
          </span>
        </div>
        <div className="user-list">
          {queryResults &&
            queryResults.map((foundUser: User) => {
              return (
                <InviteUserCard
                  key={foundUser.id}
                  {...{ foundUser, invitations, sendInvite }}
                />
              )
            })}
        </div>
      </>
    )
  }

  return (
    <div>
      {renderInputs()}
      {renderContent()}
    </div>
  )
}

export default InvitePeople
