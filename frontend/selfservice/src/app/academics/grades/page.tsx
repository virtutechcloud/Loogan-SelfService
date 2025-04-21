"use client";
import React from "react";
import { Table, Button, Spin, Result, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import MainLayout from "@/components/Layout";

interface Course {
  section: string;
  title: string;
  credits: number;
  finalGrade: string;
  dates: string;
}

interface Term {
  name: string;
  gpa?: number;
  courses: Course[];
  dates: string;
}

const mockTerms: Term[] = [
  {
    name: "Fall 2023",
    gpa: 3.75,
    dates: "Aug 2023 - Dec 2023",
    courses: [
      {
        section: "CS 101",
        title: "Introduction to Computer Science",
        credits: 3,
        finalGrade: "A",
        dates: "Aug 21, 2023 - Dec 15, 2023",
      },
      {
        section: "MATH 201",
        title: "Calculus I",
        credits: 4,
        finalGrade: "A-",
        dates: "Aug 21, 2023 - Dec 15, 2023",
      },
      {
        section: "ENG 105",
        title: "College Writing",
        credits: 3,
        finalGrade: "B+",
        dates: "Aug 21, 2023 - Dec 15, 2023",
      },
    ],
  },
  {
    name: "Spring 2024",
    gpa: 3.92,
    dates: "Jan 2024 - May 2024",
    courses: [
      {
        section: "CS 102",
        title: "Data Structures",
        credits: 3,
        finalGrade: "A",
        dates: "Jan 8, 2024 - May 3, 2024",
      },
      {
        section: "MATH 202",
        title: "Calculus II",
        credits: 4,
        finalGrade: "A",
        dates: "Jan 8, 2024 - May 3, 2024",
      },
      {
        section: "PHYS 101",
        title: "Physics I",
        credits: 4,
        finalGrade: "A-",
        dates: "Jan 8, 2024 - May 3, 2024",
      },
    ],
  },
];

const GradesPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [terms, setTerms] = React.useState<Term[]>([]);

  const columns: ColumnsType<Course> = [
    {
      title: "Course Section",
      dataIndex: "section",
      key: "section",
      render: (text, record) => (
        <>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.dates}</div>
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Final Grade",
      dataIndex: "finalGrade",
      key: "finalGrade",
      className: "font-medium",
    },
  ];

  React.useEffect(() => {
    // Simulate API call with mock data
    const fetchGrades = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTerms(mockTerms);
      } catch (err) {
        setError("Failed to load grades. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="p-4 flex justify-center items-center min-h-[400px]">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Result
          status="error"
          title="Failed to load grades"
          subTitle={error}
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>,
          ]}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Typography.Title level={2}>Academic History</Typography.Title>
          <Button type="primary" onClick={handlePrint}>
            Print Grades
          </Button>
        </div>

        {terms.length === 0 ? (
          <Result
            status="info"
            title="No grades available"
            subTitle="There are no grades to display at this time."
          />
        ) : (
          <div className="space-y-8">
            {terms.map((term, index) => (
              <div
                key={term.name + index}
                className="border rounded-lg shadow-sm p-6 bg-white"
              >
                <div className="flex justify-between mb-4">
                  <Typography.Title level={3}>{term.name}</Typography.Title>
                  {term.gpa && (
                    <div className="font-medium bg-blue-50 px-4 py-2 rounded-full">
                      Term GPA: {term.gpa.toFixed(3)}
                    </div>
                  )}
                </div>

                <Table
                  columns={columns}
                  dataSource={term.courses.map((course, i) => ({
                    ...course,
                    key: `${course.section}-${i}`,
                  }))}
                  pagination={false}
                  size="middle"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GradesPage;
