const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    status: {
      type: String,
      enum: ["enrolled", "waitlisted", "dropped", "completed"],
      default: "enrolled",
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    grade: {
      type: String,
      enum: ["A", "B", "C", "D", "F", "I", "W", "IP"],
      default: "IP",
    },
    waitlistPosition: {
      type: Number,
      default: null,
    },
    completionDate: {
      type: Date,
    },
    semester: {
      type: String,
      required: true,
    },
    lastAttendanceDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate enrollments
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
// Index for querying enrollments by semester
enrollmentSchema.index({ semester: 1, student: 1 });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
