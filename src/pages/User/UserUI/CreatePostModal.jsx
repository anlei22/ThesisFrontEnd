import React, { useState, useRef } from 'react';
import { 
  XMarkIcon, 
  PhotoIcon, 
  FaceSmileIcon,
  MapPinIcon,
  UserGroupIcon,
  TagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const CreatePostModal = ({ darkMode, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [location, setLocation] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('available');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postType, setPostType] = useState('with-photos'); // 'text-only' or 'with-photos'
  const fileInputRef = useRef(null);

  const steps = [
    { id: 1, name: 'Details', description: 'Animal information' },
    { id: 2, name: 'Photos', description: 'Upload images' },
    { id: 3, name: 'Review', description: 'Review & publish' }
  ];

  const animalTypes = [
    'Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Guinea Pig', 
    'Ferret', 'Reptile', 'Horse', 'Goat', 'Sheep', 'Pig', 'Cow', 'Other'
  ];

  const sexOptions = ['Male', 'Female', 'Unknown'];

  const handleSubmit = () => {
    if (!animalType.trim() || !title.trim()) return;
    
    // For text-only posts, photos are not required
    if (postType === 'with-photos' && selectedImages.length === 0) {
      alert('Please upload at least one photo for posts with photos');
      return;
    }
    
    setIsSubmitting(true);
    
    const postData = {
      animalType,
      title,
      description,
      breed,
      age,
      sex,
      price,
      availability,
      content: postContent,
      images: selectedImages,
      location: location.trim(),
      postType,
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitting post:', postData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate form before moving to photos
      if (!animalType.trim() || !title.trim()) {
        alert('Please fill in the required fields (Animal Type and Title)');
        return;
      }
      // Skip photos step if text-only post
      if (postType === 'text-only') {
        setCurrentStep(3);
        return;
      }
    } else if (currentStep === 2) {
      // For posts with photos, validate photos
      if (postType === 'with-photos' && selectedImages.length === 0) {
        alert('Please upload at least one photo or switch to text-only post');
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      // If going back from review step and it's text-only, go to step 1
      if (currentStep === 3 && postType === 'text-only') {
        setCurrentStep(1);
        return;
      }
      setCurrentStep(currentStep - 1);
    }
  };

  const isFormValid = () => {
    return animalType.trim() && title.trim();
  };

  const isPhotosValid = () => {
    return postType === 'text-only' || selectedImages.length > 0;
  };

  const canPublish = () => {
    const basicRequirements = animalType.trim() && title.trim();
    if (postType === 'text-only') {
      return basicRequirements;
    }
    return basicRequirements && selectedImages.length > 0;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 10) {
      alert('You can only select up to 10 images');
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file: file
        };
        setSelectedImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handlePostTypeChange = (type) => {
    setPostType(type);
    // Clear images if switching to text-only
    if (type === 'text-only') {
      setSelectedImages([]);
    }
  };

  const renderStepper = () => (
    <div className="flex items-center justify-center mb-4">
      {steps.map((step, index) => {
        // Skip photos step visually for text-only posts
        if (step.id === 2 && postType === 'text-only') {
          return null;
        }

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                currentStep > step.id
                  ? darkMode
                    ? 'bg-green-600 text-white'
                    : 'bg-green-500 text-white'
                  : currentStep === step.id
                    ? darkMode
                      ? 'bg-green-600 text-white'
                      : 'bg-green-500 text-white'
                    : darkMode
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step.id ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  postType === 'text-only' && step.id === 3 ? '2' : step.id
                )}
              </div>
              <div className="mt-1 text-center">
                <div className={`text-xs font-medium ${
                  currentStep >= step.id
                    ? darkMode ? 'text-white' : 'text-gray-900'
                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {step.name}
                </div>
                <div className={`text-xs ${
                  currentStep >= step.id
                    ? darkMode ? 'text-gray-300' : 'text-gray-600'
                    : darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {step.description}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && !(step.id === 2 && postType === 'text-only') && (
              <div className={`w-12 h-0.5 mx-2 ${
                (currentStep > step.id) || (postType === 'text-only' && step.id === 1 && currentStep === 3)
                  ? darkMode ? 'bg-green-600' : 'bg-green-500'
                  : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderFormStep = () => (
    <div className="space-y-3">
      {/* Post Type Selection */}
      <div className="mb-4">
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Post Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handlePostTypeChange('with-photos')}
            className={`p-3 rounded-lg border-2 transition-all duration-300 ${
              postType === 'with-photos'
                ? darkMode
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-green-500 bg-green-50 text-green-700'
                : darkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <PhotoIcon className="w-6 h-6" />
              <span className="text-sm font-medium">With Photos</span>
              <span className="text-xs opacity-80">Include images</span>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => handlePostTypeChange('text-only')}
            className={`p-3 rounded-lg border-2 transition-all duration-300 ${
              postType === 'text-only'
                ? darkMode
                  ? 'border-green-500 bg-green-500/20 text-green-400'
                  : 'border-green-500 bg-green-50 text-green-700'
                : darkMode
                  ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <TagIcon className="w-6 h-6" />
              <span className="text-sm font-medium">Text Only</span>
              <span className="text-xs opacity-80">No photos needed</span>
            </div>
          </button>
        </div>
      </div>

      {/* Animal Type and Title Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Type of Animal *
          </label>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className={`w-full p-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-green-50 border-green-200 text-gray-900'
            }`}
          >
            <option value="">Select animal type...</option>
            {animalTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Beautiful Golden Retriever looking for a home"
            className={`w-full p-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the animal, personality, health status, etc."
          rows="3"
          className={`w-full p-2 text-sm rounded-md border resize-none transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Breed, Age, Sex Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Breed
          </label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder="e.g., Golden Retriever"
            className={`w-full p-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        
        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Age
          </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 2 years old"
            className={`w-full p-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Sex
          </label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className={`w-full p-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-green-50 border-green-200 text-gray-900'
            }`}
          >
            <option value="">Select...</option>
            {sexOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price, Availability, and Location Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Price
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., $500 or Free"
            className={`w-full p-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className={`w-full p-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-green-50 border-green-200 text-gray-900'
            }`}
          >
            <option value="available">Available</option>
            <option value="sold">Sold Out</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Location (optional)
          </label>
          <div className="relative">
            <MapPinIcon className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
              className={`w-full pl-8 pr-2 py-2 text-sm rounded-md border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <label className={`block text-xs font-medium mb-1 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Additional Information
        </label>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Any additional information about the animal..."
          rows="3"
          className={`w-full p-2 text-sm rounded-md border resize-none transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-green-50 border-green-200 text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>
    </div>
  );

  const renderPhotosStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className={`text-lg font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Upload Photos
        </h3>
        <p className={`text-sm mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Add photos to showcase your animal. You can upload up to 10 photos.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
          selectedImages.length >= 10
            ? darkMode
              ? 'border-gray-600 bg-gray-700 cursor-not-allowed'
              : 'border-gray-300 bg-gray-100 cursor-not-allowed'
            : darkMode
              ? 'border-gray-600 hover:border-green-500 hover:bg-gray-700'
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          multiple
          className="hidden"
          disabled={selectedImages.length >= 10}
        />
        
        <PhotoIcon className={`w-12 h-12 mx-auto mb-4 ${
          selectedImages.length >= 10
            ? darkMode ? 'text-gray-500' : 'text-gray-400'
            : darkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        
        <div className={`text-lg font-medium mb-2 ${
          selectedImages.length >= 10
            ? darkMode ? 'text-gray-500' : 'text-gray-400'
            : darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {selectedImages.length >= 10 ? 'Maximum photos reached' : 'Click to upload photos'}
        </div>
        
        <div className={`text-sm ${
          selectedImages.length >= 10
            ? darkMode ? 'text-gray-600' : 'text-gray-400'
            : darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {selectedImages.length >= 10 
            ? 'You can upload up to 10 photos maximum'
            : 'Supports multiple images (up to 10)'
          }
        </div>
      </div>

      {/* Selected Images */}
      {selectedImages.length > 0 && (
        <div className="mt-4">
          <div className={`grid gap-2 p-3 rounded-lg border ${
            selectedImages.length === 1 ? 'grid-cols-1' :
            selectedImages.length === 2 ? 'grid-cols-2' :
            'grid-cols-3'
          } ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-green-200 bg-green-50'}`}>
            {selectedImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt="Selected"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <p className={`text-xs mt-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {selectedImages.length}/10 images selected
          </p>
        </div>
      )}
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className={`text-lg font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Review Your Post
        </h3>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Please review your information before publishing
        </p>
      </div>

      {/* Post Type Badge */}
      <div className="flex justify-center mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          postType === 'text-only'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {postType === 'text-only' ? 'Text Only Post' : 'Post with Photos'}
        </span>
      </div>

      {/* Post Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Post Details */}
        <div className={`rounded-lg border p-4 ${
          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
        }`}>
          {/* Animal Info Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold text-lg ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {title || 'Untitled'}
              </h4>
              {/* Only show availability for posts with photos */}
              {postType === 'with-photos' && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  availability === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {availability === 'available' ? 'Available' : 'Sold Out'}
                </span>
              )}
            </div>
            
            <div className={`text-sm space-y-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <div>
                <span className="font-medium">Type:</span> {animalType || 'Not specified'}
              </div>
              {breed && (
                <div>
                  <span className="font-medium">Breed:</span> {breed}
                </div>
              )}
              {age && (
                <div>
                  <span className="font-medium">Age:</span> {age}
                </div>
              )}
              {sex && (
                <div>
                  <span className="font-medium">Sex:</span> {sex}
                </div>
              )}
              {price && (
                <div>
                  <span className="font-medium">Price:</span> {price}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mb-4">
              <h5 className={`font-medium mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Description
              </h5>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {description}
              </p>
            </div>
          )}

          {/* Additional Information */}
          {postContent && (
            <div className="mb-4">
              <h5 className={`font-medium mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Additional Information
              </h5>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {postContent}
              </p>
            </div>
          )}

          {/* Location */}
          {location && (
            <div className="mb-4">
              <div className={`flex items-center text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <MapPinIcon className="w-4 h-4 mr-1" />
                {location}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Images Preview */}
        <div className={`rounded-lg border p-4 ${
          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
        }`}>
          {postType === 'text-only' ? (
            <div className="text-center py-8">
              <TagIcon className={`w-12 h-12 mx-auto mb-3 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <p className={`text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Text-Only Post
              </p>
              <p className={`text-xs ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                This post will be published without photos
              </p>
            </div>
          ) : selectedImages.length > 0 ? (
            <div>
              <h5 className={`font-medium mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Photos ({selectedImages.length})
              </h5>
              <div className={`grid gap-2 ${
                selectedImages.length === 1 ? 'grid-cols-1' :
                selectedImages.length === 2 ? 'grid-cols-2' :
                'grid-cols-2'
              }`}>
                {selectedImages.slice(0, 4).map((image, index) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    {index === 3 && selectedImages.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                        <span className="text-white text-sm font-medium">
                          +{selectedImages.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <PhotoIcon className={`w-12 h-12 mx-auto mb-3 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No photos added
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className={`w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl transition-colors duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-3 border-b flex items-center justify-between transition-colors duration-300 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create Animal Post
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="p-3 border-b">
          {renderStepper()}
        </div>

        {/* Content */}
        <div className="p-3 max-h-[55vh] overflow-y-auto">
          {currentStep === 1 && renderFormStep()}
          {currentStep === 2 && renderPhotosStep()}
          {currentStep === 3 && renderReviewStep()}
        </div>

        {/* Footer */}
        <div className={`p-3 border-t transition-colors duration-300 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                currentStep === 1
                  ? 'invisible'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Step indicator for mobile */}
            <div className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Step {postType === 'text-only' && currentStep === 3 ? '2' : currentStep} of {postType === 'text-only' ? '2' : '3'}
            </div>

            {/* Next/Submit Button */}
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !isFormValid()) ||
                  (currentStep === 2 && postType === 'with-photos' && !isPhotosValid())
                }
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  (currentStep === 1 && !isFormValid()) ||
                  (currentStep === 2 && postType === 'with-photos' && !isPhotosValid())
                    ? darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : darkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                <span>Next</span>
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !canPublish()}
                className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isSubmitting || !canPublish()
                    ? darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : darkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            )}
          </div>

          {/* Tips */}
          <div className={`text-xs mb-1 mt-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {currentStep === 1 && (
              <p>💡 Choose post type and fill in animal details to continue</p>
            )}
            {currentStep === 2 && (
              <p>📸 Upload photos to showcase your animal (up to 10 photos)</p>
            )}
            {currentStep === 3 && (
              <p>✅ Review your {postType === 'text-only' ? 'text-only ' : ''}post and publish</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;