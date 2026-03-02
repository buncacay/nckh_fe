import React, { useState, useRef } from "react";
import {
  CloudUpload,
  Database,
  ShieldCheck,
  FileSpreadsheet,
  X,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useExcel } from "../../hooks/useExcel";
import * as utils from "../../components/utils/utils";
import { ethers } from "ethers";

const StepItem = ({ step, active, label, icon }) => (
  <div className={`flex items-center gap-3 z-10 ${active ? "opacity-100" : "opacity-40"}`}>
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md transition-all duration-500 ${
        active
          ? "bg-blue-600 text-white scale-110"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {icon}
    </div>
    <div className="hidden md:block text-left">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        Bước {step}
      </p>
      <p className={`text-sm font-bold ${active ? "text-blue-900" : "text-slate-400"}`}>
        {label}
      </p>
    </div>
  </div>
);

const HandleExcel = ({ title = "Xử lý danh sách từ Excel" }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [account, setAccount] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { dataList, handleSetDataList, isSubmitting } = useExcel({}, null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const data = await utils.handleFileUpload(e);
    if (Array.isArray(data) && data.length > 0) {
      handleSetDataList(data);
      setTimeout(() => setCurrentStep(2), 500);
    } else {
      alert("File không hợp lệ hoặc không có dữ liệu.");
    }
  };

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
      console.error(err);
      return null;
    }
  };

  const handleFinalProcess = async () => {
    try {
      if (!dataList || dataList.length === 0) {
        alert("Không có dữ liệu để xử lý");
        return;
      }

      let currentAcc = account;

      if (!currentAcc) {
        currentAcc = await connectWallet();
        if (!currentAcc) return;
      }

      const formattedList = dataList.map((formData) => ({
        serialNumber: formData.serialNumber || "DIP-" + Date.now(),
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
          formData.documentHash !==
            "0x0000000000000000000000000000000000000000000000000000000000000000"
            ? formData.documentHash
            : ethers.keccak256(
                ethers.toUtf8Bytes(JSON.stringify(formData))
              ),
        arweaveId: formData.arweaveId || "",
        issueTimestamp: Math.floor(Date.now() / 1000),
        isValid: true,
        amendmentCount: 0,
      }));

      const txHash = await utils.startBulkProcess("diploma", formattedList);

      if (txHash) {
        // Chuyển sang màn hình thành công
        setCurrentStep(3);

        // Sau 1.5 giây chuyển sang dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi: " + (err.reason || err.message));
    }
  };

  return (
    <div className="space-y-6 bg-[#f8fafc] min-h-screen pb-10 p-6">
      {/* STEP HEADER */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm max-w-5xl mx-auto">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <StepItem step={1} active={currentStep >= 1} label="Tải lên" icon={<CloudUpload size={18} />} />
          <StepItem step={2} active={currentStep >= 2} label="Kiểm tra" icon={<Database size={18} />} />
          <StepItem step={3} active={currentStep >= 3} label="Hoàn tất" icon={<ShieldCheck size={18} />} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="bg-white p-16 rounded-3xl border-2 border-dashed flex flex-col items-center space-y-6">
            <CloudUpload size={64} className="text-blue-600" />
            <h3 className="text-2xl font-bold">{title}</h3>

            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
              accept=".csv,.xlsx,.xls"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl"
            >
              Chọn tệp
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="space-y-6">

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-blue-900">
                  Tìm thấy {dataList.length} bản ghi
                </h3>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                  <FileSpreadsheet size={16} className="text-green-600" />
                  <span className="text-xs font-bold">{fileName}</span>
                  <button onClick={() => setCurrentStep(1)}>
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold bg-slate-50">
                      <th className="px-6 py-3">STT</th>
                      <th className="px-6 py-3">Holder Name</th>
                      <th className="px-6 py-3">Citizen ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataList.map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3 font-semibold">{row.holderName}</td>
                        <td className="px-6 py-3">{row.citizenId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between bg-white p-6 rounded-2xl border shadow-sm">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 text-slate-500 font-bold"
              >
                <ArrowLeft size={18} /> Quay lại
              </button>

              <button
                onClick={handleFinalProcess}
                disabled={isSubmitting}
                className="px-10 py-3 bg-blue-600 text-white font-bold rounded-xl"
              >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận & Ghi Blockchain"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="bg-white p-16 rounded-3xl border shadow-xl text-center space-y-6">
            <ShieldCheck size={64} className="text-green-600 mx-auto" />
            <h2 className="text-3xl font-bold">Thành công!</h2>
            <p className="text-slate-500">Đang chuyển đến Dashboard...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default HandleExcel;