"use client";

import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get saved sidebar state from localStorage
    const savedCollapsed = localStorage.getItem("sidebarCollapsed");
    if (savedCollapsed) {
      setCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  // Save sidebar state when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    }
  }, [collapsed, mounted]);

  if (!mounted) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 300,
          transition: "all 0.2s",
          minHeight: "100vh",
          width: `calc(100% - ${collapsed ? 80 : 300}px)`,
          paddingTop: 72,
          paddingBottom: 48,
        }}
      >
        <Header collapsed={collapsed} onToggle={() => {}} />
        <Content
          style={{
            margin: "24px",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 168px)",
            overflow: "auto",
          }}
        >
          {children}
        </Content>
        <Footer collapsed={collapsed} />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
