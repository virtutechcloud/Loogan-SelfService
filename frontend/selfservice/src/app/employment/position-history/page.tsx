"use client";

import { useState } from "react";
import MainLayout from "@/components/Layout";
import {
  Card,
  Table,
  Modal,
  Statistic,
  Input,
  Select,
  Button,
  Alert,
  Row,
  Col,
  DatePicker,
  Space,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

interface Position {
  id: string;
  title: string;
  department: string;
  startDate: string;
  endDate: string | null;
  supervisor: string;
  classification: string;
  hourlyRate: number;
  description?: string;
  duties?: string[];
  totalHours?: number;
}

export default function PositionHistoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  const columns: ColumnsType<Position> = [
    {
      title: "Position Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Department",
      dataIndex: "department",
      filters: [], // Add department filters based on data
      onFilter: (value, record) => record.department.includes(value.toString()),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate) => endDate || "Ongoing",
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor",
    },
    {
      title: "Classification",
      dataIndex: "classification",
      filters: [
        { text: "Class I", value: "Class I" },
        { text: "Class II", value: "Class II" },
        { text: "Class III", value: "Class III" },
        { text: "Class IV", value: "Class IV" },
      ],
      onFilter: (value, record) => record.classification === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const handleViewDetails = (position: Position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Title level={2}>Position History</Title>
            <Text type="secondary">View your on-campus employment history</Text>
          </Col>

          {/* Current Position Card */}
          <Col span={24}>
            <Card title="Current Position" className="shadow-sm">
              {/* Add current position details */}
            </Card>
          </Col>

          {/* Statistics */}
          <Col span={24}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Total Positions" value={3} />
              </Col>
              <Col span={8}>
                <Statistic title="Total Hours" value={450} />
              </Col>
              <Col span={8}>
                <Statistic title="Total Earnings" prefix="$" value={5430} />
              </Col>
            </Row>
          </Col>

          {/* Filters */}
          <Col span={24}>
            <Space className="w-full justify-between mb-4">
              <Space>
                <Input.Search
                  placeholder="Search positions..."
                  style={{ width: 250 }}
                  prefix={<SearchOutlined />}
                />
                <Select
                  placeholder="Classification"
                  style={{ width: 150 }}
                  options={[
                    { label: "Class I", value: "1" },
                    { label: "Class II", value: "2" },
                    { label: "Class III", value: "3" },
                    { label: "Class IV", value: "4" },
                  ]}
                />
                <RangePicker
                  disabledDate={(current) =>
                    current && current.toDate() > new Date()
                  }
                />
              </Space>
              <Button icon={<DownloadOutlined />}>Export History</Button>
            </Space>
          </Col>

          {/* Alert */}
          <Col span={24}>
            <Alert
              message="Some historical position data may be incomplete"
              type="info"
              showIcon
              className="mb-4"
            />
          </Col>

          {/* Position History Table */}
          <Col span={24}>
            <Table columns={columns} /* Add your data source here */ />
          </Col>
        </Row>

        {/* Position Details Modal */}
        <Modal
          title="Position Details"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={700}
        >
          {selectedPosition && (
            <div>{/* Add detailed position information here */}</div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
}
