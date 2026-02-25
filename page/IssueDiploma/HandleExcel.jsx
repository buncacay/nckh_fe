import React, { useState, useRef } from "react";
import { 
  CloudUpload, Database, ShieldCheck, FileSpreadsheet, 
  X, ArrowLeft, ArrowRight, CheckCircle2, Download 
} from "lucide-react";
import { useExcel } from "../../hooks/useExcel";

// Component con hiển thị từng bước trên thanh tiến trình
const StepItem = ({ step, active, label, icon }) => (
  <div className={`flex items-center gap-3 z-10 ${active ? 'opacity-100' : 'opacity-40'}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md transition-all duration-500 ${active ? 'bg-blue-600 text-white scale-110 shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}>
      {icon}
    </div>
    <div className="hidden md:block text-left">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bước {step}</p>
      <p className={`text-sm font-bold ${active ? 'text-blue-900' : 'text-slate-400'}`}>{label}</p>
    </div>
  </div>
);

const HandleExcel = ({ title = "Xử lý danh sách từ Excel", submitApiFn }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  // Khởi tạo hook useExcel
  const { 
    dataList, 
    handleSetDataList, 
    isSubmitting, 
    handleSubmit,
    setFormData // Dùng để lưu tên file hoặc thông tin phụ
  } = useExcel({}, submitApiFn);

  const [fileName, setFileName] = useState("");

  // Giả lập đọc file Excel (Bạn có thể dùng thư viện 'xlsx' ở đây)
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // Giả lập dữ liệu sau khi parse Excel
      const mockData = [
        { id: 1, name: "Nguyễn Văn A", major: "Công nghệ thông tin", status: "Hợp lệ" },
        { id: 2, name: "Trần Thị B", major: "Kỹ thuật phần mềm", status: "Hợp lệ" },
        { id: 3, name: "Lê Văn C", major: "Hệ thống thông tin", status: "Hợp lệ" },
      ];
      handleSetDataList(mockData);
      setTimeout(() => setCurrentStep(2), 600);
    }
  };

  // Hàm xử lý cuối cùng khi bấm submit
  const handleFinalProcess = async () => {
    // Gửi dataList (danh sách từ Excel) qua API
    const response = await handleSubmit(dataList); 
    
    if (response.success) {
      setCurrentStep(3);
    } else {
      alert("Đã xảy ra lỗi trong quá trình ghi dữ liệu vào Blockchain.");
    }
  };

  return (
    <div className="space-y-6 font-sans antialiased text-slate-600 bg-[#f8fafc] min-h-screen pb-10 p-6">
      
      {/* 1. THANH TIẾN TRÌNH (STEPPER) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-5xl mx-auto">
        <div className="max-w-4xl mx-auto flex items-center justify-between relative">
          <StepItem step={1} active={currentStep >= 1} label="Tải lên" icon={<CloudUpload size={18}/>} />
          <div className={`flex-1 h-1 mx-4 rounded ${currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-100'}`} />
          <StepItem step={2} active={currentStep >= 2} label="Kiểm tra" icon={<Database size={18}/>} />
          <div className={`flex-1 h-1 mx-4 rounded ${currentStep >= 3 ? 'bg-blue-600' : 'bg-slate-100'}`} />
          <StepItem step={3} active={currentStep >= 3} label="Hoàn tất" icon={<ShieldCheck size={18}/>} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* BƯỚC 1: CHỌN FILE */}
        {currentStep === 1 && (
          <div className="bg-white p-16 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-6 hover:border-blue-400 transition-all group">
            <div className="p-6 bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
              <CloudUpload size={64} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
              <p className="text-slate-400 max-w-sm mt-2">Kéo thả file Excel vào đây hoặc sử dụng nút bên dưới để chọn file từ thiết bị.</p>
            </div>
            <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept=".xlsx, .xls" />
            <div className="flex gap-3">
              <button 
                onClick={() => fileInputRef.current.click()}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Chọn tệp Excel
              </button>
              <button className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all" title="Tải file mẫu">
                <Download size={20} />
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 2: XEM TRƯỚC VÀ XÁC NHẬN */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-lg font-bold text-blue-900 uppercase tracking-tight">Kiểm tra dữ liệu trích xuất</h3>
                  <p className="text-xs text-slate-500 italic mt-1 font-medium">Tìm thấy {dataList.length} bản ghi hợp lệ từ file</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  <FileSpreadsheet size={16} className="text-green-600" />
                  <span className="text-xs font-bold text-slate-600">{fileName}</span>
                  <button onClick={() => setCurrentStep(1)} className="text-slate-400 hover:text-red-500 transition-colors"><X size={14}/></button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/30">
                      <th className="px-8 py-4">STT</th>
                      <th className="px-8 py-4">Họ và tên</th>
                      <th className="px-8 py-4">Chương trình đào tạo</th>
                      <th className="px-8 py-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {dataList.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50/10"}>
                        <td className="px-8 py-4 text-sm text-slate-400">#{row.id}</td>
                        <td className="px-8 py-4 text-sm font-bold text-slate-700">{row.name}</td>
                        <td className="px-8 py-4 text-sm text-slate-500">{row.major}</td>
                        <td className="px-8 py-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-md border border-green-100">
                            <CheckCircle2 size={12}/> {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
               <button onClick={() => setCurrentStep(1)} className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors">
                  <ArrowLeft size={18}/> Quay lại
               </button>
               <button 
                onClick={handleFinalProcess}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-10 py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
                  isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                }`}
               >
                 {isSubmitting ? (
                   <div className="flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Đang xử lý...
                   </div>
                 ) : (
                   <><CheckCircle2 size={18}/> Xác nhận & Cấp văn bằng</>
                 )}
               </button>
            </div>
          </div>
        )}

        {/* BƯỚC 3: HOÀN TẤT */}
        {currentStep === 3 && (
          <div className="bg-white p-16 rounded-3xl border border-slate-200 shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck size={56} strokeWidth={2.5}/>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center border-4 border-white animate-bounce">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Xử lý Blockchain thành công!</h2>
              <p className="text-slate-500 mt-3 max-w-md mx-auto font-medium">
                Toàn bộ danh sách sinh viên đã được mã hóa và ghi vào mạng lưới Blockchain của hệ thống.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
              >
                Tiếp tục quy trình mới
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all">
                Xem lịch sử giao dịch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleExcel;