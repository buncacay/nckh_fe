import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FilePlus, 
  CheckCircle2, 
  ShieldAlert, 
  Copy, 
  GraduationCap, 
  Users, 
  Settings, 
  Search,
  LogOut 
} from 'lucide-react';

const menuItems = [
  { 
    group: "CHÍNH", 
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Bảng điều khiển' },
    ]
  },
  { 
    group: "NGHIỆP VỤ", 
    items: [
      { to: '/issue', icon: FilePlus, label: 'Cấp văn bằng mới' },
      { to: '/copy', icon: CheckCircle2, label: 'Cấp phát bản sao' },
      { to: '/revoke', icon: ShieldAlert, label: 'Cấp phát phụ lục' },
      
    ]
  },
  { 
    group: "DANH MỤC", 
    items: [
     
      { to: '/majors', icon: GraduationCap, label: 'Ngành & Khóa học' },
    ]
  },
  { 
    group: "HỆ THỐNG", 
    items: [
      // { to: '/users', icon: Users, label: 'Quản lý nhân sự' },
      { to: '/sendnoti', icon: Settings, label: 'Quản lý thông báo' },
    ]
  },
];

const Sidebar = ({ isLoggedIn, setIsLoggedIn }) => {
  if (!isLoggedIn) return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-20 shadow-sm">
      {/* 1. Logo Section */}
      <div className="p-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">VCertificate</h1>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Blockchain System</p>
        </div>
      </div>

      {/* 2. Search Section */}
      <div className="px-4 mb-4">
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-focus-within:text-blue-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl py-2 pl-9 pr-3 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
          />
        </div>
      </div>

      {/* 3. Menu Navigation (Render lồng nhau) */}
      <nav className="flex-1 overflow-y-auto px-3">
        {menuItems.map((group, idx) => (
          <div key={idx} className="mb-6">
            {/* Tên nhóm */}
            <h3 className="px-4 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {group.group}
            </h3>
            
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}`
                    }
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

     
    </aside>
  );
};

export default Sidebar;