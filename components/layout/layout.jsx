import React, { useState } from 'react'; // Phải thêm useState vào đây
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar dựa vào isLoggedIn để ẩn/hiện */}
      <Sidebar isLoggedIn={isLoggedIn} />

      <div className={`flex-1 transition-all duration-300 ${isLoggedIn ? 'ml-64' : 'ml-0'}`}>
        {/* TRUYỀN setIsLoggedIn vào đây để Header có quyền thay đổi trạng thái toàn cục */}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <main className="p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;