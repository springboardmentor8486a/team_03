import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from "../components/AdminDashboard/AdminNavbar";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import axios from 'axios';

export default function AdminMapPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const center = [17.3850, 78.4867]; // Hyderabad coordinates

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Verify if user is admin
        const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/complaints', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setComplaints(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch complaints');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-col flex-1">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">City Complaints Map</h1>
            <p className="text-gray-600">View and manage all complaints across the city</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[600px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 p-4 rounded text-red-700">{error}</div>
          ) : (
            <div className="bg-white rounded-lg shadow-md h-[600px] overflow-hidden">
              <MapContainer
                center={center}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {complaints.map(complaint => (
                  complaint.latitude && complaint.longitude ? (
                    <Marker 
                      key={complaint._id}
                      position={[complaint.latitude, complaint.longitude]}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-semibold">{complaint.title}</h3>
                          <p className="text-sm text-gray-600">{complaint.description}</p>
                          <p className="text-sm text-gray-500">Reported by: {complaint.user?.name || 'Anonymous'}</p>
                          <p className="text-sm mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                              complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {complaint.status}
                            </span>
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null
                ))}
              </MapContainer>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}