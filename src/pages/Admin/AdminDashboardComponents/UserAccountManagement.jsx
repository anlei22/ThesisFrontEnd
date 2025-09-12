import React, { useState, useEffect } from "react";
import {
  Search,
  Check,
  X,
  Eye,
  Clock,
  UserCheck,
  UserX,
  Trash2,
  Ban,
  Filter,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User as UserIcon,
  Users,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

const User = () => {
  const [activeTab, setActiveTab] = useState('all-users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    action: null,
    message: "",
    user: null,
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "User",
      joinDate: "2024-01-15",
      phone: "+1 234-567-8900",
      address: "123 Main St, City, State 12345",
      bio: "Animal lover and enthusiast looking to connect with other pet owners.",
      profileImage: "https://i.pravatar.cc/100?img=1",
      status: "approved",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      joinDate: "2024-01-16",
      phone: "+1 234-567-8901",
      address: "456 Oak Ave, City, State 12346",
      bio: "Veterinarian with 10 years of experience in animal care and breeding.",
      profileImage: "https://i.pravatar.cc/100?img=2",
      validIdImage: "https://via.placeholder.com/400x250?text=Jane+Valid+ID",
      status: "for verification",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      joinDate: "2024-01-17",
      phone: "+1 234-567-8902",
      address: "789 Pine St, City, State 12347",
      bio: "Dog breeder specializing in Golden Retrievers and Labradors.",
      profileImage: "https://i.pravatar.cc/100?img=3",
      status: "disapproved",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      joinDate: "2024-01-18",
      phone: "+1 234-567-8903",
      address: "321 Elm St, City, State 12348",
      bio: "Cat enthusiast and rescue volunteer with experience in feline care.",
      profileImage: "https://i.pravatar.cc/100?img=4",
      status: "approved",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
      joinDate: "2024-01-19",
      phone: "+1 234-567-8904",
      address: "654 Maple Ave, City, State 12349",
      bio: "New to the platform, looking to adopt a pet for my family.",
      profileImage: "https://i.pravatar.cc/100?img=5",
      status: "for verification",
    },
    {
      id: 6,
      name: "Diana Green",
      email: "diana@example.com",
      role: "User",
      joinDate: "2024-01-20",
      phone: "+1 234-567-8905",
      address: "987 Cedar St, City, State 12350",
      bio: "Reported for inappropriate behavior and content violations.",
      profileImage: "https://i.pravatar.cc/100?img=6",
      status: "disapproved",
    },
    {
      id: 7,
      name: "Mike Davis",
      email: "mike@example.com",
      role: "Admin",
      joinDate: "2024-01-21",
      phone: "+1 234-567-8906",
      address: "159 Birch St, City, State 12351",
      bio: "Platform administrator with technical expertise.",
      profileImage: "https://i.pravatar.cc/100?img=7",
      status: "approved",
    },
    {
      id: 8,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "User",
      joinDate: "2024-01-22",
      phone: "+1 234-567-8907",
      address: "753 Oak St, City, State 12352",
      bio: "Former user account that was deleted due to policy violations.",
      profileImage: "https://i.pravatar.cc/100?img=8",
      status: "deleted",
    }
  ]);

  // Tab configuration
  const tabs = [
    { 
      id: 'all-users', 
      name: 'All Users', 
      icon: Users, 
      filter: (user) => user.status !== 'deleted',
      color: 'blue'
    },
    { 
      id: 'users', 
      name: 'Users', 
      icon: UserIcon, 
      filter: (user) => user.role === 'User' && user.status !== 'deleted',
      color: 'indigo'
    },
    { 
      id: 'admin', 
      name: 'Admin', 
      icon: Shield, 
      filter: (user) => user.role === 'Admin' && user.status !== 'deleted',
      color: 'purple'
    },
    { 
      id: 'approved', 
      name: 'Approved', 
      icon: CheckCircle, 
      filter: (user) => user.status === 'approved',
      color: 'green'
    },
    { 
      id: 'for-approval', 
      name: 'For Approval', 
      icon: Clock, 
      filter: (user) => user.status === 'for verification',
      color: 'yellow'
    },
    { 
      id: 'disapproved', 
      name: 'Disapproved', 
      icon: XCircle, 
      filter: (user) => user.status === 'disapproved',
      color: 'red'
    },
    { 
      id: 'delete', 
      name: 'Delete', 
      icon: Trash2, 
      filter: (user) => user.status === 'deleted',
      color: 'gray'
    }
  ];

  const activeTabConfig = tabs.find(tab => tab.id === activeTab);
  const filteredUsers = users.filter(user => {
    const matchesSearch = [user.name, user.email, user.role].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesTab = activeTabConfig ? activeTabConfig.filter(user) : true;
    return matchesSearch && matchesTab;
  });

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const closeAllModals = () => {
    setShowModal(false);
    setSelectedUser(null);
    setConfirmModal({ show: false, action: null, message: "", user: null });
  };

  const getStatusStyling = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "for verification":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "disapproved":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="w-3 h-3" />;
      case "for verification":
        return <Clock className="w-3 h-3" />;
      case "disapproved":
        return <X className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getTabColor = (color, isActive) => {
    if (isActive) {
      return {
        blue: 'bg-blue-600 text-white border-blue-600',
        indigo: 'bg-indigo-600 text-white border-indigo-600',
        purple: 'bg-purple-600 text-white border-purple-600',
        green: 'bg-green-600 text-white border-green-600',
        yellow: 'bg-yellow-500 text-white border-yellow-500',
        red: 'bg-red-600 text-white border-red-600',
        gray: 'bg-gray-600 text-white border-gray-600'
      }[color];
    }
    return 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
  };

  // Confirmation Modal Handlers
  const openConfirmModal = (user, action, message) => {
    setConfirmModal({ show: true, user, action, message });
  };
  
  const closeConfirm = () => setConfirmModal({ ...confirmModal, show: false });
  
  const handleConfirm = () => {
    if (!confirmModal.user) return;
    const { user, action } = confirmModal;
    
    switch (action) {
      case "approve":
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "approved" } : u)));
        closeAllModals();
        break;
      case "disapprove":
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "disapproved" } : u)));
        closeAllModals();
        break;
      case "mark-review":
        setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "for verification" } : u)));
        closeAllModals();
        break;
      case "delete":
        setUsers(users.filter((u) => u.id !== user.id));
        closeAllModals();
        break;
      default:
        closeConfirm();
        break;
    }
  };

  const getUserCount = (tabFilter) => {
    const count = users.filter(tabFilter).length;
    console.log('Tab filter count:', count, 'for filter:', tabFilter.toString());
    return count;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="bg-white sticky top-0 shadow-sm z-30 border-b">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-sm sm:text-base text-gray-600">
                Review and manage user accounts across different categories.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 min-w-max pb-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  const count = getUserCount(tab.filter);
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border whitespace-nowrap ${getTabColor(tab.color, isActive)}`}
                    >
                      <IconComponent size={16} />
                      <span>{tab.name}</span>
                      <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-6">
          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredUsers.length}</span> user{filteredUsers.length !== 1 ? 's' : ''} 
              {activeTabConfig && activeTab !== 'all-users' && (
                <span> in <span className="font-medium">{activeTabConfig.name}</span></span>
              )}
            </div>
          </div>

          {/* User Cards */}
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200"
              >
                <div className="p-6">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-semibold text-gray-900 truncate">{user.name}</h4>
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              user.role === "Admin" ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-blue-100 text-blue-800 border-blue-200"
                            } border`}>
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewProfile(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Eye size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusStyling(user.status)}`}>
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>

                      <div className="flex items-center gap-1">
                        {user.status === "for verification" && (
                          <>
                            <button
                              onClick={() => openConfirmModal(user, "disapprove", "Disapprove this user?")}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Disapprove"
                            >
                              <X size={14} />
                            </button>
                            <button
                              onClick={() => openConfirmModal(user, "approve", "Approve this user?")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check size={14} />
                            </button>
                          </>
                        )}

                        {(user.status === "approved" || user.status === "disapproved") && (
                          <button
                            onClick={() => openConfirmModal(user, "mark-review", "Mark this user for review?")}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Mark for Review"
                          >
                            <Clock size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                            <span className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusStyling(user.status)}`}>
                              {getStatusIcon(user.status)}
                              {user.status}
                            </span>
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                              user.role === "Admin" ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-blue-100 text-blue-800 border-blue-200"
                            }`}>
                              {user.role}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">{user.email}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewProfile(user)}
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <Eye size={18} />
                        </button>

                        {user.status === "for verification" && (
                          <>
                            <button
                              onClick={() => openConfirmModal(user, "disapprove", "Disapprove this user?")}
                              className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Disapprove"
                            >
                              <X size={18} />
                            </button>
                            <button
                              onClick={() => openConfirmModal(user, "approve", "Approve this user?")}
                              className="p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                          </>
                        )}

                        {(user.status === "approved" || user.status === "disapproved") && (
                          <button
                            onClick={() => openConfirmModal(user, "mark-review", "Mark this user for review?")}
                            className="p-3 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Mark for Review"
                          >
                            <Clock size={18} />
                          </button>
                        )}

                        {user.status !== "deleted" && (
                          <button
                            onClick={() => openConfirmModal(user, "delete", "Delete this user?")}
                            className="p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTabConfig && <activeTabConfig.icon className="w-10 h-10 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">
                {searchTerm ? 
                  `No users match your search "${searchTerm}" in ${activeTabConfig?.name}.` :
                  `No users found in ${activeTabConfig?.name}.`
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* User Profile Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <header className="flex items-center justify-between p-6 border-b bg-gray-50">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img 
                  src={selectedUser.profileImage} 
                  alt={selectedUser.name} 
                  className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-gray-200" 
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">User Profile Review</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </header>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <img
                  src={selectedUser.profileImage}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-xl border-4 border-gray-200"
                />
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedUser.name}</h3>
                  <p className="text-lg text-gray-600 mb-2 break-all">{selectedUser.email}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                    <span className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusStyling(selectedUser.status)}`}>
                      {getStatusIcon(selectedUser.status)}
                      {selectedUser.status}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                      selectedUser.role === "Admin" ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-blue-100 text-blue-800 border-blue-200"
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact & Account Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 break-all">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 break-all">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{selectedUser.address}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-3">Account Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{selectedUser.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">About</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl leading-relaxed">
                  {selectedUser.bio}
                </p>
              </div>

              {/* Valid ID (if applicable) */}
              {selectedUser.status === "for verification" && selectedUser.validIdImage && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Valid ID</h4>
                  <img 
                    src={selectedUser.validIdImage} 
                    alt={`${selectedUser.name}'s Valid ID`} 
                    className="w-full max-w-md border rounded-xl shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <footer className="p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                {selectedUser.status !== "approved" && selectedUser.status !== "disapproved" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "approve", "Set this account as Approved?")}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    <UserCheck size={16} /> Approve
                  </button>
                )}

                {selectedUser.status !== "disapproved" && selectedUser.status !== "approved" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "disapprove", "Set this account as Disapproved?")}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium"
                  >
                    <UserX size={16} /> Disapprove
                  </button>
                )}

                {selectedUser.status !== "deleted" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "delete", "Are you sure you want to delete this account?")}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  >
                    <Trash2 size={16} /> Delete Account
                  </button>
                )}
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Action</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{confirmModal.message}</p>
            </div>
            
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={closeConfirm}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors"
              >
                <Ban size={16} /> Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors"
              >
                <Check size={16} /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;