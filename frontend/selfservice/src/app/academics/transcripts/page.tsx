"use client";

import React from "react";
import { Typography, Card, Button, Alert, Space, Divider } from "antd";
import { FilePdfOutlined, WarningOutlined } from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Title, Text } = Typography;

export default function TranscriptsPage() {
  return (
    <MainLayout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Alert
          message="Unofficial Documents Notice"
          description="These documents are unofficial and should not replace the official signed and sealed transcript provided by the registrar."
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          banner
        />

        <Title level={2}>Academic Transcripts</Title>

        <Card>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Text>Select the type of transcript you would like to view:</Text>

            <Divider />

            <Space wrap size="large">
              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                size="large"
                onClick={() =>
                  window.open("/api/transcripts/unofficial", "_blank")
                }
              >
                Unofficial Transcript (PDF)
              </Button>

              <Button
                type="primary"
                icon={<FilePdfOutlined />}
                size="large"
                onClick={() =>
                  window.open("/api/transcripts/undergraduate", "_blank")
                }
              >
                Undergraduate Transcript (PDF)
              </Button>
            </Space>
          </Space>
        </Card>
      </Space>
    </MainLayout>
  );
}
