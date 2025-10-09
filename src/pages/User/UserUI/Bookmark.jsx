import React, { useState } from 'react';
import { 
  BookmarkIcon, 
  TrashIcon, 
  MapPinIcon, 
  XMarkIcon,
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const BookmarksPage = ({ darkMode }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookmarkedItems, setBookmarkedItems] = useState([
    { 
      id: 1, 
      name: 'Golden Retriever Puppy', 
      price: 800, 
      image: '/api/placeholder/400/300',
      animalType: 'Dog',
      breed: 'Golden Retriever',
      age: '3 months',
      gender: 'Male',
      address: '123 Pet Street, San Fernando, Central Luzon',
      description: 'Adorable Golden Retriever puppy, vaccinated and dewormed. Very playful and friendly with kids. Comes with health certificate and vaccination records.',
      seller: 'Maria Santos',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=10b981&color=fff',
      contact: '+63 912 345 6789',
      postedDate: '2 days ago',
      likes: 45,
      comments: 12
    },
    { 
      id: 2, 
      name: 'Persian Cat', 
      price: 500, 
      image: '/api/placeholder/400/300',
      animalType: 'Cat',
      breed: 'Persian',
      age: '6 months',
      gender: 'Female',
      address: '456 Meow Avenue, San Fernando, Central Luzon',
      description: 'Beautiful white Persian cat with blue eyes. Litter trained and very calm temperament. Perfect for apartment living.',
      seller: 'Juan Dela Cruz',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=3b82f6&color=fff',
      contact: '+63 923 456 7890',
      postedDate: '5 days ago',
      likes: 32,
      comments: 8
    },
    { 
      id: 3, 
      name: 'Siberian Husky', 
      price: 1200, 
      image: '/api/placeholder/400/300',
      animalType: 'Dog',
      breed: 'Siberian Husky',
      age: '4 months',
      gender: 'Male',
      address: '789 Woof Street, Angeles City, Pampanga',
      description: 'Purebred Siberian Husky with striking blue eyes. Energetic and loves to play. Comes with pedigree papers.',
      seller: 'Anna Reyes',
      sellerAvatar: 'https://ui-avatars.com/api/?name=Anna+Reyes&background=ec4899&color=fff',
      contact: '+63 934 567 8901',
      postedDate: '1 week ago',
      likes: 67,
      comments: 15
    }
  ]);

  const removeBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedItems(items => items.filter(item => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  // Single Item View
  if (selectedItem) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 border-b ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto px-4 py-4">
            <button
              onClick={handleBackToList}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Bookmarks</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Image */}
          <div className="mb-6">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Main Info Card */}
          <div className={`rounded-lg p-6 mb-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            {/* Title and Price */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className={`text-3xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedItem.name}
                </h1>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Posted {selectedItem.postedDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-500">
                  ${selectedItem.price}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Animal Type
                </p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedItem.animalType}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Breed
                </p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedItem.breed}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Age
                </p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedItem.age}
                </p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Gender
                </p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedItem.gender}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <div className="flex items-start space-x-2">
                <MapPinIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Location
                  </p>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedItem.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Description
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedItem.description}
              </p>
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center space-x-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <HeartIconSolid className="w-5 h-5 text-red-500" />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedItem.likes} likes
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedItem.comments} comments
                </span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Seller Information
              </h3>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={selectedItem.sellerAvatar}
                  alt={selectedItem.seller}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedItem.seller}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {selectedItem.contact}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Contact Seller
              </button>
              <button
                onClick={(e) => removeBookmark(selectedItem.id, e)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                Remove Bookmark
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 border-b ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                My Bookmarks
              </h1>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {bookmarkedItems.length} saved {bookmarkedItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {bookmarkedItems.length === 0 ? (
          <div className={`text-center py-16 px-4 rounded-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <BookmarkIcon className={`w-16 h-16 mx-auto mb-4 ${
              darkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No bookmarks yet
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start bookmarking items you're interested in!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={(e) => removeBookmark(item.id, e)}
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.name}
                  </h3>

                  <div className={`space-y-2 text-sm mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{item.animalType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Breed:</span>
                      <span className="font-medium">{item.breed}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 mb-3">
                    <MapPinIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className={`text-xs line-clamp-2 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {item.address}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-2xl font-bold text-green-500">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        darkMode
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;