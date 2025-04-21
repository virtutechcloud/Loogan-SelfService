"use client";

import React from "react";
import { Layout, Menu, theme, Button } from "antd";
import {
  WalletOutlined,
  SolutionOutlined,
  BookOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const iconColors = {
  dashboard: "#1890ff", // Blue
  profile: "#52c41a", // Green
  courses: "#722ed1", // Purple
  assignments: "#fa8c16", // Orange
  grades: "#eb2f96", // Pink
  calendar: "#faad14", // Gold
  messages: "#13c2c2", // Cyan
  settings: "#f5222d", // Changed from #595959 (Grey) to #f5222d (Red)
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = theme.useToken();
  const menuRef = React.useRef<HTMLDivElement>(null);

  const selectedKey = React.useMemo(() => {
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }, [pathname]);

  const [openKeys, setOpenKeys] = React.useState<string[]>(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const parentPaths = pathParts.reduce(
      (acc: string[], curr: string, index: number) => {
        const path = "/" + pathParts.slice(0, index + 1).join("/");
        acc.push(path);
        return acc;
      },
      []
    );

    const storedOpenKeys = localStorage.getItem("sidebarOpenKeys");
    return storedOpenKeys ? JSON.parse(storedOpenKeys) : parentPaths;
  });

  React.useEffect(() => {
    localStorage.setItem("sidebarOpenKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  React.useEffect(() => {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const selectedItem = menuElement.querySelector(".ant-menu-item-selected");
    if (selectedItem) {
      selectedItem.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [selectedKey]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  const menuItems = [
    {
      key: "/dashboard",
      label: (
        <Link href="/dashboard" scroll={false}>
          Dashboard
        </Link>
      ),
      icon: (
        <DashboardOutlined
          style={{ color: iconColors.dashboard, fontSize: "24px" }}
        />
      ),
    },
    {
      key: "/finance",
      label: "Financial Information",
      icon: (
        <WalletOutlined
          style={{ color: iconColors.profile, fontSize: "24px" }}
        />
      ),
      children: [
        {
          key: "/finance/account-summary",
          label: (
            <Link href="/finance/account-summary" scroll={false}>
              Account Summary
            </Link>
          ),
          children: [
            {
              key: "finance/account-summary",
              label: (
                <Link href="/finance/account-summary">Account Summary</Link>
              ),
            },
            {
              key: "/finance/payments",
              label: <Link href="/finance/payments">Make a Payment</Link>,
            },
            {
              key: "/finance/activity",
              label: <Link href="/finance/activity">Account Activity</Link>,
            },
          ],
        },
        {
          key: "/finance/aid",
          label: "Financial Aid",
          children: [
            {
              key: "/finance/aid/home",
              label: <Link href="/finance/aid/home">Financial Aid Home</Link>,
            },
            {
              key: "/finance/aid/documents",
              label: (
                <Link href="/finance/aid/documents">Required Documents</Link>
              ),
            },
            {
              key: "/finance/aid/awards",
              label: <Link href="/finance/aid/awards">My Awards</Link>,
            },
            {
              key: "/finance/aid/outside-awards",
              label: (
                <Link href="/finance/aid/outside-awards">
                  View Outside Awards
                </Link>
              ),
            },
            {
              key: "/finance/aid/new-loan",
              label: <Link href="/finance/aid/new-loan">Request New Loan</Link>,
            },
            {
              key: "/finance/aid/award-letter",
              label: <Link href="/finance/aid/award-letter">Award Letter</Link>,
            },
            {
              key: "/finance/aid/shopping-sheet",
              label: (
                <Link href="/finance/aid/shopping-sheet">
                  Federal Shopping Sheet
                </Link>
              ),
            },
            {
              key: "/finance/aid/sap",
              label: <Link href="/finance/aid/sap">Academic Standing</Link>,
            },
          ],
        },
        {
          key: "/finance/tax",
          label: <Link href="/finance/tax">Tax Information</Link>,
        },
        {
          key: "/finance/banking",
          label: <Link href="/finance/banking">Banking Information</Link>,
        },
      ],
    },
    {
      key: "/employment",
      label: "Employment",
      icon: (
        <SolutionOutlined
          style={{ color: iconColors.assignments, fontSize: "24px" }}
        />
      ),
      children: [
        {
          key: "/employment/overview",
          label: "Employee",
          children: [
            {
              key: "/employment/overview",
              label: <Link href="/employment/overview">Employee Overview</Link>,
            },
            {
              key: "/employment/employee/banking",
              label: (
                <Link href="/employment/banking">Banking Information</Link>
              ),
            },
            {
              key: "/employment/time-entry",
              label: <Link href="/employment/time-entry">Time Entry</Link>,
            },
            {
              key: "/employment/earnings",
              label: (
                <Link href="/employment/earnings">Earnings Statements</Link>
              ),
            },
            {
              key: "/employment/time-history",
              label: <Link href="/employment/time-history">Time History</Link>,
            },
            {
              key: "/employment/position-history",
              label: (
                <Link href="/employment/position-history">
                  Position History
                </Link>
              ),
            },
          ],
        },
      ],
    },
    {
      key: "/academics",
      label: "Academics",
      icon: (
        <BookOutlined style={{ color: iconColors.courses, fontSize: "24px" }} />
      ),
      children: [
        {
          key: "/academics/planning",
          label: "Student Planning",
          children: [
            {
              key: "/academics/planning",
              label: <Link href="/academics/planning">Planning Overview</Link>,
            },
            {
              key: "/academics/planning/schedule",
              label: (
                <Link href="/academics/planning/schedule">Plan & Schedule</Link>
              ),
            },
            {
              key: "/academics/attendance",
              label: <Link href="/academics/attendance">Attendance</Link>,
            },
            {
              key: "/academics/planning/degree-audit",
              label: (
                <Link href="/academics/planning/degree-audit">
                  Degree Audit
                </Link>
              ),
            },
          ],
        },
        {
          key: "/academics/catalog",
          label: <Link href="/academics/catalog">Course Catalog</Link>,
        },
        {
          key: "/academics/grades",
          label: <Link href="/academics/grades">Grades</Link>,
        },
        {
          key: "/academics/graduation",
          label: <Link href="/academics/graduation">Graduation Overview</Link>,
        },
        {
          key: "/academics/transcripts",
          label: (
            <Link href="/academics/transcripts">Unofficial Transcript</Link>
          ),
        },
        {
          key: "/academics/attendance",
          label: <Link href="/academics/attendance">Academic Attendance</Link>,
        },
        {
          key: "/academics/test-scores",
          label: <Link href="/academics/test-scores">Test Summary</Link>,
        },
      ],
    },
    {
      key: "/user-options",
      label: "User Options",
      icon: (
        <SettingOutlined
          style={{ color: iconColors.settings, fontSize: "24px" }}
        />
      ),
      children: [
        {
          key: "/user-options/profile",
          label: <Link href="/user-options/profile">User Profile</Link>,
        },
        {
          key: "/user-options/authorization",
          label: (
            <Link href="/user-options/authorization">
              Authorized User Access
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <Layout.Sider
      collapsed={collapsed}
      width={300}
      collapsedWidth={80}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div
        style={{
          height: 72,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          position: "relative",
        }}
      >
        <Typography.Title
          level={3}
          style={{
            margin: 0,
            color: token.colorPrimary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontWeight: 700,
            fontSize: "24px",
            letterSpacing: "-0.5px",
            textAlign: "center",
          }}
        >
          {!collapsed && "Self Service"}
        </Typography.Title>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            position: "absolute",
            right: 0,
          }}
        />
      </div>

      <div ref={menuRef}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          items={menuItems}
          style={{
            height: "calc(100vh - 72px)",
            borderRight: 0,
            fontSize: "16px",
            padding: "8px 0",
            background: token.colorBgContainer,
            color: token.colorText,
          }}
        />
      </div>
    </Layout.Sider>
  );
};

export default Sidebar;
