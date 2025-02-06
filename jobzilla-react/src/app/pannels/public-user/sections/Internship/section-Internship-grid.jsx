import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SectionPagination from "../common/section-pagination";

function SectionInternshipsGrid({ perPage, filters }) {
  const [jobs, setJobs] = useState([]); // Store all internships
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch internships based on filters
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-internships?${queryParams}`);
        const data = await response.json();

        // Ensure data is always an array
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Expected an array but got:", data);
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching internships:", error);
        setJobs([]);
      }
    };

    fetchInternships();
  }, [filters]);

  // Calculate the date difference for each job
  const getDateDifference = (startDate) => {
    const now = new Date();
    const dateParts = startDate.split("/");
    if (dateParts.length === 3) {
      startDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }

    const start = new Date(startDate);
    if (isNaN(start)) {
      console.error("Invalid start date:", startDate);
      return { diffDays: 0, diffMonths: 0 };
    }

    const diffTime = now - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
    return { diffDays, diffMonths };
  };

  // Pagination logic
  const indexOfLastJob = currentPage * perPage;
  const indexOfFirstJob = indexOfLastJob - perPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      <div className="row">
        {currentJobs.map((job) => {
          const { diffDays, diffMonths } = getDateDifference(job.startDate);
          return (
            <div className="col-lg-6 col-md-12 m-b30" key={job._id}>
              <div className="twm-jobs-grid-style1">
                <div className="twm-media">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${job.userId.companylogo}`}
                    alt={job.userId._id}
                  />
                </div>
                <span className="twm-job-post-duration">
                  {diffMonths > 0
                    ? `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`
                    : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`}
                </span>
                <div className="twm-jobs-category green">
                  <span className="twm-bg-sky">{job.jobtype}</span>
                </div>
                <div className="twm-mid-content">
                  <NavLink to={`/job-detail/${job._id}`}>
                    <h4>{job.jobcategory}</h4>
                  </NavLink>
                  <p>{job.location}</p>
                  <a href={job.website} className="twm-job-websites site-text-primary">
                    {job.website}
                  </a>
                </div>
                <div className="twm-right-content">
                  <div className="twm-jobs-amount">
                    {job.offeredsalary} <span>/ Month</span>
                  </div>
                  <NavLink to={`/job-detail/${job._id}`}>Browse Job</NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <SectionPagination
        totalItems={jobs.length}
        perPage={perPage}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </>
  );
}

export default SectionInternshipsGrid;