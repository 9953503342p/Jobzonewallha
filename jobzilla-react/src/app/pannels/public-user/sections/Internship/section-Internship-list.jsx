import JobZImage from "../../../../common/jobz-img";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import SectionPagination from "../common/section-pagination";
import React, { useEffect, useState } from 'react';
function SectionInternshipsList({perPage}) {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/get-internships`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * perPage;
  const indexOfFirstJob = indexOfLastJob - perPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  if (loading) return <p>Loading internships...</p>;
  if (error) return <p>Error: {error}</p>;
  if (jobs.length === 0) return <p>No internships available at the moment.</p>;

   
    return (
        <>
            <div>
                <div className="twm-jobs-list-wrap">
                <ul>
                {currentJobs.map((job, index) => (
              <li key={index}>
                <div className="twm-jobs-list-style1 mb-5">
                  <div className="twm-media">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/${job.userId.companylogo}`}
                      alt={job.userId.companyName}
                      style={{ height: '100px', width: '100px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="twm-mid-content">
                    <NavLink to={`/job-detail/${job._id}`} className="twm-job-title">
                      <h4>
                        {job.jobtitle} <span className="twm-job-post-duration">{job.startDate}</span>
                      </h4>
                    </NavLink>
                    <p className="twm-job-address">{job.country}</p>
                    <a href={job.website} className="twm-job-websites site-text-primary">
                      {job.website}
                    </a>
                  </div>
                  <div className="twm-right-content">
                    <div className={`twm-jobs-category ${job.jobtype || 'default-category'}`}>
                      <span className="twm-bg-green">{job.jobtype || 'Default'}</span>
                    </div>
                    <div className="twm-jobs-amount">
                      {job.offeredsalary} <span>/ Month</span>
                    </div>
                    <NavLink to={`/job-detail/${job._id}`} className="twm-jobs-browse site-text-primary">
                      Browse Job
                    </NavLink>
                  </div>
                </div>
              </li>
            ))}
    </ul>
                </div>
                <SectionPagination
               totalItems={jobs.length}
               perPage={perPage}
               currentPage={currentPage}
               paginate={setCurrentPage} />
            </div>

        </>
    )
}

export default SectionInternshipsList;