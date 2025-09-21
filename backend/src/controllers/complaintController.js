import Complaint from "../models/complaintModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
export const createComplaint = asyncHandler(async (req, res) => {
  const { title, category, priority, location, description } = req.body;

  // Validation
  if (!title || !category || !location || !description) {
    res.status(400);
    throw new Error("Please provide all required fields: title, category, location, description");
  }

  try {
    // Create complaint
    const complaint = await Complaint.create({
      title: title.trim(),
      category,
      priority: priority || "Medium",
      location: location.trim(),
      description: description.trim(),
      reportedBy: req.user.id
    });

    // Populate user information
    await complaint.populate('reportedBy', 'name email');

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.totalReports': 1 }
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
    const {
      page = 1,
      limit = 10,
      status,
      category,
      priority,
      search
    } = req.query;

    // Build query
    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const total = await Complaint.countDocuments(query);

    const complaints = await Complaint.find(query)
      .populate('reportedBy', 'name email')
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

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
export const getComplaintById = asyncHandler(async (req, res) => {


  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('reportedBy', 'name email phone');

    if (!complaint) {
      res.status(404);
      throw new Error("Complaint not found");
    }



    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    if (error.name === 'CastError') {
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

    // Check if user owns the complaint or is admin
    if (complaint.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error("Not authorized to update this complaint");
    }

    // Update fields
    const allowedFields = ['title', 'category', 'priority', 'location', 'description'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Admin can update status and assign
    if (req.user.role === 'admin') {
      if (req.body.status) updateData.status = req.body.status;
      if (req.body.assignedTo) updateData.assignedTo = req.body.assignedTo;
      if (req.body.adminNotes) updateData.adminNotes = req.body.adminNotes;
      if (req.body.status === 'Resolved' && !complaint.resolvedAt) {
        updateData.resolvedAt = new Date();
        // Update user stats when complaint is resolved
        await User.findByIdAndUpdate(complaint.reportedBy, {
          $inc: { 'stats.resolvedReports': 1 }
        });
      }
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('reportedBy', 'name email');



    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      data: updatedComplaint
    });
  } catch (error) {
    console.error("Error updating complaint:", error);
    if (error.name === 'CastError') {
      res.status(404);
      throw new Error("Complaint not found");
    }
    res.status(500);
    throw new Error("Failed to update complaint");
  }
});

// @desc    Get user's own complaints
// @route   GET /api/complaints/my-complaints
// @access  Private
export const getMyComplaints = asyncHandler(async (req, res) => {


  try {
    const { page = 1, limit = 10, status } = req.query;
    
    let query = { reportedBy: req.user.id };
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const total = await Complaint.countDocuments(query);

    const complaints = await Complaint.find(query)
      .populate('reportedBy', 'name email')
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

    // Check if user owns the complaint or is admin
    if (complaint.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error("Not authorized to delete this complaint");
    }

    await Complaint.findByIdAndDelete(req.params.id);

    // Update user stats
    await User.findByIdAndUpdate(complaint.reportedBy, {
      $inc: { 'stats.totalReports': -1 }
    });



    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    if (error.name === 'CastError') {
      res.status(404);
      throw new Error("Complaint not found");
    }
    res.status(500);
    throw new Error("Failed to delete complaint");
  }
});