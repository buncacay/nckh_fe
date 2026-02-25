
import { useState } from "react";

export const useExcel = (initialState, submitApiFn) => {
  const [formData, setFormData] = useState(initialState);
  const [dataList, setDataList] = useState([]); // Dùng cho luồng Excel (nhiều bản ghi)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSetDataList = (list) => {
    setDataList(list);
  };

  const handleSubmit = async (dataToSubmit) => {
    setIsSubmitting(true);
    try {
    
      const result = await submitApiFn(dataToSubmit);
      return { success: true, result };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    formData, 
    setFormData, 
    dataList, 
    handleSetDataList, 
    isSubmitting, 
    handleChange, 
    handleSubmit 
  };
};