import React from 'react';
import DynamicTable from '../../components/dynamicTable'
import AddNoti from '../Settings/AddNoti';
import { Clock, CheckCircle, ShieldAlert, ExternalLink, MoreVertical, LayoutDashboard, Download, Search, Plus } from 'lucide-react';

const SendNoti = () => { 
  const [isModalOpen, setIsModalOpen] = React.useState(false)
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
          Quản lý thông báo
        </h3>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* 1. Ô Tìm kiếm */}
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

          {/* 2. Nút Thêm thông báo */}
          <button 
            onClick={() => setIsModalOpen(true)} // Mở modal ở đây
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
            >
            <Plus size={18} strokeWidth={3} />
            <span className="hidden sm:inline">Thêm thông báo</span>
            </button>
        </div>
      </div>
        
      <DynamicTable 
        columns={currentColumns} 
        data={recentActivities} 
        //  onRowClickPath={(row) => `/addnoti`} 
      />

      <AddNoti 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>
    </div>
    
  );
}

export default SendNoti;