import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCompanyJobs,
  getAllJobs,
  deleteJob,
  createJob
} from "../api/jobs.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (user.role === "company") {
      getCompanyJobs().then(res => setJobs(res.data));
    } else if (user.role === "admin") {
      getAllJobs().then(res => setJobs(res.data));
    }
  }, [user.role]);

  const submitJob = async () => {
    await createJob({ title });
    const res = await getCompanyJobs();
    setJobs(res.data);
    setTitle("");
  };

  const removeJob = async (id) => {
    await deleteJob(id);
    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div>
      <h1>Dashboard ({user.role})</h1>

      {/* COMPANY */}
      {user.role === "company" && (
        <>
          <input
            placeholder="Judul Job"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button onClick={submitJob}>Buat Job</button>
        </>
      )}

      <hr />

      {jobs.map(job => (
        <div key={job.id}>
          <b>{job.title}</b>

          {user.role === "company" && (
            <Link to={`/applications?jobId=${job.id}`}>
              Lihat Pelamar
            </Link>
          )}

          {user.role === "admin" && (
            <button onClick={() => removeJob(job.id)}>Hapus</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
