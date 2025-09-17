import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  // -------------------------
  // State for users (simulate backend)
  // -------------------------
  const [usersGrowth, setUsersGrowth] = useState([]);

  // Example user accounts with createdAt (replace with API fetch)
  const usersFromDB = [
    { id: 1, createdAt: "2025-01-10" },
    { id: 2, createdAt: "2025-01-20" },
    { id: 3, createdAt: "2025-02-05" },
    { id: 4, createdAt: "2025-03-15" },
    { id: 5, createdAt: "2025-03-25" },
    { id: 6, createdAt: "2025-12-02" },
    { id: 7, createdAt: "2025-12-15" },
  ];

  // -------------------------
  // Listings by Category
  // -------------------------
  const listingsData = [
    { category: "Carabao", listings: 25 },
    { category: "Cow", listings: 30 },
    { category: "Goat", listings: 35 },
    { category: "Chicken", listings: 30 },
    { category: "Pig", listings: 45 },
    { category: "Duck", listings: 20 },
    { category: "Tilapia", listings: 18 },
    { category: "Bangus", listings: 22 },
    { category: "Rabbit", listings: 15 },
  ];

  // -------------------------
  // User Roles Distribution
  // -------------------------
  const userRoleData = [
    { name: "Admin", value: 15 },
    { name: "Seller", value: 35 },
    { name: "Buyer", value: 50 },
    { name: "Pending Approve", value: 20 },
    { name: "Disapprove", value: 10 },
  ];

  const COLORS = [
    "#1D4ED8", // Admin - Dark Blue
    "#10B981", // Seller - Green
    "#F59E0B", // Buyer - Orange
    "#EAB308", // Pending Approve - Amber
    "#DC2626", // Disapprove - Red
  ];

  // -------------------------
  // Icons
  // -------------------------
  const UsersIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const ListingsIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <rect x="7" y="7" width="3" height="9"/>
      <rect x="14" y="7" width="3" height="5"/>
    </svg>
  );

  const ReportIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard
        </h2>
        <p className="mt-1 text-gray-600 text-sm sm:text-base">
          Overview of your animal marketplace
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Total Users</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{usersFromDB.length}</p>
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
              <h3 className="text-lg font-bold text-gray-800">Active Listings</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{listingsData.reduce((a,b)=>a+b.listings,0)}</p>
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
              <h3 className="text-lg font-bold text-gray-800">Reported Posts</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg text-red-600">
              <ReportIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listings by Category Chart */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Listings by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={listingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-30} textAnchor="end" interval={0} height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="listings" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Roles Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">User Roles Distribution</h3>
          <div className="flex items-center">
            {/* Left side - Statistics */}
            <div className="w-1/2 pr-4">
              <div className="space-y-3">
                {userRoleData.map((item, index) => {
                  const total = userRoleData.reduce((sum, data) => sum + data.value, 0);
                  const percentage = ((item.value / total) * 100).toFixed(1);
                  return (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index] }}
                        ></div>
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{item.value}</span>
                        <span className="text-gray-500">({percentage}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Right side - Donut Chart */}
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;