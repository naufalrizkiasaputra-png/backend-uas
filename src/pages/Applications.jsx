import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getApplicantsByJob,
  updateApplicationStatus
} from "../api/jobs";

const Applications = () => {
  const [params] = useSearchParams();
  const jobId = params.get("jobId");
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApplicantsByJob(jobId).then(res => setApps(res.data));
  }, [jobId]);

  const updateStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    setApps(apps.map(a =>
      a.id === id ? { ...a, status } : a
    ));
  };

  return (
    <div>
      <h2>Pelamar</h2>

      {apps.map(a => (
        <div key={a.id}>
          <p>{a.user_name} — {a.status}</p>
          <button onClick={() => updateStatus(a.id, "accepted")}>
            Terima
          </button>
          <button onClick={() => updateStatus(a.id, "rejected")}>
            Tolak
          </button>
        </div>
      ))}
    </div>
  );
};

export default Applications;
