import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DynamicTable = ({
  columns,
  data,
  onRowClickPath,
  currentPage = 1,
  totalPages = 5,
  pageSize = 10,
  showActions = false,
  onApprove,
  onReject,
  onArchive,
  onUnarchive,
  onPageChange
}) => {
  const navigate = useNavigate();
  const [openMenuRow, setOpenMenuRow] = useState(null);
  const menuRef = useRef(null);

  const handleRowClick = (row) => {
    if (onRowClickPath) {
      const path = onRowClickPath(row);
      navigate(path);
    }
  };

  const handleChangePage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange?.(page, pageSize);
  };

  // Click ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuRow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full space-y-6">

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">

            {/* Header */}
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b">
                {columns.map((col, index) => (
                  <th key={index} className="px-6 py-4">
                    {col.header}
                  </th>
                ))}

                {showActions && (
                  <th className="px-6 py-4 text-center w-40">
                    Phê duyệt
                  </th>
                )}

                <th className="px-6 py-4 w-10 text-right"></th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y">
              {data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  onClick={() => handleRowClick(row)}
                  className="cursor-pointer hover:bg-slate-50 transition"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <span className="text-sm text-slate-700">
                          {row[col.key]}
                        </span>
                      )}
                    </td>
                  ))}

                  {showActions && (
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onApprove?.(row);
                          }}
                          className="px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                        >
                          Duyệt
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onReject?.(row);
                          }}
                          className="px-3 py-1 text-xs font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                        >
                          Hủy
                        </button>
                      </div>
                    </td>
                  )}

                  {/* 3 chấm menu */}
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuRow(
                          openMenuRow === rowIndex ? null : rowIndex
                        );
                      }}
                      className="p-1 hover:bg-slate-100 rounded-lg transition"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuRow === rowIndex && (
                      <div
                        ref={menuRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-6 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50 animate-fadeIn"
                      >
                        {row.isArchived ? (
                          <button
                            onClick={() => {
                              onUnarchive?.(row);
                              setOpenMenuRow(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition"
                          >
                            Bỏ lưu trữ
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onArchive?.(row);
                              setOpenMenuRow(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition"
                          >
                            Lưu trữ
                          </button>
                        )}
                      </div>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border shadow-sm">

          {/* Prev */}
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Pages */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handleChangePage(page)}
              className={`w-9 h-9 text-xs font-bold rounded-lg transition ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        <p className="text-xs text-slate-400">
          Trang {currentPage} / {totalPages}
        </p>
      </div>

    </div>
  );
};

export default DynamicTable;