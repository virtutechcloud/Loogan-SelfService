"use client";

import React from "react";
import {
  Typography,
  Input,
  Button,
  Descriptions,
  Progress,
  Collapse,
  Table,
  Tag,
  Row,
  Col,
  Space,
  Card,
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Title, Text } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

export default function DegreeAuditPage() {
  // Sample data - replace with actual data from your backend
  const studentInfo = {
    cumulativeGPA: "3.85",
    institutionGPA: "3.90",
    degree: "MS Applied Business Analytics & Master of Business Admin",
    majors: "Business Analytics, Business Administration",
    departments: "School of Business",
    catalog: "2023-2024",
  };

  const courseColumns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "In-Progress"
              ? "blue"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    { title: "Course", dataIndex: "course", key: "course" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
    { title: "Term", dataIndex: "term", key: "term" },
    { title: "Credits", dataIndex: "credits", key: "credits" },
  ];

  return (
    <MainLayout>
      <div className="p-6">
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Title
                    level={2}
                    className="mb-0"
                    style={{ color: "#1890ff" }}
                  >
                    My Progress
                  </Title>
                  <Text type="secondary" className="text-lg">
                    {studentInfo.degree}
                  </Text>
                </div>
                <Button
                  icon={<PrinterOutlined />}
                  type="primary"
                  size="large"
                  className="hover:scale-105 transition-transform"
                >
                  Print
                </Button>
              </div>

              <Search
                placeholder="Search for courses..."
                enterButton="Search for Courses by Keyword"
                size="large"
                className="mb-6"
              />

              <Card
                className="shadow-md hover:shadow-lg transition-shadow"
                bordered={false}
              >
                <Descriptions
                  title={<Title level={4}>Program Overview</Title>}
                  bordered
                  column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                >
                  <Descriptions.Item label="Cumulative GPA">
                    {studentInfo.cumulativeGPA}
                  </Descriptions.Item>
                  <Descriptions.Item label="Institution GPA">
                    {studentInfo.institutionGPA}
                  </Descriptions.Item>
                  <Descriptions.Item label="Degree">
                    {studentInfo.degree}
                  </Descriptions.Item>
                  <Descriptions.Item label="Majors">
                    {studentInfo.majors}
                  </Descriptions.Item>
                  <Descriptions.Item label="Departments">
                    {studentInfo.departments}
                  </Descriptions.Item>
                  <Descriptions.Item label="Catalog">
                    {studentInfo.catalog}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              <Card
                className="shadow-md hover:shadow-lg transition-shadow"
                bordered={false}
              >
                <Title level={4}>Credits Progress</Title>
                <Progress
                  percent={Math.min((66 / 57) * 100, 100)}
                  format={() => "66 of 57 credits"}
                  status="active"
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                  strokeWidth={15}
                />
              </Card>

              <Collapse defaultActiveKey={["1"]} className="shadow-md">
                <Panel
                  header={
                    <Text strong className="text-lg">
                      MS in Applied Business Analytics/MBA Requirements
                    </Text>
                  }
                  key="1"
                >
                  <Space direction="vertical" className="w-full p-4">
                    <Text className="text-lg">GPA Requirement: 3.0</Text>
                    <Text className="text-lg">
                      Current GPA:{" "}
                      <span className="text-blue-600 font-semibold">
                        {studentInfo.cumulativeGPA}
                      </span>
                    </Text>
                  </Space>
                </Panel>
              </Collapse>

              <Card
                title={<Title level={4}>Course List</Title>}
                className="shadow-md hover:shadow-lg transition-shadow"
                bordered={false}
              >
                <Table
                  columns={courseColumns}
                  dataSource={[]}
                  pagination={false}
                  scroll={{ x: true }}
                  className="overflow-hidden"
                />
              </Card>

              <Card
                title={<Title level={4}>Other Courses</Title>}
                className="shadow-md hover:shadow-lg transition-shadow"
                bordered={false}
              >
                <Table
                  columns={courseColumns}
                  dataSource={[]}
                  pagination={false}
                  scroll={{ x: true }}
                  className="overflow-hidden"
                />
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
