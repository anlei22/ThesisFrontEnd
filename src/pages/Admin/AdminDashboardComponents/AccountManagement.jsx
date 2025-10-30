import React, { useState, useEffect } from "react";
import {
  Search,
  Check,
  X,
  Clock,
  UserCheck,
  UserX,
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
  Save,
  Loader,
  Ban,
  Trash2
} from "lucide-react";

const User = () => {
  const [activeTab, setActiveTab] = useState('all-users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Success Modal State
  const [successModal, setSuccessModal] = useState({
    show: false,
    type: '', // 'approve', 'ban', 'admin', 'delete', 'forapproval'
    user: null,
  });

  // API Configuration
  const API_BASE_URL = 'http://localhost:8000/api';
  const API_KEY = 'gY7uVz2QeTXB1oLkwA@mJ5fPR9dNshv03tKMiC!bznqESGUlxyWcHmZ86OFD4rja';
  
  const getAuthToken = () => {
    return localStorage.getItem('login-token');
  };

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    action: null,
    message: "",
    user: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      setApiError(null);
      
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/admin/user-listings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY,
          'login-token': token,
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();
      
      const transformedUsers = data.map(user => {
        let mappedStatus = 'approved';
        const dbStatus = (user.status || user.Status || 'Approved').toLowerCase();
        
        if (dbStatus === 'approved') {
          mappedStatus = 'approved';
        } else if (dbStatus === 'banned') {
          mappedStatus = 'banned';
        } else if (dbStatus === 'pending' || dbStatus === 'for verification') {
          mappedStatus = 'for verification';
        }
        
        return {
          id: user.id,
          firstName: user.FirstName || '',
          middleName: user.MiddleName || user.middle_name || '',
          surname: user.LastName || user.last_name || user.surname || '',
          email: user.Email || user.email || '',
          role: user.Role || user.role || 'User',
          joinDate: user.created_at || user.join_date || new Date().toISOString(),
          phone: user.Phone || user.phone || user.contact_number || '',
          address: user.Address || user.address || '',
          birthday: user.Birthday || user.birthday || user.date_of_birth || '',
          age: user.Age || user.age || '',
          sex: user.Sex || user.sex || user.gender || '',
          bio: user.Bio || user.bio || user.description || '',
          profileImage: user.ProfileImage || user.profile_image || user.profile_picture || `https://i.pravatar.cc/100?img=${user.id}`,
          idPhoto: user.IDPhoto || user.id_photo || user.government_id || 'https://via.placeholder.com/400x250?text=ID+Photo',
          selfiePhoto: user.SelfiePhoto || user.selfie_photo || user.selfie || 'https://via.placeholder.com/400x250?text=Selfie',
          status: mappedStatus,
        };
      });

      setUsers(transformedUsers);
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      setApiError('Failed to load users. Please check your connection and try again.');
      setUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const tabs = [
    { 
      id: 'all-users', 
      name: 'All Users', 
      icon: Users, 
      filter: (user) => true,
      color: 'blue'
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
      id: 'banned', 
      name: 'Banned', 
      icon: XCircle, 
      filter: (user) => user.status === 'banned',
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
      case "banned":
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
      case "banned":
        return <X className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getTabColor = (color, isActive) => {
    if (isActive) {
      return {
        blue: 'bg-blue-600 text-white border-blue-600',
        green: 'bg-green-600 text-white border-green-600',
        yellow: 'bg-yellow-500 text-white border-yellow-500',
        red: 'bg-red-600 text-white border-red-600',
      }[color];
    }
    return 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';
  };

  const openConfirmModal = (user, action, message) => {
    setConfirmModal({ show: true, user, action, message });
  };
  
  const closeConfirm = () => setConfirmModal({ ...confirmModal, show: false });
  
  const showSuccessMessage = (type, user) => {
    setSuccessModal({ show: true, type, user });
    setTimeout(() => {
      setSuccessModal({ show: false, type: '', user: null });
    }, 3000);
  };

  const handleConfirm = async () => {
    if (!confirmModal.user) return;
    const { user, action } = confirmModal;
    
    try {
      setIsLoading(true);
      setApiError(null);

      switch (action) {
        case "approve":
          const approveResponse = await fetch(`${API_BASE_URL}/admin/user-listings/update/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': API_KEY,
              'login-token': getAuthToken(),
            },
            body: JSON.stringify({ status: 'approved' })
          });

          if (!approveResponse.ok) {
            throw new Error('Failed to approve user');
          }

          setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "approved" } : u)));
          closeAllModals();
          showSuccessMessage('approve', user);
          break;
          
        case "ban":
          const banResponse = await fetch(`${API_BASE_URL}/admin/user-listings/ban/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': API_KEY,
              'login-token': getAuthToken(),
            }
          });

          if (!banResponse.ok) {
            throw new Error('Failed to ban user');
          }

          const banResult = await banResponse.json();
          if (banResult.status === 'success') {
            setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "banned" } : u)));
            closeAllModals();
            showSuccessMessage('ban', user);
          }
          break;

        case "forapproval":
          const forApprovalResponse = await fetch(`${API_BASE_URL}/admin/user-listings/update/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': API_KEY,
              'login-token': getAuthToken(),
            },
            body: JSON.stringify({ status: 'for verification' })
          });

          if (!forApprovalResponse.ok) {
            throw new Error('Failed to move user to for approval');
          }

          setUsers(users.map((u) => (u.id === user.id ? { ...u, status: "for verification" } : u)));
          closeAllModals();
          showSuccessMessage('forapproval', user);
          break;

        case "delete":
          const deleteResponse = await fetch(`${API_BASE_URL}/admin/user-listings/delete/${user.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': API_KEY,
              'login-token': getAuthToken(),
            }
          });

          if (!deleteResponse.ok) {
            throw new Error('Failed to delete user');
          }

          setUsers(users.filter((u) => u.id !== user.id));
          closeAllModals();
          showSuccessMessage('delete', user);
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      setApiError('Failed to update user status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (editingUser) {
      setIsLoading(true);
      
      try {
        const userData = {
          Role: 'Admin'
        };

        const response = await fetch(`${API_BASE_URL}/admin/user-listings/update/${editingUser.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
            'login-token': getAuthToken(),
          },
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        const updatedUser = { ...editingUser, role: 'Admin' };
        setUsers(users.map(user => 
          user.id === editingUser.id ? updatedUser : user
        ));
        
        if (selectedUser && selectedUser.id === editingUser.id) {
          setSelectedUser(updatedUser);
        }
        
        closeEditModal();
        closeModal();
        showSuccessMessage('admin', editingUser);
      } catch (error) {
        console.error('Error updating user:', error);
        setApiError('Failed to save changes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getUserCount = (tabFilter) => {
    return users.filter(tabFilter).length;
  };

  const getSuccessConfig = (type) => {
    switch(type) {
      case 'approve':
        return {
          icon: CheckCircle,
          title: 'User Approved Successfully!',
          description: 'The user account has been approved and activated.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          iconBg: 'bg-green-100'
        };
      case 'ban':
        return {
          icon: Ban,
          title: 'User Banned Successfully!',
          description: 'The user account has been banned and deactivated.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100'
        };
      case 'admin':
        return {
          icon: Shield,
          title: 'Admin Role Granted!',
          description: 'The user has been successfully promoted to administrator.',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          iconColor: 'text-purple-600',
          iconBg: 'bg-purple-100'
        };
      case 'delete':
        return {
          icon: Trash2,
          title: 'User Deleted Successfully!',
          description: 'The user account has been permanently removed from the system.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100'
        };
      case 'forapproval':
        return {
          icon: Clock,
          title: 'Moved to For Approval!',
          description: 'The user has been moved back to pending approval status.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          iconBg: 'bg-yellow-100'
        };
      default:
        return {
          icon: CheckCircle,
          title: 'Action Completed!',
          description: 'The operation was successful.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          iconBg: 'bg-blue-100'
        };
    }
  };

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Error Loading Users</h3>
              <p className="text-red-700 text-sm mb-4">{apiError}</p>
              <button
                onClick={fetchUsers}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
        <header className="bg-white sticky top-0 shadow-sm z-30 border-b">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-sm sm:text-base text-gray-600">
                Review and manage user accounts across different categories.
              </p>
            </div>

            <div className="relative max-w-md mb-6">
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

        <main className="px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredUsers.length}</span> user{filteredUsers.length !== 1 ? 's' : ''} 
              {activeTabConfig && activeTab !== 'all-users' && (
                <span> in <span className="font-medium">{activeTabConfig.name}</span></span>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleViewProfile(user)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 cursor-pointer"
              >
                <div className="p-6">
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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

      {/* Success Modal */}
      {successModal.show && successModal.user && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-scaleIn">
            <div className="p-8">
              <div className="text-center">
                {(() => {
                  const config = getSuccessConfig(successModal.type);
                  const IconComponent = config.icon;
                  return (
                    <>
                      <div className={`w-20 h-20 ${config.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce`}>
                        <IconComponent className={`w-10 h-10 ${config.iconColor}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {config.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {config.description}
                      </p>
                      <div className={`${config.bgColor} border ${config.borderColor} rounded-xl p-4 mb-6`}>
                        <div className="flex items-center gap-3">
                          <img
                            src={successModal.user.profileImage}
                            alt={`${successModal.user.firstName} ${successModal.user.surname}`}
                            className="w-12 h-12 rounded-full border-2 border-white shadow object-cover"
                          />
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">
                              {successModal.user.firstName} {successModal.user.surname}
                            </p>
                            <p className="text-sm text-gray-600">{successModal.user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Changes saved successfully</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
            <header className="flex items-center justify-between p-6 border-b bg-gray-50">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img 
                  src={selectedUser.profileImage} 
                  alt={`${selectedUser.firstName} ${selectedUser.surname}`}
                  className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-gray-200 object-cover" 
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {selectedUser.firstName} {selectedUser.surname}
                  </h3>
                  <p className="text-sm text-gray-500">User Profile Details</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </header>

<div  
  className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 [&::-webkit-scrollbar]:hidden"
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE and Edge
  }}
>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                <img
                  src={selectedUser.profileImage}
                  alt={`${selectedUser.firstName} ${selectedUser.surname}`}
                  className="w-24 h-24 rounded-xl border-4 border-gray-200 object-cover"
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
                    {selectedUser.birthday && (
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Birthday & Age</p>
                          <p className="text-sm text-gray-700">
                            {new Date(selectedUser.birthday).toLocaleDateString()} ({selectedUser.age} years old)
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedUser.sex && (
                      <div className="flex items-start gap-2">
                        <UserIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Sex</p>
                          <p className="text-sm text-gray-700">{selectedUser.sex}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    {selectedUser.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-700 break-all">{selectedUser.phone}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-700 break-all">{selectedUser.email}</p>
                      </div>
                    </div>
                    {selectedUser.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm text-gray-700">{selectedUser.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

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

              {selectedUser.bio && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">About</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl leading-relaxed">
                    {selectedUser.bio}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedUser.idPhoto && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">ID Photo</h4>
                    <img 
                      src={selectedUser.idPhoto} 
                      alt="ID Photo" 
                      className="w-full border rounded-xl shadow-md object-cover"
                    />
                  </div>
                )}
                
                {selectedUser.selfiePhoto && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Selfie Photo</h4>
                    <img 
                      src={selectedUser.selfiePhoto} 
                      alt="Selfie Photo" 
                      className="w-full border rounded-xl shadow-md object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <footer className="p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                {/* APPROVED STATUS - Can make admin or ban */}
                {selectedUser.status === "approved" && (
                  <>
                    {selectedUser.role !== "Admin" && (
                      <button
                        onClick={() => handleEditProfile(selectedUser)}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                      >
                        <Shield size={16} /> Make Admin
                      </button>
                    )}
                    <button
                      onClick={() => openConfirmModal(selectedUser, "ban", "Ban this account? The user will no longer be able to access the system.")}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                    >
                      <UserX size={16} /> Ban User
                    </button>
                  </>
                )}

                {/* FOR VERIFICATION STATUS - Can only approve or ban */}
                {selectedUser.status === "for verification" && (
                  <>
                    <button
                      onClick={() => openConfirmModal(selectedUser, "approve", "Approve this account? The user will be able to access all features.")}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                    >
                      <UserCheck size={16} /> Approve User
                    </button>
                    <button
                      onClick={() => openConfirmModal(selectedUser, "ban", "Ban this account? The user will be rejected and unable to access the system.")}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                    >
                      <UserX size={16} /> Ban User
                    </button>
                  </>
                )}

                {/* BANNED STATUS - Can move to for approval or delete */}
                {selectedUser.status === "banned" && (
                  <>
                    <button
                      onClick={() => openConfirmModal(selectedUser, "forapproval", "Move this account back to For Approval status?")}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium transition-colors"
                    >
                      <Clock size={16} /> Move to For Approval
                    </button>
                    <button
                      onClick={() => openConfirmModal(selectedUser, "delete", "Permanently delete this account? This action cannot be undone and will remove all user data from the database.")}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-700 text-white rounded-lg hover:bg-red-800 font-medium transition-colors"
                    >
                      <Trash2 size={16} /> Delete Permanently
                    </button>
                  </>
                )}
              </div>
            </footer>
          </div>
        </div>
      )}

      {/* Make Admin Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            <header className="flex items-center justify-between p-6 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Grant Admin Privileges</h3>
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

            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">Admin Role Assignment</h4>
                    <p className="text-sm text-yellow-700">
                      You are about to grant administrator privileges to this user. Admins have full access to manage users, content, and system settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-4">User Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={editingUser.profileImage}
                      alt={`${editingUser.firstName} ${editingUser.surname}`}
                      className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {editingUser.firstName} {editingUser.middleName} {editingUser.surname}
                      </p>
                      <p className="text-sm text-gray-600">{editingUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Current Role</p>
                        <p className="font-medium text-gray-900">{editingUser.role}</p>
                      </div>
                      <div className="text-gray-400">→</div>
                      <div>
                        <p className="text-sm text-gray-600">New Role</p>
                        <p className="font-medium text-purple-600">Admin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                {!isLoading && (
                  <button
                    onClick={closeEditModal}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                  >
                    <X size={16} /> Cancel
                  </button>
                )}
                <button
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Granting Access...
                    </>
                  ) : (
                    <>
                      <Save size={16} /> Confirm Admin Role
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  confirmModal.action === 'delete' ? 'bg-red-100' :
                  confirmModal.action === 'ban' ? 'bg-red-100' :
                  confirmModal.action === 'approve' ? 'bg-green-100' :
                  confirmModal.action === 'forapproval' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  <AlertTriangle className={`w-6 h-6 ${
                    confirmModal.action === 'delete' ? 'text-red-600' :
                    confirmModal.action === 'ban' ? 'text-red-600' :
                    confirmModal.action === 'approve' ? 'text-green-600' :
                    confirmModal.action === 'forapproval' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Action</h3>
                  <p className="text-sm text-gray-600">
                    {confirmModal.action === 'delete' ? 'This action is permanent' : 'Please review before proceeding'}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{confirmModal.message}</p>
            </div>
            
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={closeConfirm}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-colors disabled:opacity-50"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  confirmModal.action === 'delete' ? 'bg-red-700 hover:bg-red-800 text-white' :
                  confirmModal.action === 'ban' ? 'bg-red-600 hover:bg-red-700 text-white' :
                  confirmModal.action === 'approve' ? 'bg-green-600 hover:bg-green-700 text-white' :
                  confirmModal.action === 'forapproval' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                  'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check size={16} /> Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );  
};

export default User;