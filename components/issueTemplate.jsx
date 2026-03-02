import React, { useRef } from "react";
import { ShieldCheck, Send, FileUp, Download, Award, Calendar } from "lucide-react";
import { useExcel } from "../hooks/useExcel";
import { useNavigate } from "react-router-dom";

const IssueTemplate = ({ title, subTitle, initialState, fields, onSubmitApi }) => {
  const { formData, isSubmitting, handleChange, handleExcelImport, handleSubmit } = 
    useExcel(initialState, onSubmitApi);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  return (
    <div className="space-y-6 font-sans antialiased text-slate-600 bg-[#f8fafc] min-h-screen pb-10">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h2>
            <p className="text-slate-400 text-sm font-medium">{subTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input type="file" ref={fileInputRef} onChange={handleExcelImport} className="hidden" accept=".xlsx, .xls" />
          <button 
           type="button"
           onClick={() => navigate("/process")} // 3. Chuyển hướng khi click
           className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 hover:border-blue-300 transition-all shadow-sm active:scale-95"
           >
            <FileUp size={18} className="text-blue-600" />
            Nhập file Excel
          </button>
          
        </div>
      </div>

      <form
  onSubmit={(e) => {
    e.preventDefault();   // CHẶN RELOAD TRANG
    handleSubmit(e);     // Gọi lại hàm submit của bạn
  }}
  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
>
        {/* CỘT TRÁI & GIỮA: RENDER CÁC NHÓM TRƯỜNG DỮ LIỆU */}
        <div className="lg:col-span-2 space-y-6">
          {fields.map((group, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-blue-900 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                {group.icon} {group.groupTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.items.map((field) => (
                  <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">{field.label}</label>
                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        rows="3"
                        placeholder={field.placeholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-700 outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CỘT PHẢI: THIẾT LẬP CỐ ĐỊNH */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-blue-900 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <Calendar size={16} /> Thiết lập cấp phát
            </h3>
            
            <button type="submit" disabled={isSubmitting} className={`w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${isSubmitting ? "bg-slate-100 text-slate-400" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"}`}>
              {isSubmitting ? <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></div> : <><Send size={18} /> Cấp & Ghi Blockchain</>}
            </button>
          </div>
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex gap-3">
             <Award className="text-blue-600 shrink-0" />
             <p className="text-[12px] text-blue-800 leading-relaxed font-medium">Dữ liệu sau khi xác nhận sẽ được mã hóa và gửi lên mạng lưới Blockchain. <strong className="block mt-1">Lưu ý: Thao tác này không thể hoàn tác.</strong></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IssueTemplate;