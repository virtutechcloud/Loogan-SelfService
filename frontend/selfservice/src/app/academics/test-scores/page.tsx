"use client";

import React from "react";
import { Table, Typography, Card, Space, theme } from "antd";
import MainLayout from "@/components/Layout";
import { motion } from "framer-motion";

const { Title } = Typography;
const { useToken } = theme;

const TestScoresPage = () => {
  const { token } = useToken();

  // Admission Tests data
  const admissionTestsColumns = [
    { title: "Test", dataIndex: "test", key: "test" },
    { title: "Date Taken", dataIndex: "dateTaken", key: "dateTaken" },
    { title: "Score", dataIndex: "score", key: "score" },
    { title: "Percentile", dataIndex: "percentile", key: "percentile" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status Date", dataIndex: "statusDate", key: "statusDate" },
  ];

  const admissionTestsData = [
    {
      key: "1",
      test: "GRE Analytical Writing",
      dateTaken: "7/10/2021",
      score: "138",
      percentile: "",
      status: "",
      statusDate: "",
    },
    {
      key: "2",
      test: "GRE Analytical Writing",
      dateTaken: "8/8/2021",
      score: "146",
      percentile: "",
      status: "",
      statusDate: "",
    },
    {
      key: "3",
      test: "GRE Quantitative",
      dateTaken: "7/10/2021",
      score: "3",
      percentile: "",
      status: "",
      statusDate: "",
    },
    {
      key: "4",
      test: "GRE Quantitative",
      dateTaken: "8/8/2021",
      score: "4",
      percentile: "",
      status: "",
      statusDate: "",
    },
    {
      key: "5",
      test: "GRE Verbal",
      dateTaken: "7/10/2021",
      score: "143",
      percentile: "",
      status: "",
      statusDate: "",
    },
    {
      key: "6",
      test: "GRE Verbal",
      dateTaken: "8/8/2021",
      score: "146",
      percentile: "",
      status: "",
      statusDate: "",
    },
  ];

  // Placement Tests data
  const placementTestsColumns = [
    { title: "Test", dataIndex: "test", key: "test" },
    { title: "Date Taken", dataIndex: "dateTaken", key: "dateTaken" },
    { title: "Score", dataIndex: "score", key: "score" },
    { title: "Percentile", dataIndex: "percentile", key: "percentile" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Status Date", dataIndex: "statusDate", key: "statusDate" },
  ];

  const placementTestsData = [
    {
      key: "1",
      test: "MATH1 - Arithmetic",
      dateTaken: "1/11/2016",
      score: "25 of 75",
      percentile: "",
      status: "Accepted",
      statusDate: "1/11/2016",
    },
    {
      key: "2",
      test: "MATH2 - Algebra",
      dateTaken: "1/11/2016",
      score: "19 of 75",
      percentile: "",
      status: "Accepted",
      statusDate: "1/11/2016",
    },
  ];

  // Enhanced styles
  const tableStyles = {
    table: {
      backgroundColor: token.colorBgContainer,
      borderRadius: 12,
    },
    th: {
      backgroundColor: `${token.colorPrimary}15 !important`,
      color: token.colorTextSecondary,
      fontSize: "14px",
      fontWeight: 600,
      padding: "16px 24px !important",
    },
    td: {
      padding: "16px 24px !important",
      fontSize: "14px",
    },
  } as const;

  const cardStyles = {
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    border: "none",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 6px 32px rgba(0, 0, 0, 0.08)",
    },
    "& .ant-card-head": {
      borderBottom: `1px solid ${token.colorBorder}`,
      minHeight: 64,
      padding: "0 24px",
      background: token.colorBgContainer,
    },
    "& .ant-card-head-title": {
      fontSize: "18px",
      fontWeight: 600,
      color: token.colorTextHeading,
    },
    "& .ant-card-body": {
      padding: "24px",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <MainLayout>
      <Space
        direction="vertical"
        size={32}
        style={{ width: "100%", padding: "32px" }}
      >
        <Title
          level={2}
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: 700,
            background: `linear-gradient(90deg, ${token.colorPrimary}, ${token.colorPrimaryActive})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Test Summary
        </Title>

        <motion.div variants={itemVariants}>
          <Title level={4}>Admission Tests</Title>
          <Table
            columns={admissionTestsColumns}
            dataSource={admissionTestsData}
            pagination={false}
            style={tableStyles.table}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Title level={4}>Placement Tests</Title>
          <Table
            columns={placementTestsColumns.map((col) => ({
              ...col,
              onHeaderCell: () => ({ style: tableStyles.th }),
            }))}
            dataSource={placementTestsData}
            pagination={false}
            style={tableStyles.table}
            onRow={() => ({ style: tableStyles.td })}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Title level={4}>Other Tests</Title>
          <Typography.Text
            type="secondary"
            style={{
              fontSize: "16px",
              display: "block",
              textAlign: "center",
              padding: "32px",
              color: token.colorTextDescription,
            }}
          >
            No tests of this type have been recorded.
          </Typography.Text>
        </motion.div>
      </Space>
    </MainLayout>
  );
};

export default TestScoresPage;
