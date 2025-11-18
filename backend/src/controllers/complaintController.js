import Complaint from "../models/complaintModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// ==================== COMPLAINT ENDPOINTS ====================

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
export const createComplaint = asyncHandler(async (req, res) => {
  const { title, category, priority, location, description } = req.body;

  if (!title || !category || !location || !description) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: title, category, location, description"
    );
  }

  try {
    // Handle photo upload - Cloudinary returns full URL, local storage returns filename
    let photo = null;
    if (req.file) {
      if (req.file.path) {
        // Cloudinary upload - use the secure URL
        photo = req.file.path;
      } else {
        // Local storage fallback - use filename
        photo = req.file.filename;
      }
    }

    const complaint = await Complaint.create({
      title: title.trim(),
      category,
      priority: priority || "Medium",
      location: location.trim(),
      description: description.trim(),
      reportedBy: req.user.id,
      photo
    });

    await complaint.populate("reportedBy", "name email");

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { "stats.totalReports": 1 }
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      data: complaint
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500);
    throw new Error("Failed to create complaint. Please try again.");
  }
});

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private
export const getAllComplaints = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category, priority, search } = req.query;

    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;
    const total = await Complaint.countDocuments(query);

    const complaints = await Complaint.find(query)
      .populate("reportedBy", "name email")
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: complaints.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: complaints
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500);
    throw new Error("Failed to fetch complaints");
  }
});

// @desc    Admin: Get all user complaints (with optional filters)
// @route   GET /api/complaints/admin/all
// @access  Private (admin)
export const adminGetAllComplaints = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category, priority, search, user } = req.query;

    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }
    if (user) {
      // allow filtering by reporter user id
      query.reportedBy = user;
    }

    const skip = (page - 1) * limit;
    const total = await Complaint.countDocuments(query);

    const complaints = await Complaint.find(query)
      .populate("reportedBy", "name email role")
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: complaints.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: complaints
    });
  } catch (error) {
    console.error("Error fetching admin complaints:", error);
    res.status(500);
    throw new Error("Failed to fetch complaints for admin");
  }
});

