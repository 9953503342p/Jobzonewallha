import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import JobZImage from "../../../common/jobz-img";
import SectionRecordsFilter from "../../public-user/sections/common/section-records-filter";
import SectionPagination from "../../public-user/sections/common/section-pagination";
import { loadScript } from "../../../../globals/constants";

function CanAppliedJobsPage() {
  const _filterConfig = {
    prefix: "Applied",
    type: "jobs",
    total: "250",
    showRange: false,
    showingUpto: "",
  };
  

  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const candidateId = Cookies.get("candidateId");

  useEffect(() => {
    loadScript("js/custom.js");
  }, []);

  useEffect(() => {
    if (!candidateId) {
      navigate("/after-login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/applies-job`, {
          withCredentials: true,
        });
        setApplications(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [candidateId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
console.log(applications)
  return (
    <div className="twm-right-section-panel candidate-save-job site-bg-gray">
      {/* <SectionRecordsFilter _config={_filterConfig} /> */}
      <div className="twm-jobs-list-wrap">
        <ul>
          {applications.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </ul>
      </div>
      <SectionPagination />
    </div>
  );
}

function JobCard({ job }) {
  return (
<li>
  <div className="twm-jobs-list-style1 mb-5">
    <div className="twm-media">
    <img
  src={
    job.JobId?.userId?.companylogo
      ? `${process.env.REACT_APP_API_URL}/${job.JobId?.userId?.companylogo}`
      : "images/jobs-company/default.jpg"
  }
  alt={job.JobId?.userId?.companylogo || "Job"}
/>



    </div>
    <div className="twm-mid-content">
      <NavLink to={`/job-detail/${job.JobId?._id}`} className="twm-job-title">
        <h4>
          {job.JobId?.jobtitle || "Job Title"}
          <span className="twm-job-post-duration">
  / {job.JobId?.startDate ? new Date(job.JobId.startDate).toLocaleString('default', { month: 'long' }) : "N/A"} 
</span>

        </h4>
      </NavLink>
      <p className="twm-job-address">{job.JobId?.location || "Location not available"}</p>
      <a href={job.JobId?.website} className="twm-job-websites site-text-primary">
        {job.JobId?.website || "No Website"}
      </a>
    </div>
    <div className="twm-right-content">
      <div className={`twm-jobs-category  || "default"}`}>
        <span className={`twm-bg- || "default"}`}>
          {job.JobId?.jobCategory || "Category"}
        </span>
      </div>
      <div className="twm-jobs-amount">
      <span> Status:  {job.approved || "Pendiing"}</span> 
      </div>
      <div className="twm-jobs-amount">
        {job.JobId?.offeredsalary || "Salary not specified"} <span>/ Month</span>
      </div>
      <NavLink to={`${process.env.REACT_APP_API_URL}/job-detail/${job.JobId?._id}`} className="twm-jobs-browse site-text-primary">
        Apply Job
      </NavLink>
    </div>
  </div>
</li>

  );
}

export default CanAppliedJobsPage;
