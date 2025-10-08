import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const VerificationModal = ({ isOpen, onClose, darkMode, verificationData, onVerificationSuccess }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  const { register, sendVerificationCode, verifyCode } = useAuth();

  // Timer for resend functionality
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  // Auto-send verification code when modal opens
  useEffect(() => {
    if (isOpen && verificationData) {
      handleSendCode();
    }
  }, [isOpen, verificationData]);

  const handleSendCode = async () => {
    if (!verificationData) return;

    setIsLoading(true);
    setError('');
    
    try {
      const result = await sendVerificationCode(
        verificationData.contact,
        verificationData.verificationType
      );
      
      if (!result.success) {
        setError(result.error || 'Failed to send verification code');
      } else {
        setTimeLeft(300); // Reset timer
        setCanResend(false);
      }
    } catch (error) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        const newCode = [...verificationCode];
        newCode[index - 1] = '';
        setVerificationCode(newCode);
      }
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // First verify the code
      const verifyResult = await verifyCode(verificationData.contact, code);
      
      if (!verifyResult.success) {
        setError(verifyResult.error || 'Invalid verification code');
        return;
      }

      // If verification successful, proceed with registration
      const registerResult = await register(verificationData.userData);
      
      if (registerResult.success) {
        setSuccess(true);
        setTimeout(() => {
          if (onVerificationSuccess) {
            onVerificationSuccess();
          }
          onClose();
          resetModal();
        }, 2000);
      } else {
        setError(registerResult.error || 'Registration failed');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
    setSuccess(false);
    setTimeLeft(300);
    setCanResend(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !verificationData) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-8 right-8 p-3 rounded-full transition-all duration-200 z-10 ${
            darkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
          }`}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Header Section */}
        <div className="text-center pt-10 pb-8 px-10">
          <div className="flex justify-center mb-6">
            {success ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
              </div>
            ) : (
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
              }`}>
                {verificationData.verificationType === 'email' ? (
                  <EnvelopeIcon className="w-10 h-10 text-blue-600" />
                ) : (
                  <PhoneIcon className="w-10 h-10 text-blue-600" />
                )}
              </div>
            )}
          </div>

          {success ? (
            <>
              <h1 className={`text-3xl font-bold mb-3 text-green-600`}>
                Account Created Successfully!
              </h1>
              <p className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Welcome to Animal MarketHUB! Redirecting you now...
              </p>
            </>
          ) : (
            <>
              <h1 className={`text-3xl font-bold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Verify Your {verificationData.verificationType === 'email' ? 'Email' : 'Phone'}
              </h1>
              
              <p className={`text-base ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We've sent a 6-digit code to
              </p>
              <p className={`text-lg font-semibold mt-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {verificationData.contact}
              </p>
            </>
          )}
        </div>

        {!success && (
          <div className="px-10 pb-10">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Verification Code Input */}
            <div className="space-y-4">
              <label className={`block text-sm font-medium text-center ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Enter Verification Code
              </label>
              
              <div className="flex justify-center space-x-3">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 ${
                      darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white'
                        : 'bg-white border-gray-200 text-gray-900'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mt-6">
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {timeLeft > 0 ? (
                  <>Code expires in {formatTime(timeLeft)}</>
                ) : (
                  <>Code has expired</>
                )}
              </p>
            </div>

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleVerify}
              disabled={isLoading || verificationCode.join('').length !== 6}
              className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                isLoading || verificationCode.join('').length !== 6
                  ? 'bg-gray-400 cursor-not-allowed scale-95'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/30 active:scale-95'
              } text-white shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify & Complete Registration'
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center mt-4">
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!canResend || isLoading}
                className={`mt-1 font-semibold transition-colors duration-200 ${
                  canResend && !isLoading
                    ? 'text-green-600 hover:text-green-500 hover:underline'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Sending...' : 'Resend Code'}
              </button>
            </div>

            {/* Contact Info */}
            <div className={`mt-6 p-4 rounded-xl ${
              darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'
            }`}>
              <p className={`text-xs text-center ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Having trouble? Check your {verificationData.verificationType === 'email' ? 'email inbox and spam folder' : 'text messages'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;