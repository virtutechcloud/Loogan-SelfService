"use client";

import React from "react";
import { Layout, Row, Col, Typography, theme } from "antd";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

interface FooterProps {
  collapsed: boolean;
}

const Footer: React.FC<FooterProps> = ({ collapsed }) => {
  const currentYear = new Date().getFullYear();
  const { token } = theme.useToken();

  return (
    <AntFooter
      style={{
        padding: "12px 0",
        background: token.colorBgContainer,
        width: `calc(100% - ${collapsed ? 80 : 300}px)`,
        position: "fixed",
        bottom: 0,
        right: 0,
        borderTop: "1px solid " + token.colorBorderSecondary,
        zIndex: 1000,
        transition: "all 0.2s",
        height: 48,
      }}
    >
      <Row justify="center" align="middle">
        <Col xs={24} style={{ textAlign: "center" }}>
          <Text>Made with ❤️ in Nigeria © {currentYear}</Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
