import { useState } from "react";

export const useExcel = (initialState, submitApiFn) => {
  const [formData, setFormData] = useState(initialState);
  const [dataList, setDataList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetDataList = (list) => {
    setDataList(list);
  };

  // ✅ KHÔNG nhận event nữa
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // luôn gửi formData
      const result = await submitApiFn(formData);
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