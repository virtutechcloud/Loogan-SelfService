"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Card,
  Progress,
  Typography,
  Space,
  Row,
  Col,
} from "antd";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Search: AntSearch } = Input;
const { Title, Text } = Typography;

export default function StudentPlanning() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data from your backend
  const programInfo = {
    name: "Bachelor of Computer Science",
    gpa: 3.75,
    progress: 65,
    gpaRequirement: 2.0,
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginBottom: 48 }}
      >
        <Title level={2}>Steps to Getting Started</Title>
        <Text type="secondary">
          There are many options to help you plan your courses and earn your
          degree. Here are 2 steps to get you started:
        </Text>
      </Space>

      {/* Course Search Section */}
      <Card style={{ marginBottom: 24 }}>
        <Space.Compact style={{ width: "100%" }}>
          <AntSearch
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%" }}
          />
          <Button type="primary" icon={<SearchOutlined />}>
            Search for Courses
          </Button>
        </Space.Compact>
      </Card>

      {/* Getting Started Steps */}
      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={5}>Step 1: View Your Progress</Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 16 }}
            >
              Track your academic journey, view completed courses, and check
              remaining requirements.
            </Text>
            <Button
              type="default"
              icon={<ArrowRightOutlined />}
              href="/progress"
            >
              Go to My Progress
            </Button>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Title level={5}>
              Step 2: Plan your Degree & Register for Classes
            </Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 16 }}
            >
              Plan your academic schedule and register for upcoming courses.
            </Text>
            <Button
              type="default"
              icon={<ArrowRightOutlined />}
              href="/plan-schedule"
            >
              Go to Plan & Schedule
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Program At A Glance */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Program At A Glance</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Text type="secondary">Program</Text>
            <Title level={5}>{programInfo.name}</Title>
          </Col>
          <Col xs={24} md={8}>
            <Text type="secondary">Cumulative GPA</Text>
            <Title level={5}>
              {programInfo.gpa} / {programInfo.gpaRequirement} Required
            </Title>
          </Col>
          <Col xs={24} md={8}>
            <Text type="secondary">Progress</Text>
            <Progress percent={programInfo.progress} />
          </Col>
        </Row>
      </Card>

      {/* Term Schedule */}
      <Card>
        <Title level={4}>2025 Spring First Half Term Schedule</Title>
        <Text type="secondary">Calendar view implementation goes here</Text>
      </Card>
    </MainLayout>
  );
}
