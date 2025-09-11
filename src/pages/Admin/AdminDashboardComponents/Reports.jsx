import React, { useState } from "react";

const Reports = () => {
  const [reportFilter, setReportFilter] = useState("all");

  const reports = [
    {
      id: 1,
      type: "user_report",
      title: "Inappropriate User Behavior",
      description: "User posting spam content and harassing other members",
      reportedItem: "User: @baduser123",
      reportedBy: "Multiple Users",
      timestamp: "1 day ago",
      status: "pending",
      priority: "high",
      details: "User has been posting inappropriate comments and sending unsolicited messages to multiple female users."
    },
    {
      id: 2,
      type: "content_report",
      title: "Fake Animal Listing",
      description: "User posting fake photos and misleading information about pets",
      reportedItem: "Post: 'Rare Bengal Kittens for Sale'",
      reportedBy: "Sarah Johnson",
      timestamp: "2 days ago",
      status: "investigating",
      priority: "medium",
      details: "Images appear to be stock photos, and the pricing seems too good to be true."
    }
    // Add more reports as needed
  ];

  const reportTypes = ["all", "user_report", "content_report", "technical_report", "payment_report"];

  const filteredReports = reports.filter(r =>
    reportFilter === "all" || r.type === reportFilter
  );

  const handleReportStatusChange = (id, status) => {
    reports.map(r => r.id === id ? { ...r, status } : r);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'investigating': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'escalated': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {reportTypes.map(type => (
          <button
            key={type}
            onClick={() => setReportFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              reportFilter === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type === "all" ? "All Reports" : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(r.status)}`}>
                {r.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(r.priority)}`}>
                {r.priority}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{r.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <span><strong>Item:</strong> {r.reportedItem}</span>
              <span>•</span>
              <span><strong>Reported by:</strong> {r.reportedBy}</span>
              <span>•</span>
              <span>{r.timestamp}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg mb-3">
              <p className="text-sm text-gray-700">{r.details}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {r.status === 'pending' && (
                <>
                  <button onClick={() => handleReportStatusChange(r.id, 'investigating')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Start Investigation</button>
                  <button onClick={() => handleReportStatusChange(r.id, 'escalated')} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Escalate</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;



