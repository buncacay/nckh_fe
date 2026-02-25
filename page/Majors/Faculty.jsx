import React from 'react';
import DynamicTable from '../../components/dynamicTable'
import { ArrowUpDown, Filter, ShieldAlert, ExternalLink, MoreVertical, LayoutDashboard, Download, Search } from 'lucide-react';



const Faculty = () => { 
 
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
   <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
  <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
    <h3 className="text-lg font-bold text-blue-900 uppercase tracking-tight shrink-0">
      Thông tin sinh viên
    </h3>

    <div className="flex flex-wrap items-center gap-3 w-full justify-end">
      {/* 1. Ô Tìm kiếm */}
      <div className="relative group flex-1 md:flex-none">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <Search size={16} strokeWidth={2.5} />
        </span>
        <input
          type="text"
          placeholder="Tìm tên, ID..."
          className="w-full md:w-56 bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
        />
      </div>

      {/* 2. Bộ lọc (Filter) */}
      <div className="relative flex items-center gap-2">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:border-blue-400 transition-all">
          <Filter size={14} className="text-slate-500" />
          <select className="bg-transparent text-xs text-slate-700 outline-none cursor-pointer pl-2 pr-1 font-medium">
            <option value="">Trạng thái</option>
            <option value="it">Đã tốt nghiệp</option>
            <option value="biz">Chưa tốt nghiệp</option>
          </select>
        </div>
      </div>

      {/* 3. Sắp xếp (Sort) */}
      <div className="relative flex items-center gap-2">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:border-blue-400 transition-all">
          <ArrowUpDown size={14} className="text-slate-500" />
          <select className="bg-transparent text-xs text-slate-700 outline-none cursor-pointer pl-2 pr-1 font-medium">
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>
        </div>
      </div>

        
   
  </div>
   </div>
     <DynamicTable 
        columns={currentColumns} // Bạn truyền columns tương ứng với loại sổ đang xử lý
        data={recentActivities} 
        onRowClickPath={(row) => `/student`} 
      />
</div>
        
    

  );
}


export default Faculty;