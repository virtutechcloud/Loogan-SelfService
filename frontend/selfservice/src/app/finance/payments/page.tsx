"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import {
  Typography,
  Card,
  Radio,
  Table,
  Input,
  Button,
  Space,
  Badge,
  Alert,
  Divider,
  Tag,
} from "antd";
import {
  LockOutlined,
  SecurityScanOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;

interface PaymentItem {
  key: string;
  item: string;
  paymentGroup: string;
  dueDate: string;
  amountDue: number;
  amountToPay: number;
  status: "current" | "overdue";
}

export default function MakePaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("credit");
  const [selectedRows, setSelectedRows] = useState<PaymentItem[]>([]);
  const [totalToPay, setTotalToPay] = useState<number>(8400.0);

  const paymentData: PaymentItem[] = [
    {
      key: "1",
      item: "Spring 2025 Tuition",
      paymentGroup: "Student Receivable",
      dueDate: "2025-01-15",
      amountDue: 8400.0,
      amountToPay: 8400.0,
      status: "current",
    },
  ];

  const columns: ColumnsType<PaymentItem> = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
      render: (text, record) => (
        <Space>
          {text}
          {record.status === "overdue" && (
            <Badge status="error" text={<Tag color="error">Overdue</Tag>} />
          )}
        </Space>
      ),
    },
    {
      title: "Payment Group",
      dataIndex: "paymentGroup",
      key: "paymentGroup",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Amount Due",
      dataIndex: "amountDue",
      key: "amountDue",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Amount to Pay",
      dataIndex: "amountToPay",
      key: "amountToPay",
      render: (_, record) => (
        <Input
          type="number"
          defaultValue={record.amountToPay}
          onChange={(e) =>
            handleAmountChange(record.key, parseFloat(e.target.value))
          }
          prefix="$"
          style={{ width: "150px" }}
        />
      ),
    },
  ];

  const handleAmountChange = (key: string, value: number) => {
    // Update the total amount to pay
    setTotalToPay(value);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: PaymentItem[]) => {
      setSelectedRows(selectedRows);
    },
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-8 space-y-10">
        <Space direction="vertical" size="large" className="w-full gap-10">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-lg shadow-sm">
            <Title level={2} className="!mb-3">
              Make a Payment
            </Title>
            <Text type="secondary" className="text-lg">
              Use this page to make a payment on your account
            </Text>
          </div>

          {/* Payment Summary Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow p-6">
            <Space direction="vertical" className="w-full gap-8">
              <div>
                <Title level={3} className="!mb-0">
                  Total Payment:{" "}
                  <span className="text-blue-600 ml-2">
                    ${totalToPay.toFixed(2)}
                  </span>
                </Title>
              </div>
              <Divider className="!my-6" />
              <div className="space-y-12">
                <Text strong className="text-lg block mb-8">
                  Choose a Payment Method
                </Text>
                <Radio.Group
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="flex gap-6"
                  size="large"
                >
                  <Radio.Button value="credit" className="px-8 py-3">
                    Credit Card
                  </Radio.Button>
                  <Radio.Button value="ach" className="px-8 py-3">
                    ACH Transfer
                  </Radio.Button>
                  <Radio.Button value="wire" className="px-8 py-3">
                    Wire Transfer
                  </Radio.Button>
                </Radio.Group>
              </div>
            </Space>
          </Card>

          {/* Payment Details Table */}
          <Card className="shadow-md p-6">
            <Alert
              message="Please Note: Amounts Due may include credit amounts."
              type="info"
              showIcon
              className="mb-8"
            />
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={paymentData}
              pagination={false}
              className="border border-gray-200 rounded-lg"
            />
          </Card>

          {/* Security Notice */}
          <Card className="bg-green-50 border-green-200 p-6">
            <Space align="center" size="large">
              <SecurityScanOutlined className="text-3xl text-green-600" />
              <Text className="text-gray-700 text-lg">
                Your payment is secured with SSL encryption. We never store your
                payment details.
              </Text>
              <LockOutlined className="text-3xl text-green-600" />
            </Space>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-6 pt-6">
            <Button
              icon={<QuestionCircleOutlined />}
              className="hover:bg-gray-50 h-12"
              size="large"
              onClick={() => window.open("/payment-faq", "_blank")}
            >
              Payment FAQ
            </Button>
            <Button
              type="primary"
              ghost
              size="large"
              className="hover:border-blue-700 hover:text-blue-700 h-12"
              onClick={() => console.log("Review payment")}
            >
              Review Payment
            </Button>
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 px-10 h-12"
              onClick={() => console.log("Proceed to payment")}
            >
              Proceed to Payment
            </Button>
          </div>
        </Space>
      </div>
    </Layout>
  );
}
