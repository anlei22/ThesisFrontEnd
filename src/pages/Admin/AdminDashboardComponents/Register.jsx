import React, { useState } from 'react';
import { User, MapPin, Calendar, Users, Phone, Shield, UserPlus, Heart, Eye, EyeOff, Mail, AlertCircle, CheckCircle, Save, X } from 'lucide-react';

export default function AdminUserRegistrationForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    Username: '',
    password: '',
    confirmPassword: '',
    address: '',
    birthday: '',
    sex: '',
    age: '',
    userType: '',
    animalsInterested: '',
    phoneNumber: '',
    role: 'user',
    agreeToTerms: true // Auto-checked for admin registration
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Username validation
    const UsernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.Username.trim()) {
      newErrors.Username = 'Username is required';
    } else if (!UsernameRegex.test(formData.Username)) {
      newErrors.Username = 'Please enter a valid Username address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Birthday validation
    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required';
    } else {
      const today = new Date();
      const birthDate = new Date(formData.birthday);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge < 13) {
        newErrors.birthday = 'Must be at least 13 years old';
      }
    }

    // Sex validation
    if (!formData.sex) {
      newErrors.sex = 'Please select sex';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 13 || formData.age > 120) {
      newErrors.age = 'Age must be between 13 and 120';
    }

    // User Type validation (only for users)
    if (formData.role === 'user' && !formData.userType) {
      newErrors.userType = 'Please select user interest';
    }

    // Animals validation (only for users)
    if (formData.role === 'user' && !formData.animalsInterested.trim()) {
      newErrors.animalsInterested = 'Please specify animals interested in';
    }

    // Phone validation
    const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber) || formData.phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-calculate age from birthday
    if (name === 'birthday' && value) {
      const today = new Date();
      const birthDate = new Date(value);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge >= 13) {
        setFormData(prev => ({ ...prev, age: calculatedAge.toString() }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Call parent submit handler if provided
        if (onSubmit) {
          onSubmit(formData);
        }
        
        console.log('Form submitted successfully:', formData);
        
        // Reset form
        setFormData({
          fullName: '',
          Username: '',
          password: '',
          confirmPassword: '',
          address: '',
          birthday: '',
          sex: '',
          age: '',
          userType: '',
          animalsInterested: '',
          phoneNumber: '',
          role: 'user',
          agreeToTerms: true
        });
        
      } catch (error) {
        console.error('Submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Account</h2>
              <p className="text-sm text-gray-600">Create a new user or admin account</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Account Type</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === 'user'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                formData.role === 'user' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <User className={`w-5 h-5 ${
                  formData.role === 'user' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className={`font-medium ${
                  formData.role === 'user' ? 'text-blue-600' : 'text-gray-600'
                }`}>User Account</span>
              </div>
            </label>
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div className={`p-3 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                formData.role === 'admin' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <Shield className={`w-5 h-5 ${
                  formData.role === 'admin' ? 'text-blue-600' : 'text-gray-400'
                }`} />
                <span className={`font-medium ${
                  formData.role === 'admin' ? 'text-blue-600' : 'text-gray-600'
                }`}>Admin Account</span>
              </div>
            </label>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="Username" className="block text-sm font-medium text-gray-700 mb-2">
              Username *
            </label>
            <input
              type="Username"
              id="Username"
              name="Username"
              value={formData.Username}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Username ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder=" Username"
            />
            {errors.Username && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.Username}
              </p>
            )}
          </div>
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter complete address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.address}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
              Birthday *
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.birthday ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.birthday && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.birthday}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">
              Sex *
            </label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.sex ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.sex && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.sex}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="13"
              max="120"
              value={formData.age}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.age ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Age"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.age}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="+63 XXX XXX XXXX"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phoneNumber}
              </p>
            )}
          </div>
        </div>

        {/* User-specific fields */}
        {formData.role === 'user' && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-blue-600" />
              User Interests (Required for Users)
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Type *
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.userType ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select interest</option>
                  <option value="seller">Selling animals</option>
                  <option value="buyer">Buying animals</option>
                  <option value="both">Both selling and buying</option>
                </select>
                {errors.userType && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.userType}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="animalsInterested" className="block text-sm font-medium text-gray-700 mb-2">
                  Animals Interested In *
                </label>
                <textarea
                  id="animalsInterested"
                  name="animalsInterested"
                  value={formData.animalsInterested}
                  onChange={handleInputChange}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.animalsInterested ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Dogs, Cats, Birds, Fish, etc."
                />
                {errors.animalsInterested && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.animalsInterested}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-2 focus:ring-blue-500 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}