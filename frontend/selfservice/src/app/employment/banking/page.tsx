"use client";

import React from "react";
import { Card, Typography, Row, Col, Divider, Tag, Space } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import Layout from "@/components/Layout";

const { Title, Text, Paragraph } = Typography;

const BankingInformation: React.FC = () => {
  return (
    <Layout>
      <Card>
        <Title level={2}>Banking Information</Title>

        {/* Active Accounts Section */}
        <section>
          <Title level={3}>Active Accounts</Title>
          <Paragraph>
            Payroll is processed on a semi-monthly basis for employees and
            bi-weekly for students. Once the Payroll Department verifies the
            account, a green check will appear next to your account. For any
            questions, please contact <a href="mailto:hr@ju.edu">hr@ju.edu</a> &{" "}
            <a href="mailto:payroll@ju.edu">payroll@ju.edu</a>
          </Paragraph>
        </section>

        <Divider />

        {/* Payroll Deposits Section */}
        <section>
          <Title level={3}>Payroll Deposits</Title>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Text strong>Verification</Text>
                    <div>
                      <Tag color="success" icon={<CheckCircleFilled />}>
                        Verified
                      </Tag>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Text strong>Amount</Text>
                    <div>
                      <Text>Balance</Text>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Text strong>Deposit Priority</Text>
                    <div>
                      <Text>Last</Text>
                    </div>
                  </Col>
                </Row>
                <Text type="secondary">
                  Edit Payroll Deposit Usage for Stride Bank, N.A.
                </Text>
              </Card>
            </Col>
          </Row>
        </section>

        <Divider />

        {/* Refunds Section */}
        <section>
          <Title level={3}>Refunds, Reimbursements & Payments</Title>
          <Card>
            <Title level={4}>Verification</Title>
            <Paragraph>
              You have no active refund/reimbursement account. Your entire
              refund/reimbursement will be paid by paper check.
            </Paragraph>
          </Card>
        </section>
      </Card>
    </Layout>
  );
};

export default BankingInformation;
