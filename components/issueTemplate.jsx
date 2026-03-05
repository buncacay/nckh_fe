import React, { useState, useEffect } from "react";
import { ShieldCheck, Send, FileUp, Calendar } from "lucide-react";
import { useExcel } from "../hooks/useExcel";
import * as facultyService from "../services/facultyServices";
import { useNavigate } from "react-router-dom";

const IssueTemplate = ({ title, subTitle, initialState, fields, onSubmitApi, processType = "diploma", type="0" }) => {
  const { formData, isSubmitting, handleChange, handleSubmit } =
    useExcel(initialState, onSubmitApi);

  

  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();
  const search='';
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await facultyService.getFaculty(1, 100, search);

        const data = res?.data?.items || res?.data || res;
        console.log(data);
        setFaculties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lỗi lấy danh sách ngành:", error);
        setFaculties([]);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <div className="space-y-6 font-sans text-slate-600 bg-[#f8fafc] min-h-screen pb-10">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              {subTitle}
            </p>
          </div>
        </div>

      <button
        type="button"
        onClick={() =>
          navigate("/process", {
            state: { processType, type }
          })
        }
        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:border-blue-300 transition-all shadow-sm"
      >
        <FileUp size={18} className="text-blue-600" />
        Nhập Excel
      </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {fields.map((group, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-blue-900 font-bold uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
                {group.icon}
                {group.groupTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.items.map((field) => (
                  <div
                    key={field.name}
                    className={field.fullWidth ? "md:col-span-2" : ""}
                  >
                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                      {field.label}
                    </label>

                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
                      >
                        <option value="">
                          {field.placeholder || "-- Chọn --"}
                        </option>

                        {field.name === "major"
                          ? faculties.map((f) => (
                              <option key={f.id} value={f.name}>
                                {f.name}
                              </option>
                            ))
                          : field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name] || ""}
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

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
            <h3 className="text-blue-900 font-bold uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
              <Calendar size={16} />
              Thiết lập
            </h3>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
                isSubmitting
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Send size={18} />
              {isSubmitting ? "Đang xử lý..." : "Gửi dữ liệu"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IssueTemplate;