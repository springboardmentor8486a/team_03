import Complaint from '../models/complaintModel.js';

export const getMonthlyReports = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Complaint.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          reports: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedStats = monthlyStats.map(stat => ({
      name: months[stat._id.month - 1],
      reports: stat.reports
    }));

    res.status(200).json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching monthly statistics"
    });
  }
};


export const getReportsByCategory = async (req, res) => {
  try {
    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$category",
          reports: { $sum: 1 }
        }
      },
      {
        $sort: { reports: -1 }
      }
    ]);

    
    const formattedStats = categoryStats.map(stat => ({
      name: stat._id,
      reports: stat.reports
    }));

    res.status(200).json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching category statistics"
    });
  }
};


export const getOverallStats = async (req, res) => {
  try {
    const stats = await Complaint.aggregate([
      {
        $facet: {
          totalReports: [{ $count: "count" }],
          statusCounts: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);

    const totalReports = stats[0].totalReports[0]?.count || 0;
    const statusMap = {};
    stats[0].statusCounts.forEach(status => {
      statusMap[status._id.toLowerCase()] = status.count;
    });

    const resolutionRate = totalReports > 0 
      ? Math.round((statusMap.resolved || 0) / totalReports * 100) 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalReports,
        resolved: statusMap.resolved || 0,
        inProgress: statusMap['in progress'] || 0,
        rejected: statusMap.rejected || 0,
        resolutionRate,
        activeReports: (statusMap['in progress'] || 0) + (statusMap.pending || 0)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching overall statistics"
    });
  }
};