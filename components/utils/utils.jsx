
import { ethers } from "ethers";
import axios from 'axios';
import React from "react";
export const SAFE_ABI = [
  "function nonce() view returns (uint256)",
  "function domainSeparator() view returns (bytes32)", // Thêm để debug domain separator
  "function getTransactionHash(address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,uint256 nonce) view returns (bytes32)",
  "function execTransaction(address to,uint256 value,bytes data,uint8 operation,uint256 safeTxGas,uint256 baseGas,uint256 gasPrice,address gasToken,address refundReceiver,bytes signatures) returns (bool)"
];

export const SIGNATURE_TYPE = { SAFETX: 1 };



export const bigIntReplacer = (key, value) => 
  typeof value === 'bigint' ? value.toString() : value;


export async function connect() {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const [acc] = await provider.send("eth_requestAccounts", []);
    // setAccount(acc);
    console.log("Connected account:", acc);
  }

export function combineSignatures(list) {
    return (
      "0x" +
      [...list]
        .sort((a, b) => a.signer.toLowerCase().localeCompare(b.signer.toLowerCase()))
        .map((s) => s.signature.replace(/^0x/, ""))
        .join("")
    );
  }


  export  async function handleFileUpload(e, type) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("📄 Reading CSV...");
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}Contract/readcsv?type=${type}`, formData);
      console.log(`Loaded ${data.length} diplomas`);
      return data;
    } catch (err) {
      console.log("❌ CSV error: " + err.message);
    }
  }


export async function startBulkProcess(type, dataList) {
  const chainId = "11155111";
  if (dataList.length === 0) return;

  console.log(import.meta.env.VITE_SAFE_ADDRESS)
  try {

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const user = await signer.getAddress();
    
    const safe = new ethers.Contract(
      import.meta.env.VITE_SAFE_ADDRESS,
      SAFE_ABI,
      signer
    );

    const currentNonce = await safe.nonce();

    let apiUrl = "";

    switch (type) {

      case "diploma":
        apiUrl = `${import.meta.env.VITE_BASE_URL}Contract/diploma/bulk/calldata`;
        break;

      case "amend":
        apiUrl = `${import.meta.env.VITE_BASE_URL}amend/bulk/calldata`;
        break;

      case "revoke":
        apiUrl = `${import.meta.env.VITE_BASE_URL}revoke/bulk/calldata`;
        break;

      default:
        throw new Error("Invalid type");

    }

    console.log(apiUrl);

    const { data: bulk } = await axios.post(apiUrl, {
      dto: dataList,
      SafeNonce: Number(currentNonce)
    });


   
    const { calldata, txId } = bulk;
    const diplomaid = bulk.diplomaId;
    console.log(diplomaid);
    console.log(txId);
    const id = diplomaid.map(item => item.modelId).join(',');

    console.log(id);

    const typedData = {
      domain: {
        chainId,
        verifyingContract: import.meta.env.VITE_SAFE_ADDRESS
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
        to: import.meta.env.VITE_MULTI_SEND_ADDRESS,
        value: 0n,
        data: calldata,
        operation: 1,
        safeTxGas: 0n,
        baseGas: 0n,
        gasPrice: 0n,
        gasToken: ethers.ZeroAddress,
        refundReceiver: ethers.ZeroAddress,
        nonce: Number(currentNonce)
      }
    };

    const signature = await signer.signTypedData(
      typedData.domain,
      { SafeTx: typedData.types.SafeTx },
      typedData.message
    );

    console.log(`${import.meta.env.VITE_BASE_URL}Contract/sign`);
    const { data: sigRes } = await axios.post(`${import.meta.env.VITE_BASE_URL}Contract/sign`, {
      TxId: txId,
      type: SIGNATURE_TYPE.SAFETX,
      signatureHex: signature,
      expectedSigner: user,
      typedDataJson: JSON.stringify(typedData, bigIntReplacer)
    });

    const combinedSigs = combineSignatures(sigRes.signatures);
    console.log(import.meta.env.VITE_MULTI_SEND_ADDRESS);
    const execTx = await safe.execTransaction(
      import.meta.env.VITE_MULTI_SEND_ADDRESS,
      0,
      calldata,
      1,
      0,
      0,
      0,
      ethers.ZeroAddress,
      ethers.ZeroAddress,
      combinedSigs
    );

    const receipt = await execTx.wait();
       if (receipt.status === 1) {
           
          
            await axios.post(`${import.meta.env.VITE_BASE_URL}Contract/database?txId=${txId}&id=${id}`);
            
        } else {
           alert("Revert")
        }


    return execTx.hash, id;

  }
  catch (e){
    console.log(e);
  }

}



