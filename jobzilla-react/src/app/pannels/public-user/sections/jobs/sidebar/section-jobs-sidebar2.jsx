import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../../globals/route-names";
import SectionSideAdvert from "./section-side-advert";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import JobZImage from "../../../../../common/jobz-img";

function SectionJobsSidebar2({ _config }) {
    const { jobId } = useParams();  
    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobData1, setJobData1] = useState(null);
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/job/applications/${jobId}`);
        const data = await response.json();

        if (response.ok) {
          setJobData1(data.jobDetails);
          setApplicationCount(data.applicationCount);
        } else {
          console.error("Error fetching job details:", data.message);
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

    useEffect(() => {
      const fetchJobData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/post-job/${jobId}`);
          setJobData(response.data);  // Set job data in state
          setLoading(false);
        } catch (err) {
          setError('Error fetching job data');
          setLoading(false);
        }
      };
  
      fetchJobData();
    }, [jobId]);  // Re-run the effect if jobId changes
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
        <>
            <div className="side-bar mb-4">
            <div className="twm-s-info2-wrap mb-5">
      <div className="twm-s-info2">
        <h4 className="section-head-small mb-4">Job Information</h4>
        <ul className="twm-job-hilites">
            <li>
              <i className="fas fa-calendar-alt" />
              <span className="twm-title">{jobData1.startDate}</span>
            </li>
            <li>
              <i className="fas fa-eye" />
              <span className="twm-title">{jobData.Vacnices} Vacnices</span>
            </li>
            <li>
              <i className="fas fa-file-signature" />
              <span className="twm-title">{applicationCount} Applicants</span>
            </li>
          </ul>
        <ul className="twm-job-hilites2">
          <li>
            <div className="twm-s-info-inner">
              <i className="fas fa-calendar-alt" />
              <span className="twm-title">Date Posted</span>
              <div className="twm-s-info-discription">{new Date(jobData.startDate).toLocaleDateString()}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
              <i className="fas fa-map-marker-alt" />
              <span className="twm-title">Location</span>
              <div className="twm-s-info-discription">{jobData.location}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
              <i className="fas fa-user-tie" />
              <span className="twm-title">Job Title</span>
              <div className="twm-s-info-discription">{jobData.jobtitle}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
              <i className="fas fa-clock" />
              <span className="twm-title">Experience</span>
              <div className="twm-s-info-discription">{jobData.experience} Year</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
              <i className="fas fa-suitcase" />
              <span className="twm-title">Qualification</span>
              <div className="twm-s-info-discription">{jobData.qualification}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
              <i className="fas fa-venus-mars" />
              <span className="twm-title">Gender</span>
              <div className="twm-s-info-discription">{jobData.gender}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
              <i className="fas fa-money-bill-wave" />
              <span className="twm-title">Offered Salary</span>
              <div className="twm-s-info-discription">{jobData.offeredsalary}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
                {/* <div className="widget tw-sidebar-tags-wrap">
                    <h4 className="section-head-small mb-4">Job Skills</h4>
                    <div className="tagcloud">
                        <a href="#">Html</a>
                        <a href="#">Python</a>
                        <a href="#">WordPress</a>
                        <a href="#">JavaScript</a>
                        <a href="#">Figma</a>
                        <a href="#">Angular</a>
                        <a href="#">Reactjs</a>
                        <a href="#">Drupal</a>
                        <a href="#">Joomla</a>
                    </div>
                </div> */}
            </div>

            {
                _config.showJobInfo &&
                <div className="twm-s-info3-wrap mb-5">
                    <div className="twm-s-info3">
                        <div className="twm-s-info-logo-section">
                            <div className="twm-media">
                          <img src={`${process.env.REACT_APP_API_URL}/${jobData.userId.companylogo}`} alt="#" />

                            </div>
                            <h4 className="twm-title">Senior Web Designer , Developer</h4>
                        </div>
                        <ul>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-building" />
                                    <span className="twm-title">Company</span>
                                    <div className="twm-s-info-discription">{jobData.userId.companyName}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-mobile-alt" />
                                    <span className="twm-title">Phone</span>
                                    <div className="twm-s-info-discription">{jobData.userId.phone}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-at" />
                                    <span className="twm-title">Email</span>
                                    <div className="twm-s-info-discription">{jobData.userId.email}</div>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-desktop" />
                                    <span className="twm-title">Website</span>
                                    <a href={jobData.userId.Website}>
                                    <div className="twm-s-info-discription">{jobData.userId.Website}</div></a>
                                </div>
                            </li>
                            <li>
                                <div className="twm-s-info-inner">
                                    <i className="fas fa-map-marker-alt" />
                                    <span className="twm-title">Address</span>
                                    <div className="twm-s-info-discription">{jobData.completeaddress}</div>
                                </div>
                            </li>
                        </ul>
                        <NavLink to={publicUser.pages.ABOUT} className=" site-button">Vew Profile</NavLink>
                    </div>
                </div>
            }
            
            <SectionSideAdvert />
        </>
    )
}

export default SectionJobsSidebar2;