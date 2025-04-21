const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    // Basic Course Information
    courseCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      min: 0,
    },

    // Course Details
    department: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["Introductory", "Intermediate", "Advanced", "Graduate"],
      required: true,
    },
    prerequisites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    // Capacity and Enrollment
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    waitlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // Scheduling
    semester: {
      type: String,
      required: true,
      enum: ["Fall", "Spring", "Summer"],
    },
    academicYear: {
      type: String,
      required: true,
    },
    schedule: {
      days: [
        {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      ],
      startTime: String,
      endTime: String,
      location: String,
    },

    // Instructor Information
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },

    // Course Status
    status: {
      type: String,
      enum: ["Active", "Cancelled", "Completed"],
      default: "Active",
    },

    // Grading
    gradingScale: {
      type: Map,
      of: Number,
      default: {
        A: 90,
        B: 80,
        C: 70,
        D: 60,
        F: 0,
      },
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
courseSchema.index({ courseCode: 1 });
courseSchema.index({ department: 1, level: 1 });
courseSchema.index({ semester: 1, academicYear: 1 });

// Virtual for current enrollment count
courseSchema.virtual("enrollmentCount").get(function () {
  return this.enrolledStudents.length;
});

// Virtual for available seats
courseSchema.virtual("availableSeats").get(function () {
  return this.capacity - this.enrolledStudents.length;
});

// Method to check if course is full
courseSchema.methods.isFull = function () {
  return this.enrolledStudents.length >= this.capacity;
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
