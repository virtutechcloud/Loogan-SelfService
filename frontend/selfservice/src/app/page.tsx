"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, Alert, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Text } = Typography;
const { Content, Footer } = Layout;

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginPageProps {
  schoolName?: string;
}

export default function LoginPage({
  schoolName = "Self Service",
}: LoginPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement your authentication logic here
      console.log("Login attempted with:", values);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f0f7ff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "48px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="login-card"
            bordered={false}
            style={{
              width: "100%",
              maxWidth: "460px",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
              margin: "24px",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: "center", marginBottom: "2rem" }}
            >
              <div style={{ marginBottom: "24px" }}>
                <Title
                  level={1}
                  style={{
                    fontSize: "32px",
                    background:
                      "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    margin: "0",
                  }}
                >
                  {schoolName}
                </Title>
              </div>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Please sign in to your account
              </Text>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  style={{ marginBottom: "24px" }}
                />
              </motion.div>
            )}

            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              size="large"
              className="login-form"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Email address"
                  type="email"
                  autoComplete="email"
                  className="login-input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="login-input"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: "12px" }}>
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    className="login-button"
                  >
                    Sign in
                  </Button>
                </motion.div>
              </Form.Item>

              <div style={{ textAlign: "right", marginTop: "16px" }}>
                <Button type="link" className="forgot-password">
                  Forgot password?
                </Button>
              </div>
            </Form>
          </Card>
        </motion.div>
      </Content>

      <Footer
        style={{
          padding: "12px 0",
          background: "transparent",
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          height: "48px",
          zIndex: 1000,
        }}
      >
        <Text style={{ color: "rgba(0, 0, 0, 0.45)" }}>
          Made with ❤️ in Nigeria © {new Date().getFullYear()}
        </Text>
      </Footer>

      <style jsx global>{`
        .login-card .ant-card-body {
          padding: 40px;
        }

        .login-input {
          height: 52px !important;
          border-radius: 10px !important;
          border: 1.5px solid #e8e8e8 !important;
          background: #ffffff !important;
          transition: all 0.3s ease !important;
          text-align: left !important;
          margin-top: 6px !important;
          display: flex !important;
          align-items: center !important;
          position: relative !important;
        }

        .login-input .ant-input {
          background: transparent !important;
          text-align: left !important;
          padding-left: 48px !important;
          font-size: 16px !important;
          color: #262626 !important;
          height: 100% !important;
          z-index: 1 !important;
        }

        .login-input .ant-input-prefix {
          position: absolute !important;
          left: 16px !important;
          color: #8c8c8c !important;
          font-size: 20px !important;
          display: flex !important;
          align-items: center !important;
          height: 100% !important;
          z-index: 2 !important;
          pointer-events: none !important;
        }

        .login-input .anticon {
          transition: color 0.3s ease !important;
        }

        .login-input:focus-within .ant-input-prefix {
          color: #1890ff !important;
        }

        /* Password field specific styling */
        .ant-input-password {
          padding: 0 !important;
          position: relative !important;
        }

        .ant-input-password .ant-input {
          height: 100% !important;
          padding-right: 45px !important;
        }

        .ant-input-password-icon {
          color: #8c8c8c !important;
          position: absolute !important;
          right: 16px !important;
          font-size: 18px !important;
          display: flex !important;
          align-items: center !important;
          height: 100% !important;
          z-index: 2 !important;
          transition: color 0.3s ease !important;
        }

        /* Ensure proper stacking context */
        .ant-input-affix-wrapper {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
        }

        /* Remove any background that might be causing issues */
        .anticon {
          background: none !important;
          pointer-events: auto !important;
        }

        /* Ensure icons remain visible on autofill */
        input:-webkit-autofill + .ant-input-prefix {
          z-index: 2 !important;
          opacity: 1 !important;
        }

        .login-button {
          width: 100% !important;
          height: 52px !important;
          border-radius: 10px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          background: linear-gradient(
            135deg,
            #1890ff 0%,
            #096dd9 100%
          ) !important;
          border: none !important;
          box-shadow: 0 4px 16px rgba(24, 144, 255, 0.2) !important;
          transition: all 0.3s ease !important;
          margin-top: 8px !important;
        }

        .login-button:hover {
          background: linear-gradient(
            135deg,
            #40a9ff 0%,
            #1890ff 100%
          ) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(24, 144, 255, 0.25) !important;
        }

        .login-button:active {
          transform: translateY(1px) !important;
        }

        .forgot-password {
          color: #595959 !important;
          font-size: 14px !important;
          padding: 0 !important;
          font-weight: 500 !important;
        }

        .forgot-password:hover {
          color: #1890ff !important;
          text-decoration: underline !important;
        }

        /* Remove autofill styling */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #ffffff inset !important;
          -webkit-text-fill-color: #262626 !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }

        .login-form .ant-form-item {
          margin-bottom: 28px !important;
        }

        .login-form .ant-form-item-label {
          padding-bottom: 4px !important;
        }

        .login-form .ant-form-item-label > label {
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #262626 !important;
        }

        .login-form .ant-form-item-explain-error {
          margin-top: 6px !important;
          font-size: 13px !important;
          color: #ff4d4f !important;
        }

        /* Alert styling */
        .ant-alert {
          border-radius: 10px !important;
          padding: 12px 16px !important;
        }

        /* Title and subtitle spacing */
        .ant-typography + .ant-typography {
          margin-top: 8px !important;
        }

        /* Keep the login card styles */
        .login-card {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </Layout>
  );
}
