"use client";

import {
  Typography,
  Row,
  Col,
  Descriptions,
  Statistic,
  Table,
  Card,
  Button,
  List,
  Space,
  Tag,
  Divider,
} from "antd";
import {
  DownloadOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Layout from "@/components/Layout";

const { Title, Text, Paragraph } = Typography;

export default function EmploymentOverview() {
  // Mock data - replace with actual API calls
  const studentInfo = {
    id: "1234567",
    name: "Jane Smith",
    department: "University Library",
    jobTitle: "Student Library Assistant",
    startDate: "2023-09-01",
    hourlyRate: 15.5,
    payFrequency: "Bi-Weekly",
    ytdEarnings: 4850,
  };

  const scheduleColumns = [
    { title: "Day", dataIndex: "day", key: "day" },
    { title: "Start Time", dataIndex: "start", key: "start" },
    { title: "End Time", dataIndex: "end", key: "end" },
    { title: "Location", dataIndex: "location", key: "location" },
  ];

  const scheduleData = [
    {
      key: "1",
      day: "Monday",
      start: "10:00 AM",
      end: "2:00 PM",
      location: "Main Library",
    },
    // ... more schedule data
  ];

  const paystubColumns = [
    { title: "Pay Date", dataIndex: "date", key: "date" },
    { title: "Gross Pay", dataIndex: "gross", key: "gross" },
    { title: "Net Pay", dataIndex: "net", key: "net" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button type="link" icon={<DownloadOutlined />}>
          Download PDF
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", padding: "24px" }}
      >
        {/* Header Section */}
        <div>
          <Title level={2}>Student Employment Overview</Title>
          <Paragraph>
            Welcome to your student employment dashboard. Here you can find
            important information about your campus job, schedule, and payment
            details.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* Employment Details */}
          <Col xs={24} lg={12}>
            <Card title="Employment Details">
              <Descriptions column={1}>
                <Descriptions.Item label="Student ID">
                  {studentInfo.id}
                </Descriptions.Item>
                <Descriptions.Item label="Name">
                  {studentInfo.name}
                </Descriptions.Item>
                <Descriptions.Item label="Department">
                  {studentInfo.department}
                </Descriptions.Item>
                <Descriptions.Item label="Job Title">
                  {studentInfo.jobTitle}
                </Descriptions.Item>
                <Descriptions.Item label="Start Date">
                  {studentInfo.startDate}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Pay Information */}
          <Col xs={24} lg={12}>
            <Card title="Pay Information">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="Hourly Rate"
                    value={studentInfo.hourlyRate}
                    prefix="$"
                    precision={2}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Pay Frequency"
                    value={studentInfo.payFrequency}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="YTD Earnings"
                    value={studentInfo.ytdEarnings}
                    prefix="$"
                  />
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Current Schedule */}
          <Col xs={24}>
            <Card
              title={
                <Space>
                  <CalendarOutlined />
                  <span>Current Schedule</span>
                </Space>
              }
              extra={<Button type="link">View Full Schedule</Button>}
            >
              <Table
                columns={scheduleColumns}
                dataSource={scheduleData}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>

          {/* Required Training */}
          <Col xs={24} lg={12}>
            <Card title="Required Training">
              <List
                size="small"
                dataSource={[
                  {
                    name: "Student Worker Safety Training",
                    due: "2024-01-15",
                    status: "Pending",
                  },
                  {
                    name: "FERPA Training",
                    due: "2024-01-30",
                    status: "Completed",
                  },
                ]}
                renderItem={(item) => (
                  <List.Item
                    extra={
                      <Tag
                        color={
                          item.status === "Completed" ? "success" : "warning"
                        }
                      >
                        {item.status}
                      </Tag>
                    }
                  >
                    <List.Item.Meta
                      title={item.name}
                      description={`Due: ${item.due}`}
                    />
                  </List.Item>
                )}
              />
              <Button type="primary" block style={{ marginTop: 16 }}>
                Access Training Portal
              </Button>
            </Card>
          </Col>

          {/* Important Forms & Resources */}
          <Col xs={24} lg={12}>
            <Card title="Forms & Resources">
              <List
                size="small"
                dataSource={[
                  {
                    title: "Student Employment Handbook",
                    icon: <FileTextOutlined />,
                  },
                  { title: "Direct Deposit Form", icon: <FileTextOutlined /> },
                  { title: "W-4 Form", icon: <FileTextOutlined /> },
                  { title: "I-9 Form", icon: <FileTextOutlined /> },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Button type="link" icon={item.icon}>
                      {item.title}
                    </Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Contact Information */}
          <Col xs={24}>
            <Card title="Contact Information">
              <Row gutter={[24, 16]}>
                <Col xs={24} md={8}>
                  <Title level={5}>Student Employment Office</Title>
                  <Space direction="vertical">
                    <Text>
                      <PhoneOutlined /> (555) 123-4567
                    </Text>
                    <Text>
                      <MailOutlined /> student.employment@university.edu
                    </Text>
                  </Space>
                </Col>
                <Col xs={24} md={8}>
                  <Title level={5}>Payroll Department</Title>
                  <Space direction="vertical">
                    <Text>
                      <PhoneOutlined /> (555) 123-4568
                    </Text>
                    <Text>
                      <MailOutlined /> payroll@university.edu
                    </Text>
                  </Space>
                </Col>
                <Col xs={24} md={8}>
                  <Title level={5}>Your Supervisor</Title>
                  <Space direction="vertical">
                    <Text>
                      <PhoneOutlined /> (555) 123-4569
                    </Text>
                    <Text>
                      <MailOutlined /> supervisor@university.edu
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Space>
    </Layout>
  );
}
