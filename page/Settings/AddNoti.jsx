import React from 'react';
import { X, Calendar, Clock, Users, Search, Upload, Send } from 'lucide-react';

const AddNoti = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop mỏng hơn */}
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" onClick={onClose}></div>

      {/* Modal Content - Thu nhỏ max-width từ xl xuống lg/md */}
      <div className="relative bg-white w-full max-w-lg rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header - Giảm padding */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-base font-bold text-blue-900 uppercase tracking-tight">Tạo thông báo</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={18} />
          </button>
        </div>

        {/* Form Body - Giảm khoảng cách giữa các phần */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase ml-1">Tiêu đề</label>
            <input 
              type="text" 
              placeholder="Nhập tiêu đề..."
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition-all text-xs"
            />
          </div>

          {/* Occurrence & Time - Gộp lại gọn hơn */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase ml-1">Tần suất</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <select className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition-all text-xs appearance-none cursor-pointer">
                  <option>Một lần</option>
                  <option>Hàng tuần</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase ml-1">Thời gian</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <select className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition-all text-xs appearance-none cursor-pointer">
                  <option>Gửi ngay</option>
                  <option>Hẹn giờ</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recipients */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase ml-1">Người nhận</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <select className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition-all text-xs appearance-none cursor-pointer">
                <option>Selected users</option>
                <option>All Students</option>
              </select>
            </div>
          </div>

          {/* Search & Upload - Tối ưu diện tích */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Tìm tên..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition-all text-xs"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-slate-300 text-slate-500 rounded-xl hover:bg-slate-50 transition-all text-[11px] font-bold shrink-0">
              <Upload size={14} />
              Tải tệp
            </button>
          </div>

          {/* Message Area */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase ml-1">Nội dung</label>
            <textarea 
              rows="3"
              placeholder="Nội dung thông báo..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-400 transition-all text-xs resize-none"
            ></textarea>
          </div>
        </div>

        {/* Footer - Gọn gàng hơn */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Hủy
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-xs font-bold shadow-md shadow-blue-100 transition-all active:scale-95">
            <Send size={14} />
            Gửi ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoti;