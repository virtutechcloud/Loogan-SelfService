"use client";

import { Card, Row, Col, Statistic, Typography, Button } from "antd";
import {
  UserOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  BankOutlined,
  CalendarOutlined,
  BookOutlined,
  TrophyOutlined,
  ScheduleOutlined,
  CrownOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import MainLayout from "@/components/Layout";
import React from "react";

const { Title } = Typography;

interface StatisticCardProps {
  title: string;
  value: string | number;
  prefix: React.ReactNode;
  precision?: number;
  status?: "success" | "warning" | "error";
}

export default function DashboardPage() {
  const [showNotifications, setShowNotifications] = React.useState(true);

  const StatisticCard = ({
    title,
    value,
    prefix,
    precision = 0,
    status,
  }: StatisticCardProps) => (
    <Card
      hoverable
      className={`dashboard-card transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]`}
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        borderTop: `3px solid ${
          status === "warning"
            ? "#faad14"
            : status === "error"
            ? "#ff4d4f"
            : status === "success"
            ? "#52c41a"
            : "#1890ff"
        }`,
        height: "100%",
      }}
    >
      <Statistic
        title={
          <span style={{ fontSize: "16px", color: "#595959" }}>{title}</span>
        }
        value={value}
        prefix={prefix}
        precision={precision}
        className="dashboard-statistic"
        valueStyle={{
          fontSize: "24px",
          fontWeight: "bold",
          color: status === "error" ? "#ff4d4f" : undefined,
        }}
      />
    </Card>
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 pt-0 text-center -mt-2">
          <Title level={2} className="m-0">
            Welcome to Self-Service! 👋
          </Title>
          <Title level={4} className="text-gray-600 m-0 mb-8">
            Choose a category to get started
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Link href="/finance/account-summary" className="block h-full">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  borderTop: "3px solid #1890ff",
                  height: "100%",
                }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-flex items-center justify-center bg-blue-50 p-3 rounded-full">
                      <DollarCircleOutlined
                        style={{ fontSize: "24px", color: "#1890ff" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Student Finance
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm text-gray-600">
                      View statements and make payments online.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/financial-aid" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] h-full"
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  borderTop: "3px solid #52c41a",
                }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-flex items-center justify-center bg-green-50 p-3 rounded-full">
                      <GiftOutlined
                        style={{ fontSize: "24px", color: "#52c41a" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Financial Aid
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm text-gray-600">
                      Access financial aid data, forms, etc.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/tax-information" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #722ed1" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <FileTextOutlined
                        style={{ fontSize: "20px", color: "#722ed1" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Tax Information
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      Change consent for e-delivery of tax information.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/employment/banking" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #fa8c16" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <BankOutlined
                        style={{ fontSize: "20px", color: "#fa8c16" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Banking Information
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      View and update banking information.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/employment/overview" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #eb2f96" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <UserOutlined
                        style={{ fontSize: "20px", color: "#eb2f96" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Employee
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      View tax form consents, earnings statements, banking
                      information, timecards and leave balances.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/academics/planning" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #13c2c2" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <CalendarOutlined
                        style={{ fontSize: "20px", color: "#13c2c2" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Student Planning
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      Search for courses, plan terms, and schedule & register
                      course sections.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/academics/catalog" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #f5222d" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <BookOutlined
                        style={{ fontSize: "20px", color: "#f5222d" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Course Catalog
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      View and search the course catalog.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/academics/grades" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #faad14" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <TrophyOutlined
                        style={{ fontSize: "20px", color: "#faad14" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Grades
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      View grades by term.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/academics/graduation" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #a0d911" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <CrownOutlined
                        style={{ fontSize: "20px", color: "#a0d911" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Graduation Overview
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      View and submit a graduation application.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>

          <Col xs={24} md={12}>
            <Link href="/academics/attendance" className="block">
              <Card
                hoverable
                className="dashboard-card transition-all duration-300 hover:shadow-lg h-full"
                style={{ borderTop: "3px solid #2f54eb" }}
              >
                <Row align="middle" gutter={[0, 0]}>
                  <Col xs={3}>
                    <div className="inline-block bg-gray-100 p-2 rounded-full">
                      <ScheduleOutlined
                        style={{ fontSize: "20px", color: "#2f54eb" }}
                      />
                    </div>
                  </Col>
                  <Col xs={21}>
                    <Title level={4} className="m-0">
                      Academic Attendance
                    </Title>
                    <Typography.Paragraph className="mb-0 text-sm">
                      View attendances by term.
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
