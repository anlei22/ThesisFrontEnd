import React, { useState, useRef } from 'react';
import { 
  XMarkIcon, 
  PhotoIcon, 
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const CreatePostModal = ({ darkMode, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postType, setPostType] = useState('text-only'); // 'text-only' or 'with-photos'
  const fileInputRef = useRef(null);

  const steps = [
    { id: 1, name: 'Type', description: 'Choose post type' },
    { id: 2, name: 'Content', description: 'Add your content' },
    { id: 3, name: 'Review', description: 'Review & publish' }
  ];

  const handleSubmit = () => {
    if (!description.trim()) {
      alert('Please add a description');
      return;
    }
    
    if (postType === 'with-photos' && selectedImages.length === 0) {
      alert('Please upload at least one photo for posts with photos');
      return;
    }
    
    setIsSubmitting(true);
    
    const postData = {
      description,
      images: selectedImages,
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
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canPublish = () => {
    const hasDescription = description.trim();
    if (postType === 'text-only') {
      return hasDescription;
    }
    return hasDescription && selectedImages.length > 0;
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
                  step.id
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
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 ${
                currentStep > step.id
                  ? darkMode ? 'bg-green-600' : 'bg-green-500'
                  : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderPostTypeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`text-lg font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          What type of post would you like to create?
        </h3>
        <p className={`text-sm mb-6 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Choose how you want to share your content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handlePostTypeChange('text-only')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            postType === 'text-only'
              ? darkMode
                ? 'border-green-500 bg-green-500/20 text-green-400'
                : 'border-green-500 bg-green-50 text-green-700'
              : darkMode
                ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center space-y-3">
            <PencilIcon className="w-12 h-12" />
            <div>
              <div className="text-lg font-semibold">Text Only</div>
              <div className="text-sm opacity-80 mt-1">Share your thoughts with just text</div>
            </div>
          </div>
        </button>
        
        <button
          type="button"
          onClick={() => handlePostTypeChange('with-photos')}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            postType === 'with-photos'
              ? darkMode
                ? 'border-green-500 bg-green-500/20 text-green-400'
                : 'border-green-500 bg-green-50 text-green-700'
              : darkMode
                ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
          }`}
        >
          <div className="flex flex-col items-center space-y-3">
            <PhotoIcon className="w-12 h-12" />
            <div>
              <div className="text-lg font-semibold">With Photos</div>
              <div className="text-sm opacity-80 mt-1">Share photos with description</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderContentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`text-lg font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {postType === 'text-only' ? 'Write your post' : 'Add photos and description'}
        </h3>
        <p className={`text-sm mb-6 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {postType === 'text-only' 
            ? 'Share what\'s on your mind' 
            : 'Upload your photos and add a description'
          }
        </p>
      </div>

      {/* Photos Upload (only for with-photos type) */}
      {postType === 'with-photos' && (
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Photos *
          </label>
          
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
              <div className={`grid gap-3 p-4 rounded-lg border ${
                selectedImages.length === 1 ? 'grid-cols-1' :
                selectedImages.length === 2 ? 'grid-cols-2' :
                selectedImages.length <= 4 ? 'grid-cols-2' :
                'grid-cols-3'
              } ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                {selectedImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Selected"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
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
      )}

      {/* Description */}
      <div>
        <label className={`block text-sm font-medium mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {postType === 'text-only' ? 'Your Post *' : 'Description *'}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={postType === 'text-only' 
            ? "What's on your mind? Share your thoughts, experiences, or anything you'd like to tell the community..."
            : "Describe your photos, tell a story, or share what makes this special..."
          }
          rows={postType === 'text-only' ? "8" : "5"}
          className={`w-full p-4 text-sm rounded-lg border resize-none transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        <div className={`text-xs mt-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {description.length}/1000 characters
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className={`text-lg font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Review Your Post
        </h3>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Here's how your post will look
        </p>
      </div>

      {/* Post Type Badge */}
      <div className="flex justify-center mb-6">
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          postType === 'text-only'
            ? darkMode 
              ? 'bg-blue-900 text-blue-300 border border-blue-700'
              : 'bg-blue-100 text-blue-800 border border-blue-200'
            : darkMode
              ? 'bg-green-900 text-green-300 border border-green-700'
              : 'bg-green-100 text-green-800 border border-green-200'
        }`}>
          {postType === 'text-only' ? '📝 Text Post' : '📷 Photo Post'}
        </span>
      </div>

      {/* Post Preview */}
      <div className={`rounded-xl border p-6 ${
        darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
      }`}>
        {/* Photos (if photo post) */}
        {postType === 'with-photos' && selectedImages.length > 0 && (
          <div className="mb-4">
            <div className={`grid gap-3 ${
              selectedImages.length === 1 ? 'grid-cols-1' :
              selectedImages.length === 2 ? 'grid-cols-2' :
              selectedImages.length <= 4 ? 'grid-cols-2' :
              'grid-cols-3'
            }`}>
              {selectedImages.slice(0, 6).map((image, index) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {index === 5 && selectedImages.length > 6 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <span className="text-white text-lg font-medium">
                        +{selectedImages.length - 6}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {description || 'No description provided'}
          </p>
        </div>

        {/* Meta info */}
        <div className={`mt-4 pt-4 border-t text-xs ${
          darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-500'
        }`}>
          <div className="flex items-center justify-between">
            <span>Just now</span>
            <span>
             {postType === 'text-only' 
  ? 'Text post' 
  : `${selectedImages.length} photo${selectedImages.length !== 1 ? 's' : ''}`
}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl transition-colors duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between transition-colors duration-300 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create Post
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Stepper */}
        <div className="p-4 border-b">
          {renderStepper()}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {currentStep === 1 && renderPostTypeStep()}
          {currentStep === 2 && renderContentStep()}
          {currentStep === 3 && renderReviewStep()}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t transition-colors duration-300 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
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

            {/* Step indicator */}
            <div className={`text-sm font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {currentStep} of 3
            </div>

            {/* Next/Submit Button */}
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  darkMode
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
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
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
        </div>
      </div>
    </div>
  );
};
export default CreatePostModal;

// animals dropdon