import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  createFamilyPlan,
  initialFamilyPlans,
} from '../../../reducers/familyPlanReducer'
import { Popover, Button, Tabs, Badge } from 'antd'
import FamilyPlansList from './extra/FamilyPlansList'
import InvitePeople from './extra/InvitePeople'
import MyInvitations from './extra/MyInvitations'
import './assets/FamilyPlanHome.css'
import { Store } from '../../../store'
import familyPlanService from '../../../services/familyPlanService'

const REQUEST_SENT = 'SENT'

const FamilyPlanHome = () => {
  const { TabPane } = Tabs
  const user = useSelector<Store>(({ user }) => user)
  const dispatch = useDispatch()
  const familyPlans = useSelector((state: Store) => state.familyPlanReducer)
  const invitationsReceived = useSelector((state: Store) => {
    return state.invitationReducer.received.filter(
      (invitation) => invitation.status === REQUEST_SENT
    )
  })

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await familyPlanService.getUserPlans()
      dispatch(initialFamilyPlans(res.data))
    }
    fetchPlans()
  }, [])

  // No plans block
  if (familyPlans.length === 0 && invitationsReceived.length === 0) {
    return (
      <div className="outer-container">
        <div className="centering-container">
          <div>You have no plans</div>
          <div>You have to create or get invited to one!</div>
          <CreatePlanPopover user={user} />
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultActiveKey="1" className="tabs">
      {familyPlans.length > 0 ? (
        <>
          <TabPane tab={<span className="badge">Family Plans</span>} key="1">
            <div className="heading family-plan-heading">
              <div>Your family Plans</div>
              <CreatePlanPopover user={user} />
            </div>
            <FamilyPlansList familyPlans={familyPlans} />
          </TabPane>
          <TabPane tab={<span className="badge">Invite People</span>} key="2">
            <div className="heading">
              <div>Find and invite users</div>
            </div>
            <InvitePeople user={user} />
          </TabPane>
        </>
      ) : null}
      <TabPane
        tab={
          <Badge count={invitationsReceived.length} className="badge">
            <span>Invites</span>
          </Badge>
        }
      >
        <MyInvitations invitationsReceived={invitationsReceived} user={user} />
      </TabPane>
    </Tabs>
  )
}

const CreatePlanForm = ({ setValue, sendValue }) => {
  return (
    <div>
      <form onSubmit={sendValue}>
        <div className="form-container">
          <div className="form-input-container">
            <span>Plan name</span>
            <input
              type="text"
              name="familyPlanName"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="form-btn-container">
            <input type="submit" value="Create plan" />
          </div>
        </div>
      </form>
    </div>
  )
}

const CreatePlanPopover = ({ user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [formValue, setFormValue] = useState('')

  const createPlan = (e) => {
    e.preventDefault()
    dispatch(createFamilyPlan(formValue, user.id))
  }

  return (
    <Popover
      title="Create plan"
      trigger="click"
      visible={visible}
      content={
        <CreatePlanForm setValue={setFormValue} sendValue={createPlan} />
      }
      onVisibleChange={(visible) => setVisible(visible)}
    >
      <Button>Create plan</Button>
    </Popover>
  )
}

export default FamilyPlanHome
