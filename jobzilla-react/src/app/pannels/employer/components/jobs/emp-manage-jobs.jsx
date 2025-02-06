import React, { useState, useEffect } from "react";
import JobZImage from "../../../../common/jobz-img";

import { useNavigate } from "react-router-dom"; 
import { NavLink } from 'react-router-dom';
import { pubRoute } from "../../../../../globals/route-names";

import { employer, empRoute, publicUser } from "../../../../../globals/route-names";

function EmpManageJobsPage() {
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
            const navigate = useNavigate();
        
            useEffect(() => {
                // Load custom scripts
              
                // Check for candidateId in cookies
                const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
                    const [key, value] = cookie.split("=");
                    acc[key] = value;
                    return acc;
                }, {});
        
                if (!cookies.employeeid) {
                    // Redirect to login page if candidateId cookie is not present
                    navigate("/after-login");
                }
            }, [navigate]);
  

  // Function to parse the date string
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    // Fetch employer and jobs data when the component mounts using fetch
    fetch(`${process.env.REACT_APP_API_URL}/api/employer/jobs`, {
      credentials: 'include', // Include cookies in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Log the API response
        if (data.employer && data.jobs) {
          setEmployer(data.employer);
          setJobs(data.jobs);
        } else {
          throw new Error("Invalid data structure");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err); // Log the error
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array to run only once

  const handleDeleteJob = (jobId) => {
    // Make a DELETE request to the backend API to delete the job
    fetch(`${process.env.REACT_APP_API_URL}/jobs/${jobId}`, {
      method: 'DELETE',
      credentials: 'include', // Include cookies in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the job");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Delete Success:", data);
        // Remove the deleted job from the jobs list in the state
        setJobs((prevJobs) => prevJobs.filter((job) => job.jobId !== jobId));
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if data fetch fails
  }

  
  return (
    <>
      <div className="wt-admin-right-page-header clearfix">
        <h2>Manage Jobs</h2>
        <div className="breadcrumbs">
          <a href="#">Home</a>
          <a href="#">Dashboard</a>
          <span>My Job Listing</span>
        </div>
      </div>

      {/* Job Listing */}
      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-tittle m-a0">
            <i className="fa fa-suitcase" /> Job Details
          </h4>
        </div>
        <div className="panel-body wt-panel-body p-a20 m-b30">
          <div className="twm-D_table p-a20 table-responsive">
            <table id="jobs_bookmark_table" className="table table-bordered twm-bookmark-list-wrap">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Category</th>
                  <th>Job Types</th>
                  <th>Applications</th>
                  <th>Created &amp; Expired</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job.jobId}>
                      <td>
                        <div className="twm-bookmark-list">
                          <div className="twm-media">
                            <div className="twm-media-pic">
                              {/* Use the employer's logo for all jobs */}
                              <img
                                src={employer?.logo ? `${process.env.REACT_APP_API_URL}/${employer.logo}` : "images/default-logo.png"}
                                alt="Company Logo"
                              />
                            </div>
                          </div>
                          <div className="twm-mid-content">
                            <a href="#" className="twm-job-title">
                              <h4>{job.jobtitle}</h4>
                              <p className="twm-bookmark-address">
                                <i className="feather-map-pin" />
                                {job.location}
                              </p>
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>{job.jobcategory}</td>
                      <td>
                        <div className="twm-jobs-category">
                          <span className="twm-bg-green">{job.jobtype}</span>
                        </div>
                      </td>
                      <td>
                        <a href="#" className="site-text-primary">
                          {job.applications} Applied
                        </a>
                      </td>
                      <td>
                        <div>{parseDate(job.startDate).toLocaleDateString()}</div>
                        <div>{parseDate(job.endDate).toLocaleDateString()}</div>
                      </td>
                      <td>
                        <div className="twm-table-controls">
                          <ul className="twm-DT-controls-icon list-unstyled">
                       
                            <li>
                               <NavLink to={`${empRoute('/employer/Editjob/')}${job.jobId}`} title="Edit" data-bs-toggle="tooltip" data-bs-placement="top">
                                <span className="far fa-edit" />
                              </NavLink>
                            </li>
                            <li>
                              <button
                                title="Delete"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                onClick={() => handleDeleteJob(job.jobId)}
                              >
                                <span className="far fa-trash-alt" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpManageJobsPage;
