import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createFamilyPlan } from '../../../reducers/familyPlanReducer';
import { Popover, Button, Tabs } from 'antd';
import FamilyPlansList from './extra/FamilyPlansList';
import InvitePeople from './extra/InvitePeople';
import './assets/FamilyPlanHome.css';

const CreatePlanForm = ({ setValue, sendValue }) => {
  return (
    <div>
      <form onSubmit={sendValue}>
        <label>
          Plan name
          <input
            type="text"
            name="familyPlanName"
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <input type="submit" value="create plan" />
      </form>
    </div>
  );
};

const FamilyPlanHome = () => {
  const { TabPane } = Tabs;
  const [visible, setVisible] = useState(false);
  const [formValue, setFormValue] = useState('');
  const user = useSelector(({ user }) => user);
  const familyPlans = useSelector(({ familyPlanReducer }) => familyPlanReducer);
  const dispatch = useDispatch();

  const createPlan = (e) => {
    e.preventDefault();
    dispatch(createFamilyPlan(formValue, user.id));
  };

  // No plans block
  if (familyPlans.length === 0) {
    return (
      <div className="outer-container">
        <div className="centering-container">
          <div>You have no plans</div>
          <div>You have to create or get invited to one!</div>
        </div>
        <Popover
          title="Create plan"
          trigger="click"
          visible={visible}
          content={
            <CreatePlanForm setValue={setFormValue} sendValue={createPlan} />
          }
          onVisibleChange={(visible) => setVisible(visible)}
        >
          <Button>create</Button>
        </Popover>
      </div>
    );
  }

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Family Plans" key="1">
        <div className="centering-container">
          <div>Your family Plans</div>
        </div>
        <FamilyPlansList familyPlans={familyPlans} />
      </TabPane>
      <TabPane tab="Invite People" key="2">
        <div className="centering-container">
          <div>Find and invite users</div>
        </div>
        <InvitePeople user={user} />
      </TabPane>
    </Tabs>
  );

  //With plans block
};

export default FamilyPlanHome;
