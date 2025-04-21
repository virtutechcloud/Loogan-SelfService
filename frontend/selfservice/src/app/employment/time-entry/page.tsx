"use client";
import React, { useState } from "react";
import MainLayout from "@/components/Layout";
import {
  DatePicker,
  TimePicker,
  Select,
  Input,
  Button,
  Table,
  Card,
  Typography,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";

const { Title } = Typography;
const { TextArea } = Input;

interface TimeEntry {
  id: number;
  startTime: string | null;
  endTime: string | null;
  department: string;
  task: string;
  notes: string;
}

const TimeEntryPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    startTime: string | null;
    endTime: string | null;
    department: string;
    task: string;
    notes: string;
  }>({
    startTime: null,
    endTime: null,
    department: "",
    task: "",
    notes: "",
  });

  // Mock data for departments/tasks - replace with API calls
  const departments = [
    { value: "library", label: "Library" },
    { value: "it", label: "IT Services" },
    { value: "dining", label: "Dining Services" },
  ];

  const tasks = [
    { value: "desk", label: "Front Desk" },
    { value: "support", label: "Technical Support" },
    { value: "other", label: "Other" },
  ];

  const calculateTotalHours = () => {
    return entries
      .reduce((total, entry) => {
        if (!entry.startTime || !entry.endTime) return total;
        const start = new Date(`1970/01/01 ${entry.startTime}`);
        const end = new Date(`1970/01/01 ${entry.endTime}`);
        const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return total + diff;
      }, 0)
      .toFixed(2);
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    message.success("Entry deleted successfully");
  };

  const validateTimes = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return false;
    const start = new Date(`1970/01/01 ${startTime}`);
    const end = new Date(`1970/01/01 ${endTime}`);
    return end > start;
  };

  const resetForm = () => {
    setForm({
      startTime: null,
      endTime: null,
      department: "",
      task: "",
      notes: "",
    });
  };

  const handleSubmit = async () => {
    try {
      if (
        !selectedDate ||
        !form.startTime ||
        !form.endTime ||
        !form.department
      ) {
        message.error("Please fill in all required fields");
        return;
      }

      if (!validateTimes(form.startTime, form.endTime)) {
        message.error("End time must be after start time");
        return;
      }

      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newEntry = {
        id: Date.now(),
        ...form,
      };

      setEntries([...entries, newEntry]);
      message.success("Time entry added successfully");
      resetForm();
    } catch (error) {
      message.error("Failed to add time entry");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TimeEntry) => (
        <Space>
          <Button type="link">Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div>
        <Title level={2}>Record Your Hours</Title>

        <Card className="mb-6">
          <Space direction="vertical" size="large" className="w-full">
            <DatePicker
              className="w-full"
              onChange={(date) => setSelectedDate(date?.toDate() ?? null)}
              placeholder="Select date"
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
            />

            <Space className="w-full">
              <TimePicker
                className="flex-1"
                format="h:mm A"
                placeholder="Start Time"
                value={form.startTime ? dayjs(form.startTime, "h:mm A") : null}
                onChange={(time) =>
                  setForm({
                    ...form,
                    startTime: time?.format("h:mm A") ?? null,
                  })
                }
              />
              <TimePicker
                className="flex-1"
                format="h:mm A"
                placeholder="End Time"
                value={form.endTime ? dayjs(form.endTime, "h:mm A") : null}
                onChange={(time) =>
                  setForm({ ...form, endTime: time?.format("h:mm A") ?? null })
                }
              />
            </Space>

            <Select
              className="w-full"
              placeholder="Select Department"
              options={departments}
              onChange={(value) => setForm({ ...form, department: value })}
            />

            <Select
              className="w-full"
              placeholder="Select Task (Optional)"
              options={tasks}
              onChange={(value) => setForm({ ...form, task: value })}
            />

            <TextArea
              placeholder="Notes (Optional)"
              rows={4}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              block
            >
              Add Entry
            </Button>
          </Space>
        </Card>

        <Card title="Time Entries">
          <Table
            columns={columns}
            dataSource={entries}
            pagination={{ pageSize: 5 }}
            rowKey="id"
          />
        </Card>

        <Card className="mt-6">
          <Space className="w-full" direction="vertical">
            <Title level={4}>Total Hours: {calculateTotalHours()}</Title>
            <Button
              type="primary"
              size="large"
              block
              disabled={entries.length === 0}
            >
              Submit Timesheet
            </Button>
          </Space>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TimeEntryPage;
