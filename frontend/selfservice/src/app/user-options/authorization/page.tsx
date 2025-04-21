"use client";

import { useState } from "react";
import {
  Button,
  Typography,
  Table,
  Avatar,
  Space,
  Tag,
  Tooltip,
  Modal,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Title, Text } = Typography;

interface AuthorizedUser {
  id: string;
  name: string;
  photoUrl: string;
  areas: string[];
  relationship: string;
  effectiveDate: string;
}

export default function AuthorizationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - replace with actual API call
  const authorizedUsers: AuthorizedUser[] = [
    {
      id: "1",
      name: "John Doe",
      photoUrl: "/default-avatar.png",
      areas: ["Student Finance", "Financial Aid", "General"],
      relationship: "Parent",
      effectiveDate: "2024-03-20",
    },
    // Add more mock users as needed
  ];

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (record: AuthorizedUser) => (
        <Space size="middle">
          <Avatar
            size={48}
            src={record.photoUrl}
            alt={record.name}
            className="border-2 border-gray-100"
          />
          <div>
            <Text strong>{record.name}</Text>
            <div>
              <Text type="secondary" className="text-sm">
                {record.relationship}
              </Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: (
        <Space>
          Authorized Access Areas
          <Tooltip title="These are the areas where this user has been granted access">
            <InfoCircleOutlined className="text-gray-400" />
          </Tooltip>
        </Space>
      ),
      dataIndex: "areas",
      key: "areas",
      render: (areas: string[]) => (
        <Space size={[0, 8]} wrap>
          {areas.map((area) => (
            <Tag key={area} color="blue" className="px-3 py-1 rounded-full">
              {area}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      key: "relationship",
      render: (relationship: string) => (
        <Tag color="green" className="px-3 py-1 rounded-full">
          {relationship}
        </Tag>
      ),
    },
    {
      title: "Effective Date",
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (date: string) => (
        <Text type="secondary">
          {new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (record: AuthorizedUser) => (
        <Tooltip title={`Edit ${record.name}'s access`}>
          <Button
            type="primary"
            ghost
            icon={<EditOutlined />}
            className="hover:border-blue-500 hover:text-blue-500"
            aria-label={`Edit ${record.name}'s access`}
          >
            Edit Access
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Title level={2} className="mb-2">
              Authorized Users
            </Title>
            <Text type="secondary" className="text-lg">
              Manage access for family members and other authorized users
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-105 transition-transform"
          >
            Add an Authorized User
          </Button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <Table
            columns={columns}
            dataSource={authorizedUsers}
            rowKey="id"
            pagination={false}
            className="authorized-users-table"
          />
        </div>

        {/* Modal */}
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={800}
          title={
            <Title level={4} className="mb-0">
              Add Authorized User
            </Title>
          }
          className="authorized-user-modal"
        >
          {/* Add your form content here */}
        </Modal>
      </div>

      {/* Add custom styles */}
      <style jsx global>{`
        .authorized-users-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
        }

        .authorized-users-table .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc;
        }

        .authorized-user-modal .ant-modal-content {
          border-radius: 12px;
          overflow: hidden;
        }
      `}</style>
    </MainLayout>
  );
}
