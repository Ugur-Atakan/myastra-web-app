import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { checkIncompleteUserData } from "../utils/checkData";
import toast from "react-hot-toast";

export const useIncompleteDataCheck = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const checkDataAndProceed = (callback: () => void) => {
    const missing = checkIncompleteUserData(userData);
    if (missing.length > 0) {
      toast.error("İşleme devam etmek için eksik bilgilerini doldurmalısın");
      setMissingFields(missing);
      setIsModalOpen(true);
    } else {
      callback(); // Eksik bilgi yoksa işlemi devam ettir
    }
  };

  return { isModalOpen, setIsModalOpen, missingFields, checkDataAndProceed };
};
