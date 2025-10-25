    import React, { useEffect, useState, useCallback } from "react";
    import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
    import { useNavigate } from "react-router-dom";
    import ReportCard from "./ReportCard"; // Reuse Dashboard's component

    export default function MyReports() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getToken = () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) return token;

        const user = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (user) {
        try {
            return JSON.parse(user).token;
        } catch (err) {
            console.error("Error parsing user:", err);
            return null;
        }
        }
        return null;
    };

    const fetchComplaints = useCallback(async () => {
        const token = getToken();
        if (!token) {
        setError("Please login to view your reports.");
        setLoading(false);
        return;
        }

        try {
        setLoading(true);
        setError("");
        const response = await fetch("http://localhost:5000/api/complaints/my", {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 403) setError("You are not authorized to view these reports.");
            else setError("Failed to load your reports.");
            setComplaints([]);
            return;
        }

        const data = await response.json();
        setComplaints(data?.data || []);
        } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to load your reports. Please try again.");
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    return (
        <div className="p-4">
        <button
            className="flex items-center gap-2 mb-4 text-gray-700"
            onClick={() => navigate(-1)}
        >
            <FiArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-semibold mb-4">My Reports</h2>

        <div className="mb-4">
            <button
            onClick={fetchComplaints}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-100 transition disabled:opacity-50"
            >
            <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
            </button>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-800">{error}</p>
            </div>
        )}

        {loading ? (
            <p className="text-gray-500">Loading reports...</p>
        ) : complaints.length === 0 ? (
            <p className="text-gray-500">You have not submitted any reports yet.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((c) => (
                <ReportCard key={c._id} complaint={c} />
            ))}
            </div>
        )}
        </div>
    );
    }
