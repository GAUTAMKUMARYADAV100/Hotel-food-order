import React from 'react';

const TailwindCheck = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">✅ Tailwind CSS is Working!</h1>
        <p className="text-gray-600 mb-6">This box has rounded corners, a gradient background, and shadow.</p>
        <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition-all duration-300">
          Hover Me
        </button>
      </div>
    </div>
  );
};

export default TailwindCheck;
