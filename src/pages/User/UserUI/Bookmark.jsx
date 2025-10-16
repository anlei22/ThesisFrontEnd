import React, { useState } from 'react';
import { Bookmark, Trash2, Search, Filter, Grid, List, Fish, Bird, Rabbit, User } from 'lucide-react';

export default function BookmarkedAnimals() {
  const [bookmarkedAnimals, setBookmarkedAnimals] = useState([
    { id: 1, name: 'Baboy', category: 'Pig', type: 'Livestock', postedBy: 'Juan dela Cruz', location: 'Quezon City', savedDate: '2024-10-15', emoji: '🐷' },
    { id: 2, name: 'Baka', category: 'Cow', type: 'Livestock', postedBy: 'Maria Santos', location: 'Bulacan', savedDate: '2024-10-14', emoji: '🐄' },
    { id: 3, name: 'Bangus', category: 'Bangus', type: 'Fish', postedBy: 'Pedro Reyes', location: 'Dagupan', savedDate: '2024-10-13', emoji: '🐟' },
    { id: 4, name: 'Manok', category: 'Chicken', type: 'Poultry', postedBy: 'Ana Garcia', location: 'Pampanga', savedDate: '2024-10-12', emoji: '🐔' },
    { id: 5, name: 'Kambing', category: 'Goat', type: 'Livestock', postedBy: 'Jose Mendoza', location: 'Batangas', savedDate: '2024-10-11', emoji: '🐐' },
    { id: 6, name: 'Kalabaw', category: 'Carabao', type: 'Livestock', postedBy: 'Rosa Villanueva', location: 'Nueva Ecija', savedDate: '2024-10-10', emoji: '🐃' },
    { id: 7, name: 'Tilapia', category: 'Tilapia', type: 'Fish', postedBy: 'Carlos Ramos', location: 'Laguna', savedDate: '2024-10-09', emoji: '🐠' },
    { id: 8, name: 'Rabbit', category: 'Rabbit', type: 'Small Animal', postedBy: 'Linda Cruz', location: 'Rizal', savedDate: '2024-10-08', emoji: '🐰' },
    { id: 9, name: 'Kalapati', category: 'Kalapati', type: 'Bird', postedBy: 'Roberto Tan', location: 'Manila', savedDate: '2024-10-07', emoji: '🕊️' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const removeBookmark = (id) => {
    setBookmarkedAnimals(bookmarkedAnimals.filter(animal => animal.id !== id));
  };

  const filteredAnimals = bookmarkedAnimals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.postedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Bookmark className="w-6 h-6 text-emerald-600 fill-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
                <p className="text-gray-600 mt-1">{bookmarkedAnimals.length} saved animals</p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <Grid className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <List className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by animal, category, or seller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAnimals.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks found</h3>
            <p className="text-gray-500">Start exploring and save your favorite animals!</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredAnimals.map(animal => (
              viewMode === 'grid' ? (
                <GridCard key={animal.id} animal={animal} onRemove={removeBookmark} />
              ) : (
                <ListCard key={animal.id} animal={animal} onRemove={removeBookmark} />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GridCard({ animal, onRemove }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
        <div className="text-7xl">{animal.emoji}</div>
        
        <button
          onClick={() => onRemove(animal.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:shadow-lg transform hover:scale-110 active:scale-95"
          aria-label="Remove bookmark"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{animal.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{animal.category}</p>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <User className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{animal.postedBy}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {animal.type}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
            {animal.location}
          </span>
        </div>
        
        <p className="text-xs text-gray-400">Saved {animal.savedDate}</p>
      </div>
    </div>
  );
}

function ListCard({ animal, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-5 group">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center text-4xl">
          {animal.emoji}
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-800">{animal.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{animal.category}</p>
          
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
            <User className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{animal.postedBy}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              {animal.type}
            </span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
              {animal.location}
            </span>
            <span className="text-xs text-gray-400 px-2 py-1">Saved {animal.savedDate}</span>
          </div>
        </div>
        
        <button
          onClick={() => onRemove(animal.id)}
          className="flex-shrink-0 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 transform hover:scale-110 active:scale-95"
          aria-label="Remove bookmark"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
}