import React, { useState, useEffect, useCallback } from "react";
import DynamicTable from "../../components/dynamicTable";
import { useNavigate } from "react-router-dom";
import * as logs from "../../services/logServices";
import {
  LayoutDashboard,
  FileSearch,
  Clock,
  Fingerprint,
  Download,
  Search,
  Database,
  UserCheck,
  ChevronRight
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 
  const parseDtoList = (rawData) => {
    if (!rawData) return [];
    try {
      const parsed = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
      
      if (parsed && Array.isArray(parsed.dto)) {
        return parsed.dto;
      }
      return [];
    } catch (error) {
      console.error("Lỗi parse dữ liệu:", error);
      return [];
    }
  };

  const loadLogs = useCallback(
    async (pageIndex, pageSize) => {
      setLoading(true);
      try {
        const res = await logs.getLogs(pageIndex, pageSize, searchTerm, "", "newest");
        const apiResponse = res.data;

        if (apiResponse && apiResponse.items) {
       
        const uniqueItems = [];
        const seenTargetIds = new Set();

        apiResponse.items.forEach((item) => {
          if (!seenTargetIds.has(item.targetId)) {
            seenTargetIds.add(item.targetId);
            uniqueItems.push(item);
          }
        });

        setData(uniqueItems); 
        setTotalPages(apiResponse.pageTotal || 1);
        setPage(apiResponse.pageNumber || pageIndex);
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    loadLogs(1, size);
  }, [loadLogs, size]);

  // ĐỊNH NGHĨA CÁC CỘT HIỂN THỊ
  const columns = [
    {
      header: "Giao dịch & Thời gian",
      render: (row) => (
        <div className="space-y-1.5 min-w-[150px]">
          <div className="flex items-center gap-2 text-blue-600 font-mono text-[11px] bg-blue-50 px-2 py-1 rounded-md border border-blue-100 w-fit">
            <Fingerprint size={12} />
            <span className="font-bold">
              {row.issuer ? `${row.issuer.substring(0, 6)}...${row.issuer.slice(-4)}` : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] pl-1">
            <Clock size={12} />
            <span>{new Date(row.timestamp).toLocaleString("vi-VN")}</span>
          </div>
          {row.isOnChain && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">
              BLOCKCHAIN VERIFIED
            </span>
          )}
        </div>
      )
    },
    {
      header: "Chi tiết văn bằng trong lô (DTO)",
      render: (row) => {
        const pDtoList = parseDtoList(row.data);

        if (pDtoList.length === 0) {
          return <span className="text-slate-400 italic text-xs">Không có dữ liệu văn bằng</span>;
        }

        return (
          <div className="space-y-3 py-2 min-w-[400px]">
            {pDtoList.map((person, index) => (
              <div 
                key={index} 
                onClick={() => navigate("/revoke", { 
                  state: { 
                    fullData: row,         
                    selectedIndex: index,   
                    selectedPerson: person  
                  } 
                })}
                className="group p-3 bg-white border border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer relative overflow-hidden"
                
              >
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-800 text-white rounded-lg flex items-center justify-center text-[10px] font-bold">
                      {index + 1}
                    </div>
                    <span className="font-extrabold text-slate-700 text-sm uppercase tracking-tight">
                      {person.HolderName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">
                    <ChevronRight size={10} />
                    {person.SerialNumber}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
                  {Object.entries(person).map(([key, value]) => {
                    const hiddenFields = ["HolderName", "SerialNumber", "DocumentHash", "Id" , "IsValid", "AmendmentCount", "ArweaveId", "RecipientSignatureName", "IssueTimestamp"];
                    if (hiddenFields.includes(key)) return null;

                    return (
                      <div key={key} className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-slate-400 leading-none mb-1">
                          {key}
                        </span>
                        <span className="text-[11px] text-slate-600 font-medium truncate" title={String(value)}>
                          {String(value) || "---"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );
      }
    },
   
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100">
              <LayoutDashboard size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
                Hệ thống quản lý văn bằng
              </h1>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Dữ liệu Ledger phân tán thực tế
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate("/approval")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-bold transition-transform active:scale-95 shadow-lg shadow-amber-100"
            >
              <FileSearch size={20} />
              Xử lý đơn
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:border-blue-300 transition-all shadow-sm">
              <Download size={20} />
              Báo cáo
            </button>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <Database size={20} className="text-blue-600" />
              <span>NHẬT KÝ TRUY XUẤT NGUỒN GỐC</span>
            </div>

            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên, CCCD, Serial..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadLogs(1, size)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Đang đồng bộ...</span>
              </div>
            )}

            <DynamicTable
              columns={columns}
              data={data}
              currentPage={page}
              totalPages={totalPages}
              pageSize={size}
              onPageChange={(p) => loadLogs(p, size)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;