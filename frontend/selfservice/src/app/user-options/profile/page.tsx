"use client";

import React from "react";
import {
  Card,
  Avatar,
  Typography,
  Tabs,
  Table,
  Tag,
  Button,
  Switch,
  Space,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function UserProfile() {
  // Sample data - replace with actual data from your backend
  const userInfo = {
    name: "Ademola Ciroma Chukwueze",
    colleagueId: "IO9098990IO",
    dob: "1990-01-01",
    email: "kayode.ogidan@example.com",
    avatar: null, // Replace with actual avatar URL
  };

  const addressColumns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "px-6 py-4",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      className: "px-6 py-4",
    },
    {
      title: "Status",
      dataIndex: "preferred",
      key: "preferred",
      className: "px-6 py-4",
      render: (preferred: boolean) =>
        preferred ? (
          <Tag color="blue" className="m-0">
            Preferred
          </Tag>
        ) : null,
    },
    {
      title: "Actions",
      key: "actions",
      className: "px-6 py-4",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} type="text" className="px-2" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              type="text"
              danger
              className="px-2"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <Card
        className="max-w-5xl mx-auto shadow-lg rounded-xl border-0"
        bodyStyle={{ padding: "2.5rem" }}
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mb-12 bg-gradient-to-r from-blue-50 to-transparent p-8 rounded-xl">
          <div className="relative group">
            <Avatar
              size={120}
              icon={<UserOutlined />}
              src={userInfo.avatar}
              className="shadow-lg border-4 border-white transition-transform hover:scale-105"
            />
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
              className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex-1">
            <Title
              level={2}
              className="!mb-6 !text-2xl font-bold text-gray-800"
            >
              {userInfo.name}
            </Title>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <Text className="text-gray-500 font-medium w-32">
                  Colleague ID
                </Text>
                <Text className="text-gray-700">{userInfo.colleagueId}</Text>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <Text className="text-gray-500 font-medium w-32">
                  Date of Birth
                </Text>
                <Text className="text-gray-700">{userInfo.dob}</Text>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <Text className="text-gray-500 font-medium w-32">Email</Text>
                <Text className="text-gray-700">{userInfo.email}</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Information Tabs */}
        <Tabs
          defaultActiveKey="1"
          type="card"
          className="profile-tabs"
          items={[
            {
              key: "1",
              label: <span className="px-2 py-1 font-medium">Addresses</span>,
              children: (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Table
                    columns={addressColumns}
                    dataSource={[]}
                    pagination={false}
                    className="border border-gray-100 rounded-lg"
                  />
                </div>
              ),
            },
            {
              key: "2",
              label: (
                <span className="px-2 py-1 font-medium">Email Addresses</span>
              ),
              children: (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Table
                    columns={[
                      {
                        title: "Email",
                        dataIndex: "email",
                        key: "email",
                        className: "px-6 py-4",
                      },
                      {
                        title: "Preferred",
                        dataIndex: "preferred",
                        key: "preferred",
                        className: "px-6 py-4",
                        render: (preferred: boolean) => (
                          <Switch checked={preferred} />
                        ),
                      },
                      {
                        title: "Actions",
                        key: "actions",
                        className: "px-6 py-4",
                        render: () => (
                          <Space size="middle">
                            <Button
                              icon={<EditOutlined />}
                              type="text"
                              className="px-2"
                            />
                            <Button
                              icon={<DeleteOutlined />}
                              type="text"
                              danger
                              className="px-2"
                            />
                          </Space>
                        ),
                      },
                    ]}
                    dataSource={[]}
                    pagination={false}
                    className="border border-gray-100 rounded-lg"
                  />
                </div>
              ),
            },
            {
              key: "3",
              label: (
                <span className="px-2 py-1 font-medium">Phone Numbers</span>
              ),
              children: (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Table
                    columns={[
                      {
                        title: "Number",
                        dataIndex: "number",
                        key: "number",
                        className: "px-6 py-4",
                      },
                      {
                        title: "Type",
                        dataIndex: "type",
                        key: "type",
                        className: "px-6 py-4",
                      },
                      {
                        title: "Actions",
                        key: "actions",
                        className: "px-6 py-4",
                        render: () => (
                          <Space size="middle">
                            <Button
                              icon={<EditOutlined />}
                              type="text"
                              className="px-2"
                            />
                            <Button
                              icon={<DeleteOutlined />}
                              type="text"
                              danger
                              className="px-2"
                            />
                          </Space>
                        ),
                      },
                    ]}
                    dataSource={[]}
                    pagination={false}
                    className="border border-gray-100 rounded-lg"
                  />
                </div>
              ),
            },
          ]}
        />
      </Card>
    </MainLayout>
  );
}
