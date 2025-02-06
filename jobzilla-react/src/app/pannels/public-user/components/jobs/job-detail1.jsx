import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadScript } from "../../../../../globals/constants";
import SectionJobLocation from "../../sections/jobs/detail/section-job-location";
import SectionOfficePhotos1 from "../../sections/common/section-office-photos1";
import SectionOfficeVideo1 from "../../sections/common/section-office-video1";
import SectionShareProfile from "../../sections/common/section-share-profile";
import SectionJobsSidebar2 from "../../sections/jobs/sidebar/section-jobs-sidebar2";
import ApplyJobPopup from "../../../../common/popups/popup-apply-job";
import SectionOfficeImage1 from '../../sections/common/section-office-image1';

function JobDetail1Page() {
  useEffect(() => {
    loadScript("js/custom.js");
  }, []);

  const { jobId } = useParams(); // Destructure jobId from the URL params
  const [job, setJob] = useState(null); // State for storing job details
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track error

  useEffect(() => {
    // Fetch job details using jobId from the URL
    fetch(`${process.env.REACT_APP_API_URL}/post-job/${jobId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching job data');
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        setJob(data); // Set job data to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError(err.message); // Handle errors
        setLoading(false); // Set loading to false
      });
  }, [jobId]); // Dependency on jobId, to refetch when it changes

  function getDateDifference(startDate) {
    const now = new Date();
    const dateParts = startDate.split('/');
    if (dateParts.length === 3) {
      const formattedStartDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      startDate = formattedStartDate;
    }

    const start = new Date(startDate);
    if (isNaN(start)) {
      console.error('Invalid start date:', startDate);
      return { diffDays: 0, diffMonths: 0 };
    }

    const diffTime = now - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30); // Approximate months
    return { diffDays, diffMonths };
  }

  const sidebarConfig = {
    showJobInfo: true,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { diffDays, diffMonths } = getDateDifference(job.startDate);
  const durationText =
    diffMonths > 0
      ? `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`
      : `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;

  return (
    <>
      <div className="section-full  p-t120 p-b90 bg-white">
        <div className="container">
          <div className="section-content">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8 col-md-12">
                <div className="cabdidate-de-info">
                  <div className="twm-job-self-wrap">
                    <div className="twm-job-self-info">
                      <div className="twm-job-self-top">
                        <div className="twm-media-bg">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${job.userId.backgroundbannerlogo}`}
                            alt="#"
                            style={{
                              height: '300px',
                              width: '100%',
                              objectFit: 'contain',
                            }}
                          />
                          <div className="twm-jobs-category green">
                            <span className="twm-bg-green">New</span>
                          </div>
                        </div>
                        <div className="twm-mid-content">
                          <div className="twm-media">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${job.userId.companylogo}`}
                              alt={job.userId.companyName}
                            />
                          </div>
                          <h4 className="twm-job-title">
                            {job.jobcategory}{' '}
                            <span className="twm-job-post-duration">
                              / {durationText}
                            </span>
                          </h4>
                          <p className="twm-job-address">
                            <i className="feather-map-pin" />
                            {job.completeaddress}
                          </p>
                          <div className="twm-job-self-mid">
                            <div className="twm-job-self-mid-left">
                              <div className="twm-jobs-amount">
                                {job.offeredsalary}{' '}
                                <span>/ Month</span>
                              </div>
                            </div>
                            <div className="twm-job-apllication-area">
                              Application ends:{' '}
                              <span className="twm-job-apllication-date">
                                {job.endDate}
                              </span>
                            </div>
                          </div>
                          <div className="twm-job-self-bottom">
                          <a href={`/apply-job/${jobId}`} className="btn btn-primary">
        Apply job
        </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
<div className="cabdidate-de-info" >
                  <h4 className="twm-s-title m-t0">Job Description:</h4>
                  <p>{job.description}</p>
                  <h4 className="twm-s-title">Requirements:</h4>
                {/* <ul className="description-list-2">
                    {requirements.map((req, index) => (
                        <li key={index}>
                            <i className="feather-check" />
                            {req}
                        </li>
                    ))}
                </ul> */}

<p>{job.Requirements}</p>

<h4 className="twm-s-title">Responsibilities:</h4>
                {/* <ul className="description-list-2">
                    {responsibilities.map((resp, index) => (
                        <li key={index}>
                            <i className="feather-check" />
                            {resp}
                        </li>
                    ))}
                </ul> */}
                <p>{job.Responsibilities}</p>
                </div>

                  <SectionShareProfile />
            

                  <div className="twm-two-part-section">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <SectionOfficePhotos1 />
                      </div>
                      {/* <div className="col-lg-6 col-md-12">
                        <SectionOfficeVideo1 />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 rightSidebar">
                <SectionJobsSidebar2 _config={sidebarConfig} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplyJobPopup />
    </>
  );
}

export default JobDetail1Page;
