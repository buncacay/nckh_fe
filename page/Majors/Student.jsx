import React from 'react';
import DynamicTable from '../../components/dynamicTable'

import { Pencil, Mail, Phone, User, Globe, MapPin, Briefcase, GraduationCap, CreditCard } from 'lucide-react';

const Student = () => {
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" 
                alt="Avatar" 
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
              />
            </div>

            {/* Basic Name Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800">Hang Minh Nguyen</h1>
              <p className="text-blue-500 font-medium">UI - UX Designer <span className="text-slate-300 mx-2">|</span> <span className="text-slate-500">Product Department</span></p>
            </div>

            {/* Contact Grid Header */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-12 w-full md:w-auto">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Staff ID</p>
                <p className="text-sm font-semibold text-slate-700 uppercase">SJ53862</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Phone number</p>
                <p className="text-sm font-semibold text-slate-700">0913 854 235</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Staff Account</p>
                <p className="text-sm font-semibold text-slate-700">hangntm1</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Email</p>
                <p className="text-sm font-semibold text-slate-700">hangntm@sjlabel.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Personal information</h2>
            </div>

            <div className="grid grid-cols-2 gap-y-6 text-sm">
              <div>
                <p className="text-slate-400 mb-1">Gender</p>
                <p className="font-semibold">Female</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Date of birth</p>
                <p className="font-semibold">5th March, 1996</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Identify code</p>
                <p className="font-semibold">3234611342</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Hometown</p>
                <p className="font-semibold">Hai Duong city</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Nationality</p>
                <p className="font-semibold">Vietnam</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Religion</p>
                <p className="font-semibold">None</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 mb-1">Language</p>
                <p className="font-semibold">Vietnamese, English</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">Marial status</p>
                <p className="font-semibold">Single</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 mb-1">Permanent address</p>
                <p className="font-semibold">5. Nguyen Chi Thanh Street, Tan Binh Ward, Hai Duong</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 mb-1">Current address</p>
                <p className="font-semibold">29. Nguyen Ngoc Doan Street, Dong Da District, Ha Noi</p>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Account */}
          <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <DynamicTable 
                        columns={currentColumns} // Bạn truyền columns tương ứng với loại sổ đang xử lý
                        data={recentActivities} 
                        onRowClickPath={(row) => `/student`} 
                    />
              </div>
          

          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;