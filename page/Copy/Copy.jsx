import { User, BookOpen, FileCheck, ClipboardList } from "lucide-react";
import React from 'react';
import IssueTemplate from "../../components/issueTemplate";

const IssueCopy = () => {
  // 1. Cập nhật state ban đầu theo các cột trong bảng phụ lục 5
  const initialState = {
    signerName: "",        // Người ký cấp bản sao
    copyIssueDate: new Date().toISOString().split("T")[0], // Ngày tháng cấp bản sao
    holderName: "",        // Họ và tên người được cấp bản sao
    birthDate: "",         // Ngày tháng năm sinh
    major: "",             // Ngành đào tạo theo sổ gốc
    graduationYear: "",    // Năm tốt nghiệp theo sổ gốc
    diplomaSerial: "",     // Số hiệu văn bằng theo sổ gốc
    bookReferenceNumber: "", // Số vào sổ gốc cấp văn bằng
    copyQuantity: 1,       // Số lượng bản sao
    recipientName: "",     // Người nhận bản sao
    notes: "",             // Ghi chú
    issueDate: new Date().toISOString().split("T")[0], 
    areaValid: "Toàn quốc"
  };

  // 2. Cấu hình các nhóm trường dữ liệu (Fields)
  const fieldsConfig = [
    {
      groupTitle: "Thông tin cấp bản sao",
      icon: <FileCheck size={16} />,
      items: [
        { name: "signerName", label: "Người ký cấp bản sao *", placeholder: "Tên người ký" },
        { name: "copyIssueDate", label: "Ngày tháng cấp bản sao *", type: "date" },
        { name: "copyQuantity", label: "Số lượng bản sao *", type: "number", placeholder: "Ví dụ: 1" },
        { name: "recipientName", label: "Người nhận bản sao", placeholder: "Tên người đến nhận" },
      ]
    },
    {
      groupTitle: "Thông tin cá nhân người được cấp",
      icon: <User size={16} />,
      items: [
        { name: "holderName", label: "Họ và tên người được cấp *", placeholder: "Nguyễn Văn A" },
        { name: "birthDate", label: "Ngày tháng năm sinh *", type: "date" },
      ]
    },
    {
      groupTitle: "Dữ liệu trích xuất từ sổ gốc",
      icon: <BookOpen size={16} />,
      items: [
        { name: "major", label: "Ngành đào tạo (Sổ gốc) *", placeholder: "Ví dụ: Kiến trúc" },
        { name: "graduationYear", label: "Năm tốt nghiệp *", placeholder: "Ví dụ: 2020" },
        { name: "diplomaSerial", label: "Số hiệu văn bằng *", placeholder: "Số hiệu ghi trên bằng gốc" },
        { name: "bookReferenceNumber", label: "Số vào sổ gốc cấp bằng *", placeholder: "Số thứ tự trong sổ gốc" },
      ]
    }
  ];

  const handleCopySubmit = async (data) => {
    // Gọi API của Hệ thống Cấp bản sao (Sổ gốc)
    console.log("Đang ghi vào sổ gốc điện tử & Blockchain:", data);
    return new Promise(res => setTimeout(res, 2000));
  };

  return (
    <IssueTemplate 
      title="Sổ cấp bản sao từ sổ gốc"
      subTitle="Trích lục dữ liệu văn bằng và xác thực bản sao lên Blockchain"
      initialState={initialState}
      fields={fieldsConfig}
      onSubmitApi={handleCopySubmit}
      processPath="/process-copy" // Link dẫn đến trang upload Excel cho bản sao
    />
  );
};

export default IssueCopy;