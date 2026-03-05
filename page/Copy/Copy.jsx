import { User, BookOpen, FileCheck } from "lucide-react";
import React from "react";
import IssueTemplate from "../../components/issueTemplate";
import * as copy from "../../services/copyServices";

const IssueCopy = () => {

  const initialState = {
    SignerName: "",
    CopyIssueDate: new Date().toISOString().split("T")[0],
    CopyQuantity: 1,
    ReceiverName: "",

    HolderName: "",
    BirthDate: "",
    CitizenId: "",

    DiplomaId: "",
    major: "",              
    GraduationYear: "",
    SerialNumber: "",
    Notes: ""
  };

  const fieldsConfig = [
    {
      groupTitle: "Thông tin cấp bản sao",
      icon: <FileCheck size={16} />,
      items: [
        { name: "SignerName", label: "Người ký cấp bản sao *", placeholder: "Tên người ký" },
        { name: "CopyIssueDate", label: "Ngày cấp bản sao *", type: "date" },
        { name: "CopyQuantity", label: "Số lượng bản sao *", type: "number" },
        { name: "ReceiverName", label: "Người nhận bản sao *", placeholder: "Tên người nhận" }
      ]
    },
    {
      groupTitle: "Thông tin người được cấp",
      icon: <User size={16} />,
      items: [
        { name: "HolderName", label: "Họ và tên *", placeholder: "Nguyễn Văn A" },
        { name: "BirthDate", label: "Ngày sinh *", type: "date" },
        { name: "CitizenId", label: "CCCD/CMND *", placeholder: "Nhập số định danh" }
      ]
    },
    {
      groupTitle: "Dữ liệu từ sổ gốc",
      icon: <BookOpen size={16} />,
      items: [
        { name: "DiplomaId", label: "ID Văn bằng *", placeholder: "Nhập ID văn bằng" },
        { name: "graduationRank", label: "Xếp loại", type: "select", options: ["Xuất sắc", "Giỏi", "Khá", "Trung bình"] },
        { name: "major", label: "Ngành đào tạo *", type: "select", placeholder: "-- Chọn ngành --" },
        { name: "GraduationYear", label: "Năm tốt nghiệp *", type: "number", placeholder: "Ví dụ: 2020" },
        { name: "SerialNumber", label: "Số hiệu văn bằng *", placeholder: "Số hiệu trên bằng gốc" },
        { name: "Notes", label: "Ghi chú *", placeholder: "Ghi chú thêm nếu có" }
      ]
    }
  ];

  const handleMutil = async (data) => {
    const res = await copy.mutilCopy(data);
    console.log(res);
  }

  const formatToUSDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  const handleCopySubmit = async (data) => {
    try {
      console.log("DATA TRƯỚC KHI MAP:", data);

      const payload = {
        receiverName: data.ReceiverName,
        count: Number(data.CopyQuantity),
        notes: data.Notes,
        singerName: data.SignerName,   
        issueAt: new Date(data.CopyIssueDate).toISOString(), 
        serialNumber: data.SerialNumber,
        holderName: data.HolderName,
        citizenId: data.CitizenId,
        birthDate: formatToUSDate(data.BirthDate),
        major: data.major,
        graduationYear: Number(data.GraduationYear),
        diplomaId: data.DiplomaId,
        rank: data.graduationRank
      };

      console.log("PAYLOAD GỬI LÊN API:", payload);

      const res = await copy.issueCopy(payload);
      return res;

    } catch (error) {
      console.error("Submit error:", error);
      throw error;
    }
  };

  return (
    <IssueTemplate
      title="Sổ cấp bản sao từ sổ gốc"
      subTitle="Trích lục dữ liệu văn bằng và xác thực bản sao lên Blockchain"
      initialState={initialState}
      fields={fieldsConfig}
      onSubmitApi={handleCopySubmit}
      onCopySubmit ={handleMutil}
      processType="copy"
      type="4"

    />
  );
};

export default IssueCopy;