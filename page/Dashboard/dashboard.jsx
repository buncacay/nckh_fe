import React from 'react';
import DynamicTable from '../../components/dynamicTable'
import { Clock, CheckCircle, ShieldAlert, ExternalLink, MoreVertical, LayoutDashboard, Download, Search } from 'lucide-react';

const Dashboard = () => {
  const recentActivities = [
    { id: 1, signerName: "Alice Johnson", copyIssueDate: "20/02/2026", holderName: "Nguyen Van A", diplomaSerial: "B123456", copyQuantity: 2 },
    { id: 2, signerName: "Robert Chen", copyIssueDate: "19/02/2026", holderName: "Tran Thi B", diplomaSerial: "C789012", copyQuantity: 1 },
    // ... dữ liệu khác của bạn
  ];

  const currentColumns = [
    { 
      header: "Người ký & Ngày cấp", 
      render: (row) => (
        <div>
          <div className="font-bold text-slate-700 text-sm">{row.signerName}</div>
          <div className="text-[11px] text-slate-400 italic">{row.copyIssueDate}</div>
        </div>
      )
    },
    { header: "Người được cấp", key: "holderName" },
    { header: "Số hiệu bằng", key: "diplomaSerial" },
    { 
      header: "Số lượng", 
      render: (row) => (
        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100">
          {row.copyQuantity} bản
        </span>
      )
    }
  ];
  return (
    <div className="space-y-6 font-sans antialiased text-slate-600 bg-[#f8fafc] min-h-screen">
      
      {/* 1. Header Card với Nút Xuất Báo Cáo */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Hệ thống quản lý văn bằng</h2>
            <p className="text-slate-400 text-sm font-medium">Báo cáo tình trạng Blockchain thời gian thực</p>
          </div>
        </div>

        {/* Nút Xuất Báo Cáo Xanh Đậm */}
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-blue-100 active:scale-95">
          <Download size={18} />
          Xuất báo cáo
        </button>
      </div>

    

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h3 className="text-lg font-bold text-blue-900 uppercase tracking-tight">Hoạt động cấp bằng gần đây</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
      {/* Ô Tìm kiếm mới thêm vào */}
          <div className="relative group flex-1 sm:flex-none">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
              <Search size={16} strokeWidth={2.5} />
            </span>
            <input
              type="text"
              placeholder="Tìm tên, ID..."
              className="w-full sm:w-64 bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
            />
          </div>

          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap">
            Chi tiết →
          </button>
    </div>
        </div>
        
      <DynamicTable 
        columns={currentColumns} // Bạn truyền columns tương ứng với loại sổ đang xử lý
        data={recentActivities} 
      />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all group">
    <div className="flex justify-between items-start">
      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <div className="text-right italic text-[10px] text-blue-600 font-bold cursor-pointer hover:underline">
        Chi tiết →
      </div>
    </div>
    <div className="mt-4">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <h4 className="text-4xl font-black text-slate-800 tracking-tighter">{value}</h4>
    </div>
    <p className="mt-2 text-[11px] text-slate-400 font-medium italic">{subtitle}</p>
  </div>
);

export default Dashboard;