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
  MoreVertical
} from "lucide-react";

const User = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isSticky, setIsSticky] = useState(false);
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
  ]);

  const statusTypes = ["all", "approved", "for verification", "disapproved"];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("user-header");
      if (header) {
        const headerBottom = header.offsetTop + header.offsetHeight;
        setIsSticky(window.scrollY >= headerBottom);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = [user.name, user.email, user.role].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user))
    );
    closeAllModals();
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
        return "bg-green-100 text-green-800";
      case "for verification":
        return "bg-yellow-100 text-yellow-800";
      case "disapproved":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
 
        {/* Header */}
        <header id="user-header" className="bg-white sticky top-0 shadow-sm z-30">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Review and manage user accounts and their status.
            </p>

            {/* Search Bar */}
            <div className="relative mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
              >
                <Filter size={16} />
                Filter
                <ChevronDown className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block bg-white border-t border-gray-200`}>
            <div className="px-4 sm:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {statusTypes.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setShowMobileFilters(false);
                      }}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                        selectedStatus === status
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status === "all"
                        ? "All Users"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 flex-1 overflow-y-auto py-4 sm:py-8">
          <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          </div>

          {/* User Cards */}
          <div className="space-y-3 sm:space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200"
              >
                <div className="p-4 sm:p-6">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-semibold text-gray-900 truncate">{user.name}</h4>
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
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
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyling(user.status)}`}>
                          {getStatusIcon(user.status)}
                          {user.status}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{user.role}</span>
                      </div>

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
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyling(user.status)}`}>
                              {getStatusIcon(user.status)}
                              {user.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">{user.email}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Role: {user.role}</span>
                            <span>•</span>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <UserIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">No users found matching your criteria.</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your search or filter options.</p>
            </div>
          )}
        </main>
      </div>

      {/* User Profile Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <header className="flex items-center justify-between p-4 sm:p-6 border-b">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img 
                  src={selectedUser.profileImage} 
                  alt={selectedUser.name} 
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{selectedUser.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">User Profile Review</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </header>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-4 sm:p-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <img
                  src={selectedUser.profileImage}
                  alt={selectedUser.name}
                  className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-4 border-gray-200"
                />
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{selectedUser.name}</h3>
                  <p className="text-sm sm:text-lg text-gray-600 mb-2 break-all">{selectedUser.email}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                    <span className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusStyling(selectedUser.status)}`}>
                      {getStatusIcon(selectedUser.status)}
                      {selectedUser.status}
                    </span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      selectedUser.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact & Account Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 break-all">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 break-all">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{selectedUser.address}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Account Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{selectedUser.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">About</h4>
                <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-lg leading-relaxed">
                  {selectedUser.bio}
                </p>
              </div>

              {/* Valid ID (if applicable) */}
              {selectedUser.status === "for verification" && selectedUser.validIdImage && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Valid ID</h4>
                  <img 
                    src={selectedUser.validIdImage} 
                    alt={`${selectedUser.name}'s Valid ID`} 
                    className="w-full max-w-md border rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <footer className="p-4 sm:p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                {selectedUser.status !== "approved" && selectedUser.status !== "disapproved" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "approve", "Set this account as Approved?")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
                  >
                    <UserCheck size={16} /> Approve
                  </button>
                )}

                {selectedUser.status !== "disapproved" && selectedUser.status !== "approved" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "disapprove", "Set this account as Disapproved?")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm sm:text-base"
                  >
                    <UserX size={16} /> Disapprove
                  </button>
                )}

                {selectedUser.status !== "deleted" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "delete", "Are you sure you want to delete this account?")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
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
            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Confirm Action</h3>
              <p className="text-sm sm:text-base text-gray-700">{confirmModal.message}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6 border-t bg-gray-50">
              <button
                onClick={closeConfirm}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm sm:text-base"
              >
                <Ban size={16} /> Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base"
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