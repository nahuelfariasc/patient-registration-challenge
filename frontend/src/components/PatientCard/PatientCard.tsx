import { useState } from "react";
import "./PatientCard.css";

type Patient = {
  id: number;
  full_name: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  document_photo_path: string;
};

type Props = {
  patient: Patient;
  forceExpanded?: boolean;
};

export const PatientCard = ({ patient, forceExpanded }: Props) => {
  const [expanded, setExpanded] = useState(forceExpanded ?? false);

  const imageUrl = `http://localhost:8000/storage/${patient.document_photo_path}`;

  return (
    <div
      className={`patient-card ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="patient-header">
        <img src={imageUrl} alt={patient.full_name} />
        <h3>{patient.full_name}</h3>
      </div>

      <div className="patient-body">
        <p>
          <strong>Email:</strong> {patient.email}
        </p>
        <p>
          <strong>Phone:</strong> {patient.phone_country_code}{" "}
          {patient.phone_number}
        </p>
      </div>

      <span className="patient-expand">{expanded ? "Collapse" : "Expand"}</span>
    </div>
  );
};
