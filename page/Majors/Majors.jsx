import React, { useEffect, useState, useCallback } from "react";
import DynamicTable from "../../components/dynamicTable";
import { Search, Plus } from "lucide-react";
import { getFaculty } from "../../services/facultyServices";
import { useNavigate } from "react-router-dom";

const Majors = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const loadFaculty = useCallback(
    async (pageIndex, pageSize, searchValue = search) => {
      setLoading(true);
      try {
        const res = await getFaculty(pageIndex, pageSize, searchValue);
        const apiResponse = res.data;

        if (apiResponse?.items) {
          setData(apiResponse.items);
          setTotalPages(apiResponse.pageTotal || 1);
          setPage(apiResponse.pageNumber || pageIndex);
        }
      } catch (err) {
        console.error("Lỗi load faculty:", err);
      } finally {
        setLoading(false);
      }
    },
    [search]
  );

  useEffect(() => {
    loadFaculty(1, size);
  }, [loadFaculty, size]);


  const handleSearch = () => {
    setPage(1);
    loadFaculty(1, size, search);
  };


  const columns = [
    {
      header: "ID",
      render: (row) => (
        <span className="text-xs font-mono text-slate-500">
          {row.id?.substring(0, 8)}...
        </span>
      ),
    },
    {
      header: "Tên ngành",
      render: (row) => (
        <span className="font-medium text-slate-700">
          {row.name}
        </span>
      ),
    },
    {
      header: "Mã tìm kiếm",
      render: (row) => (
        <span className="text-blue-600 font-semibold">
          {row.searchCode || "---"}
        </span>
      ),
    },
    {
      header: "Số văn bằng",
      render: (row) => (
        <span className="text-sm font-semibold text-slate-700">
          {row.count ?? 0}
        </span>
      ),
    },
    {
      header: "Trạng thái",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            row.state
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.state ? "Đang hoạt động" : "Ngừng hoạt động"}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="text-lg font-bold text-blue-900 uppercase tracking-tight">
          Thông tin về các khoa / ngành
        </h3>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search onClick={handleSearch} size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Tìm tên, mã..."
              className="w-64 bg-slate-50 border border-slate-200 text-xs rounded-xl py-2 pl-10 pr-4 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
            />
          </div>
 
          

          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-md active:scale-95">
            <Plus size={16} />
            Thêm ngành
          </button>
        </div>
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <DynamicTable
          columns={columns}
          data={data}
          currentPage={page}
          totalPages={totalPages}
          pageSize={size}
          onPageChange={(p) => loadFaculty(p, size, search)}
          onRowClickPath={(row) => `/faculty?id=${row.id}`}
        />
      </div>
    </div>
  );
};

export default Majors;