// @desc    Admin: Update complaint status
// @route   PUT /api/complaints/admin/:id/status
// @access  Private (admin)
export const adminUpdateComplaintStatus = asyncHandler(async (req, res) => {
  try {
    const { status, adminNotes, assignedTo } = req.body;
    const complaintId = req.params.id;

    // Validate status
    const validStatuses = ["Received", "In Review", "In Progress", "Resolved", "Closed"];
    if (!status || !validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Status must be one of: ${validStatuses.join(", ")}`);
    }

    // Find the complaint
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }

    // Prepare update data
    const updateData = {
      status,
      updatedAt: new Date()
    };

    // Add admin notes if provided
    if (adminNotes && adminNotes.trim()) {
      updateData.adminNotes = adminNotes.trim();
    }

    // Handle assignment
    if (assignedTo) {
      if (assignedTo.userId) {
        // Validate the assigned user exists
        const assignedUser = await User.findById(assignedTo.userId);
        if (!assignedUser) {
          res.status(400);
          throw new Error("Assigned user not found");
        }
        updateData.assignedTo = {
          userId: assignedTo.userId,
          name: assignedTo.name || assignedUser.name,
          assignedAt: new Date()
        };
      } else {
        // Clear assignment if no userId provided
        updateData.assignedTo = null;
      }
    }

    // Handle resolved status - set resolvedAt and update user stats
    if (status === "Resolved" && complaint.status !== "Resolved") {
      updateData.resolvedAt = new Date();
      
      // Update user's resolved reports count
      await User.findByIdAndUpdate(complaint.reportedBy, {
        $inc: { "stats.resolvedReports": 1 }
      });
    } else if (status !== "Resolved" && complaint.status === "Resolved") {
      // If changing from Resolved to another status, remove resolvedAt and decrement counter
      updateData.resolvedAt = null;
      
      await User.findByIdAndUpdate(complaint.reportedBy, {
        $inc: { "stats.resolvedReports": -1 }
      });
    }

    // Update the complaint
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      updateData,
      { new: true, runValidators: true }
    ).populate("reportedBy", "name email");

    res.status(200).json({
      success: true,
      message: `Complaint status updated to ${status}`,
      data: updatedComplaint
    });

  } catch (error) {
    console.error("Error updating complaint status:", error);
    if (error.name === "CastError") {
      res.status(404);
      throw new Error("Complaint not found");
    }
    res.status(500);
    throw new Error("Failed to update complaint status");
  }
});

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
export const getComplaintById = asyncHandler(async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("reportedBy", "name email phone");

    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }

    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    if (error.name === "CastError") {
      res.status(404);
      throw new Error("Complaint not found");
    }
    res.status(500);
    throw new Error("Failed to fetch complaint");
  }
});

// @desc    Update complaint
// @route   PUT /api/complaints/:id
// @access  Private
export const updateComplaint = asyncHandler(async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }

    if (complaint.reportedBy.toString() !== req.user.id && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Not authorized to update this complaint");
    }

    const allowedFields = ["title", "category", "priority", "location", "description"];
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    if (req.user.role === "admin") {
      if (req.body.status) updateData.status = req.body.status;
      if (req.body.assignedTo) updateData.assignedTo = req.body.assignedTo;
      if (req.body.adminNotes) updateData.adminNotes = req.body.adminNotes;
      if (req.body.status === "Resolved" && !complaint.resolvedAt) {
        updateData.resolvedAt = new Date();
        await User.findByIdAndUpdate(complaint.reportedBy, {
          $inc: { "stats.resolvedReports": 1 }
        });
      }
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("reportedBy", "name email");

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: updatedComplaint
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    if (error.name === "CastError") {
      res.status(404);
      throw new Error("Complaint not found");
    }
    res.status(500);
    throw new Error("Failed to update complaint");
  }
});

// @desc    Get user's own complaints
// @route   GET /api/complaints/my
// @access  Private
export const getMyComplaints = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    let query = { reportedBy: req.user.id };
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Complaint.countDocuments(query);

    const complaints = await Complaint.find(query)
      .populate("reportedBy", "name email")
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: complaints.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: complaints
    });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500);
    throw new Error("Failed to fetch your complaints");
  }
});

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private
export const deleteComplaint = asyncHandler(async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }

    if (complaint.reportedBy.toString() !== req.user.id && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Not authorized to delete this complaint");
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    if (error.name === "CastError") {
      res.status(404);
      throw new Error("Complaint not found");
    }
    res.status(500);
    throw new Error("Failed to delete complaint");
  }
});

// ==================== VOTES ====================

// @desc    Upvote/downvote a complaint
// @route   PATCH /api/complaints/:id/vote
// @access  Private
export const voteComplaint = async (req, res) => {
  try {
    const { action } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    if (!["upvote", "downvote"].includes(action))
      return res.status(400).json({ message: "Invalid action" });

    const existingVote = complaint.voters.find(v => v.userId?.toString() === userId);

    if (existingVote) {
      if (existingVote.type === action) {
        return res.status(200).json({ 
          message: `You already ${action}d this complaint`,
          votes: complaint.votes,
          downvotes: complaint.downvotes 
        });
      }
      // Change vote
      if (existingVote.type === "upvote" && action === "downvote") {
        complaint.votes -= 1;
        complaint.downvotes += 1;
      }
      if (existingVote.type === "downvote" && action === "upvote") {
        complaint.downvotes -= 1;
        complaint.votes += 1;
      }
      existingVote.type = action;
    } else {
      complaint.voters.push({ userId, type: action });
      if (action === "upvote") {
        complaint.votes += 1;
      } else {
        complaint.downvotes += 1;
      }
    }

    const savedComplaint = await complaint.save();
    res.status(200).json({ 
      message: `Complaint ${action}d successfully`, 
      votes: savedComplaint.votes,
      downvotes: savedComplaint.downvotes 
    });
  } catch (error) {
    console.error("Error in voteComplaint:", error);
    res.status(500).json({ message: "Failed to update vote" });
  }
};

// ==================== COMMENTS ====================

// @desc    Add comment
// @route   POST /api/complaints/:id/comments
// @access  Private
export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) {
    res.status(400);
    throw new Error("Comment text is required");
  }
  if (text.length > 500) {
    res.status(400);
    throw new Error("Comment cannot exceed 500 characters");
  }

  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }

    const newComment = { user: req.user.id, text: text.trim(), createdAt: new Date() };
    complaint.comments.push(newComment);
    await complaint.save();

    const updatedComplaint = await Complaint.findById(req.params.id).populate({
      path: "comments.user",
      select: "name email"
    });

    const addedComment = updatedComplaint.comments[updatedComplaint.comments.length - 1];
    res.status(201).json({ success: true, message: "Comment added successfully", data: addedComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    if (error.name === "CastError") res.status(404).send("Complaint not found");
    res.status(500);
    throw new Error("Failed to add comment");
  }
});

// @desc    Get all comments
// @route   GET /api/complaints/:id/comments
// @access  Private
export const getComments = asyncHandler(async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate({
      path: "comments.user",
      select: "name email"
    });
    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }

    res.status(200).json({ success: true, count: complaint.comments.length, data: complaint.comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    if (error.name === "CastError") res.status(404).send("Complaint not found");
    res.status(500);
    throw new Error("Failed to fetch comments");
  }
});

// @desc    Delete a comment
// @route   DELETE /api/complaints/:id/comments/:commentId
// @access  Private
export const deleteComment = asyncHandler(async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }

    const comment = complaint.comments.id(commentId);
    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    if (comment.user.toString() !== req.user.id && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Not authorized to delete this comment");
    }

    // Correct method for subdocument
    await comment.deleteOne();

    await complaint.save();

    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    if (error.name === "CastError") res.status(404).send("Invalid complaint or comment ID");
    res.status(500);
    throw new Error("Failed to delete comment");
  }
});

