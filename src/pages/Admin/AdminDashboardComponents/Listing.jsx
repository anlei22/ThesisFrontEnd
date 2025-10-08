  import React, { useState, useEffect } from "react";
  import { 
    Search, 
    MapPin, 
    Trash2, 
    X, 
    ChevronLeft, 
    ChevronRight, 
    Check,
    Loader2,
    AlertCircle
  } from "lucide-react";

  // ===== API CONFIGURATION =====
  // TODO: Update these values with your actual backend URL and API key
  const API_BASE_URL = 'http://localhost:8000/api'; // Change to your Laravel backend URL
  const API_KEY = 'gY7uVz2QeTXB1oLkwA@mJ5fPR9dNshv03tKMiC!bznqESGUlxyWcHmZ86OFD4rja'; // Change to your actual API key

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

  const Listing = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    // New states for API
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // ===== FETCH LISTINGS FROM BACKEND =====
    useEffect(() => {
      fetchListings();
    }, []);

    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      
      console.log('🔄 Fetching animal listings from backend...');
      
      try {
        const token = getAuthToken();
        
        console.log('📡 API Request:', {
          url: `${API_BASE_URL}/admin/animal-listings`,
          method: 'GET',
          hasToken: !!token,
          hasApiKey: !!API_KEY,
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_KEY ? 'PRESENT' : 'MISSING',
            'Authorization': token ? `Bearer ${token.substring(0, 20)}...` : 'MISSING'
          }
        });
        
        const response = await fetch(`${API_BASE_URL}/admin/animal-listings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY, // Changed to uppercase to match Laravel
            'login-token': token,
          },
        });

        console.log('📥 Response Status:', response.status, response.statusText);

        if (!response.ok) {
          throw new Error(`Failed to fetch listings: ${response.status}`);
        }

        const result = await response.json();
        
        console.log('✅ SUCCESS: Listings fetched successfully!');
        console.log('📊 Data received:', {
          totalListings: (result.data || result).length,
          data: result
        });
        
        // Transform backend data to match your frontend format
        const transformedData = (result.data || result.listings || result).map(item => ({
          id: item.id,
          title: item.title || item.animal_name || 'Untitled Listing',
          description: item.description || 'No description available',
          images: transformImages(item.images || item.image),
          animal: (item.animal_type || item.category || 'other').toLowerCase(),
          date: formatDate(item.created_at),
          status: item.status || 'Available',
          address: item.location || item.address || 'Location not specified',
          user: {
            name: item.user?.name || item.owner_name || 'Anonymous User',
            avatar: item.user?.avatar || item.user?.profile_picture || 
                    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          },
        }));
        
        console.log('✨ Transformed data ready for display:', transformedData.length, 'listings');
        setPosts(transformedData);
        
      } catch (err) {
        console.error('❌ FAILED: Error fetching listings');
        console.error('Error details:', {
          message: err.message,
          error: err
        });
        setError(err.message || 'Failed to load listings. Please try again.');
      } finally {
        setIsLoading(false);
        console.log('🏁 Fetch operation completed');
      }
    };



    // Helper: Transform images to array format
    const transformImages = (images) => {
      if (!images) {
        return ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=300&fit=crop'];
      }
      if (Array.isArray(images)) {
        return images.length > 0 ? images : ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=300&fit=crop'];
      }
      if (typeof images === 'string') {
        try {
          const parsed = JSON.parse(images);
          return Array.isArray(parsed) ? parsed : [images];
        } catch {
          return [images];
        }
      }
      return ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=300&fit=crop'];
    };

    // Helper: Format date from backend
    const formatDate = (dateString) => {
      if (!dateString) return 'Recently posted';
      
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      }
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    };

    // ===== SEARCH FILTER =====
    const filteredPosts = posts.filter((post) => {
      if (!searchTerm.trim()) return true;
      
      const searchLower = searchTerm.toLowerCase().trim();
      
      const searchableText = [
        post.user.name,
        post.animal,
        post.address,
        post.title,
        post.description,
        post.status
      ].join(' ').toLowerCase();
      
      return searchableText.includes(searchLower);
    });

    // ===== MODAL FUNCTIONS =====
    const openModal = (post) => {
      setSelectedPost(post);
      setCurrentImageIndex(0);
      setIsModalOpen(true);
    };
    
    const closeModal = () => {
      setSelectedPost(null);
      setIsModalOpen(false);
    };

    const handleDeleteClick = (post, e) => {
      e?.stopPropagation();
      setSelectedPost(post);
      setDeleteConfirmOpen(true);
    };

    // ===== DELETE FUNCTION WITH BACKEND =====
    const confirmDelete = async () => {
      if (selectedPost) {
        setIsDeleting(true);
        setError(null);
        
        console.log('🗑️ Attempting to delete listing...');
        console.log('📋 Listing details:', {
          id: selectedPost.id,
          title: selectedPost.title,
          user: selectedPost.user.name
        });
        
        try {
          const token = getAuthToken();
          
          console.log('📡 Delete API Request:', {
            url: `${API_BASE_URL}/admin/animal-listings/delete/${selectedPost.id}`,
            method: 'POST',
            listingId: selectedPost.id,
            hasToken: !!token,
            hasApiKey: !!API_KEY
          });
          
          const response = await fetch(`${API_BASE_URL}/admin/animal-listings/delete/${selectedPost.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': API_KEY,
              'login-token': token, // Your Laravel middleware checks this header
            },
          });

          console.log('📥 Delete Response Status:', response.status, response.statusText);

          if (!response.ok) {
            throw new Error('Failed to delete listing');
          }

          const result = await response.json();
          
          console.log('✅ SUCCESS: Listing deleted successfully!');
          console.log('📊 Response data:', result);
          
          // Remove from local state
          setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
          
          console.log('🔄 UI updated: Listing removed from display');
          
          // Close modals
          setDeleteConfirmOpen(false);
          setIsModalOpen(false);
          
          // Show success message
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
          
          console.log('✨ Delete operation completed successfully');
          
        } catch (err) {
          console.error('❌ FAILED: Error deleting listing');
          console.error('Error details:', {
            message: err.message,
            listingId: selectedPost.id,
            error: err
          });
          setError(err.message || 'Failed to delete listing. Please try again.');
          setDeleteConfirmOpen(false);
        } finally {
          setIsDeleting(false);
          setSelectedPost(null);
          console.log('🏁 Delete operation finished');
        }
      }
    };

    const cancelDelete = () => {
      setDeleteConfirmOpen(false);
      setSelectedPost(null);
    };

    return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-md animate-slide-in">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button 
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Animal Listings</h1>
              <p className="mt-1 text-slate-600">
                Manage and moderate animal listings • {filteredPosts.length} of {posts.length} listings
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          bg-white text-slate-900"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
              <p className="text-slate-600 text-lg">Loading listings...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 group cursor-pointer"
                  onClick={() => openModal(post)}
                >
                  {/* Image */}
                  <div className="relative">
                    <img 
                      src={post.images[0]} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => handleDeleteClick(post, e)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === "Available" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">{post.user.name}</p>
                        <p className="text-sm text-slate-500">{post.date}</p>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">{post.description}</p>

                    {/* Location */}
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-slate-500 truncate">{post.address}</span>
                    </div>

                    {/* Animal Type */}
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {post.animal}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 text-slate-400">
                  <Search className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No listings found</h3>
                <p className="text-slate-500 mb-6">
                  {searchTerm ? `No results match "${searchTerm}"` : "No listings available at the moment"}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-25" onClick={closeModal} />
              
              <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedPost.user.avatar}
                      alt={selectedPost.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">{selectedPost.title}</h2>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-slate-600">by {selectedPost.user.name}</p>
                        <span className="text-slate-400">•</span>
                        <p className="text-slate-500 text-sm">{selectedPost.date}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDeleteClick(selectedPost)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={closeModal}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="p-6">
                    {/* Image Gallery */}
                    <div className="relative mb-6">
                      <img
                        src={selectedPost.images[currentImageIndex]}
                        alt={selectedPost.title}
                        className="w-full h-80 object-cover rounded-xl"
                      />
                      
                      {selectedPost.images.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === 0 ? selectedPost.images.length - 1 : prev - 1
                            )}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === selectedPost.images.length - 1 ? 0 : prev + 1
                            )}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-lg transition-all"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          
                          {/* Image indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {selectedPost.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {selectedPost.images.length > 1 && (
                      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
                        {selectedPost.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                              index === currentImageIndex 
                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <img src={image} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-slate-900 mb-3">Description</h3>
                      <p className="text-slate-700 leading-relaxed">{selectedPost.description}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 mb-1">Animal Type</h4>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                            {selectedPost.animal}
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 mb-1">Status</h4>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            selectedPost.status === "Available"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-800"
                          }`}>
                            {selectedPost.status}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 mb-2">Location</h4>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-slate-600 text-sm leading-relaxed">{selectedPost.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmOpen && selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50" onClick={!isDeleting ? cancelDelete : undefined} />
              
              <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-slate-900 text-center mb-2">Delete Listing</h3>
                <p className="text-slate-600 text-center mb-6">
                  Are you sure you want to delete "<strong>{selectedPost.title}</strong>" by <strong>{selectedPost.user.name}</strong>? This action cannot be undone.
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={cancelDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <span>Delete</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message Modal */}
        {showSuccessMessage && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4 transform transition-all duration-300 ease-in-out">
              <div className="mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Listing Deleted
                </h3>
                <p className="text-gray-600 text-sm">
                  The listing has been successfully removed and the user has been notified.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
  };

  export default Listing;