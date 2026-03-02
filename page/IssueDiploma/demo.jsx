// diploma moi 
import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

/* ================= CONFIG ================= */
const BASE_URL = "http://localhost:5056/api/Contract";
const SAFE_ADDRESS = "0x383816308FaFE98EBe527752583662161E1A324C";
const DIPLOMA_CONTRACT = "0x4973036EC499bDa5710e471CbA492Ad212DFd1C1";

// ABI đầy đủ để đọc Nonce và thực thi giao dịch
const SAFE_ABI = [
  "function nonce() view returns (uint256)",
  "function execTransaction(address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,bytes signatures) returns (bool)"
];

const SIGNATURE_TYPE = {
  DIPLOMA: 0,
  SAFETX: 1
};

/* ================= UTILS ================= */

function normalizeBytes32(hash) {
  if (!hash) return ethers.ZeroHash;
  let clean = hash.startsWith("0x") ? hash.slice(2) : hash;
  return "0x" + clean.padStart(64, "0");
}

const bigIntReplacer = (key, value) => 
  typeof value === 'bigint' ? value.toString() : value;

function combineSignatures(list) {
  return (
    "0x" +
    [...list]
      .sort((a, b) => a.signer.toLowerCase().localeCompare(b.signer.toLowerCase()))
      .map((s) => s.signature.replace(/^0x/, ""))
      .join("")
  );
}

/* ================= COMPONENT ================= */

