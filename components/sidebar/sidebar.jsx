import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  LayoutDashboard,
  FilePlus,
  CheckCircle2,
  ShieldAlert,
  GraduationCap,
  Users,
  Bell,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const id = localStorage.getItem("id");
  if (!token) return null;

  let role = "";

  try {
    const decoded = jwtDecode(token);
    const rawRole =
      decoded.role ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    role = Array.isArray(rawRole) ? rawRole[0] : rawRole;
    const id  = decoded.sub;
    console.log(id);
    console.log(role);
  } catch {
    localStorage.clear();
    return null;
  }

 const handleLogout = () => {
  localStorage.clear();
  navigate("/login", { replace: true });
};


  const adminMenuItems = [
    {
      group: "HỆ THỐNG",
      items: [
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/sendnoti", icon: Bell, label: "Thông báo" }
      ]
    },
    {
      group: "QUẢN LÝ",
      items: [
        { to: "/issue", icon: FilePlus, label: "Cấp văn bằng" },
        { to: "/copy", icon: CheckCircle2, label: "Cấp bản sao" },
        { to: "/revoke", icon: ShieldAlert, label: "Phụ lục" }
      ]
    },
    {
      group: "KHÁC",
      items: [
        { to: "/majors", icon: GraduationCap, label: "Ngành học" },
        { to: "/manager", icon: Users, label: "Quản lý tài khoản" }
      ]
    }
  ];

  const studentMenuItems =(id) => [
    {
      group: "CÁ NHÂN",
      items: [
        { to: `/infor?id=${id}`, icon: LayoutDashboard, label: "Trang cá nhân" },
        { to: "/request", icon: GraduationCap, label: "Bổ sung chứng chỉ" }
      ]
    }
  ];

  const menuItems = role === "Admin" 
    ? adminMenuItems 
    : studentMenuItems(id); // Truyền userId vào đây để lấy mảng

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40 shadow-sm">
      
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600 tracking-tight">
          VCertificate
        </h1>
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
          Blockchain System
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        {menuItems.map((group, idx) => (
          <div key={idx} className="mb-6">
            
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
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                      }`
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

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;