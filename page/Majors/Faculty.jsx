import React, { useState, useEffect, useCallback } from "react";
import DynamicTable from "../../components/dynamicTable";
import { getFacultyId } from "../../services/facultyServices";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Faculty = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const datePart = isoString.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${month}-${day}-${year}`;
  };

  const getDtoList = (dataString) => {
    try {
      const parsed = JSON.parse(dataString);
      return parsed.dto || [];
    } catch (e) {
      return [];
    }
  };

  const getDocType = (tableValue) => {
    switch (tableValue) {
      case 0:
        return { label: "Diploma", color: "bg-blue-100 text-blue-700 border-blue-200" };
      case 1:
        return { label: "Amend", color: "bg-orange-100 text-orange-700 border-orange-200" };
      case 2:
        return { label: "Revoke", color: "bg-red-100 text-red-700 border-red-200" };
      default:
        return { label: "Unknown", color: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  const loadStudent = useCallback(async (facultyId, pageIndex, pageSize) => {
    if (!facultyId) return;
    setLoading(true);
    try {
      const res = await getFacultyId(facultyId, pageIndex, pageSize);
      const apiRes = res.data;
      if (apiRes?.items) {
        setData(apiRes.items);
        setTotalPages(apiRes.pageTotal || 1);
        setPage(apiRes.pageNumber || pageIndex);
      }
    } catch (err) {
      console.error("Lỗi load data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudent(id, 1, size);
  }, [id, loadStudent, size]);

  const handlePageChange = (pageIndex) => {
    loadStudent(id, pageIndex, size);
  };

  // Cấu hình các cột hiển thị
  const columns = [
    {
      header: "Số hiệu văn bằng",
      render: (row) => {
        const dtoList = getDtoList(row.data);
        return dtoList.map((item, idx) => <div key={idx} className="text-xs">{item.SerialNumber}</div>);
      },
    },
    {
      
      header: "Họ tên",
      render: (row) => {
        const dtoList = getDtoList(row.data);
        return (
          <div className="flex flex-col gap-1">
            {dtoList.map((item, idx) => (
              <span key={idx} className="font-semibold text-slate-800">{item.HolderName}</span>
            ))}
          </div>
        );
      },
    },
    {
      header: "Năm tốt nghiệp",
      render: (row) => {
        const dtoList = getDtoList(row.data);
        return dtoList.map((item, idx) => <div key={idx} className="text-xs">{item.GraduationYear}</div>);
      },
    },
    {
      header: "Xếp loại",
      render: (row) => {
        const dtoList = getDtoList(row.data);
        return dtoList.map((item, idx) => <div key={idx}>{item.GraduationRank}</div>);
      },
    },
    {
      header: "Loại hồ sơ",
      render: (row) => {
        const type = getDocType(row.table);
        return (
          <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${type.color}`}>
            {type.label}
          </span>
        );
      },
    },
    {
      header: "Ngày cấp",
      render: (row) => formatDate(row.timestamp),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-blue-900">Danh sách cấp phát</h3>
        <div className="flex gap-2">
           <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-48 bg-slate-50 border border-slate-200 text-xs rounded-xl py-2 pl-10 pr-4 outline-none focus:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 relative">
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
          onPageChange={handlePageChange}
          onRowClickPath={(row) =>`/infor?id=${row.id}`}
          // onRowClickPath={(row) =>`/`}
        />
      </div>
    </div>
  );
};

export default Faculty;