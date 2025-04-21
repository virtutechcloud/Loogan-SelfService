"use client";

import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Select,
  Row,
  Col,
  Space,
  Drawer,
  Spin,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MainLayout from "@/components/Layout";

const { Title } = Typography;
const { Search } = Input;

const subjects = [
  "Accounting",
  "All Hlt Diversity & Inclusion",
  "Art",
  "Art History",
  "Aviation Management",
  "Aviation Operations",
  "Aviation Science",
  "Biology",
  "Business",
  "Chemistry",
  "Communication Sciences Disord",
  "Communications",
  "Computing Sciences",
  "Dance",
  "Decision Sci Information Mgt",
  "Doctor Business Administration",
  "Economics",
  "Education",
  "English",
  "Environmental Science",
  "Finance",
  "French",
  "Geography",
  "German",
  "Health & Exercise Science",
  "History",
  "International Studies",
  "Italian",
  "Japanese",
  "Latin",
  "Law",
  "Mathematics",
  "Music",
  "Nursing",
  "Philosophy",
  "Physics",
  "Political Science",
  "Psychology",
  "Religious Studies",
  "Sociology",
  "Spanish",
  "Theatre",
  "Women's & Gender Studies",
  "Writing",
  "Youth & Family Studies",
  "Zoology",
  "Anthropology",
  "Archaeology",

  // ... rest of subjects from the list ...
];

export default function CourseCatalogPage() {
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = async (value: string) => {
    setLoading(true);
    try {
      // Implement your search logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      message.success("Search completed successfully");
    } catch (error) {
      message.error("Failed to search courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Title level={1}>Search for Courses and Course Sections</Title>
            <Typography.Text className="text-lg text-gray-600">
              Find Your Academic Path
            </Typography.Text>
          </div>

          {/* Keyword Search Section */}
          <section>
            <Title level={2}>Search for Courses by Keyword</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <Search
                  placeholder="Search for courses..."
                  enterButton="Search"
                  size="large"
                  loading={loading}
                  onSearch={handleSearch}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Col>
            </Row>
          </section>

          {/* Subject Search Section */}
          <section>
            <Title level={2}>Subject Search</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <Select
                  placeholder="Search for a course subject"
                  style={{ width: "100%" }}
                  size="large"
                  options={subjects.map((subject) => ({
                    label: subject,
                    value: subject,
                  }))}
                  onChange={setSelectedSubject}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  optionFilterProp="children"
                  mode="multiple" // Enable multi-select
                  maxTagCount={3} // Show only 3 tags, rest in +N format
                />
              </Col>
            </Row>
          </section>

          {/* Advanced Search Button */}
          <Button type="link" onClick={() => setDrawerVisible(true)}>
            Advanced Search
          </Button>

          {/* Advanced Search Drawer */}
          <Drawer
            title="Advanced Search Options"
            placement="right"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={320}
          >
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Typography.Text strong>Course Level</Typography.Text>
                <Select
                  placeholder="Select course level"
                  style={{ width: "100%" }}
                  options={[
                    { label: "100-level", value: "100" },
                    { label: "200-level", value: "200" },
                    { label: "300-level", value: "300" },
                    { label: "400-level", value: "400" },
                    { label: "Graduate", value: "graduate" },
                  ]}
                  mode="multiple"
                />
              </div>
              <div>
                <Typography.Text strong>Credits</Typography.Text>
                <Select
                  placeholder="Select credits"
                  style={{ width: "100%" }}
                  options={[
                    { label: "1 credit", value: "1" },
                    { label: "2 credits", value: "2" },
                    { label: "3 credits", value: "3" },
                    { label: "4 credits", value: "4" },
                    { label: "5+ credits", value: "5+" },
                  ]}
                  mode="multiple"
                />
              </div>
              <div>
                <Typography.Text strong>Term</Typography.Text>
                <Select
                  placeholder="Select term"
                  style={{ width: "100%" }}
                  options={[
                    { label: "Fall 2024", value: "fall2024" },
                    { label: "Spring 2025", value: "spring2025" },
                    { label: "Summer 2025", value: "summer2025" },
                  ]}
                />
              </div>
            </Space>
          </Drawer>
        </Space>
      </div>
    </MainLayout>
  );
}
