import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function JobPosts() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newJob, setNewJob] = useState({ postId: "", postName: "", postDesc: "", reqExperience: 0, techStack: "" });
  
  useEffect(() => {
    fetch(`${API_URL}/jobPosts`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handleSaveJob = () => {
    const method = newJob.postId || newJob.postId === 0 ? "PUT" : "POST";
    const jobData = { ...newJob, techStack: newJob.techStack.split(",").map((tech) => tech.trim()) };
    fetch(`${API_URL}/jobPost`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then((updatedJob) => {
        setJobs((prevJobs) =>
          prevJobs.some((job) => job.postId === updatedJob.postId)
            ? prevJobs.map((job) => (job.postId === updatedJob.postId ? updatedJob : job))
            : [...prevJobs, updatedJob]
        );
        setNewJob({ postId: "", postName: "", postDesc: "", reqExperience: 0, techStack: "" });
      });
  };

  const handleDeleteJob = (postId) => {
    fetch(`${API_URL}/jobPost/${postId}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setJobs(jobs.filter((job) => job.postId !== postId));
        }
      });
  };

  return (
    <div>
      <h1>Job Posts</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {jobs.filter((job) => job.postName.toLowerCase().includes(searchTerm.toLowerCase())).map((job) => (
          <li key={job.postId}>
            <strong>{job.postName}</strong> - {job.postDesc} ({job.reqExperience} years experience)
            <br />
            Tech Stack: {job.techStack.join(", ")}
            <br />
            <button onClick={() => setNewJob({ ...job, techStack: job.techStack.join(", ") })}>Edit</button>
            <button onClick={() => handleDeleteJob(job.postId)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>{newJob.postId || newJob.postId === 0 ? "Update Job" : "Add Job"}</h2>
      <input
        type="number"
        placeholder="Post ID"
        value={newJob.postId}
        onChange={(e) => setNewJob({ ...newJob, postId: Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Post Name"
        value={newJob.postName}
        onChange={(e) => setNewJob({ ...newJob, postName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newJob.postDesc}
        onChange={(e) => setNewJob({ ...newJob, postDesc: e.target.value })}
      />
      <input
        type="number"
        placeholder="Required Experience"
        value={newJob.reqExperience}
        onChange={(e) => setNewJob({ ...newJob, reqExperience: Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Tech Stack (comma-separated)"
        value={newJob.techStack}
        onChange={(e) => setNewJob({ ...newJob, techStack: e.target.value })}
      />
      <button onClick={handleSaveJob}>{newJob.postId || newJob.postId === 0 ? "Update Job" : "Add Job"}</button>
    </div>
  );
}

export default JobPosts;