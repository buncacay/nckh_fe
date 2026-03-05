import React, { useState, useEffect } from 'react'; // Thêm useState
import DynamicTable from '../../components/dynamicTable';
import { jwtDecode } from "jwt-decode";
import { getInfor } from "../../services/authServices";
import { LayoutDashboard, GraduationCap, Award, FileText } from 'lucide-react';

const Infor = () => {
  const [records, setRecords] = useState([]); // State lưu danh sách gộp
  const [loading, setLoading] = useState(true);

  // 1. Định nghĩa cột cho DynamicTable dựa trên StudentInfor (Backend)
  const columns = [
    {
      header: "Loại hồ sơ",
      accessor: "recordType",
      render: (value) => {
        const colors = {
          "DiplomaTable": "bg-blue-100 text-blue-700",
          "CopyTable": "bg-green-100 text-green-700",
          "AmendmentTable": "bg-amber-100 text-amber-700"
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors[value] || "bg-slate-100"}`}>
            {value === "DiplomaTable" ? "BẰNG GỐC" : value === "CopyTable" ? "BẢN SAO" : "PHỤ LỤC"}
          </span>
        );
      }
    },
    { header: "Số hiệu/Số máy", accessor: "serialNumber" },
    { header: "Ngành học", accessor: "major" },
    { header: "Xếp loại", accessor: "graduationRank" },
    { 
      header: "Ngày cấp", 
      accessor: "date",
      render: (value) => new Date(value * 1000).toLocaleDateString('vi-VN') 
    },
    { header: "Ghi chú", accessor: "description" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const userId = decoded.nameid || decoded.sub;

          // Gọi API (Giả sử getInfor trả về Promise từ axios/fetch)
          const response = await getInfor(userId); 
          setRecords(response.data || response); // Cập nhật state
        } catch (error) {
          console.error("Lỗi lấy dữ liệu:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Card (Giữ nguyên phần UI của bạn, có thể thay bằng dữ liệu từ records[0] nếu cần) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Avatar" className="w-24 h-24 rounded-full border-4 border-orange-100" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800 uppercase">Thông tin cá nhân</h1>
              <p className="text-blue-500 font-medium">Sinh viên / Cựu sinh viên</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm border-l pl-8">
               <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase">Tổng số văn bằng</p>
                  <p className="text-lg font-bold">{records.filter(r => r.recordType === "DiplomaTable").length}</p>
               </div>
               <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase">Bản sao đã cấp</p>
                  <p className="text-lg font-bold text-green-600">{records.filter(r => r.recordType === "CopyTable").length}</p>
               </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Cột trái: Thông tin cá nhân (Bạn có thể map dữ liệu từ User API vào đây) */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-fit">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Lịch sử hoạt động</h2>
            <div className="space-y-4">
               {/* Ví dụ về thống kê nhanh */}
               <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className="p-2 bg-blue-500 text-white rounded-lg"><GraduationCap size={20}/></div>
                  <div>
                    <p className="text-xs text-slate-500">Ngành học chính</p>
                    <p className="text-sm font-bold">{records[0]?.major || "N/A"}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Cột phải: Bảng danh sách gộp */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                  <FileText size={18} className="text-blue-600"/> 
                  Danh sách Văn bằng & Chứng chỉ
                </h3>
              </div>
              
              {loading ? (
                <div className="p-10 text-center text-slate-400">Đang tải dữ liệu...</div>
              ) : (
                <DynamicTable 
                  columns={columns} 
                  data={records} 
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Infor;