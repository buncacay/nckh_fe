import { User, FileText } from "lucide-react";
import React, { useMemo } from 'react';
import { useLocation } from "react-router-dom"; // 👈 Thêm cái này
import IssueTemplate from "../../components/issueTemplate";

const IssueAmend = () => {
  const location = useLocation();
  
  // truyen bang state trong navigation
  // nhan bang location.state
  // dung useMemo de map va chuyen thanh form
  const { fullData, selectedPerson } = location.state || {};
  console.log(fullData);
  const dynamicInitialState = useMemo(() => {
    
    return {
      holderName: selectedPerson?.HolderName || "",         
      birthDate: selectedPerson?.BirthDate ? new Date(selectedPerson.BirthDate).toISOString().split('T')[0] : "",          
      oldDiplomaSerial: selectedPerson?.SerialNumber || "",  
      newDiplomaSerial: "",   
      newBookReference: "",   
      changeContent: `Cấp lại từ ID: ${fullData?.id || 'N/A'}`, // Tự động điền thông tin vết
      recipientName: selectedPerson?.RecipientSignatureName || "",      
      notes: selectedPerson?.Notes || ""              
    };
  }, [selectedPerson, fullData]);

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
        { name: "oldDiplomaSerial", label: "Số hiệu bằng đã cấp *", placeholder: "Số hiệu cũ", disabled: true }, // Khóa lại vì đây là bằng cũ
        { name: "newDiplomaSerial", label: "Số hiệu bằng cấp lại *", placeholder: "Số hiệu mới" },
        { name: "newBookReference", label: "Số vào sổ gốc mới *", placeholder: "Số thứ tự mới" },
        { name: "changeContent", label: "Nội dung chỉnh sửa/thay đổi", type: "textarea", placeholder: "Ghi rõ nội dung thay đổi...", fullWidth: true },
        { name: "recipientName", label: "Người nhận bằng mới *", placeholder: "Họ tên người nhận" },
      ]
    }
  ];

  const apiHandleAppendix = async (data) => {
    const payload = {
      ...data,
      originalTargetId: fullData?.targetId,
      originalLogId: fullData?.id
    };
    
    console.log("Đang ghi vào sổ gốc điện tử & Blockchain với tham chiếu:", payload);
    return new Promise(res => setTimeout(res, 2000));
  };

  return (
    <IssueTemplate 
      title="Phụ lục sổ gốc cấp văn bằng"
      subTitle={selectedPerson ? `Chỉnh sửa văn bằng cho: ${selectedPerson.HolderName}` : "Cập nhật chỉnh sửa nội dung hoặc cấp lại văn bằng"}
      initialState={dynamicInitialState}
      fields={fieldsConfig}
      onSubmitApi={apiHandleAppendix}
    />
  );
};

export default IssueAmend;