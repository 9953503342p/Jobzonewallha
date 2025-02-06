import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import JobZImage from "../../../../../common/jobz-img";
import { publicUser } from "../../../../../../globals/route-names";

function SectionAvailableJobsList() {
  const [jobs, setJobs] = useState([]);
  const {userId} = useParams(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/jobs/last4/${userId}`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading available jobs...</p>;
  }

  if (jobs.length === 0) {
    return <p>No jobs available for this employer.</p>;
  }

  return (
    <>
      <h4 className="twm-s-title">Available Jobs</h4>
      <div className="twm-jobs-list-wrap">
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <div className="twm-jobs-list-style1 mb-5">
                <div className="twm-media">
                <img 
  src={job.userId.companylogo ? `${process.env.REACT_APP_API_URL}/${job.userId.companylogo}` : "images/jobs-company/default.jpg"} 
  alt={job.title || "Job Image"} 
/>
     </div>
                <div className="twm-mid-content">
                  <NavLink to={`${publicUser.jobs.DETAIL1}/${job._id}`} className="twm-job-title">
                    <h4>
                      {job.jobcategory}
                      {/* <span className="twm-job-post-duration"> / {new Date(job.createdAt).toLocaleDateString()}</span> */}
                    </h4>
                  </NavLink>
                  <p className="twm-job-address">{job.location || "Location not specified"}</p>
                  <a href={job.website || "#"} className="twm-job-websites site-text-primary">
                    {job.website || "Website not available"}
                  </a>
                </div>
                <div className="twm-right-content">
                  <div className="twm-jobs-category green">
                    <span className="twm-bg-green">{job.jobtype || "Job Type"}</span>
                  </div>
                  <div className="twm-jobs-amount">
                    {job.offeredsalary || "Salary not specified"} <span>/ Month</span>
                  </div>
                  <NavLink to={`${publicUser.jobs.DETAIL1}/${job._id}`} className="twm-jobs-browse site-text-primary">
                    Browse Job
                  </NavLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SectionAvailableJobsList;
