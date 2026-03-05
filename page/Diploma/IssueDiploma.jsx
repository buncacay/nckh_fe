import { User, BookOpen } from "lucide-react";
import React, { useState } from 'react';
import { ethers } from "ethers";
import IssueTemplate from "../../components/issueTemplate";
import * as utils from "../../components/utils/utils";

const IssueDiploma = () => {
  const [account, setAccount] = useState(null);

  const initialState = {
    holderName: "",         
    citizenId: "",          
    birthDate: "",          
    birthPlace: "",        
    gender: "Nam",             
    ethnicity: "Kinh",      
    nationality: "Việt Nam", 
    major: "",              
    graduationYear: new Date().getFullYear(),     
    graduationRank: "Khá",     
    serialNumber: "",       
    recipientSignatureName: "", 
    notes: "",              
    id: "0",
    documentHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    arweaveId: "",
    issueTimestamp: 0,
    isValid: true,
    amendmentCount: 0
  };

 
  const fieldsConfig = [
    {
      groupTitle: "Thông tin cá nhân người học",
      icon: <User size={16} />,
      items: [
        { name: "holderName", label: "Họ và tên *", placeholder: "Nguyễn Văn A" },
        { name: "citizenId", label: "Số CCCD/Passport *", placeholder: "031..." },
        { name: "birthDate", label: "Ngày sinh *", type: "date" },
        { name: "birthPlace", label: "Nơi sinh", placeholder: "Hải Phòng" },
        { name: "gender", label: "Giới tính", type: "select", options: ["Nam", "Nữ", "Khác"] },
        { name: "ethnicity", label: "Dân tộc", placeholder: "Kinh" },
        { name: "nationality", label: "Quốc tịch", placeholder: "Việt Nam" },
      ]
    },
    {
      groupTitle: "Thông tin tốt nghiệp",
      icon: <BookOpen size={16} />,
      items: [
        { name: "major", label: "Ngành đào tạo *",type: "select",placeholder: "-- Chọn ngành --" },
        { name: "graduationYear", label: "Năm tốt nghiệp *", type: "number" },
        { name: "graduationRank", label: "Xếp loại", type: "select", options: ["Xuất sắc", "Giỏi", "Khá", "Trung bình"] },
        { name: "serialNumber", label: "Số hiệu văn bằng *", placeholder: "Số hiệu trên bằng" },
        { name: "recipientSignatureName", label: "Người nhận bằng", placeholder: "Tên người ký nhận bằng" },
        { name: "notes", label: "Ghi chú", type: "textarea", fullWidth: true },
      ]
    }
  ];

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài đặt MetaMask");
      return null;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const connectedAcc = accounts[0];
      setAccount(connectedAcc);
      return connectedAcc; 
    } catch (err) {
      console.error("Người dùng từ chối kết nối:", err);
      return null;
    }
  };

  
  const handleDiplomaSubmit = async (formData) => {
  try {
    let currentAcc = account;

    if (!currentAcc) {
      currentAcc = await connectWallet();
      if (!currentAcc) return;
    }

    const finalData = {
      serialNumber: formData.serialNumber || "DIP-" + Date.now().toString(),
      holderName: formData.holderName,
      citizenId: formData.citizenId,
      birthDate: formData.birthDate,
      birthPlace: formData.birthPlace,
      gender: formData.gender,
      ethnicity: formData.ethnicity,
      nationality: formData.nationality,
      major: formData.major,
      graduationYear: Number(formData.graduationYear),
      graduationRank: formData.graduationRank,

      Id: "",   

      recipientSignatureName: formData.recipientSignatureName,
      notes: formData.notes,

      documentHash:
        formData.documentHash &&
        formData.documentHash !== "0x0000000000000000000000000000000000000000000000000000000000000000"
          ? formData.documentHash
          : ethers.keccak256(
              ethers.toUtf8Bytes(JSON.stringify(formData))
            ),

      arweaveId: formData.arweaveId || "",

      issueTimestamp: Math.floor(Date.now() / 1000),
      isValid: true,
      amendmentCount: 0,
    };

    console.log("Final object gửi đi:", finalData);

    const txHash = await utils.startBulkProcess("diploma", [finalData]);

    if (txHash) {
      alert("Phát hành văn bằng thành công!\nTx Hash: " + txHash);
    }

  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra: " + (err.reason || err.message));
  }
};

  return (
    <div>
      {account && (
        <div className="text-right p-2 text-sm text-gray-500">
          Ví hiện tại: <span className="font-mono text-blue-600">{account.substring(0,6)}...{account.slice(-4)}</span>
        </div>
      )}

      <IssueTemplate 
        title="Quản lý Sổ gốc & Cấp văn bằng"
        subTitle="Dữ liệu sẽ được ký xác thực bởi ví MetaMask của bạn"
        initialState={initialState}
        fields={fieldsConfig}
        onSubmitApi={handleDiplomaSubmit}
        processType="diploma"
      />
    </div>
  );
};
export default IssueDiploma;