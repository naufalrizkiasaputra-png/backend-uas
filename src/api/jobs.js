import api from "./axios";

export const getJobs = () => api.get("/jobs");

export const applyJob = (jobId) =>
  api.post("/apply", { job_id: jobId });

export const getMyApplications = () =>
  api.get("/applications/user");

export const createJob = (data) =>
  api.post("/jobs", data);

// ================= COMPANY =================
export const getCompanyJobs = () =>
  api.get("/jobs/company");

// ================= ADMIN =================
export const getAllJobs = () =>
  api.get("/jobs");

export const deleteJob = (id) =>
  api.delete(`/jobs/${id}`);

// ================= APPLICATIONS =================
export const getApplicantsByJob = (jobId) =>
  api.get(`/applications/job/${jobId}`);

export const updateApplicationStatus = (id, status) =>
  api.patch(`/applications/${id}`, { status });


