"use client";

import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Table,
  Space,
  Row,
  Col,
  Statistic,
} from "antd";
import { DollarOutlined, ArrowUpOutlined } from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Title, Text, Link } = Typography;

interface Term {
  id: string;
  name: string;
  amountDue: number;
  details: string;
}

export default function AccountSummaryPage() {
  const [terms] = useState<Term[]>([
    {
      id: "1",
      name: "2025 Spring Reporting Term",
      amountDue: 8400.0,
      details: "Full-time enrollment",
    },
    // Add more terms as needed
  ]);

  const columns = [
    {
      title: "Term",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
      align: "right" as const,
      render: (amount: number) => (
        <Text strong>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </Text>
      ),
    },
  ];

  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header Section */}
        <div>
          <Title level={2}>Account Summary</Title>
          <Text type="secondary">View a summary of your account</Text>
        </div>

        {/* Account Overview Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Amount Overdue"
                value={8400.0}
                precision={2}
                prefix={<DollarOutlined />}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Total Amount Due"
                value={8400.0}
                precision={2}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Total Account Balance"
                value={8400.0}
                precision={2}
                prefix={<DollarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Payment Button */}
        <Button type="primary" size="large" icon={<ArrowUpOutlined />}>
          Make a Payment
        </Button>

        {/* Main Content */}
        <Row gutter={[24, 24]}>
          {/* Account Activity Table */}
          <Col xs={24} lg={16}>
            <Card title="Account Activity">
              <Table
                columns={columns}
                dataSource={terms}
                rowKey="id"
                pagination={false}
                bordered
              />
            </Card>
          </Col>

          {/* Helpful Links */}
          <Col xs={24} lg={8}>
            <Card title="Helpful Links" className="helpful-links-card">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Link href="#">Student Health Insurance</Link>
                <Link href="#">Payment Plan Application</Link>
                <Link href="#">Financial Aid Status</Link>
                <Link href="#">Billing Calendar</Link>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>

      <style jsx global>{`
        .helpful-links-card .ant-card-body {
          padding-left: 12px;
        }
        .ant-statistic-title {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
        }
        .ant-statistic-content {
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </MainLayout>
  );
}
