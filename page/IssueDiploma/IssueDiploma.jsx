import { User, BookOpen, FileText, ClipboardList, PenTool } from "lucide-react";
import React from 'react';
import IssueTemplate from "../../components/issueTemplate";

const IssueDiploma = () => {
  const initialState = {
    holderName: "",         
    birthDate: "",          
    birthPlace: "",        
    gender: "",             
    ethnicity: "Kinh",      
    nationality: "Việt Nam", 

    
    major: "",              
    graduationYear: "",     
    graduationRank: "",     
    
   
    diplomaSerial: "",      
    bookReference: "",     
    
    signerName: "",         
    copyIssueDate: "",      
    copyQuantity: 1,        
    oldDiplomaSerial: "",   // Số hiệu văn bằng cũ (cho phụ lục)
    changeContent: "",      // Nội dung chỉnh sửa (cho phụ lục)
    recipientName: "",      // Người nhận văn bằng/bản sao
    
    // Thiết lập hệ thống
    issueDate: new Date().toISOString().split("T")[0], 
    areaValid: "Toàn quốc"
  };

  // 2. Cấu hình các nhóm trường hiển thị theo giao diện UI trong ảnh 1
  const fieldsConfig = [
    {
      groupTitle: "Thông tin cá nhân người học",
      icon: <User size={16} />,
      items: [
        { name: "holderName", label: "Họ và tên *", placeholder: "Nguyễn Văn A" },
        { name: "birthDate", label: "Ngày tháng năm sinh *", type: "date" },
        { name: "birthPlace", label: "Nơi sinh", placeholder: "Hải Phòng" },
        { name: "gender", label: "Giới tính", type: "select", options: ["Nam", "Nữ"], placeholder: "Chọn giới tính" },
        { name: "ethnicity", label: "Dân tộc", placeholder: "Kinh" },
        { name: "nationality", label: "Quốc tịch", placeholder: "Việt Nam" },
      ]
    },
    {
      groupTitle: "Thông tin đào tạo & Sổ gốc",
      icon: <BookOpen size={16} />,
      items: [
        { name: "major", label: "Ngành đào tạo *", placeholder: "Kiến trúc / CNTT" },
        { name: "graduationYear", label: "Năm tốt nghiệp *", placeholder: "2024" },
        { name: "graduationRank", label: "Xếp loại", type: "select", options: ["Xuất sắc", "Giỏi", "Khá", "Trung bình"], placeholder: "Chọn xếp loại" },
        { name: "diplomaSerial", label: "Số hiệu văn bằng *", placeholder: "Ví dụ: B123456" },
        { name: "bookReference", label: "Số vào sổ gốc *", placeholder: "Ví dụ: 001/2024" },
      ]
    },
    {
      groupTitle: "Thông tin cấp bản sao & Phụ lục (Nếu có)",
      icon: <ClipboardList size={16} />,
      items: [
        { name: "signerName", label: "Người ký cấp", placeholder: "Họ tên người ký" },
        { name: "copyQuantity", label: "Số lượng bản sao", type: "number", placeholder: "1" },
        { name: "oldDiplomaSerial", label: "Số hiệu cũ (Nếu chỉnh sửa)", placeholder: "Số hiệu cần thay đổi" },
        { name: "recipientName", label: "Người nhận (Ký nhận) *", placeholder: "Họ tên người nhận bằng" },
        { name: "changeContent", label: "Nội dung chỉnh sửa", type: "textarea", placeholder: "Ghi rõ nội dung thay đổi nếu là phụ lục sổ gốc", fullWidth: true },
      ]
    }
  ];

  const handleDiplomaSubmit = async (data) => {
    console.log("Dữ liệu gửi lên Blockchain theo chuẩn Sổ gốc:", data);
    return new Promise(res => setTimeout(res, 2000));
  };

  return (
    <IssueTemplate 
      title="Quản lý Sổ gốc & Cấp văn bằng"
      subTitle="Khởi tạo dữ liệu theo tiêu chuẩn Bộ Giáo dục và xác thực lên Blockchain"
      initialState={initialState}
      fields={fieldsConfig}
      onSubmitApi={handleDiplomaSubmit}
    />
  );
};

export default IssueDiploma;