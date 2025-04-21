"use client";

import { useState } from "react";
import {
  Select,
  Table,
  Button,
  Card,
  Typography,
  Space,
  Collapse,
  Breadcrumb,
  theme,
  Divider,
  Row,
  Col,
  Statistic,
  Tag,
} from "antd";
import {
  DownloadOutlined,
  UpOutlined,
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import MainLayout from "@/components/Layout";

const { Title, Text } = Typography;

export default function AccountActivity() {
  const [selectedTerm, setSelectedTerm] = useState("2025 Spring");
  const { token } = theme.useToken();

  // Mock data - replace with actual API calls
  const terms = [
    { value: "2025 Spring", label: "2025 Spring Reporting Term" },
    { value: "2024 Fall", label: "2024 Fall Reporting Term" },
  ];

  const courseData = [
    {
      section: "CS101-01",
      title: "Introduction to Programming",
      credits: 3,
      ceus: 0,
      days: "MWF",
      times: "9:00 AM - 10:20 AM",
      classroom: "TECH 204",
      instructor: "Dr. Smith",
      status: "Registered",
    },
  ];

  const courseColumns = [
    { title: "Section", dataIndex: "section", key: "section" },
    { title: "Course Title", dataIndex: "title", key: "title" },
    { title: "Credits", dataIndex: "credits", key: "credits" },
    { title: "CEUs", dataIndex: "ceus", key: "ceus" },
    { title: "Days", dataIndex: "days", key: "days" },
    { title: "Times", dataIndex: "times", key: "times" },
    { title: "Classroom", dataIndex: "classroom", key: "classroom" },
    { title: "Instructor", dataIndex: "instructor", key: "instructor" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <MainLayout>
      <div>
        {/* Removed Breadcrumb Navigation */}
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Header Section with Left Alignment */}
          <div style={{ marginBottom: 24 }}>
            <Title level={1} style={{ marginBottom: 8 }}>
              Account Activity
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              View and manage your financial transactions
            </Text>
          </div>

          {/* Term Selection with Enhanced Card */}
          <Card bordered={false} className="filter-card">
            <Row gutter={24} align="middle">
              <Col flex="auto">
                <Space align="center">
                  <CalendarOutlined
                    style={{ fontSize: 20, color: token.colorPrimary }}
                  />
                  <Select
                    style={{ width: 300 }}
                    options={terms}
                    value={selectedTerm}
                    onChange={setSelectedTerm}
                    placeholder="Select Term"
                    size="large"
                  />
                </Space>
              </Col>
              <Col>
                <Space>
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    size="large"
                  >
                    View Statement (PDF)
                  </Button>
                  <Button icon={<FileTextOutlined />} size="large">
                    Export to Excel
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Financial Summary with Enhanced Styling */}
          <Card bordered={false}>
            <Row gutter={24} justify="center">
              <Col>
                <Statistic
                  title="Total Charges"
                  value={8400.0}
                  precision={2}
                  prefix="$"
                />
              </Col>
              <Divider type="vertical" style={{ height: 50 }} />
              <Col>
                <Statistic
                  title="Current Balance"
                  value={8400.0}
                  precision={2}
                  prefix="$"
                  valueStyle={{ color: token.colorError }}
                />
              </Col>
            </Row>
          </Card>

          {/* Detailed Breakdown with Enhanced Styling */}
          <Collapse
            defaultActiveKey={["tuition"]}
            style={{ background: token.colorBgContainer }}
          >
            {/* Tuition Section */}
            <Collapse.Panel
              header={
                <Space>
                  <Text strong>Tuition</Text>
                  <Tag color="blue">$8,100.00</Tag>
                </Space>
              }
              key="tuition"
            >
              <Table
                columns={courseColumns}
                dataSource={courseData}
                pagination={false}
                size="middle"
                bordered
                scroll={{ x: true }}
              />
            </Collapse.Panel>

            {/* Student Fees Section */}
            <Collapse.Panel
              header={
                <Space>
                  <Text strong>Student Fees</Text>
                  <Tag color="green">$150.00</Tag>
                </Space>
              }
              key="fees"
            >
              <Table
                columns={[
                  {
                    title: "Description",
                    dataIndex: "description",
                    key: "description",
                  },
                  {
                    title: "Amount",
                    dataIndex: "amount",
                    key: "amount",
                    align: "right",
                  },
                ]}
                dataSource={[
                  { description: "Technology Fee", amount: "$150.00" },
                ]}
                pagination={false}
                size="middle"
                bordered
              />
            </Collapse.Panel>

            {/* Late Charges Section */}
            <Collapse.Panel
              header={
                <Space>
                  <Text strong>Late Charges</Text>
                  <Tag color="red">$150.00</Tag>
                </Space>
              }
              key="late-charges"
            >
              <Table
                columns={[
                  { title: "Invoice", dataIndex: "invoice", key: "invoice" },
                  {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    render: (date) => new Date(date).toLocaleDateString(),
                  },
                  {
                    title: "Description",
                    dataIndex: "description",
                    key: "description",
                  },
                  {
                    title: "Amount",
                    dataIndex: "amount",
                    key: "amount",
                    align: "right",
                  },
                ]}
                dataSource={[
                  {
                    invoice: "INV-001",
                    date: "2025-01-15",
                    description: "Late Registration Fee",
                    amount: "$150.00",
                  },
                ]}
                pagination={false}
                size="middle"
                bordered
              />
            </Collapse.Panel>
          </Collapse>

          {/* Back to Top Button with Enhanced Styling */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Button
              type="default"
              icon={<UpOutlined />}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="large"
            >
              Back to Top
            </Button>
          </div>
        </Space>
      </div>
    </MainLayout>
  );
}
