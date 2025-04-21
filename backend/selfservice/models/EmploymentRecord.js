const mongoose = require("mongoose");

const workScheduleSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    enum: [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const timeSheetEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  clockIn: {
    type: Date,
    required: true,
  },
  clockOut: {
    type: Date,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
  },
  notes: String,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
  approvalDate: Date,
});

const payPeriodSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalHours: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["IN_PROGRESS", "SUBMITTED", "APPROVED", "PAID"],
    default: "IN_PROGRESS",
  },
  timeSheetEntries: [timeSheetEntrySchema],
  paymentDate: Date,
  paymentAmount: Number,
});

const EmploymentRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    position: {
      title: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
      },
    },
    employmentType: {
      type: String,
      enum: ["WORK_STUDY", "STUDENT_EMPLOYEE", "GRADUATE_ASSISTANT"],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "TERMINATED"],
      default: "ACTIVE",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    hourlyRate: {
      type: Number,
      required: true,
    },
    maxHoursPerWeek: {
      type: Number,
      required: true,
    },
    schedule: [workScheduleSchema],
    payPeriods: [payPeriodSchema],
    documents: [
      {
        type: {
          type: String,
          enum: ["I9", "W4", "DIRECT_DEPOSIT", "WORK_PERMIT", "OTHER"],
          required: true,
        },
        fileUrl: String,
        uploadDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["PENDING", "APPROVED", "REJECTED"],
          default: "PENDING",
        },
      },
    ],
    workAuthorization: {
      type: {
        type: String,
        enum: ["CITIZEN", "PERMANENT_RESIDENT", "F1", "J1", "OTHER"],
        required: true,
      },
      expirationDate: Date,
      documentsVerified: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
EmploymentRecordSchema.index({ studentId: 1 });
EmploymentRecordSchema.index({ "position.department": 1 });
EmploymentRecordSchema.index({ "position.supervisor": 1 });
EmploymentRecordSchema.index({ status: 1 });

// Virtual for calculating total earnings in current pay period
EmploymentRecordSchema.virtual("currentPeriodEarnings").get(function () {
  const currentPeriod = this.payPeriods.find(
    (period) => period.status === "IN_PROGRESS" || period.status === "SUBMITTED"
  );
  return currentPeriod ? currentPeriod.totalHours * this.hourlyRate : 0;
});

// Method to add timesheet entry
EmploymentRecordSchema.methods.addTimeSheetEntry = function (
  currentPeriod,
  entryData
) {
  const payPeriod = this.payPeriods.id(currentPeriod);
  if (payPeriod && payPeriod.status !== "PAID") {
    payPeriod.timeSheetEntries.push(entryData);
    payPeriod.totalHours += entryData.hoursWorked;
    return this.save();
  }
  throw new Error("Invalid pay period or period already paid");
};

// Method to submit timesheet for approval
EmploymentRecordSchema.methods.submitTimeSheet = function (payPeriodId) {
  const payPeriod = this.payPeriods.id(payPeriodId);
  if (payPeriod && payPeriod.status === "IN_PROGRESS") {
    payPeriod.status = "SUBMITTED";
    return this.save();
  }
  throw new Error("Invalid pay period or already submitted");
};

const EmploymentRecord = mongoose.model(
  "EmploymentRecord",
  EmploymentRecordSchema
);

module.exports = EmploymentRecord;
