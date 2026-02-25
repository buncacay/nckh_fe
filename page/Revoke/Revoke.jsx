import { User, BookOpen, FileCheck, ClipboardList, FileText } from "lucide-react";
import React from 'react';
import IssueTemplate from "../../components/issueTemplate";

const IssueAmend = () => {
  const initialState = {
    holderName: "",         // Họ và tên người học
    birthDate: "",          // Ngày tháng năm sinh
    oldDiplomaSerial: "",   // Số hiệu văn bằng đã được cấp
    newDiplomaSerial: "",   // Số hiệu văn bằng được cấp lại
    newBookReference: "",   // Số vào sổ gốc cấp văn bằng mới
    changeContent: "",      // Nội dung được chỉnh sửa/thay đổi
    recipientName: "",      // Người nhận văn bằng mới
    notes: ""               // Ghi chú
  };

  const fieldsConfig = [
    {
      groupTitle: "Thông tin định danh người học",
      icon: <User size={16} />,
      items: [
        { name: "holderName", label: "Họ và tên người học *", placeholder: "Nguyễn Văn A" },
        { name: "birthDate", label: "Ngày tháng năm sinh *", type: "date" },
      ]
    },
    {
      groupTitle: "Chi tiết thay đổi & Cấp lại",
      icon: <FileText size={16} />,
      items: [
        { name: "oldDiplomaSerial", label: "Số hiệu bằng đã cấp *", placeholder: "Số hiệu cũ" },
        { name: "newDiplomaSerial", label: "Số hiệu bằng cấp lại *", placeholder: "Số hiệu mới" },
        { name: "newBookReference", label: "Số vào sổ gốc mới *", placeholder: "Số thứ tự mới" },
        { name: "changeContent", label: "Nội dung chỉnh sửa/thay đổi", type: "textarea", placeholder: "Ghi rõ nội dung thay đổi...", fullWidth: true },
        { name: "recipientName", label: "Người nhận bằng mới *", placeholder: "Họ tên người nhận" },
      ]
    }
  ];
    const apiHandleAppendix = async (data) => {
    // Gọi API của Hệ thống Cấp bản sao (Sổ gốc)
    console.log("Đang ghi vào sổ gốc điện tử & Blockchain:", data);
    return new Promise(res => setTimeout(res, 2000));
  };


  return (
    <IssueTemplate 
      title="Phụ lục sổ gốc cấp văn bằng"
      subTitle="Cập nhật chỉnh sửa nội dung hoặc cấp lại văn bằng"
      initialState={initialState}
      fields={fieldsConfig}
      onSubmitApi={apiHandleAppendix}
    />
  );
};

export default IssueAmend;