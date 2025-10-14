import React, { useState } from 'react';
import { 
  XMarkIcon, 
  TrashIcon, 
  MapPinIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

const BookmarksPage = ({ isOpen, onClose, darkMode }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([
    { 
      id: 1, 
      name: 'Golden Retriever Puppy', 
      price: 800, 
      image: '/api/placeholder/100/100',
      animalType: 'Dog',
      address: '123 Pet Street, San Fernando, Central Luzon',
      date: '2 days ago'
    },
    { 
      id: 2, 
      name: 'Persian Cat', 
      price: 500, 
      image: '/api/placeholder/100/100',
      animalType: 'Cat',
      address: '456 Meow Avenue, San Fernando, Central Luzon',
      date: '5 days ago'
    },
    { 
      id: 3, 
      name: 'Beagle Puppy', 
      price: 650, 
      image: '/api/placeholder/100/100',
      animalType: 'Dog',
      address: '789 Bark Road, Angeles City, Central Luzon',
      date: '1 week ago'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const removeBookmark = (id) => {
    setBookmarkedItems(items => items.filter(item => item.id !== id));
  };

  const filteredItems = bookmarkedItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.animalType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.animalType.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-green-600' : 'bg-green-500'
            }`}>
              <BookmarkIconSolid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                My Bookmarks
              </h2>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {filteredItems.length} saved item{filteredItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className={`px-6 py-4 border-b ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FunnelIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="all">All Types</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookmarks List */}
        <div className={`flex-1 overflow-y-auto ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <BookmarkIcon className={`w-24 h-24 mb-4 ${
                darkMode ? 'text-gray-700' : 'text-gray-300'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {searchQuery || filterType !== 'all' ? 'No bookmarks found' : 'No bookmarks yet'}
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {searchQuery || filterType !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'Start bookmarking items to see them here'}
              </p>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`rounded-xl border overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-green-600' 
                      : 'bg-white border-gray-200 hover:border-green-500'
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBookmark(item.id);
                        }}
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                    }`}>
                      {item.animalType}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.name}
                    </h3>
                    
                    <div className={`flex items-start space-x-2 mb-3 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <MapPinIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.address}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-500">
                        ${item.price}
                      </span>
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {item.date}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
                        darkMode
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;