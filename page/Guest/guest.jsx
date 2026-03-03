import React, { useState, useCallback } from "react";
import * as logs from "../../services/logServices";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, BookOpen, Award, ShieldCheck, Hash, MapPin, LogIn } from "lucide-react";

const Guest = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const parseDtoList = (rawData) => {
    if (!rawData) return [];
    try {
      const parsed = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
      return parsed?.dto || [];
    } catch { return []; }
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await logs.getLogs(1, 50, "", "", "newest");
      const apiResponse = res.data;

      if (apiResponse?.items) {
        let allDtos = [];
        apiResponse.items.forEach((log) => {
          const dtoList = parseDtoList(log.data);
          dtoList.forEach((dto) => {
            allDtos.push({
              ...dto,
              issuer: log.issuer,
              timestamp: log.timestamp,
              isOnChain: log.isOnChain,
            });
          });
        });

        const filtered = allDtos.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(query.toLowerCase())
        );
        setData(filtered);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
              <ShieldCheck size={20} />
            </div>
            <span className="font-bold text-slate-800 tracking-tight">VCertificate</span>
          </div>
          
          <button 
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <LogIn size={18} />
            Đăng nhập
          </button>
        </div>
      </nav>

      {/* HERO SECTION - XANH NHẠT */}
      <div className="bg-gradient-to-b from-blue-50 to-transparent pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Hệ thống tra cứu <span className="text-blue-500">Văn bằng</span>
          </h1>
          <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">
            Minh bạch thông tin giáo dục thông qua công nghệ lưu trữ tập trung và xác thực số.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
              <div className="pl-4 text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Nhập tên, CMND hoặc chuyên ngành..."
                className="flex-grow outline-none text-slate-700 px-4 py-3 bg-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-sm shadow-blue-200"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RESULT SECTION */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center pt-10">
            <div className="w-10 h-10 border-[3px] border-blue-100 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-sm italic">Đang tải dữ liệu từ hệ thống...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
             <div className="text-slate-200 mb-2 flex justify-center"><Search size={40} /></div>
             <p className="text-slate-400 font-medium">Kết quả tìm kiếm sẽ hiển thị tại đây</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <p className="text-slate-500 text-sm font-medium">Đã tìm thấy {data.length} văn bằng hợp lệ</p>
            </div>

            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-200 transition-all shadow-sm relative group"
              >
                {/* On-chain Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-bold">
                   <ShieldCheck size={12} /> SECURED
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar Section */}
                  <div className="flex-shrink-0 w-full md:w-32 flex flex-col items-center justify-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 mb-2">
                      <User size={28} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider">HOLDER</span>
                  </div>

                  {/* Info Section */}
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-500 transition-colors">
                      {item.HolderName}
                    </h2>
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-6 font-mono bg-slate-50 w-fit px-2 py-0.5 rounded">
                       <Hash size={12} /> {item.CitizenId || "UNKNOWN-ID"}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12">
                      <InfoItem icon={<BookOpen size={16}/>} label="Chuyên ngành" value={item.Major} />
                      <InfoItem 
                        icon={<Award size={16}/>} 
                        label="Xếp loại" 
                        value={item.GraduationRank} 
                        isBadge={true} 
                      />
                      <InfoItem icon={<MapPin size={16}/>} label="Dân tộc / Nơi sinh" value={`${item.Ethnicity} - ${item.BirthPlace}`} />
                      <InfoItem icon={<Calendar size={16}/>} label="Ngày cấp phát" value={formatDate(item.timestamp)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Component con để hiển thị từng dòng thông tin
const InfoItem = ({ icon, label, value, isBadge }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 text-slate-400 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
      {isBadge ? (
        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold border border-blue-100">
          {value}
        </span>
      ) : (
        <p className="text-slate-700 text-sm font-medium">{value || "---"}</p>
      )}
    </div>
  </div>
);

export default Guest;