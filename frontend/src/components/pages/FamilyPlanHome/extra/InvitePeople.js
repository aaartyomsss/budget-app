import React, { useState, useEffect, useMemo } from 'react';
import { Input } from 'antd';
import familyPlanService from '../../../../services/familyPlanService';
import debounce from 'lodash.debounce';

const InvitePeople = () => {
  const { Search } = Input;

  const [queryResults, setQueryResults] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value !== '') {
      const { data } = await familyPlanService.searchUser(value),
        { foundUsers } = data;
      console.log(foundUsers);
      setQueryResults(foundUsers);
    }
  };

  const debounceHandler = useMemo(() => debounce(onSearch, 300), []);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => debounceHandler.cancel();
  }, []);

  return (
    <div>
      <Input placeholder="Enter username" onChange={debounceHandler} />
      <div>
        <span>Users found: {queryResults.length}</span>
      </div>
      <div>
        {queryResults &&
          queryResults.map((foundUser) => {
            return <div key={foundUser.id}>{foundUser.username}</div>;
          })}
      </div>
    </div>
  );
};

export default InvitePeople;
