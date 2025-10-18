import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"]
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Infrastructure", "Roads", "Public Safety", "Environment", "Public Transport", "Other"],
      trim: true
    },
    priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium"
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    status: {
      type: String,
      enum: ["Received", "In Review", "In Progress", "Resolved", "Closed"],
      default: "Received"
    },
    photo: {
      type: String,
      default: null
    },
    submittedAt: {
      type: Date,
      default: Date.now
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedTo: {
      name: String,
      department: String,
      contact: String
    },
    resolvedAt: {
      type: Date
    },
    adminNotes: {
      type: String,
      trim: true
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        text: {
          type: String,
          required: [true, "Comment text is required"],
          trim: true,
          maxlength: [500, "Comment cannot exceed 500 characters"]
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    voters: [
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["upvote", "downvote"] }
  }
],
votes: { type: Number, default: 0 },
downvotes: { type: Number, default: 0 }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: true
  }
);

// Virtual for days since submission
complaintSchema.virtual('daysSinceSubmission').get(function() {
  if (this.submittedAt) {
    const diffTime = Math.abs(new Date() - this.submittedAt);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Index for faster queries
complaintSchema.index({ reportedBy: 1, status: 1 });
complaintSchema.index({ category: 1, priority: 1 });
complaintSchema.index({ submittedAt: -1 });
complaintSchema.index({ voters: 1 });
complaintSchema.index({ votes: 1 });

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
