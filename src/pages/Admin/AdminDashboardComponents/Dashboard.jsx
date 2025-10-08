import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// ===== API CONFIGURATION =====
const API_BASE_URL = 'http://localhost:8000/api';
const API_KEY = 'gY7uVz2QeTXB1oLkwA@mJ5fPR9dNshv03tKMiC!bznqESGUlxyWcHmZ86OFD4rja';

// Helper function to get auth token
const getAuthToken = () => {
  const token = localStorage.getItem('login-token');
  console.log('🔑 Token Debug:', {
    tokenExists: !!token,
    tokenLength: token?.length,
    tokenPreview: token ? `${token.substring(0, 20)}...${token.substring(token.length - 5)}` : 'NULL'
  });
  return token;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    feedTableCount: 0,
    animalTypeCounts: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    console.log('🔄 Fetching dashboard data from backend...');
    
    try {
      const token = getAuthToken();
      
      console.log('📡 API Request:', {
        url: `${API_BASE_URL}/admin/dashboard`,
        method: 'GET',
        hasToken: !!token,
        hasApiKey: !!API_KEY
      });
      
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
          'login-token': token,
        },
      });

      console.log('📥 Response Status:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`Failed to fetch dashboard data: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('✅ SUCCESS: Dashboard data fetched successfully!');
      console.log('📊 Data received:', data);
      
      // Transform backend data to match frontend format
      const transformedData = {
        userCount: data.userCount || data.user_count || 0,
        feedTableCount: data.FeedTableCount || data.feedTableCount || data.feed_table_count || 0,
        animalTypeCounts: data.animalTypeCounts || data.animal_type_counts || []
      };
      
      console.log('✨ Transformed data:', transformedData);
      
      setDashboardData(transformedData);
      
    } catch (err) {
      console.error('❌ FAILED: Error fetching dashboard data');
      console.error('Error details:', {
        message: err.message,
        error: err
      });
      setError(err.message || 'Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
      console.log('🏁 Fetch operation completed');
    }
  };

  // Transform animalTypeCounts for the chart
  const listingsData = dashboardData.animalTypeCounts.map(item => ({
    category: item.type || item.name || item.category,
    listings: item.count || item.listings || item.value || 0
  }));

  // Icons
  const UsersIcon = () => (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const ListingsIcon = () => (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <rect x="7" y="7" width="3" height="9" />
      <rect x="14" y="7" width="3" height="5" />
    </svg>
  );

  const ReportIcon = () => (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Dashboard
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Overview of your animal marketplace
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Users Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Total Users</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.userCount}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <UsersIcon />
              </div>
            </div>
          </div>

          {/* Active Listings Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Active Listings
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData.feedTableCount}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg text-green-600">
                <ListingsIcon />
              </div>
            </div>
          </div>

          {/* Reported Posts Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Reported Posts
                </h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
                <p className="text-xs text-gray-500 mt-1">Coming soon</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg text-red-600">
                <ReportIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div>
          {/* Listings by Category Chart */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Listings by Animal Type
            </h3>
            {listingsData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={listingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="listings" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                No listings data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;