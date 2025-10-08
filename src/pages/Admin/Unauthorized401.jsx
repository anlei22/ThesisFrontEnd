import React, { useEffect, useState } from 'react';

const Unauthorized401 = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = '/';
    }
  }, [count]);

  useEffect(() => {
    // Redirect after 3 seconds regardless of countdown
    const redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 3000);
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">401</h1>
        <h2 className="text-2xl font-semibold mb-2">Not Authorized</h2>
        <p className="mb-6 text-gray-600">You do not have permission to access this page.</p>
        <div className="flex flex-col items-center">
          <span className="text-lg font-medium text-gray-700 mb-2">Loading...</span>
          <span className="text-sm text-gray-500">Redirecting to Dashboard in {count} and counting</span>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized401;
