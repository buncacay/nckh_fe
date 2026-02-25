import React from 'react';
import { Search, Bell } from 'lucide-react';
import Notification from '../../page/Settings/Notification'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header 
      className={`fixed top-0 right-0 h-16 flex items-center justify-between px-8 bg-white border-b border-gray-100 shadow-sm transition-all duration-300 z-10
        ${isLoggedIn ? 'left-64' : 'left-0'}`} 
        /* Giải thích: Nếu login, cách lề trái 64 (256px) cho Sidebar, nếu chưa thì full màn hình */
    >
      {/* 1. Bên trái: Logo - Chỉ hiện khi CHƯA đăng nhập (vì khi đăng nhập logo thường nằm ở Sidebar) */}
      <div className="flex items-center">
        {!isLoggedIn && (
          <div className="text-xl font-bold text-gray-800 tracking-tight cursor-pointer mr-4 blue">
            VCertificate
          </div>
        )}
        
        {/* Nếu đã đăng nhập, có thể để một tiêu đề trang hoặc breadcrumb ở đây */}
        {isLoggedIn && (
          <span className="text-gray-500 text-sm font-medium">Dashboard</span>
        )}
      </div>

      {/* 2. Bên phải: Khu vực chức năng */}
      <div className="flex items-center gap-6">
        
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-4 text-gray-500">
              
              {/* <button className="hover:text-black transition-colors relative">
                <Bell size={20} strokeWidth={2} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button> */}

              <div className="relative"> 
              {/* Nút bấm chuông */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Hiển thị dropdown nếu isOpen = true */}
              {isOpen && (
                <>
                  {/* Overlay để bấm ra ngoài thì đóng */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                  
                  {/* Component Notification */}
                  <Notification />
                </>
              )}
            </div>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <img 
                  src="https://i.pravatar.cc/150?u=arttemplate" 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-orange-400 transition-all"
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-black">
                ArtTemplate
              </span>
            </div>
            
            {isLoggedIn && (
              <button 
                onClick={() => setIsLoggedIn(false)} // Khi bấm vào đây, Layout sẽ nhận lệnh và đóng Sidebar
                className="text-xs font-medium text-red-500 px-3 py-1 border border-red-500 rounded-md hover:bg-red-50 transition-all ml-2"
              >
                Log out
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Đăng nhập
            </button>
            <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-md shadow-blue-200 transition-all">
              Đăng ký
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;