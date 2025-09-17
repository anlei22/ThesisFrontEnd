import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Trash2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check,
  Loader2
} from "lucide-react";

const Listing = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Strong Working Carabao",
      description:
        "Meet Bruno! This healthy carabao is perfect for farm work and has a gentle temperament. Great for plowing and farming activities.",
      images: [
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571663177346-42a1b6c2775d?w=400&h=300&fit=crop",
      ],
      animal: "carabao",
      date: "2 days ago",
      status: "Available",
      address: "Barangay San Miguel, Nueva Ecija",
      user: {
        name: "Juan Santos",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 2,
      title: "Dairy Cow for Sale",
      description: "Bella is a productive dairy cow that gives fresh milk daily. She's healthy, well-fed, and perfect for small farms.",
      images: [
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop",
      ],
      animal: "cow",
      date: "1 week ago",
      status: "Available",
      address: "Poblacion, Tarlac City",
      user: {
        name: "Maria Cruz",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 3,
      title: "Healthy Goats Available",
      description: "Three young goats ready for breeding or milk production. They're active, healthy, and have been properly vaccinated.",
      images: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=300&fit=crop",
      ],
      animal: "goat",
      date: "3 days ago",
      status: "Available",
      address: "Barangay Mataas na Kahoy, Batangas",
      user: {
        name: "Pedro Reyes",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 4,
      title: "Fresh Chickens for Farm",
      description: "A flock of laying hens perfect for egg production. They're healthy, active, and produce quality eggs daily.",
      images: [
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1534353341328-fcab532c4d4c?w=400&h=300&fit=crop",
      ],
      animal: "chicken",
      date: "5 days ago",
      status: "Sold",
      address: "San Fernando, Pampanga",
      user: {
        name: "Rosa Garcia",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 5,
      title: "Quality Pigs for Breeding",
      description: "Two adult pigs suitable for breeding or fattening. They're well-maintained and come from a clean, healthy farm.",
      images: [
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      ],
      animal: "pig",
      date: "1 day ago",
      status: "Available",
      address: "Cabanatuan City, Nueva Ecija",
      user: {
        name: "Carlos Mendoza",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 6,
      title: "Friendly Horse for Riding",
      description: "A gentle horse perfect for riding lessons and recreational activities. Well-trained and safe for beginners.",
      images: [
        "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      ],
      animal: "horse",
      date: "4 days ago",
      status: "Available",
      address: "Baguio City, Benguet",
      user: {
        name: "Ana Delgado",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 7,
      title: "Duck Farm Collection",
      description: "A collection of healthy ducks great for egg production and meat. Well-maintained and disease-free.",
      images: [
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop",
      ],
      animal: "duck",
      date: "6 days ago",
      status: "Available",
      address: "Laguna de Bay, Laguna",
      user: {
        name: "Roberto Silva",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
    },
    {
      id: 8,
      title: "Breeding Rabbits",
      description: "Young rabbits perfect for starting a rabbit farm. Fast-growing breed with high reproduction rate.",
      images: [
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1606889464198-fcadc9c9cec3?w=400&h=300&fit=crop",
      ],
      animal: "rabbit",
      date: "1 week ago",
      status: "Available",
      address: "Antipolo City, Rizal",
      user: {
        name: "Linda Torres",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
    },
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const confirmDelete = async () => {
    if (selectedPost) {
      setIsDeleting(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Remove the post
      setPosts((prev) => prev.filter((p) => p.id !== selectedPost.id));
      
      // Close delete confirmation
      setDeleteConfirmOpen(false);
      setIsModalOpen(false);
      setIsDeleting(false);
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
    setSelectedPost(null);
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPosts.length > 0 ? (
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
        <div className="fixed inset-0 z-50  overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50" onClick={!isDeleting ? cancelDelete : undefined} />
            
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
        <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50">
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
  );
};

export default Listing;