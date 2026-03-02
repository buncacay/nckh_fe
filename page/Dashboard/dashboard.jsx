import React, { useState, useEffect, useCallback } from "react";
import DynamicTable from "../../components/dynamicTable";
import { useNavigate } from "react-router-dom";
import * as logs from "../../services/logServices";
import {
  LayoutDashboard,
  FileSearch,
  Clock,
  User,
  Fingerprint,
  Download,
  Search 
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [size] = useState(5); // có thể đổi thành setSize nếu muốn dynamic
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = "";
  const filter = "";
  const sort = "newest";

  /* ================= LOAD DATA ================= */
  const loadLogs = useCallback(
    async (pageIndex, pageSize) => {
      setLoading(true);

      try {
        const res = await logs.getLogs(
          pageIndex,
          pageSize,
          search,
          filter,
          sort
        );

        const apiResponse = res.data;

        if (apiResponse && apiResponse.items) {
          setData(apiResponse.items);
          setTotalPages(apiResponse.pageTotal || 1);
          setPage(apiResponse.pageNumber || pageIndex);
        }
      } catch (error) {
        console.error("Lỗi API:", error);
      } finally {
        setLoading(false);
      }
    },
    [search, filter, sort]
  );

  useEffect(() => {
    loadLogs(1, size);
  }, [loadLogs, size]);

  const parseDto = (dtoData) => {
    if (!dtoData) return null;
    try {
      const parsed =
        typeof dtoData === "string" ? JSON.parse(dtoData) : dtoData;

      return Array.isArray(parsed)
        ? parsed[0]
        : parsed?.dto
        ? parsed.dto[0]
        : parsed;
    } catch {
      return null;
    }
  };

  
  const columns = [
    {
      header: "Blockchain & Thời gian",
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-blue-600 font-mono text-[11px]">
            <Fingerprint size={12} />
            <span>
              {row.issuer
                ? `${row.issuer.substring(0, 6)}...${row.issuer.slice(-4)}`
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
            <Clock size={12} />
            <span>
              {row.timestamp
                ? new Date(row.timestamp * 1000).toLocaleString("vi-VN")
                : "N/A"}
            </span>
          </div>
        </div>
      )
    },
    {
      header: "Người được cấp",
      render: (row) => {
        const parsedDetail = parseDto(row.data);

        return (
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 rounded-full text-blue-500">
              <User size={14} />
            </div>
            <div>
              <div className="font-bold text-slate-700 text-sm">
                {parsedDetail?.HolderName || "N/A"}
              </div>
              <div className="text-[11px] text-slate-400">
                CCCD: {parsedDetail?.CitizenId || "---"}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: "Số hiệu (Serial)",
      render: (row) => {
        const parsedDetail = parseDto(row.data);

        return (
          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-100 font-mono text-[10px] font-bold">
            {parsedDetail?.SerialNumber || "N/A"}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6 font-sans bg-[#f8fafc] min-h-screen p-6">
      
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <div className="p-3 bg-blue-600 text-white rounded-xl">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Hệ thống quản lý văn bằng
            </h2>
            <p className="text-slate-400 text-sm">
              Báo cáo Blockchain thời gian thực
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/approval")}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl font-bold"
          >
            <FileSearch size={18} />
            Xử lý văn bằng
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
            <Download size={18} />
            Báo cáo
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold text-blue-900">
            Thông tin chi tiết
          </h3>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-2 border rounded-xl text-sm"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="p-6 pt-4 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          <DynamicTable
            columns={columns}
            data={data}
            currentPage={page}
            totalPages={totalPages}
            pageSize={size}
            onPageChange={loadLogs} // 👈 nhận (page, size)
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;