"use client";

import React from "react";
import {
  Layout,
  Button,
  Avatar,
  Space,
  Typography,
  theme,
  Dropdown,
  Badge,
  Popover,
} from "antd";
import { UserOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname();
  const { token } = theme.useToken();
  const username = "Ademola Ciroma Chukwueze";
  const [isHovered, setIsHovered] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(true);

  // Add dropdown items for the avatar menu
  const items = [
    {
      key: "signout",
      label: "Sign Out",
      icon: <LogoutOutlined />,
      onClick: () => {
        // Add your sign out logic here
        console.log("Sign out clicked");
      },
    },
  ];

  // Function to get page title based on current route
  const getPageTitle = () => {
    // Map routes to their titles
    const routeTitles: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/finance": "Financial Information",
      "/employment": "Employment",
      "/academics": "Academics",
      "/user-options": "User Options",
    };

    // Get the first segment of the path
    const mainPath = "/" + pathname.split("/")[1];
    return routeTitles[mainPath] || "Trinity Foundation";
  };

  const notificationContent = (
    <div style={{ width: 350 }}>
      <Title level={5} style={{ margin: "0 0 16px 0" }}>
        Notifications
      </Title>
      <div className="space-y-3">
        <div className="bg-red-50 p-4 rounded border border-red-100">
          <div>
            <div className="font-medium text-red-600">
              Must See Advisor to Register
            </div>
            <div className="text-gray-600">
              Your faculty advisor must lift the Advising Hold for you to
              register.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AntHeader
      style={{
        padding: "0 24px",
        background: token.colorBgContainer,
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1001,
        width: `calc(100% - ${collapsed ? 80 : 300}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        height: 72,
        transition: "all 0.2s",
      }}
    >
      <Space size={24}>
        <Title
          level={4}
          style={{
            margin: 0,
            fontSize: "20px",
            color: token.colorTextHeading,
          }}
        >
          {getPageTitle()}
        </Title>
      </Space>

      <Space size={16} style={{ marginRight: 8 }}>
        <Popover
          content={notificationContent}
          trigger="click"
          placement="bottomRight"
          arrow={false}
        >
          <Badge dot={showNotifications}>
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: "20px" }} />}
              size="large"
              className="hover:bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center"
            />
          </Badge>
        </Popover>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              icon={<UserOutlined />}
              size={44}
              style={{
                backgroundColor: token.colorPrimary,
                color: token.colorWhite,
              }}
            />
            <span
              style={{
                color: token.colorTextHeading,
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {username}
            </span>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
