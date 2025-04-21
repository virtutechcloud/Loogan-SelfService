const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    term: {
      type: String,
      required: true,
      enum: ["Fall", "Spring", "Summer", "Winter"],
    },
    academicYear: {
      type: String,
      required: true,
      // Format: "2023-2024"
      match: /^\d{4}-\d{4}$/,
    },
    gradeType: {
      type: String,
      required: true,
      enum: ["midterm", "final", "assignment", "quiz", "project", "other"],
    },
    numericGrade: {
      type: Number,
      min: 0,
      max: 100,
    },
    letterGrade: {
      type: String,
      enum: [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "F",
        "I",
        "W",
      ],
    },
    gradePoints: {
      type: Number,
      min: 0.0,
      max: 4.0,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 100,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    lastModifiedBy: {
      type: String, // Could be instructor ID or name
      required: true,
    },
    comments: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
gradeSchema.index({ student: 1, course: 1, term: 1, academicYear: 1 });
gradeSchema.index({ course: 1, term: 1, academicYear: 1 });

// Virtual for calculating weighted grade
gradeSchema.virtual("weightedGrade").get(function () {
  return (this.numericGrade * this.weight) / 100;
});

// Static method to calculate GPA for a student
gradeSchema.statics.calculateGPA = async function (
  studentId,
  term,
  academicYear
) {
  const grades = await this.find({
    student: studentId,
    term,
    academicYear,
    isPublished: true,
  });

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach((grade) => {
    if (grade.gradePoints) {
      totalPoints += grade.gradePoints;
      totalCredits += 1;
    }
  });

  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

// Instance method to check if grade is passing
gradeSchema.methods.isPassing = function () {
  if (this.letterGrade) {
    return !["F", "W"].includes(this.letterGrade);
  }
  return this.numericGrade >= 60; // Assuming 60 is passing grade
};

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
