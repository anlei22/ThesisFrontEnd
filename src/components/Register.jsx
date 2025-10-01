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
  // connection
  import { useConnection } from '../context/Connection';



  const RegistrationStepper = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [CodeVerify, setCode] = useState(null);
    const [statusMessage , setStatusMessage] = useState("");

    const { request } = useConnection();
    const sendCode = async () => {

      try {
        const data = await request('code', {
          method: 'post',
          data: { phone: formData.phone }
        });
        // console.log("Verification code sent successfully:", data);
        setStatusMessage("Verification code sent successfully");
        setCode(data.code);
        // console.log("Verification code:", data.code);
      } catch (err) {
        setStatusMessage("Failed to send verification code");
        console.error("Failed to send verification code:", err);
      }
    };

    const CreateRegistration = async () => {
  try {
    // Create FormData to handle file uploads properly
    const formDataToSend = new FormData();
    
    // Map frontend field names to backend expected names
    formDataToSend.append('FirstName', formData.firstname);
    formDataToSend.append('LastName', formData.lastname);
    formDataToSend.append('Username', formData.email); // Using email as username, or create a separate username field
    formDataToSend.append('Email', formData.email);
    formDataToSend.append('Password', formData.password);
    formDataToSend.append('phone_number', formData.phone);
    
    // Add other fields
    formDataToSend.append('middlename', formData.middlename);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('birthdate', formData.birthdate);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('sex', formData.sex);
    formDataToSend.append('role', formData.role);
    
    // Add files properly
    if (formData.valid_id_picture) {
      formDataToSend.append('valid_id_picture', formData.valid_id_picture);
    }
    if (formData.selfie_with_id_picture) {
      formDataToSend.append('selfie_with_id_picture', formData.selfie_with_id_picture);
    }

    const data = await request('register', {
      method: 'post',
      data: formDataToSend,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    setStatusMessage("Registration successful");
    console.log(data);
  } catch (err) {
    setStatusMessage("Failed to create registration");
    console.error("Failed to create registration:", err);
    
    // Log the error response for debugging
    if (err.response && err.response.data) {
      console.error("Validation errors:", err.response.data.error);
    }
  }
};

    const [formData, setFormData] = useState({
      // Step 1 - Personal Data
      firstname: "",
      middlename: "",
      lastname: "",
      phone: "",
      address: "",
      birthdate: "",
      age: "",
      sex: "",
     
      role: "",


      // Step 2 - Phone Verification
      verificationCode: "",

      // Step 3 - Email & Password
      email: "",
      password: "",
      confirmPassword: "",

      // Step 4 - Documents
      valid_id_picture: null,
      selfie_with_id_picture: null,
    });

    const steps = [
      { number: 1, title: "Personal Data", icon: User },
      { number: 2, title: "Phone Verification", icon: Phone },
      { number: 3, title: "Account Setup", icon: Mail },
      { number: 4, title: "Document Upload", icon: Camera },
      { number: 5, title: "Confirmation", icon: CheckCircle },
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
    const validateStep1 = async () => {
      return (
        formData.firstname &&
        formData.lastname &&
        formData.phone &&
        formData.address &&
        formData.birthdate &&
        formData.age &&
        formData.sex &&
        formData.role
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
      return formData.valid_id_picture && formData.selfie_with_id_picture;
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
  if (currentStep < 5) {
    if (currentStep === 2) {
      // Ensure both codes are strings and trimmed
      if (
        formData.verificationCode &&
        CodeVerify &&
        formData.verificationCode.trim() === String(CodeVerify).trim()
      ) {
        setStatusMessage(""); // Clear error
        setCurrentStep(currentStep + 1); // ✅ code is true, go to next step
      } else {
        setStatusMessage("Invalid verification code"); // ❌ code is false
      }
      return; // prevents the rest from running
    }

    if(currentStep === 4){
      CreateRegistration();
    }
      

    if (canProceed()) {
      // For step 1, trigger sendCode before moving to next step
      if (currentStep === 1) {
        sendCode();
      }
      setCurrentStep(currentStep + 1);
    }
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
            <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">Please fill in your basic details</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstname}
            onChange={(e) =>
              handleInputChange("firstname", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middlename}
            onChange={(e) =>
              handleInputChange("middlename", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter middle name"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            lastname *
          </label>
          <input
            type="text"
            value={formData.lastname}
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter lastname"
          />
        </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600 text-sm select-none">
              +63
            </span>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="9XX XXX XXXX"
              maxLength={10}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            birthdate *
          </label>
          <input
            type="date"
            value={formData.birthdate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              const birthdate = e.target.value;
              handleInputChange("birthdate", birthdate);
              // Calculate age automatically
              if (birthdate) {
          const birthDate = new Date(birthdate);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          handleInputChange("age", age > 0 ? age : "");
              } else {
          handleInputChange("age", "");
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          rows="3"
          placeholder="Enter complete address"
        />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter age"
            readOnly // Age is now auto-calculated
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sex *
          </label>
          <select
            value={formData.sex}
            onChange={(e) => handleInputChange("sex", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>  
            <option value="other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select preferred role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="both">Both (Buyer & Seller)</option>
          </select>
        </div>
            </div>
          </div>
        );

      case 2:
    return (
      <div className="space-y-6">
        <div className="max-w-md mx-auto text-center">
          <Phone className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Phone Verification
          </h2>
          <p className="text-gray-600 mb-8">
            We've sent a verification code to{" "}
            <span className="font-semibold text-gray-800">{formData.phone}</span>
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Verification Code
              </label>
              <input
                type="text"
                value={formData.verificationCode}
                onChange={(e) => {
                  handleInputChange("verificationCode", e.target.value);
                  setStatusMessage(""); // Clear error when typing
                }}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest font-mono transition-all"
                placeholder="000000"
                maxLength="6"
              />
              {statusMessage === "Invalid verification code" && (
                <p className="text-red-600 text-sm mt-2">{statusMessage}</p>
              )}
            </div>

            <button className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">
              Didn't receive code? Resend
            </button>
          </div>
        </div>
      </div>
    );

        case 3:
          const passwordStrength = getPasswordStrength();
          return (
            <div className="space-y-6">
              <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                  <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Account Setup
                  </h2>
                  <p className="text-gray-600">Create your login credentials</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500 transition-colors"
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
                      <div className="mt-3 space-y-3">
                        <div className="flex items-center space-x-3">
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
                            className={`text-sm font-medium ${
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
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-yellow-800 mb-2">
                              Password requirements:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                              <div
                                className={`flex items-center space-x-2 ${
                                  passwordStrength.requirements.length
                                    ? "text-green-600"
                                    : "text-yellow-700"
                                }`}
                              >
                                <span className="font-mono text-xs">
                                  {passwordStrength.requirements.length ? "✓" : "✗"}
                                </span>
                                <span>8+ characters</span>
                              </div>
                              <div
                                className={`flex items-center space-x-2 ${
                                  passwordStrength.requirements.capital
                                    ? "text-green-600"
                                    : "text-yellow-700"
                                }`}
                              >
                                <span className="font-mono text-xs">
                                  {passwordStrength.requirements.capital ? "✓" : "✗"}
                                </span>
                                <span>Capital letter</span>
                              </div>
                              <div
                                className={`flex items-center space-x-2 ${
                                  passwordStrength.requirements.number
                                    ? "text-green-600"
                                    : "text-yellow-700"
                                }`}
                              >
                                <span className="font-mono text-xs">
                                  {passwordStrength.requirements.number ? "✓" : "✗"}
                                </span>
                                <span>Number</span>
                              </div>
                              <div
                                className={`flex items-center space-x-2 ${
                                  passwordStrength.requirements.symbol
                                    ? "text-green-600"
                                    : "text-yellow-700"
                                }`}
                              >
                                <span className="font-mono text-xs">
                                  {passwordStrength.requirements.symbol ? "✓" : "✗"}
                                </span>
                                <span>Symbol (!@#$%^&*)</span>
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
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500 transition-colors"
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
                        <p className="text-sm text-red-600 mt-2 flex items-center space-x-1">
                          <span className="font-mono text-xs">✗</span>
                          <span>Passwords do not match</span>
                        </p>
                      )}
                    {formData.confirmPassword &&
                      formData.password === formData.confirmPassword && (
                        <p className="text-sm text-green-600 mt-2 flex items-center space-x-1">
                          <span className="font-mono text-xs">✓</span>
                          <span>Passwords match</span>
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
              <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                  <Camera className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Document Upload
                  </h2>
                  <p className="text-gray-600">Upload your identification documents</p>
                </div>

                {/* Photo Guidelines */}
                <div className="p-4 md:p-6 rounded-xl bg-blue-50 border border-blue-200 mb-8">
                  <h4 className="font-semibold mb-3 text-blue-800 flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Photo Guidelines</span>
                  </h4>
                  <ul className="text-sm space-y-2 text-blue-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Ensure all text on your ID is clearly visible</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Take photos in good lighting conditions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Avoid glare and shadows on documents</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Hold your ID close to your face in the selfie</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>Make sure your face is clearly visible</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload ID Picture *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-4">
                        Click to upload your government-issued ID
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload("valid_id_picture", e.target.files[0])
                        }
                        className="hidden"
                        id="id-upload"
                      />
                      <label
                        htmlFor="id-upload"
                        className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
                      >
                        Choose File
                      </label>
                      {formData.valid_id_picture && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-700 font-medium flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>{formData.valid_id_picture.name}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload Selfie with ID *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-4">
                        Take a selfie while holding your ID next to your face
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload("selfie_with_id_picture", e.target.files[0])
                        }
                        className="hidden"
                        id="selfie-upload"
                      />
                      <label
                        htmlFor="selfie-upload"
                        className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-block"
                      >
                        Choose File
                      </label>
                      {formData.selfie_with_id_picture && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-700 font-medium flex items-center justify-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>{formData.selfie_with_id_picture.name}</span>
                          </p>
                        </div>
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
              <div className="max-w-lg mx-auto">
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Registration Complete!
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Thank you for signing up! Your registration has been submitted
                  successfully.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 md:p-8">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <p className="text-blue-800 font-semibold text-lg">
                      Awaiting Admin Approval
                    </p>
                  </div>
                  <p className="text-blue-700 leading-relaxed">
                    We'll review your application and notify you via email once
                    approved. This process typically takes 1-2 business days.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Questions? Contact our support team
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
  <div  
    className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-4 md:py-8 px-4 overflow-y-auto"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    <div className="max-w-6xl mx-auto">
          {/* Enhanced Progress Stepper */}
          <div className="mb-6 md:mb-12">
            <div className="relative px-2">
              {/* Progress Line - only between circles */}
              <div className="absolute top-4 md:top-6 left-10 md:left-14 right-10 md:right-14 h-0.5 md:h-1 bg-gray-200 rounded-full"></div>
              
              {/* Progress line that fills as steps complete */}
              <div 
                className="absolute top-4 md:top-6 left-10 md:left-14 h-0.5 md:h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100)}%`,
                  maxWidth: `calc(100% - 80px)`
                }}
              ></div>

              <div className="flex items-start justify-between relative">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = currentStep === step.number;
                  const isCompleted = currentStep > step.number;

                  return (
                    <div key={step.number} className="flex flex-col items-center relative flex-1">
                      {/* Step Circle */}
                      <div
                        className={`
                          w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 md:border-3 transition-all duration-300 relative z-10 shadow-md md:shadow-lg flex-shrink-0
                          ${
                            isActive
                              ? "bg-blue-500 border-blue-500 text-white scale-105 md:scale-110 shadow-blue-200"
                              : isCompleted
                              ? "bg-green-500 border-green-500 text-white shadow-green-200"
                              : "bg-white border-gray-300 text-gray-400 shadow-gray-200"
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-3 h-3 md:w-6 md:h-6" />
                        ) : (
                          <StepIcon className="w-3 h-3 md:w-6 md:h-6" />
                        )}
                      </div>

                      {/* Step Title */}
                      <div className="mt-1 md:mt-3 text-center px-0.5">
                        <span
                          className={`
                            text-xs md:text-sm font-medium md:font-semibold block transition-colors duration-300 leading-tight
                            ${
                              isActive
                                ? "text-blue-600"
                                : isCompleted
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          `}
                        >
                          <span className="hidden sm:inline">{step.title}</span>
                          <span className="sm:hidden">Step {step.number}</span>
                        </span>
                        <span
                          className={`
                            text-xs mt-0.5 md:mt-1 block transition-colors duration-300 hidden sm:block
                            ${
                              isActive
                                ? "text-blue-500"
                                : isCompleted
                                ? "text-green-500"
                                : "text-gray-400"
                            }
                          `}
                        >
                          Step {step.number}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 lg:p-12">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="bg-gray-50 px-6 py-4 md:px-8 md:py-6 lg:px-12 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                  {/* Left: Back to Home */}
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="text-blue-600 hover:text-blue-800 px-4 py-2 text-sm transition-colors order-2 sm:order-1 text-center sm:text-left"
                  >
                    ← Back to Home
                  </button>

                  {/* Right: Previous + Next */}
                  <div className="flex space-x-3 order-1 sm:order-2">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center justify-center space-x-2 px-4 md:px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-1 sm:flex-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex-1 sm:flex-none"
                    >
                      <span>{currentStep === 4 ? "Submit" : "Next"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer for final step */}
          {currentStep === 5 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default RegistrationStepper;