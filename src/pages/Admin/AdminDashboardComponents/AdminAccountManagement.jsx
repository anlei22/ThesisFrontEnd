import React, { useState, useEffect } from "react";
import {
  Eye,
  UserCheck,
  UserX,
  Trash2,
  X,
  Check,
  Ban,
  Search as SearchIcon,
  Filter,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User as UserIcon,
  Shield,
  Activity,
  Clock,
  AlertTriangle
} from "lucide-react";

const AdminAccountManagement = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isSticky, setIsSticky] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    action: null,
    admin: null,
    message: "",
  });

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Michael Reyes",
      email: "michael.admin@example.com",
      role: "Super Admin",
      joinDate: "2024-01-05",
      phone: "+63 912-345-6789",
      address: "San Luis, Batangas",
      bio: "Responsible for overseeing all admin and user activities in the system.",
      profileImage: "https://i.pravatar.cc/100?img=10",
      status: "active",
    },
    {
      id: 2,
      name: "Angela Cruz",
      email: "angela.admin@example.com",
      role: "Moderator",
      joinDate: "2024-02-12",
      phone: "+63 923-456-7890",
      address: "Lipa City, Batangas",
      bio: "Focuses on user approvals, monitoring reports, and maintaining community standards.",
      profileImage: "https://i.pravatar.cc/100?img=11",
      status: "inactive",
    },
    {
      id: 3,
      name: "Carlos Santos",
      email: "carlos.admin@example.com",
      role: "Admin",
      joinDate: "2024-03-01",
      phone: "+63 934-567-8901",
      address: "Tanauan, Batangas",
      bio: "Handles technical operations and system maintenance tasks.",
      profileImage: "https://i.pravatar.cc/100?img=12",
      status: "active",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.admin@example.com",
      role: "Content Moderator",
      joinDate: "2024-02-20",
      phone: "+63 945-678-9012",
      address: "Malvar, Batangas",
      bio: "Reviews and moderates user-generated content and handles policy violations.",
      profileImage: "https://i.pravatar.cc/100?img=13",
      status: "deleted",
    },
  ]);

  const statusTypes = ["all", "active", "inactive", "deleted"];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("admin-header");
      if (header) {
        const headerBottom = header.offsetTop + header.offsetHeight;
        setIsSticky(window.scrollY >= headerBottom);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredAdmins = admins.filter((admin) => {
    const matchesSearch = [admin.name, admin.email, admin.role].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus =
      selectedStatus === "all" || admin.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewProfile = (admin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  const openConfirmModal = (admin, action, message) => {
    setConfirmModal({ show: true, action, admin, message });
  };

  const handleConfirm = () => {
    if (!confirmModal.admin) return;

    const { admin, action } = confirmModal;

    if (action === "delete") {
      setAdmins(
        admins.map((a) => (a.id === admin.id ? { ...a, status: "deleted" } : a))
      );
    } else if (action === "set-active") {
      setAdmins(
        admins.map((a) => (a.id === admin.id ? { ...a, status: "active" } : a))
      );
    } else if (action === "set-inactive") {
      setAdmins(
        admins.map((a) => (a.id === admin.id ? { ...a, status: "inactive" } : a))
      );
    }

    setConfirmModal({ show: false, action: null, admin: null, message: "" });
    setShowModal(false);
    setSelectedAdmin(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
  };

  const closeConfirm = () => {
    setConfirmModal({ show: false, action: null, admin: null, message: "" });
  };

  const getStatusStyling = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-yellow-100 text-yellow-800";
      case "deleted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Activity className="w-3 h-3" />;
      case "inactive":
        return <Clock className="w-3 h-3" />;
      case "deleted":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getRoleIcon = (role) => {
    if (role === "Super Admin") return <Shield className="w-3 h-3" />;
    if (role === "Admin") return <UserCheck className="w-3 h-3" />;
    return <UserIcon className="w-3 h-3" />;
  };

  const getRoleStyling = (role) => {
    if (role === "Super Admin") return "bg-purple-100 text-purple-800";
    if (role === "Admin") return "bg-blue-100 text-blue-800";
    return "bg-indigo-100 text-indigo-800";
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
  
        {/* Header */}
        <header id="admin-header" className="bg-white sticky top-0 shadow-sm z-30">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Admin Account Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Manage administrator accounts and their permissions.
            </p>

            {/* Search Bar */}
            <div className="relative mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon size={18} />
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
                        ? "All Admins"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 py-4 sm:py-8">
          <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Showing {filteredAdmins.length} admin{filteredAdmins.length !== 1 ? 's' : ''}
          </div>

          {/* Admin Cards */}
          <div className="space-y-3 sm:space-y-4">
            {filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200"
              >
                <div className="p-4 sm:p-6">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <img
                          src={admin.profileImage}
                          alt={admin.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-semibold text-gray-900 truncate">{admin.name}</h4>
                          <p className="text-sm text-gray-600 truncate">{admin.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewProfile(admin)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <Eye size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyling(admin.status)}`}>
                          {getStatusIcon(admin.status)}
                          {admin.status}
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleStyling(admin.role)}`}>
                          {getRoleIcon(admin.role)}
                          {admin.role}
                        </span>
                      </div>

                      <div className="text-xs text-gray-500">
                        {new Date(admin.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex justify-between items-center">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={admin.profileImage}
                        alt={admin.name}
                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-semibold text-gray-900">{admin.name}</h4>
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyling(admin.status)}`}>
                            {getStatusIcon(admin.status)}
                            {admin.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1 truncate">{admin.email}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleStyling(admin.role)}`}>
                            {getRoleIcon(admin.role)}
                            {admin.role}
                          </span>
                          <span>•</span>
                          <span>Joined: {new Date(admin.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewProfile(admin)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Eye size={18} /> View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAdmins.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">No administrators found matching your criteria.</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your search or filter options.</p>
            </div>
          )}
        </main>
      </div>

      {/* Profile Modal */}
      {showModal && selectedAdmin && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <header className="flex items-center justify-between p-4 sm:p-6 border-b">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img 
                  src={selectedAdmin.profileImage} 
                  alt={selectedAdmin.name} 
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex-shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-lg truncate">
                    {selectedAdmin.name} — Admin Profile
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">Administrator Management</p>
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
                  src={selectedAdmin.profileImage}
                  alt={selectedAdmin.name}
                  className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border-4 border-gray-200"
                />
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{selectedAdmin.name}</h3>
                  <p className="text-sm sm:text-lg text-gray-600 mb-2 break-all">{selectedAdmin.email}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                    <span className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusStyling(selectedAdmin.status)}`}>
                      {getStatusIcon(selectedAdmin.status)}
                      {selectedAdmin.status}
                    </span>
                    <span className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getRoleStyling(selectedAdmin.role)}`}>
                      {getRoleIcon(selectedAdmin.role)}
                      {selectedAdmin.role}
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
                      <span className="text-xs sm:text-sm text-gray-700 break-all">{selectedAdmin.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 break-all">{selectedAdmin.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{selectedAdmin.address}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Account Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{selectedAdmin.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">
                        {new Date(selectedAdmin.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">About</h4>
                <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-lg leading-relaxed">
                  {selectedAdmin.bio}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <footer className="p-4 sm:p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                {selectedAdmin.status !== "active" && selectedAdmin.status !== "deleted" && (
                  <button
                    onClick={() => openConfirmModal(selectedAdmin, "set-active", "Set this account as Active?")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm sm:text-base"
                  >
                    <UserCheck size={16} /> Set Active
                  </button>
                )}
                {selectedAdmin.status !== "inactive" && selectedAdmin.status !== "deleted" && (
                  <button
                    onClick={() => openConfirmModal(selectedAdmin, "set-inactive", "Set this account as Inactive?")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm sm:text-base"
                  >
                    <UserX size={16} /> Set Inactive
                  </button>
                )}
                {selectedAdmin.status !== "deleted" && (
                  <button
                    onClick={() => openConfirmModal(selectedAdmin, "delete", "Are you sure you want to delete this account?")}
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

export default AdminAccountManagement;