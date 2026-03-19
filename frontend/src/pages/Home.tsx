import { useState } from "react";
import { usePatients } from "../hooks/usePatients";
import { PatientCard } from "../components/PatientCard/PatientCard";
import { PatientForm } from "../components/PatientForm/PatientForm";
import "./Home.css";

export default function Home() {
  const { patients, loading, refetch } = usePatients();
  const [showForm, setShowForm] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);

  return (
    <main className="container">
      <div className="patients-header">
        <h1>Patients Dashboard</h1>
      </div>

      <div className="patients-actions">
        <button className="button" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Add Patient"}
        </button>
        {!loading && patients.length > 0 && (
          <button
            className="button"
            onClick={() => setAllExpanded(!allExpanded)}
          >
            {allExpanded ? "Collapse All" : "Expand All"}
          </button>
        )}
      </div>

      {showForm && (
        <PatientForm
          onSuccess={() => {
            refetch();
            setShowForm(false);
          }}
        />
      )}

      {loading && <p>Loading...</p>}

      {!loading && patients.length === 0 && <p>No patients yet</p>}

      <div className="patients-grid">
        {patients.map((patient) => (
          <PatientCard
            key={`${patient.id}-${allExpanded}`}
            patient={patient}
            forceExpanded={allExpanded}
          />
        ))}
      </div>
    </main>
  );
}
