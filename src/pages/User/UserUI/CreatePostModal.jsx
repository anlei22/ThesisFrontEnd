
import React, { useState, useRef } from 'react';
import { 
  XMarkIcon, 
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const CreatePostModal = ({ darkMode = false, onClose = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const fileInputRef = useRef(null);

  const steps = [
    { id: 1, name: 'Animal', description: 'Select animal & breed' },
    { id: 2, name: 'Details', description: 'Add information' },
    { id: 3, name: 'Review', description: 'Review & publish' }
  ];

  const categories = [
    { 
      id: "baboy", 
      name: "Baboy", 
      displayName: "Baboy (Pig)",
      breeds: ["Duroc", "Yorkshire", "Landrace", "Berkshire", "Hampshire", "Native", "Pietrain", "Large White"]
    },
    { 
      id: "baka", 
      name: "Baka",
      displayName: "Baka (Cow)", 
      breeds: ["Brahman", "Holstein", "Angus", "Native", "Simmental", "Jersey", "Hereford"]
    },
    { 
      id: "bangus", 
      name: "Bangus",
      displayName: "Bangus (Milkfish)", 
      breeds: ["Standard Bangus", "Boneless Bangus"]
    },
    { 
      id: "galunggong", 
      name: "Galunggong",
      displayName: "Galunggong (Round Scad)", 
      breeds: ["Fresh Galunggong", "Dried Galunggong"]
    },
    { 
      id: "kambing", 
      name: "Kambing",
      displayName: "Kambing (Goat)", 
      breeds: ["Boer", "Native", "Anglo-Nubian", "Saanen", "Alpine"]
    },
    { 
      id: "kalabaw", 
      name: "Kalabaw",
      displayName: "Kalabaw (Carabao)", 
      breeds: ["Philippine Carabao", "Swamp Buffalo", "River Buffalo", "Murrah"]
    },
    { 
      id: "kalapati", 
      name: "Kalapati",
      displayName: "Kalapati (Pigeon)", 
      breeds: ["Racing Homer", "Fantail", "Native", "King Pigeon"]
    },
    { 
      id: "manok", 
      name: "Manok",
      displayName: "Manok (Chicken)", 
      breeds: ["Broiler", "Layer", "Native", "Rhode Island Red", "Leghorn", "Plymouth Rock"]
    },
    { 
      id: "rabbit", 
      name: "Rabbit",
      displayName: "Rabbit", 
      breeds: ["New Zealand White", "Californian", "Flemish Giant", "Dutch", "Rex"]
    },
    { 
      id: "tilapia", 
      name: "Tilapia",
      displayName: "Tilapia", 
      breeds: ["Nile Tilapia", "Red Tilapia", "Mozambique Tilapia", "Blue Tilapia"]
    },
    { 
      id: "tulingan", 
      name: "Tulingan",
      displayName: "Tulingan (Skipjack Tuna)", 
      breeds: ["Fresh Tulingan", "Frozen Tulingan"]
    }
  ];

  const locations = [
    { id: "abelo", name: "Abelo" },
    { id: "alas-as", name: "Alas-as" },
    { id: "balete", name: "Balete" },
    { id: "baluk-baluk", name: "Baluk-baluk" },
    { id: "bancoro", name: "Bancoro" },
    { id: "bangin", name: "Bangin" },
    { id: "calangay", name: "Calangay" },
    { id: "hipit", name: "Hipit" },
    { id: "maabud-north", name: "Maabud North" },
    { id: "maabud-south", name: "Maabud South" },
    { id: "munlawin", name: "Munlawin" },
    { id: "pansipit", name: "Pansipit" },
    { id: "poblacion", name: "Poblacion" },
    { id: "pulang-bato", name: "Pulang-Bato" },
    { id: "santo-nino", name: "Santo Niño" },
    { id: "sinturisan", name: "Sinturisan" },
    { id: "tagudtod", name: "Tagudtod" },
    { id: "talang", name: "Talang" }
  ];

  const handleSubmit = () => {
    if (!selectedAnimal) {
      alert('Please select an animal type');
      return;
    }
    
    if (!selectedBreed) {
      alert('Please select a breed');
      return;
    }

    if (!description.trim()) {
      alert('Please add a description');
      return;
    }

    if (!age) {
      alert('Please enter the age');
      return;
    }

    if (!sex) {
      alert('Please select the sex');
      return;
    }

    if (!price) {
      alert('Please enter the price');
      return;
    }

    if (!location) {
      alert('Please select a location');
      return;
    }
    
    setIsSubmitting(true);
    
    const postData = {
      animal: selectedAnimal,
      breed: selectedBreed,
      description,
      age,
      sex,
      price,
      location,
      images: selectedImages,
      timestamp: new Date().toISOString()
    };

    const formData = new FormData();
    formData.append('title', `${getSelectedCategory()?.displayName} - ${selectedBreed}`);
    formData.append('type_id', selectedAnimal);
    formData.append('description', description);
    formData.append('breed', selectedBreed);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('price', price);
    formData.append('location', location);
    selectedImages.forEach(image => {
      formData.append('images', image.file);
    });

    
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedAnimal) {
      alert('Please select an animal type');
      return;
    }
    if (currentStep === 1 && !selectedBreed) {
      alert('Please select a breed');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      // 
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canPublish = () => {
    return selectedAnimal && 
           selectedBreed && 
           description.trim() && 
           age &&
           sex &&
           price &&
           location;
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

  const handleAnimalChange = (animalId) => {
    setSelectedAnimal(animalId);
    setSelectedBreed('');
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.id === selectedAnimal);
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

  const renderAnimalSelectionStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`text-lg font-semibold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Select Animal Type
        </h3>
        <p className={`text-sm mb-6 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Choose the animal you want to list for sale
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Animal Type *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleAnimalChange(category.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedAnimal === category.id
                  ? darkMode
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-green-500 bg-green-50 text-green-700'
                  : darkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{category.displayName}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedAnimal && (
        <div className="animate-fadeIn">
          <label className={`block text-sm font-medium mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Select Breed *
          </label>
          <select
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
            className={`w-full p-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Choose a breed</option>
            {getSelectedCategory()?.breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className={`text-lg font-semibold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Add Details & Photos
        </h3>
        <p className={`text-sm mb-6 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Provide information about your animal
        </p>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Photos (Up to 10) - Optional
        </label>
        
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
            selectedImages.length >= 10
              ? darkMode
                ? 'border-gray-600 bg-gray-700/50 cursor-not-allowed'
                : 'border-gray-300 bg-gray-100 cursor-not-allowed'
              : darkMode
                ? 'border-gray-600 hover:border-green-500 hover:bg-gray-700/50'
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
          
          <PhotoIcon className={`w-10 h-10 mx-auto mb-3 ${
            selectedImages.length >= 10
              ? darkMode ? 'text-gray-500' : 'text-gray-400'
              : darkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          
          <div className={`text-sm font-medium mb-1 ${
            selectedImages.length >= 10
              ? darkMode ? 'text-gray-500' : 'text-gray-400'
              : darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {selectedImages.length >= 10 ? 'Maximum photos reached' : 'Click to upload photos'}
          </div>
          
          <div className={`text-xs ${
            selectedImages.length >= 10
              ? darkMode ? 'text-gray-600' : 'text-gray-400'
              : darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {selectedImages.length}/10 images
          </div>
        </div>

        {selectedImages.length > 0 && (
          <div className="mt-4">
            <div className={`grid gap-2 p-3 rounded-lg ${
              selectedImages.length === 1 ? 'grid-cols-1' :
              selectedImages.length === 2 ? 'grid-cols-2' :
              'grid-cols-3'
            } ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              {selectedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt="Selected"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <label className={`block text-sm font-medium mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the animal, health condition, behavior, etc..."
          rows="4"
          maxLength="1000"
          className={`w-full p-3 text-sm rounded-lg border resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        <div className={`text-xs mt-1 text-right ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {description.length}/1000
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Age *
          </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 6 months"
            className={`w-full p-3 text-sm rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Sex *
          </label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className={`w-full p-3 text-sm rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Price (₱) *
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className={`w-full p-3 text-sm rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Location *
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`w-full p-3 text-sm rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          }`}
        >
          <option value="">Select barangay</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.name}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderReviewStep = () => {
    const selectedCategory = getSelectedCategory();
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className={`text-lg font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Review Your Post
          </h3>
          <p className={`text-sm mb-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Make sure everything looks good before publishing
          </p>
        </div>

        <div className={`rounded-xl border overflow-hidden ${
          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
        }`}>
          {selectedImages.length > 0 && (
            <div className={`grid gap-1 ${
              selectedImages.length === 1 ? 'grid-cols-1' :
              selectedImages.length === 2 ? 'grid-cols-2' :
              selectedImages.length <= 4 ? 'grid-cols-2' :
              'grid-cols-3'
            }`}>
              {selectedImages.slice(0, 6).map((image, index) => (
                <div key={image.id} className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 5 && selectedImages.length > 6 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        +{selectedImages.length - 6}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode 
                    ? 'bg-green-900 text-green-300 border border-green-700'
                    : 'bg-green-100 text-green-800 border border-green-200'
                }`}>
                  {selectedCategory?.displayName}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode 
                    ? 'bg-blue-900 text-blue-300 border border-blue-700'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {selectedBreed}
                </span>
              </div>
            </div>

            <div>
              <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {description}
              </p>
            </div>

            <div className={`grid grid-cols-2 gap-3 pt-3 border-t ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <div>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Age
                </div>
                <div className={`text-sm font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {age}
                </div>
              </div>

              <div>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Sex
                </div>
                <div className={`text-sm font-semibold capitalize ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {sex}
                </div>
              </div>

              <div>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Price
                </div>
                <div className={`text-sm font-semibold ${
                  darkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  ₱{parseFloat(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Location
                </div>
                <div className={`text-sm font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {location}
                </div>
              </div>
            </div>

            <div className={`pt-3 border-t text-xs ${
              darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-200 text-gray-500'
            }`}>
              Will be posted just now
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className={`w-full max-w-sm rounded-xl shadow-2xl p-8 text-center ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              darkMode ? 'bg-green-900' : 'bg-green-100'
            }`}>
              <CheckIcon className={`w-10 h-10 ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Post Published Successfully!
            </h3>
            <p className={`text-sm mb-6 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your listing has been posted and is now visible to buyers.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                onClose();
              }}
              className={`w-full px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                darkMode
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className={`w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create Animal Listing
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors duration-200 ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Stepper */}
        <div className={`p-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {renderStepper()}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[55vh] overflow-y-auto">
          {currentStep === 1 && renderAnimalSelectionStep()}
          {currentStep === 2 && renderDetailsStep()}
          {currentStep === 3 && renderReviewStep()}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
              Step {currentStep} of 3
            </div>

            {/* Next/Submit Button */}
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className={`flex items-center space-x-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isSubmitting || !canPublish()
                    ? darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : darkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default CreatePostModal;