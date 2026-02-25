import React, { useState } from "react";

const Guest = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSearched(true);
    }
  };

  return (
    // Container: Chuyển đổi giữa căn giữa (center) và đẩy lên top
    <div className={`min-h-screen w-full transition-all duration-700 ease-in-out flex flex-col items-center bg-gray-50 
      ${searched ? "pt-10" : "justify-center"}`}>

      {/* Search Wrapper: Bo góc, màu nền trắng hoặc xanh pastel khi active */}
      <div className={`w-full max-w-2xl px-4 transition-all duration-500 
        ${searched ? "scale-95" : "scale-100"}`}>
        
        <div className={`flex items-center bg-white rounded-full shadow-lg border border-gray-100 px-5 py-2 transition-all 
          ${searched ? "bg-blue-50 border-blue-200" : "hover:shadow-xl"}`}>
          
          {/* Nút Search */}
          <button 
            onClick={handleSearch}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          {/* Input */}
          <input
            type="text"
            placeholder="Search for herbs..."
            className="flex-grow bg-transparent border-none focus:ring-0 px-4 py-2 text-gray-700 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          {/* Nút Close (X) */}
          {searched && (
            <button 
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => {
                setQuery("");
                setSearched(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Kết quả tìm kiếm */}
      {searched && (
        <div className="w-full max-w-4xl mt-12 px-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Scientific Proven Herbs</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["Passionflower", "Black Cohosh", "Butterbur", "Feverfew"].map((herb) => (
              <div 
                key={herb} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer text-center font-medium text-gray-700"
              >
                {herb}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Guest;