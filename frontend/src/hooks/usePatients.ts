import { useEffect, useState } from "react";
import { api } from "../services/api";

type Patient = {
  id: number;
  full_name: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  document_photo_path: string;
};

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const res = await api.get("/patients");
      setPatients(res.data);
      setLoading(false);
    };

    fetchPatients();
  }, []);

  const refetch = async () => {
    setLoading(true);
    const res = await api.get("/patients");
    setPatients(res.data);
    setLoading(false);
  };

  return { patients, loading, refetch };
};