export default function DiplomaSafeFinal() {
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("Idle");
  const [busy, setBusy] = useState(false);

  const diplomaDto = {
    serialNumber: "DIP-"+Date.now().toString(),
    holderName: "Pham Van C",
    citizenId: Date.now().toString(),
    birthDate: "2000-03-01",
    birthPlace: "Hanoi",
    gender: "Male",
    ethnicity: "Kinh",
    nationality: "Vietnam",
    major: "Blockchain",
    graduationYear: 2025,
    graduationRank: "Excellent",
    Id: "",
    recipientSignatureName: "Pham Van C",
    notes: "Good student",
    documentHash: normalizeBytes32("3f8b2c4e9d1a7f6c5b0e2a4d9c7f8e1b6a3c5d9e2f4a8b7c6d1e0f9a2b4c8f"),
    arweaveId: "arweave-xyz"
  };

  async function connect() {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const [acc] = await provider.send("eth_requestAccounts", []);
    setAccount(acc);
  }

  /* ================= BUILDERS (SYNCED WITH NETHEREUM) ================= */

  function buildDiplomaTypedData(dto, nonce, chainId) {
    return {
      domain: {
        name: "DiplomaSafe",
        version: "1",
        chainId,
        verifyingContract: SAFE_ADDRESS
      },
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" }
        ],
        Diploma: [
         
          { name: "holderName", type: "string" },
          { name: "citizenId", type: "string" },
          { name: "birthDate", type: "string" },
          { name: "birthPlace", type: "string" },
          { name: "gender", type: "string" },
          { name: "ethnicity", type: "string" },
          { name: "nationality", type: "string" },
          { name: "major", type: "string" },
          { name: "graduationYear", type: "uint256" },
          { name: "graduationRank", type: "string" },
          { name: "serialNumber", type: "string" },
          
          { name: "recipientSignatureName", type: "string" },
          { name: "notes", type: "string" },
          { name: "documentHash", type: "bytes32" },
          { name: "arweaveId", type: "string" },
          { name: "nonce", type: "uint256" }
        ]
      },
      primaryType: "Diploma",
      message: { ...dto, nonce: BigInt(nonce) }
    };
  }

  function buildSafeTxTypedData(calldata, nonce, chainId) {
    return {
      domain: {
        chainId,
        verifyingContract: SAFE_ADDRESS
      },
      types: {
        EIP712Domain: [
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" }
        ],
        SafeTx: [
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "data", type: "bytes" },
          { name: "operation", type: "uint8" },
          { name: "safeTxGas", type: "uint256" },
          { name: "baseGas", type: "uint256" },
          { name: "gasPrice", type: "uint256" },
          { name: "gasToken", type: "address" },
          { name: "refundReceiver", type: "address" },
          { name: "nonce", type: "uint256" }
        ]
      },
      primaryType: "SafeTx",
      message: {
        to: DIPLOMA_CONTRACT,
        value: 0n,
        data: calldata,
        operation: 0,
        safeTxGas: 0n,
        baseGas: 0n,
        gasPrice: 0n,
        gasToken: ethers.ZeroAddress,
        refundReceiver: ethers.ZeroAddress,
        nonce: BigInt(nonce)
      }
    };
  }

  /* ================= FLOW ================= */

  async function startProcess() {
    if (busy) return;
    setBusy(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      const user = await signer.getAddress();

      // Khởi tạo contract để đọc dữ liệu live từ blockchain
      const safeContract = new ethers.Contract(SAFE_ADDRESS, SAFE_ABI, signer);

      // BƯỚC QUAN TRỌNG: Đồng bộ Nonce để tránh GS026
      setStatus("🔍 Syncing nonce from Blockchain...");
      const actualNonce = await safeContract.nonce();
      console.log("Current Safe Nonce:", actualNonce.toString());

      // 1. Lấy Calldata từ Backend
      setStatus("1️⃣ Fetching calldata...");
      const { data: cRes } = await axios.post(`${BASE_URL}/diploma/calldata`, diplomaDto);
      const { calldata, txId, id } = cRes;
      console.log(id);

      // 2. Ký nội dung Diploma (Dùng actualNonce)
      setStatus("2️⃣ Signing Diploma Content...");
      const dTyped = buildDiplomaTypedData(diplomaDto, actualNonce, chainId);
      const dSig = await signer.signTypedData(
        dTyped.domain, 
        { Diploma: dTyped.types.Diploma }, 
        dTyped.message
      );
      
      await axios.post(`${BASE_URL}/sign`, {
        txId,
        type: SIGNATURE_TYPE.DIPLOMA,
        typedDataJson: JSON.stringify(dTyped, bigIntReplacer),
        signatureHex: dSig,
        expectedSigner: user
      });

      // 3. Ký Giao dịch Safe (Dùng cùng actualNonce đó)
      setStatus("3️⃣ Signing Safe Transaction...");
      const sTyped = buildSafeTxTypedData(calldata, actualNonce, chainId);
      const sSig = await signer.signTypedData(
        sTyped.domain, 
        { SafeTx: sTyped.types.SafeTx }, 
        sTyped.message
      );

      const { data: signRes } = await axios.post(`${BASE_URL}/sign`, {
        txId,
        type: SIGNATURE_TYPE.SAFETX,
        typedDataJson: JSON.stringify(sTyped, bigIntReplacer),
        signatureHex: sSig,
        expectedSigner: user
      });

      // 4. Kiểm tra đủ chữ ký và thực thi
      if (signRes.status === "READY") {
        setStatus("🚀 Executing on-chain...");
        const combinedSigs = combineSignatures(signRes.signatures);

        const tx = await safeContract.execTransaction(
          DIPLOMA_CONTRACT, 0n, calldata, 0, 0n, 0n, 0n,
          ethers.ZeroAddress, ethers.ZeroAddress, combinedSigs
        );

        setStatus("⛏️ Transaction pending...");
        const receipt = await tx.wait();

        if (receipt.status === 1) {
            setStatus("💾 Saving to database...");
            // GỌI API DATABASE SAU KHI EXECUTE THÀNH CÔNG
            await axios.post(`${BASE_URL}/database?txId=${txId}&id=${id}`);
            setStatus("🎉 DONE! Hash: " + tx.hash);
        } else {
            setStatus("❌ Transaction reverted on-chain.");
        }
        setStatus("🎉 DONE! Transaction: " + tx.hash);
      } else {
        setStatus(`⏳ Signed! (${signRes.signedCount}/${signRes.required} owners)`);
      }

    } catch (e) {
      console.error("PROCESS ERROR:", e);
      setStatus("❌ " + (e.response?.data || e.message));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#333' }}>🎓 Diploma Safe Multisig</h2>
      <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 10, border: '1px solid #ddd' }}>
        <p><b>Wallet:</b> {account || "Not connected"}</p>
        <p><b>Status:</b> <span style={{ color: '#007bff' }}>{status}</span></p>
        
        {!account ? (
          <button onClick={connect} style={btnStyle}>Connect MetaMask</button>
        ) : (
          <button onClick={startProcess} disabled={busy} style={busy ? disabledBtnStyle : btnStyle}>
            {busy ? "Processing..." : "Sign & Execute Flow"}
          </button>
        )}
      </div>
    </div>
  );
}

const btnStyle = { backgroundColor: '#28a745', color: 'white', padding: '12px 24px', border: 'none', borderRadius: 5, cursor: 'pointer', fontSize: '16px' };
const disabledBtnStyle = { ...btnStyle, backgroundColor: '#ccc', cursor: 'not-allowed' };

1