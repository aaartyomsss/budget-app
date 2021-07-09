import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Popover, Button } from "antd";
import "./FamilyPlanHome.css";

const FamilyPlanHome = () => {
  const [visible, setVisible] = useState(false);
  const user = useSelector(({ user }) => user);
  const familyPlans = user.familyPlans;
  // No plans block
  if (familyPlans.length === 0) {
    return (
      <div className="outer-container">
        <div className="container-header">
          <div>You have no plans</div>
          <div>You have to create or get invited to one!</div>
        </div>
        <Popover
          title="Create plan"
          trigger="click"
          visible={visible}
          onVisibleChange={(visible) => setVisible(visible)}
        >
          <Button>create</Button>
        </Popover>
      </div>
    );
  }

  //With plans block
};

export default FamilyPlanHome;
