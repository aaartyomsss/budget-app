import React, { useState, useEffect, useMemo } from 'react';
import { Input, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import familyPlanService from '../../../../services/familyPlanService';
import debounce from 'lodash.debounce';
import InviteUserCard from './InviteUserCard';
import { sendRequest } from '../../../../reducers/invitationReducer';
import '../assets/InvitePeople.css';

const InvitePeople = ({ user }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [queryResults, setQueryResults] = useState([]);
  const [planForInvitation, setPlanForInvitation] = useState(null);

  const invitations = useSelector(
    ({ invitationReducer }) => invitationReducer.sent
  );
  const familyPlans = useSelector(({ familyPlanReducer }) => familyPlanReducer);

  const onSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== '') {
      const { data } = await familyPlanService.searchUser(value),
        { foundUsers } = data;
      if (foundUsers) {
        const result = foundUsers.filter(
          (foundUser) => foundUser.id !== user.id
        );
        setQueryResults(result);
      }
    }
  };

  const sendInvite = (recepientId) => {
    if (!planForInvitation)
      return message.error('You have not selected a plan');

    const [id, planName] = planForInvitation.split(':');
    const params = {
      recepientId,
      planId: id,
      requester: user.id,
      planName: planName,
    };
    dispatch(sendRequest(params));
  };

  const handlePlanSelection = (val) => {
    setPlanForInvitation(val);
  };

  const debounceHandler = useMemo(() => debounce(onSearch, 300), []);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => debounceHandler.cancel();
  }, []); // eslint-disable-line

  return (
    <div>
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
          );
        })}
      </Select>
      <div className="text-container">
        <span className="secondary-text">
          Users found: {queryResults.length}
        </span>
      </div>
      <div className="user-list">
        {queryResults &&
          queryResults.map((foundUser) => {
            return (
              <InviteUserCard
                key={foundUser.id}
                {...{ foundUser, invitations, sendInvite }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default InvitePeople;
