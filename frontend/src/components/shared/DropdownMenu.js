import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import Logout from "./Logout";
import {
  UserOutlined,
  TeamOutlined,
  IdcardOutlined,
  EuroCircleOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const DropdownMenu = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/my-profile">
          <IdcardOutlined />
          My profile
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/personal-plan">
          <UserOutlined />
          Personal expenses
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/family-plans">
          <TeamOutlined />
          Family plan
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/">
          <EuroCircleOutlined />
          My earnings
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/personal-overview">
          <PieChartOutlined />
          Overview
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown key="more" overlay={menu}>
      <Button
        onClick={(e) => e.preventDefault()}
        type="default"
        style={{
          display: "inline-block",
        }}
      >
        Menu <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownMenu;
