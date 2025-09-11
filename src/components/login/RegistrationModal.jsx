import React, { useState, useRef } from 'react';
import { 
  XMarkIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarDaysIcon,
  IdentificationIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CameraIcon,
  PhotoIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const RegisterModal = ({ isOpen, onClose, darkMode, onSwitchToLogin, onRegistrationComplete }) => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Basic Info
    name: '',
    address: '',
    phone: '',
    email: '',
    // Step 2 - Verification
    verificationCode: '',
    // Step 3 - Personal Info & Security
    birthday: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    // Step 4 - ID Upload
    idPhoto: null,
    selfieWithId: null
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  
  const idPhotoRef = useRef(null);
  const selfieRef = useRef(null);

  // Timer effect for resend verification
  React.useEffect(() => {
    let interval;
    if (verificationTimer > 0) {
      interval = setInterval(() => {
        setVerificationTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verificationTimer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'Please select a valid image file'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File size must be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: {
            file: file,
            preview: event.target.result,
            name: file.name
          }
        }));
      };
      reader.readAsDataURL(file);
      
      // Clear any existing errors
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (formData.verificationCode.length !== 6) {
      newErrors.verificationCode = 'Verification code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required';
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};

    if (!formData.idPhoto) {
      newErrors.idPhoto = 'ID photo is required';
    }

    if (!formData.selfieWithId) {
      newErrors.selfieWithId = 'Selfie with ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendVerificationCode = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 2000));
      setVerificationSent(true);
      setVerificationTimer(60); // 60 seconds cooldown
      setErrors({});
    } catch (error) {
      setErrors({ general: 'Failed to send verification code. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!validateStep2()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 6-digit code
      if (formData.verificationCode.length === 6) {
        setIsVerified(true);
        setRegistrationStep(3);
      } else {
        setErrors({ verificationCode: 'Invalid verification code' });
      }
    } catch (error) {
      setErrors({ verificationCode: 'Verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    if (registrationStep === 1) {
      if (validateStep1()) {
        setRegistrationStep(2);
        // Auto-send verification code
        await sendVerificationCode();
      }
    } else if (registrationStep === 2) {
      await verifyCode();
    } else if (registrationStep === 3) {
      if (validateStep3()) {
        setRegistrationStep(4);
      }
    }
  };

  const handlePrevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (registrationStep === 4) {
      if (!validateStep4()) return;
      
      setIsLoading(true);
      try {
        // Simulate final registration process
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        if (onRegistrationComplete) {
          onRegistrationComplete({
            userData: formData,
            verified: true,
            idVerificationComplete: true
          });
        }
        
        onClose();
        resetForm();
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      await handleNextStep();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      verificationCode: '',
      birthday: '',
      idNumber: '',
      password: '',
      confirmPassword: '',
      idPhoto: null,
      selfieWithId: null
    });
    setErrors({});
    setRegistrationStep(1);
    setVerificationSent(false);
    setVerificationTimer(0);
    setIsVerified(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const stepTitles = [
    'Basic Information',
    'Phone Verification',
    'Personal Details',
    'ID Verification'
  ];

  const stepDescriptions = [
    'Let\'s start with your basic information',
    'Verify your phone number',
    'Complete your profile and security',
    'Upload your ID for verification'
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-200 z-10 ${
            darkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Logo and Header Section */}
        <div className="text-center pt-8 pb-6 px-8">
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="h-20 w-auto">
              <circle cx="60" cy="60" r="45" fill="url(#gradientBg)" stroke="#2563eb" strokeWidth="2"/>
              <defs>
                <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:0.1}} />
                  <stop offset="100%" style={{stopColor:"#1d4ed8", stopOpacity:0.2}} />
                </linearGradient>
                <linearGradient id="pawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#059669"}} />
                  <stop offset="100%" style={{stopColor:"#047857"}} />
                </linearGradient>
              </defs>
              <path d="M25 45 L35 45 L40 75 L75 75 L80 55 L45 55" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="45" cy="85" r="4" fill="#2563eb"/>
              <circle cx="70" cy="85" r="4" fill="#2563eb"/>
              <ellipse cx="60" cy="55" rx="8" ry="10" fill="url(#pawGradient)"/>
              <ellipse cx="52" cy="42" rx="4" ry="6" fill="url(#pawGradient)"/>
              <ellipse cx="60" cy="38" rx="4" ry="6" fill="url(#pawGradient)"/>
              <ellipse cx="68" cy="42" rx="4" ry="6" fill="url(#pawGradient)"/>
              <ellipse cx="75" cy="48" rx="3" ry="5" fill="url(#pawGradient)"/>
              <path d="M45 25 C42 22, 37 22, 37 28 C37 32, 45 40, 45 40 S53 32, 53 28 C53 22, 48 22, 45 25 Z" fill="#ef4444" opacity="0.8"/>
            </svg>
          </div>

          <h1 className={`text-3xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {stepTitles[registrationStep - 1]}
          </h1>
          
          <p className={`text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {stepDescriptions[registrationStep - 1]}
          </p>

          {/* Enhanced Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map((step, index) => (
                <React.Fragment key={step}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    registrationStep >= step 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {registrationStep > step ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      step
                    )}
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
                      registrationStep > step 
                        ? 'bg-green-600' 
                        : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-8 pb-8 max-h-96 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* General Error */}
            {errors.general && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium">
                {errors.general}
              </div>
            )}

            {/* Step 1: Basic Information */}
            {registrationStep === 1 && (
              <>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className={`w-5 h-5 absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                        darkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      } ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600 font-medium">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Address
                  </label>
                  <div className="relative">
                    <MapPinIcon className={`w-5 h-5 absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                        darkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      } ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm text-red-600 font-medium">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className={`w-5 h-5 absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+63 900 000 0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                        darkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      } ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 font-medium">{errors.phone}</p>
                  )}
                </div>
              </>
            )}

            {/* Step 2: Phone Verification */}
            {registrationStep === 2 && (
              <>
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className={`w-6 h-6 ${
                      darkMode ? 'text-blue-300' : 'text-blue-600'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        darkMode ? 'text-blue-300' : 'text-blue-800'
                      }`}>
                        Verification code sent to
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {formData.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Enter 6-digit verification code
                  </label>
                  <input
                    type="text"
                    name="verificationCode"
                    placeholder="000000"
                    maxLength="6"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 text-center text-2xl font-mono border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                      darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    } ${errors.verificationCode ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.verificationCode && (
                    <p className="text-sm text-red-600 font-medium">{errors.verificationCode}</p>
                  )}
                </div>

                <div className="text-center">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={sendVerificationCode}
                    disabled={verificationTimer > 0 || isLoading}
                    className={`mt-2 font-semibold text-sm transition-colors duration-200 ${
                      verificationTimer > 0 || isLoading
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-green-600 hover:text-green-500'
                    }`}
                  >
                    {verificationTimer > 0 ? (
                      <span className="flex items-center justify-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>Resend in {verificationTimer}s</span>
                      </span>
                    ) : (
                      'Resend Code'
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Personal Details & Security */}
            {registrationStep === 3 && (
              <>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Date of Birth
                  </label>
                  <div className="relative">
                    <CalendarDaysIcon className={`w-5 h-5 absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                        darkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white'
                          : 'bg-white border-gray-200 text-gray-900'
                      } ${errors.birthday ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                  </div>
                  {errors.birthday && (
                    <p className="text-sm text-red-600 font-medium">{errors.birthday}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Government ID Number
                  </label>
                  <div className="relative">
                    <IdentificationIcon className={`w-5 h-5 absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <input
                      type="text"
                      name="idNumber"
                      placeholder="Enter your ID number (SSS, TIN, etc.)"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                        darkMode
                          ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      } ${errors.idNumber ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    />
                  </div>
                  {errors.idNumber && (
                    <p className="text-sm text-red-600 font-medium">{errors.idNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className={`w-5 h-5 absolute left-3 top-3.5 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-11 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                          darkMode
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                        } ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-3.5 transition-colors duration-200 ${
                          darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 font-medium">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className={`w-5 h-5 absolute left-3 top-3.5 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-11 py-3.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                          darkMode
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                        } ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute right-3 top-3.5 transition-colors duration-200 ${
                          darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600 font-medium">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Step 4: ID Verification */}
            {registrationStep === 4 && (
              <>
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-yellow-900/20 border border-yellow-800/30' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex items-start space-x-3">
                    <IdentificationIcon className={`w-6 h-6 mt-0.5 ${
                      darkMode ? 'text-yellow-300' : 'text-yellow-600'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        darkMode ? 'text-yellow-300' : 'text-yellow-800'
                      }`}>
                        ID Verification Required
                      </p>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-yellow-400' : 'text-yellow-700'
                      }`}>
                        Please upload clear photos of your government ID and a selfie holding your ID for verification purposes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ID Photo Upload */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Government ID Photo
                  </label>
                  <div className="space-y-3">
                    <div 
                      onClick={() => idPhotoRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer hover:border-green-400 ${
                        darkMode
                          ? 'border-gray-600 bg-gray-700/30 hover:bg-gray-700/50'
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                      } ${errors.idPhoto ? 'border-red-500' : ''}`}
                    >
                      <input
                        ref={idPhotoRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'idPhoto')}
                        className="hidden"
                      />
                      
                      {formData.idPhoto ? (
                        <div className="flex items-center space-x-4">
                          <img 
                            src={formData.idPhoto.preview} 
                            alt="ID Preview" 
                            className="w-20 h-20 object-cover rounded-lg border-2 border-green-500"
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {formData.idPhoto.name}
                            </p>
                            <p className={`text-sm ${
                              darkMode ? 'text-green-400' : 'text-green-600'
                            }`}>
                              ✓ File uploaded successfully
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({...prev, idPhoto: null}));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <PhotoIcon className={`w-12 h-12 mx-auto mb-3 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <p className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Upload Government ID
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Click to select image or drag and drop
                          </p>
                          <p className={`text-xs mt-1 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    {errors.idPhoto && (
                      <p className="text-sm text-red-600 font-medium">{errors.idPhoto}</p>
                    )}
                  </div>
                </div>

                {/* Selfie with ID Upload */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Selfie with ID
                  </label>
                  <div className="space-y-3">
                    <div 
                      onClick={() => selfieRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer hover:border-green-400 ${
                        darkMode
                          ? 'border-gray-600 bg-gray-700/30 hover:bg-gray-700/50'
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                      } ${errors.selfieWithId ? 'border-red-500' : ''}`}
                    >
                      <input
                        ref={selfieRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'selfieWithId')}
                        className="hidden"
                      />
                      
                      {formData.selfieWithId ? (
                        <div className="flex items-center space-x-4">
                          <img 
                            src={formData.selfieWithId.preview} 
                            alt="Selfie Preview" 
                            className="w-20 h-20 object-cover rounded-lg border-2 border-green-500"
                          />
                          <div className="flex-1">
                            <p className={`font-medium ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {formData.selfieWithId.name}
                            </p>
                            <p className={`text-sm ${
                              darkMode ? 'text-green-400' : 'text-green-600'
                            }`}>
                              ✓ File uploaded successfully
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({...prev, selfieWithId: null}));
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <CameraIcon className={`w-12 h-12 mx-auto mb-3 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <p className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            Take Selfie with ID
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Hold your ID next to your face
                          </p>
                          <p className={`text-xs mt-1 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    {errors.selfieWithId && (
                      <p className="text-sm text-red-600 font-medium">{errors.selfieWithId}</p>
                    )}
                  </div>
                </div>

                {/* ID Verification Guidelines */}
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'
                }`}>
                  <h4 className={`font-medium mb-2 ${
                    darkMode ? 'text-blue-300' : 'text-blue-800'
                  }`}>
                    Photo Guidelines:
                  </h4>
                  <ul className={`text-sm space-y-1 ${
                    darkMode ? 'text-blue-400' : 'text-blue-700'
                  }`}>
                    <li>• Ensure all text on your ID is clearly visible</li>
                    <li>• Take photos in good lighting</li>
                    <li>• Avoid glare and shadows</li>
                    <li>• Hold your ID close to your face in the selfie</li>
                    <li>• Make sure your face is clearly visible</li>
                  </ul>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              {registrationStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                  className={`flex items-center space-x-2 px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                  <span>Back</span>
                </button>
              )}
              
              <div className="flex-1"></div>

              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 transform ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed scale-95'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/30 active:scale-95'
                } text-white shadow-lg`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {registrationStep === 1 && 'Sending Code...'}
                      {registrationStep === 2 && 'Verifying...'}
                      {registrationStep === 3 && 'Saving...'}
                      {registrationStep === 4 && 'Completing Registration...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {registrationStep === 1 && 'Send Verification Code'}
                      {registrationStep === 2 && 'Verify Phone'}
                      {registrationStep === 3 && 'Continue'}
                      {registrationStep === 4 && 'Complete Registration'}
                    </span>
                    {registrationStep < 4 && <ChevronRightIcon className="w-5 h-5" />}
                  </>
                )}
              </button>
            </div>

            {/* Login Link - Only show on first step */}
            {registrationStep === 1 && (
              <>
                <div className="relative py-4">
                  <div className={`absolute inset-0 flex items-center`}>
                    <div className={`w-full border-t ${
                      darkMode ? 'border-gray-600' : 'border-gray-200'
                    }`}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-4 ${
                      darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-400' : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-500'
                    }`}>
                      or
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className={`text-base ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Already have an account?
                  </p>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="mt-1 text-green-600 hover:text-green-500 font-semibold text-base transition-colors duration-200 hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;