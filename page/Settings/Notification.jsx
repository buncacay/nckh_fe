import React from 'react';
import { Bell, Check, Clock, User } from 'lucide-react';

const Notification = () => {
  // Giả sử đây là danh sách dài để bạn có thể cuộn
  const notifications = [
    { id: 1, title: "Cập nhật hồ sơ", desc: "Hồ sơ sinh viên Hang Minh Nguyen đã được duyệt bởi phòng đào tạo.", time: "2 phút trước", unread: true, type: 'status' },
    { id: 2, title: "Lịch thi mới", desc: "Môn Lập trình Web đã có lịch thi chính thức vào tuần sau.", time: "1 giờ trước", unread: true, type: 'calendar' },
    { id: 3, title: "Học phí", desc: "Hóa đơn học phí kỳ 2 đã được gửi vào email của bạn.", time: "3 giờ trước", unread: false, type: 'payment' },
    { id: 4, title: "Cảnh báo", desc: "Bạn có tiết học sắp bắt đầu trong 15 phút tới.", time: "5 giờ trước", unread: false, type: 'alert' },
    { id: 5, title: "Hệ thống", desc: "Bảo trì hệ thống vào lúc 12:00 PM tối nay.", time: "1 ngày trước", unread: false, type: 'system' },
    { id: 6, title: "Tin nhắn mới", desc: "Giảng viên vừa phản hồi câu hỏi của bạn trong diễn đàn.", time: "2 ngày trước", unread: false, type: 'message' },
  ];

  return (
    <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <div>
          <h3 className="text-sm font-bold text-blue-900 uppercase tracking-tight">Thông báo</h3>
          <p className="text-[10px] text-slate-400 font-medium">Bạn có {notifications.filter(n => n.unread).length} thông báo chưa đọc</p>
        </div>
        <button className="text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors">
          Đánh dấu đã đọc
        </button>
      </div>

      {/* List Container - Phần này sẽ cuộn được */}
      <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-all relative group ${n.unread ? 'bg-blue-50/30' : ''}`}
            >
              <div className="flex gap-4">
                {/* Icon giả lập dựa trên loại thông báo */}
                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${n.unread ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  {n.type === 'status' ? <Check size={16} /> : <Bell size={16} />}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={`text-[13px] ${n.unread ? 'font-bold text-slate-800' : 'font-semibold text-slate-600'}`}>
                      {n.title}
                    </p>
                    {n.unread && <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                  </div>
                  <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
                    {n.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-medium">
                    <Clock size={12} />
                    {n.time}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-400 italic text-sm">
            Không có thông báo nào
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
        <button className="text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">
          Cuộn để xem thêm
        </button>
      </div>
    </div>
  );
};

export default Notification;