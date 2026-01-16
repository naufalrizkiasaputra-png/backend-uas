import { useEffect, useState } from "react";
import { getJobs, applyJob } from "../api/jobs";
import { useAuth } from "../context/AuthContext";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data);
      } catch (err) {
        console.error("Gagal fetch jobs", err);
      }
    };

    setJobs([
  {
    id: 1,
    title: "Frontend Developer",
    location: "Bandung",
    description: "React basic"
  }
]);


    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);
      alert("Lamaran dikirim");
    } catch (err) {
      alert("Gagal apply");
    }
  };

  return (
    <div>
      <h1>Lowongan Kerja</h1>

      {jobs.length === 0 && <p>Tidak ada lowongan</p>}

      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.description}</p>

          {token && (
            <button onClick={() => handleApply(job.id)}>
              Apply
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Jobs;
