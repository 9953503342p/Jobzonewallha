import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SectionEmployersCandidateSidebar from "../../sections/common/section-emp-can-sidebar";
import SectionShareProfile from "../../sections/common/section-share-profile";
import SectionOfficePhotos1 from "../../sections/common/section-office-photos1";
import SectionOfficeVideo1 from "../../sections/common/section-office-video1";
import SectionAvailableJobsList from "../../sections/employers/detail/section-available-jobs-list";
import { loadScript } from "../../../../../globals/constants";
import SectionShareProfile1 from "../../sections/common/section-share-profile1";
import SectionOfficeImage1 from "../../sections/common/section-office-image1";
import Sectionemployersidebar from "../../sections/common/section-emp-sidebar";

function EmployersDetail1Page() {
  const {userId}  = useParams(); // Get the userId from the URL parameter
  const [employer, setEmployer] = useState(null); // State to hold employer data
  const [loading, setLoading] = useState(true); // Loading state
console.log('asdvfh', userId)
  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employers/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employer data');
        }
        const employerData = await response.json();
        setEmployer(employerData); // Set employer data to state
      } catch (error) {
        console.error('Error fetching employer:', error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    if (userId) {
      fetchEmployer();
    }
  }, [userId]);

  // Log employer data for debugging
  console.log("Employer data:", employer);

  // Load custom script after initial render
  useEffect(() => {
    loadScript("js/custom.js");
  }, []);

  // Return loading state or content when employer data is available
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="section-full p-t120 p-b90 bg-white">
        <div className="container">
          <div className="section-content">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8 col-md-12">
                {/* Employer detail START */}
                <div className="cabdidate-de-info">
                  <div className="twm-employer-self-wrap">
                    <div className="twm-employer-self-info">
                      <div className="twm-employer-self-top">
                        <div className="twm-media-bg">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${employer?.backgroundbannerlogo}`} // Display employer cover image
                            alt="Cover"
                            style={{ height: "350px", width: "100%", objectFit: "contain" }}
                          />
                        </div>
                        <div className="twm-mid-content">
                          <div className="twm-media">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${employer?.companylogo}`} // Display employer profile image
                              alt="Profile"
                            />
                          </div>
                          <h4 className="twm-job-title">{employer?.companyName}</h4>
                          <p className="twm-employer-address">
                            <i className="feather-map-pin" />
                            {employer?.Address}
                          </p>
                          <a href={employer?.Website} className="twm-employer-websites site-text-primary">
                            {employer?.Website}
                          </a>
                          <div className="twm-employer-self-bottom">
                            <a href="#" className="site-button outline-primary">
                              Add Review
                            </a>
                            <a href="#" className="site-button">Follow Us</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="twm-s-title">About Company</h4>
                  <p>{employer?.about}</p>

                  {/* <h4 className="twm-s-title">Responsibilities</h4>
                  <ul className="description-list-2">
                                        <li>
                                            <i className="feather-check" />
                                            Establish and promote design guidelines, best practices and standards.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Accurately estimate design tickets during planning sessions.
                                        </li>
                                        <li>
                                            <i className="feather-check" />
                                            Partnering with product and engineering to translate business and user goals.
                                        </li>
                                    </ul> */}
                  <SectionShareProfile1 />
                  <div className="twm-two-part-section">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                     <SectionOfficeImage1 />
                      </div>
                      <div className="col-lg-12 col-md-12">
                        {/* <SectionOfficeVideo1 /> */}
                      </div>
                    </div>
                  </div>
                  <SectionAvailableJobsList />
                </div>
              </div>
              <div className="col-lg-4 col-md-12 rightSidebar">
                <Sectionemployersidebar type="1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployersDetail1Page;
