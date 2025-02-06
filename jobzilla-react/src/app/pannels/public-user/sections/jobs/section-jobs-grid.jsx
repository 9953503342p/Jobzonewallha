import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SectionPagination from "../common/section-pagination";

function SectionJobsGrid({ perPage, filters }) {
  const [jobs, setJobs] = useState([]); // Initialize jobs as an empty array
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post-job`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Debug: Log the fetched data
        console.log("Fetched data:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error("Invalid data format: Expected an array");
          setJobs([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Fallback to an empty array on error
      }
    };

    fetchJobs();
  }, []); // Empty dependency array ensures this runs only once on mount

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

  // Filter jobs based on the filters
  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.jobcategory || job.jobcategory.includes(filters.jobcategory)) &&
      (!filters.offersalary || job.offeredsalary.includes(filters.offersalary)) &&
      (!filters.location || job.location.includes(filters.location)) &&
      (!filters.datePosted || 
        (filters.datePosted === "last 24 hours" && getDateDifference(job.startDate).diffDays === 0) ||
        (filters.datePosted === "last 7 days" && getDateDifference(job.startDate).diffDays <= 7) ||
        (filters.datePosted === "last 30 days" && getDateDifference(job.startDate).diffDays <= 30))
    );
  });

  const indexOfLastJob = currentPage * perPage;
  const indexOfFirstJob = indexOfLastJob - perPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      <div className="row">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => {
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
          })
        ) : (
          <div className="col-12">
            <p>No jobs found.</p>
          </div>
        )}
      </div>

      <SectionPagination
        totalItems={filteredJobs.length}
        perPage={perPage}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </>
  );
}

export default SectionJobsGrid;