"use client";

import React from "react";
import {
  Card,
  Typography,
  Table,
  Button,
  Space,
  Alert,
  Tag,
  Divider,
  Row,
  Col,
} from "antd";
import {
  LinkOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Layout from "@/components/Layout";

const { Title, Text, Paragraph } = Typography;

interface ProgramRecord {
  programName: string;
  majors: string[];
  applicationStatus: string;
  applicationDate?: string;
  isSubmitted?: boolean;
}

const GraduationPage = () => {
  const programs: ProgramRecord[] = [
    {
      programName: "MS Applied Business Analytics & Master of Business Admin",
      majors: ["Applied Business Analytics", "Business Administration"],
      applicationStatus: "Application submitted on 12/23/2024",
      isSubmitted: true,
    },
  ];

  const columns: ColumnsType<ProgramRecord> = [
    {
      title: "Program of Study",
      dataIndex: "programName",
      key: "programName",
      render: (text) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Major",
      dataIndex: "majors",
      key: "majors",
      render: (majors: string[]) => (
        <Space direction="vertical" size={4}>
          {majors.map((major, index) => (
            <Tag key={index} color="blue">
              {major}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Application Status",
      dataIndex: "applicationStatus",
      key: "applicationStatus",
      render: (status, record) => (
        <Space>
          {record.isSubmitted ? (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              {status}
            </Tag>
          ) : (
            <Tag color="warning" icon={<ClockCircleOutlined />}>
              {status}
            </Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <Space direction="vertical" size="large" className="w-full p-6">
          <Row gutter={[0, 24]}>
            <Col span={24}>
              <Title level={2} style={{ margin: 0 }}>
                Graduation Application
              </Title>
            </Col>
          </Row>

          <Alert
            message="Important Information"
            description={
              <Paragraph className="mb-0">
                Please click on one of the apply links below to apply for
                graduation. For more information about our graduation and
                commencement process, please visit Commencement Information.
              </Paragraph>
            }
            type="info"
            showIcon
            action={
              <Button type="primary" icon={<LinkOutlined />}>
                Commencement Information
              </Button>
            }
            className="shadow-sm"
          />

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Space direction="vertical" size="middle" className="w-full">
              <Title level={4} style={{ margin: 0 }}>
                Quick Links
              </Title>
              <Divider className="my-2" />
              <Space>
                <Button
                  type="primary"
                  icon={<FileSearchOutlined />}
                  size="large"
                  className="hover:scale-105 transition-transform"
                >
                  Review My Academic Progress
                </Button>
              </Space>
            </Space>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Space direction="vertical" size="middle" className="w-full">
              <Title level={4} style={{ margin: 0 }}>
                Programs of Study
              </Title>
              <Divider className="my-2" />
              <Table
                columns={columns}
                dataSource={programs.map((program, index) => ({
                  ...program,
                  key: index,
                }))}
                pagination={false}
                bordered
                size="middle"
                className="shadow-sm"
              />
            </Space>
          </Card>
        </Space>
      </div>
    </Layout>
  );
};

export default GraduationPage;
