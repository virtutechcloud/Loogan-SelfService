"use client";

import React from "react";
import { Card, Table, Typography, Collapse } from "antd";
import type { ColumnsType } from "antd/es/table";
import MainLayout from "@/components/Layout";

const { Title } = Typography;
const { Panel } = Collapse;

interface CourseAttendance {
  courseSection: string;
  title: string;
  status?: string;
  totals: string;
}

interface TermGroup {
  termName: string;
  courses: CourseAttendance[];
}

const columns: ColumnsType<CourseAttendance> = [
  {
    title: "Course Section",
    dataIndex: "courseSection",
    key: "courseSection",
    width: "20%",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "60%",
    render: (text: string, record: CourseAttendance) => (
      <TitleCell text={text} status={record.status} />
    ),
  },
  {
    title: "Totals",
    dataIndex: "totals",
    key: "totals",
    width: "20%",
  },
];

const TitleCell = ({ text, status }: { text: string; status?: string }) => (
  <>
    {status && <Typography.Text type="secondary">({status})</Typography.Text>}
    <div>{text}</div>
  </>
);

export default function AttendancePage() {
  const termGroups: TermGroup[] = [
    {
      termName: "2025 Spring Second Half Term (3/3/2025-5/2/2025)",
      courses: [
        {
          courseSection: "MGT-545-102W",
          title: "Global Corp Strategy and Poli",
          totals: "No Attendance is recorded",
        },
      ],
    },
    // Add more terms here...
  ];

  return (
    <MainLayout>
      <Card>
        <Title level={2}>Academic Attendance</Title>
        <Collapse defaultActiveKey={["0"]}>
          {termGroups.map((term, index) => (
            <Panel header={term.termName} key={index}>
              <Table
                columns={columns}
                dataSource={term.courses}
                pagination={false}
                size="middle"
                rowKey="courseSection"
              />
            </Panel>
          ))}
        </Collapse>
      </Card>
    </MainLayout>
  );
}
