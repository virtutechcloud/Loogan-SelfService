const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    program: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "graduated", "on_leave"],
      default: "active",
    },
    contactInfo: {
      phone: {
        type: String,
        trim: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
      },
      emergencyContact: {
        name: String,
        relationship: String,
        phone: String,
      },
    },
    academics: {
      major: String,
      minor: String,
      gpa: {
        type: Number,
        min: 0.0,
        max: 4.0,
      },
      expectedGraduation: Date,
      academicStanding: {
        type: String,
        enum: ["good", "warning", "probation"],
        default: "good",
      },
    },
    financials: {
      accountBalance: {
        type: Number,
        default: 0,
      },
      scholarships: [
        {
          name: String,
          amount: Number,
          startDate: Date,
          endDate: Date,
        },
      ],
      paymentPlan: {
        type: String,
        enum: ["semester", "monthly", "annual"],
      },
    },
    documents: [
      {
        name: String,
        type: {
          type: String,
          enum: ["transcript", "id", "visa", "other"],
        },
        url: String,
        uploadDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add any virtual fields
studentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Add any instance methods
studentSchema.methods.isActive = function () {
  return this.status === "active";
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
