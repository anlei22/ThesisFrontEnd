import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Camera,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";

const RegistrationStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Personal Data
    firstName: "",
    middleName: "",
    surname: "",
    phone: "",
    address: "",
    birthday: "",
    age: "",
    sex: "",
    animals: [],
    role: "",
    animalInterests: [],

    // Step 2 - Phone Verification
    verificationCode: "",

    // Step 3 - Email & Password
    email: "",
    password: "",
    confirmPassword: "",

    // Step 4 - Documents
    idPhoto: null,
    selfiePhoto: null,
  });

  const steps = [
    { number: 1, title: "Personal Data", icon: User },
    { number: 2, title: "Phone Verification", icon: Phone },
    { number: 3, title: "Account Setup", icon: Mail },
    { number: 4, title: "Document Upload", icon: Camera },
    { number: 5, title: "Complete", icon: CheckCircle },
  ];

  const animalOptions = [
    "Chicken",
    "Cow",
    "Pig",
    "Goat",
    "Duck",
    "Turkey",
    "Sheep",
    "Horse",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  // Form validation functions
  const validateStep1 = () => {
    return (
      formData.firstName &&
      formData.surname &&
      formData.phone &&
      formData.address &&
      formData.birthday &&
      formData.age &&
      formData.sex &&
      formData.role &&
      formData.animalInterests.length > 0
    );
  };

  const validateStep2 = () => {
    return formData.verificationCode && formData.verificationCode.length === 6;
  };

  const validateStep3 = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      isPasswordStrong()
    );
  };

  const validateStep4 = () => {
    return formData.idPhoto && formData.selfiePhoto;
  };

  const isPasswordStrong = () => {
    const password = formData.password;
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    );
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "", color: "gray" };

    let strength = 0;
    const requirements = {
      length: password.length >= 8,
      capital: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*]/.test(password),
    };

    strength = Object.values(requirements).filter(Boolean).length;

    if (strength < 2)
      return { strength, text: "Weak", color: "red", requirements };
    if (strength < 4)
      return { strength, text: "Medium", color: "yellow", requirements };
    return { strength, text: "Strong", color: "green", requirements };
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      case 4:
        return validateStep4();
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 5 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) =>
                    handleInputChange("middleName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter middle name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surname *
                </label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleInputChange("surname", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter surname"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+63 9XX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birthday *
                </label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) =>
                    handleInputChange("birthday", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Enter complete address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sex *
                </label>
                <select
                  value={formData.sex}
                  onChange={(e) => handleInputChange("sex", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="both">Both (Buyer & Seller)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animals Interested In *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {animalOptions.map((animal) => (
                  <label
                    key={animal}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.animalInterests.includes(animal)}
                      onChange={() =>
                        handleArrayChange("animalInterests", animal)
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{animal}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="max-w-md mx-auto">
              <Phone className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Phone Verification
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a verification code to{" "}
                <strong>{formData.phone}</strong>
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) =>
                    handleInputChange("verificationCode", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                />
              </div>

              <button className="mt-4 text-blue-500 hover:text-blue-700 text-sm">
                Resend code
              </button>
            </div>
          </div>
        );

      case 3:
        const passwordStrength = getPasswordStrength();
        return (
          <div className="space-y-6">
            <div className="max-w-md mx-auto">
              <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Account Setup
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength.color === "red"
                                ? "bg-red-500"
                                : passwordStrength.color === "yellow"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${
                                (passwordStrength.strength / 4) * 100
                              }%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength.color === "red"
                              ? "text-red-600"
                              : passwordStrength.color === "yellow"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }`}
                        >
                          {passwordStrength.text}
                        </span>
                      </div>

                      {/* Password Requirements */}
                      {passwordStrength.strength < 4 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-xs font-medium text-yellow-800 mb-1">
                            Password must contain:
                          </p>
                          <div className="text-xs text-yellow-700 space-y-1">
                            <div
                              className={
                                passwordStrength.requirements.length
                                  ? "text-green-600"
                                  : ""
                              }
                            >
                              • At least 8 characters{" "}
                              {passwordStrength.requirements.length ? "✓" : "✗"}
                            </div>
                            <div
                              className={
                                passwordStrength.requirements.capital
                                  ? "text-green-600"
                                  : ""
                              }
                            >
                              • One capital letter{" "}
                              {passwordStrength.requirements.capital
                                ? "✓"
                                : "✗"}
                            </div>
                            <div
                              className={
                                passwordStrength.requirements.number
                                  ? "text-green-600"
                                  : ""
                              }
                            >
                              • One number{" "}
                              {passwordStrength.requirements.number ? "✓" : "✗"}
                            </div>
                            <div
                              className={
                                passwordStrength.requirements.symbol
                                  ? "text-green-600"
                                  : ""
                              }
                            >
                              • One symbol (!@#$%^&*){" "}
                              {passwordStrength.requirements.symbol ? "✓" : "✗"}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-600 mt-1">
                        Passwords do not match
                      </p>
                    )}
                  {formData.confirmPassword &&
                    formData.password === formData.confirmPassword && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ Passwords match
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="max-w-md mx-auto">
              <Camera className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Document Upload
              </h2>

              {/* Photo Guidelines */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 mb-6">
                <h4 className="font-medium mb-2 text-blue-800">
                  Photo Guidelines:
                </h4>
                <ul className="text-sm space-y-1 text-blue-700">
                  <li>• Ensure all text on your ID is clearly visible</li>
                  <li>• Take photos in good lighting</li>
                  <li>• Avoid glare and shadows</li>
                  <li>• Hold your ID close to your face in the selfie</li>
                  <li>• Make sure your face is clearly visible</li>
                </ul>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload ID Picture *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload your ID
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload("idPhoto", e.target.files[0])
                      }
                      className="hidden"
                      id="id-upload"
                    />
                    <label
                      htmlFor="id-upload"
                      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Choose File
                    </label>
                    {formData.idPhoto && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.idPhoto.name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Selfie with ID *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload selfie with ID
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload("selfiePhoto", e.target.files[0])
                      }
                      className="hidden"
                      id="selfie-upload"
                    />
                    <label
                      htmlFor="selfie-upload"
                      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Choose File
                    </label>
                    {formData.selfiePhoto && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.selfiePhoto.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-800">
              Registration Complete!
            </h2>
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 mb-4">
                Thank you for signing up! Your registration has been submitted
                successfully.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  <strong>Please wait for admin approval</strong>
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  We'll review your application and notify you via email once
                  approved. This process usually takes 1-2 business days.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors
                      ${
                        isActive
                          ? "bg-blue-500 border-blue-500 text-white"
                          : isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-white border-gray-300 text-gray-400"
                      }
                    `}
                    >
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <span
                      className={`
                      text-xs mt-2 font-medium
                      ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    `}
                    >
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`
                      flex-1 h-1 mx-4 rounded transition-colors
                      ${isCompleted ? "bg-green-500" : "bg-gray-200"}
                    `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
   <div className="bg-white rounded-2xl shadow-xl p-8">
  {renderStepContent()}

  {/* Navigation Buttons */}
  {currentStep < 5 && (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      {/* Left: Back to Login */}
      <button
        onClick={() => (window.location.href = "/login")}
        className="text-blue-600 hover:text-blue-800 px-4 py-3 text-sm transition-colors"
      >
        ← Back to Login
      </button>

      {/* Right: Previous + Next */}
      <div className="flex space-x-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={nextStep}
          disabled={!canProceed()}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{currentStep === 4 ? "Submit" : "Next"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default RegistrationStepper;
