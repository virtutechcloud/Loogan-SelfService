"use client";
import React, { useState } from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Descriptions,
  Collapse,
  Space,
  Button,
  DatePicker,
} from "antd";
import {
  DownloadOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  BankOutlined,
} from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const EarningsPage = () => {
  // Sample data - replace with actual API calls
  const currentPayPeriod = {
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    hoursWorked: 40,
    grossEarnings: 600,
    estimatedNet: 522,
  };

  const ytdSummary = {
    totalEarnings: 4800,
    totalHours: 320,
    averageRate: 15,
  };

  const earningsColumns = [
    { title: "Pay Period", dataIndex: "payPeriod", key: "payPeriod" },
    { title: "Hours Worked", dataIndex: "hoursWorked", key: "hoursWorked" },
    { title: "Gross Pay", dataIndex: "grossPay", key: "grossPay" },
    { title: "Deductions", dataIndex: "deductions", key: "deductions" },
    { title: "Net Pay", dataIndex: "netPay", key: "netPay" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button type="link" size="small">
          View Details
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header Section */}
        <div>
          <Title level={2}>Student Earnings</Title>
          <Text type="secondary">
            Your on-campus employment financial summary
          </Text>
        </div>

        {/* Current Pay Period Summary */}
        <Card title="Current Pay Period">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Hours Worked"
                value={currentPayPeriod.hoursWorked}
                prefix={<ClockCircleOutlined />}
                suffix="hrs"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Gross Earnings"
                value={currentPayPeriod.grossEarnings}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="Estimated Net Pay"
                value={currentPayPeriod.estimatedNet}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Col>
          </Row>
        </Card>

        {/* Year-to-Date Summary */}
        <Card title="Year-to-Date Summary">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title="Total Earnings"
                value={ytdSummary.totalEarnings}
                prefix={<DollarOutlined />}
                precision={2}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title="Total Hours"
                value={ytdSummary.totalHours}
                suffix="hrs"
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title="Average Hourly Rate"
                value={ytdSummary.averageRate}
                prefix={<DollarOutlined />}
                precision={2}
                suffix="/hr"
              />
            </Col>
          </Row>
        </Card>

        {/* Earnings Table */}
        <Card
          title="Earnings History"
          extra={
            <Space>
              <RangePicker />
              <Button icon={<DownloadOutlined />}>Export</Button>
            </Space>
          }
        >
          <Table
            columns={earningsColumns}
            dataSource={[]} // Add your data here
            pagination={{ pageSize: 10 }}
          />
        </Card>

        {/* Direct Deposit Information */}
        <Card title="Direct Deposit Information">
          <Descriptions>
            <Descriptions.Item label="Bank Name">
              <BankOutlined /> Sample Bank
            </Descriptions.Item>
            <Descriptions.Item label="Account Number">
              ****1234
            </Descriptions.Item>
            <Descriptions.Item label="Routing Number">
              ****5678
            </Descriptions.Item>
          </Descriptions>
          <Button type="link">Update Banking Details</Button>
        </Card>
      </Space>
    </MainLayout>
  );
};

export default EarningsPage;
