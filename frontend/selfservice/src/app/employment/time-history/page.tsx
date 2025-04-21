"use client";
import React, { useState } from "react";
import MainLayout from "@/components/Layout";
import {
  Typography,
  DatePicker,
  Space,
  Statistic,
  Table,
  Button,
  Select,
  Input,
  Card,
  Row,
  Col,
  Tag,
  Modal,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface TimeEntry {
  key: string;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  department: string;
  status: "approved" | "pending" | "rejected";
}

const TimeHistoryPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date, Date] | null
  >(null);
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | null>(null);

  const columns: ColumnsType<TimeEntry> = [
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      title: "Total Hours",
      dataIndex: "totalHours",
      sorter: (a, b) => a.totalHours - b.totalHours,
    },
    {
      title: "Department",
      dataIndex: "department",
      filters: [
        { text: "IT Services", value: "IT Services" },
        { text: "Library", value: "Library" },
      ],
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "pending"
              ? "gold"
              : "red"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Rejected", value: "rejected" },
      ],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedEntry(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const handleDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    if (dates) {
      setSelectedDateRange([dates[0]?.toDate()!, dates[1]?.toDate()!]);
    } else {
      setSelectedDateRange(null);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <Title level={2} className="!mb-2">
          Time History
        </Title>
        <Text type="secondary" className="text-lg">
          Review and manage your work hours
        </Text>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        <Card className="shadow-sm">
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col>
              <Space size="middle">
                <RangePicker
                  onChange={handleDateRangeChange}
                  className="min-w-[280px]"
                  placeholder={["Start Date", "End Date"]}
                />
                <Select
                  defaultValue="custom"
                  style={{ width: 140 }}
                  options={[
                    { value: "thisWeek", label: "This Week" },
                    { value: "lastWeek", label: "Last Week" },
                    { value: "thisMonth", label: "This Month" },
                    { value: "lastMonth", label: "Last Month" },
                    { value: "custom", label: "Custom" },
                  ]}
                />
              </Space>
            </Col>
            <Col>
              <Button
                icon={<DownloadOutlined />}
                type="primary"
                className="hover:scale-105 transition-transform"
              >
                Export Data
              </Button>
            </Col>
          </Row>
        </Card>

        <Row gutter={16}>
          {[
            {
              title: "Total Hours",
              value: 42.5,
              suffix: "hrs",
              color: "#1890ff",
            },
            {
              title: "Average Hours/Week",
              value: 15.3,
              suffix: "hrs",
              color: "#52c41a",
            },
            { title: "Total Shifts", value: 12, color: "#722ed1" },
          ].map((stat, index) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                className="text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Statistic
                  title={<span className="text-gray-600">{stat.title}</span>}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="shadow-sm">
          <Row gutter={16}>
            <Col>
              <Input
                placeholder="Search entries..."
                prefix={<SearchOutlined className="text-gray-400" />}
                style={{ width: 300 }}
                className="hover:border-primary transition-colors"
              />
            </Col>
          </Row>
        </Card>

        <Table<TimeEntry>
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} entries`,
          }}
          className="shadow-sm"
        />
      </Space>

      <Modal
        title={
          <Title level={4} className="!mb-0">
            Time Entry Details
          </Title>
        }
        open={!!selectedEntry}
        onCancel={() => setSelectedEntry(null)}
        width={600}
        footer={[
          <Button key="close" onClick={() => setSelectedEntry(null)}>
            Close
          </Button>,
          <Button
            key="request"
            type="primary"
            icon={<ExclamationCircleOutlined />}
            onClick={() => {
              // Handle correction request
            }}
            className="hover:scale-105 transition-transform"
          >
            Request Correction
          </Button>,
        ]}
      >
        {selectedEntry && (
          <Space direction="vertical" className="w-full">
            {[
              { label: "Date", value: selectedEntry.date },
              {
                label: "Time",
                value: `${selectedEntry.startTime} - ${selectedEntry.endTime}`,
              },
              { label: "Total Hours", value: selectedEntry.totalHours },
              { label: "Department", value: selectedEntry.department },
              { label: "Status", value: selectedEntry.status },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b py-2 last:border-b-0"
              >
                <Text strong className="text-gray-600">
                  {item.label}:
                </Text>
                <Text>{item.value}</Text>
              </div>
            ))}
          </Space>
        )}
      </Modal>
    </MainLayout>
  );
};

export default TimeHistoryPage;
