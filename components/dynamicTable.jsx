import React from 'react';
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DynamicTable = ({ columns, data, onRowClickPath, currentPage = 1, totalPages = 5 }) => {
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if (onRowClickPath) {
      const path = onRowClickPath(row);
      navigate(path);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
                {columns.map((col, index) => (
                  <th 
                    key={index} 
                    className="px-6 py-4"
                    style={{ width: col.width || 'auto' }} // Cho phép chỉnh độ rộng linh hoạt
                  >
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-4 w-10 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  onClick={() => handleRowClick(row)}
                  className="transition-all duration-200 group cursor-pointer hover:bg-slate-50"
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {col.render ? (
                        col.render(row)
                      ) : (
                        <span className="text-sm font-medium text-slate-700 transition-colors">
                          {row[col.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => e.stopPropagation()} 
                      className="text-slate-300 hover:text-slate-600 transition-colors p-1"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Center */}
      <div className="flex flex-col items-center gap-4 py-2">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          {/* Nút Prev */}
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-30">
            <ChevronLeft size={18} />
          </button>

          {/* Các số trang */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-9 h-9 text-xs font-bold rounded-lg transition-all ${
                  page === currentPage 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Nút Next */}
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Thông tin số trang nhỏ bên dưới (Optional) */}
        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          Trang {currentPage} trên {totalPages}
        </p>
      </div>
    </div>
  );
};

export default DynamicTable;