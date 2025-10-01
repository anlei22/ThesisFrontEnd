import React, { useState, useEffect } from "react";
import {
  Search,
  Check,
  X,
  Eye,
  Clock,
  UserCheck,
  UserX,
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
  AlertTriangle,
  Edit,
  Save,
  Camera,
  Loader
} from "lucide-react";

const User = () => {
  const [activeTab, setActiveTab] = useState('all-users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    action: null,
    message: "",
    user: null,
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      middleName: "Michael",
      surname: "Doe",
      email: "john@example.com",
      role: "User",
      joinDate: "2024-01-15",
      phone: "+1 234-567-8900",
      address: "123 Main St, City, State 12345",
      birthday: "1990-05-15",
      age: "34",
      sex: "Male",
      password: "password123",
      confirmPassword: "password123",
      bio: "Animal lover and enthusiast looking to connect with other pet owners.",
      profileImage: "https://i.pravatar.cc/100?img=1",
      idPhoto: "https://via.placeholder.com/400x250?text=John+ID+Photo",
      selfiePhoto: "https://via.placeholder.com/400x250?text=John+Selfie",
      status: "approved",
    },
    {
      id: 2,
      firstName: "Jane",
      middleName: "Elizabeth",
      surname: "Smith",
      email: "jane@example.com",
      role: "Admin",
      joinDate: "2024-01-16",
      phone: "+1 234-567-8901",
      address: "456 Oak Ave, City, State 12346",
      birthday: "1985-08-22",
      age: "39",
      sex: "Female",
      password: "admin456",
      confirmPassword: "admin456",
      bio: "Veterinarian with 10 years of experience in animal care and breeding.",
      profileImage: "https://i.pravatar.cc/100?img=2",
      idPhoto: "https://via.placeholder.com/400x250?text=Jane+ID+Photo",
      selfiePhoto: "https://via.placeholder.com/400x250?text=Jane+Selfie",
      status: "for verification",
    },
    {
      id: 3,
      firstName: "Bob",
      middleName: "William",
      surname: "Johnson",
      email: "bob@example.com",
      role: "User",
      joinDate: "2024-01-17",
      phone: "+1 234-567-8902",
      address: "789 Pine St, City, State 12347",
      birthday: "1978-12-03",
      age: "45",
      sex: "Male",
      password: "bob789",
      confirmPassword: "bob789",
      bio: "Dog breeder specializing in Golden Retrievers and Labradors.",
      profileImage: "https://i.pravatar.cc/100?img=3",
      idPhoto: "https://via.placeholder.com/400x250?text=Bob+ID+Photo",
      selfiePhoto: "https://via.placeholder.com/400x250?text=Bob+Selfie",
      status: "disapproved",
    },
    {
      id: 4,
      firstName: "Alice",
      middleName: "Marie",
      surname: "Brown",
      email: "alice@example.com",
      role: "User",
      joinDate: "2024-01-18",
      phone: "+1 234-567-8903",
      address: "321 Elm St, City, State 12348",
      birthday: "1992-03-18",
      age: "32",
      sex: "Female",
      password: "alice321",
      confirmPassword: "alice321",
      bio: "Cat enthusiast and rescue volunteer with experience in feline care.",
      profileImage: "https://i.pravatar.cc/100?img=4",
      idPhoto: "https://via.placeholder.com/400x250?text=Alice+ID+Photo",
      selfiePhoto: "https://via.placeholder.com/400x250?text=Alice+Selfie",
      status: "approved",
    },
    {
      id: 5,
      firstName: "Charlie",
      middleName: "James",
      surname: "Wilson",
      email: "charlie@example.com",
      role: "User",
      joinDate: "2024-01-19",
      phone: "+1 234-567-8904",
      address: "654 Maple Ave, City, State 12349",
      birthday: "1995-07-09",
      age: "29",
      sex: "Male",
      password: "charlie654",
      confirmPassword: "charlie654",
      bio: "New to the platform, looking to adopt a pet for my family.",
      profileImage: "https://i.pravatar.cc/100?img=5",
      idPhoto: "https://via.placeholder.com/400x250?text=Charlie+ID+Photo",
      selfiePhoto: "https://via.placeholder.com/400x250?text=Charlie+Selfie",
      status: "for verification",
    }
  ]);

  // Tab configuration
  const tabs = [
    { 
      id: 'all-users', 
      name: 'All Users', 
      icon: Users, 
      filter: (user) => true,
      color: 'blue'
    },
    { 
      id: 'users', 
      name: 'Users', 
      icon: UserIcon, 
      filter: (user) => user.role === 'User',
      color: 'indigo'
    },
    { 
      id: 'admin', 
      name: 'Admin', 
      icon: Shield, 
      filter: (user) => user.role === 'Admin',
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
    }
  ];

  const activeTabConfig = tabs.find(tab => tab.id === activeTab);
  const filteredUsers = users.filter(user => {
    const matchesSearch = [user.firstName, user.surname, user.email, user.role].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesTab = activeTabConfig ? activeTabConfig.filter(user) : true;
    return matchesSearch && matchesTab;
  });

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleEditProfile = (user) => {
    setEditingUser({...user});
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  const closeAllModals = () => {
    setShowModal(false);
    setSelectedUser(null);
    setShowEditModal(false);
    setEditingUser(null);
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
      default:
        closeConfirm();
        break;
    }
  };

  const handleSaveEdit = async () => {
    if (editingUser) {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      
      // Update selected user if it's currently being viewed
      if (selectedUser && selectedUser.id === editingUser.id) {
        setSelectedUser(editingUser);
      }
      
      setIsLoading(false);
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        closeEditModal();
      }, 3000);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({
          ...editingUser,
          profileImage: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({
          ...editingUser,
          idPhoto: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelfiePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditingUser({
          ...editingUser,
          selfiePhoto: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserCount = (tabFilter) => {
    const count = users.filter(tabFilter).length;
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

          {/* User Cards - Clean Design */}
    <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleViewProfile(user)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 cursor-pointer"
          >
            <div className="p-6">
              {/* Mobile Layout */}
              <div className="sm:hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <img
                      src={user.profileImage}
                      alt={`${user.firstName} ${user.surname}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-semibold text-gray-900 truncate">
                        {user.firstName} {user.surname}
                      </h4>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getStatusStyling(user.status)}`}>
                          {getStatusIcon(user.status)}
                          {user.status}
                        </span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          user.role === "Admin" ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-blue-100 text-blue-800 border-blue-200"
                        } border`}>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <img
                      src={user.profileImage}
                      alt={`${user.firstName} ${user.surname}`}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {user.firstName} {user.surname}
                        </h4>
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

                  <div className="flex items-center">
                   
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
                  alt={`${selectedUser.firstName} ${selectedUser.surname}`}
                  className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-gray-200" 
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {selectedUser.firstName} {selectedUser.surname}
                  </h3>
                  <p className="text-sm text-gray-500">User Profile Details</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
               
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
            </header>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <img
                  src={selectedUser.profileImage}
                  alt={`${selectedUser.firstName} ${selectedUser.surname}`}
                  className="w-24 h-24 rounded-xl border-4 border-gray-200"
                />
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {selectedUser.firstName} {selectedUser.middleName} {selectedUser.surname}
                  </h3>
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

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-3">Personal Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <UserIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Full Name</p>
                        <p className="text-sm text-gray-700">
                          {selectedUser.firstName} {selectedUser.middleName} {selectedUser.surname}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Birthday & Age</p>
                        <p className="text-sm text-gray-700">
                          {new Date(selectedUser.birthday).toLocaleDateString()} ({selectedUser.age} years old)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <UserIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Sex</p>
                        <p className="text-sm text-gray-700">{selectedUser.sex}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm text-gray-700 break-all">{selectedUser.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-700 break-all">{selectedUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Address</p>
                        <p className="text-sm text-gray-700">{selectedUser.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Account Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="text-sm text-gray-700">{selectedUser.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Join Date</p>
                      <p className="text-sm text-gray-700">
                        {new Date(selectedUser.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedUser.bio && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">About</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl leading-relaxed">
                    {selectedUser.bio}
                  </p>
                </div>
              )}

              {/* ID and Selfie Photos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedUser.idPhoto && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">ID Photo</h4>
                    <img 
                      src={selectedUser.idPhoto} 
                      alt={`${selectedUser.firstName}'s ID Photo`} 
                      className="w-full max-w-md border rounded-xl shadow-md"
                    />
                  </div>
                )}
                
                {selectedUser.selfiePhoto && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Selfie Photo</h4>
                    <img 
                      src={selectedUser.selfiePhoto} 
                      alt={`${selectedUser.firstName}'s Selfie`} 
                      className="w-full max-w-md border rounded-xl shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <footer className="p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={() => handleEditProfile(selectedUser)}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  <Edit size={16} /> Edit Profile
                </button>

                {selectedUser.status !== "approved" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "approve", "Set this account as Approved?")}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    <UserCheck size={16} /> Approve
                  </button>
                )}

                {selectedUser.status !== "disapproved" && (
                  <button
                    onClick={() => openConfirmModal(selectedUser, "disapprove", "Set this account as Disapproved?")}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                  >
                    <UserX size={16} /> Disapprove
                  </button>
                )}
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Edit Modal Header */}
            <header className="flex items-center justify-between p-6 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <Edit className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Edit User Profile</h3>
                  <p className="text-sm text-gray-500">{editingUser.firstName} {editingUser.surname}</p>
                </div>
              </div>
              {!isLoading && (
                <button
                  onClick={closeEditModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </header>

            {/* Success Message */}
            {showSuccessMessage && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <p className="text-green-700 font-medium">Profile changes saved successfully!</p>
                </div>
              </div>
            )}

            {/* Edit Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              <form className="space-y-6">
                {/* Profile Picture Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-4">Profile Picture</h4>
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={editingUser.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                      />
                      <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                        <Camera size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="hidden"
                          disabled={isLoading}
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-600">Click the camera icon to change profile picture</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        value={editingUser.firstName}
                        readOnly
                        onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                      <input
                        type="text"
                        value={editingUser.middleName}
                        readOnly
                        onChange={(e) => setEditingUser({...editingUser, middleName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                      <input
                        type="text"
                        value={editingUser.surname}
                        readOnly
                        onChange={(e) => setEditingUser({...editingUser, surname: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                      <input
                        type="date"
                        value={editingUser.birthday}
                        readOnly
                        onChange={(e) => setEditingUser({...editingUser, birthday: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input
                        type="number"
                        value={editingUser.age}
                        readOnly
                        onChange={(e) => setEditingUser({...editingUser, age: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                      <select
                        value={editingUser.sex}
                        
                        onChange={(e) => setEditingUser({...editingUser, sex: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                        readOnly
                      >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  
                  <h4 className="font-semibold text-gray-800 mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editingUser.phone}
                        
                        readOnly
                        onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editingUser.email}
                        readOnly
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={editingUser.address}
                      readOnly
                      onChange={(e) => setEditingUser({...editingUser, address: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Account Settings */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-4">Account Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={editingUser.role}
                        
                        onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={editingUser.password}
                        onChange={(e) => setEditingUser({...editingUser, password: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        value={editingUser.confirmPassword}
                        onChange={(e) => setEditingUser({...editingUser, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-4">About</h4>
                  <textarea
                    value={editingUser.bio}
                    onChange={(e) => setEditingUser({...editingUser, bio: e.target.value})}
                    rows={3}
                    readOnly
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                {/* Photo Upload Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-4">ID Photo</h4>
                    {editingUser.idPhoto && (
                      <img 
                        src={editingUser.idPhoto}
                   
                        alt="ID Photo" 
                        className="w-full max-w-xs mb-4 border rounded-lg shadow-sm"
                      />
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Camera className="w-4 h-4" />
                      <span>Upload ID Photo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"readOnly
                      onChange={handleIdPhotoChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-4">Selfie Photo</h4>
                    {editingUser.selfiePhoto && (
                      <img 
                        src={editingUser.selfiePhoto} 
                        alt="Selfie Photo" 
                        className="w-full max-w-xs mb-4 border rounded-lg shadow-sm"
                      />
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Camera className="w-4 h-4" />
                      <span>Upload Selfie Photo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      
                      onChange={handleSelfiePhotoChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Edit Modal Footer */}
            <footer className="p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                {!isLoading && (
                  <button
                    onClick={closeEditModal}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    <X size={16} /> Cancel
                  </button>
                )}
                <button
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Save Changes
                    </>
                  )}
                </button>
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
                <X size={16} /> Cancel
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