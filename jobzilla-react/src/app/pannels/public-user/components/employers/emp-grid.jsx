import JobZImage from "../../../../common/jobz-img";
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import SectionPagination from "../../sections/common/section-pagination";
import { useEffect } from "react";
import React, { useState } from 'react';

import { loadScript } from "../../../../../globals/constants";

function EmployersGridPage() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    // Fetch job data from the backend (endpoint to fetch total vacancies and employer details)
    fetch(`${process.env.REACT_APP_API_URL}/vacancies/total`) // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setVacancies(data.vacancies)) // Set the fetched vacancies data
      .catch(error => console.error('Error fetching job data:', error));
  }, []);

  // Fetch data from the backend   
  const _filterConfig = {
    prefix: "Showing",
    type: "Result",
    total: "10",
    showRange: true,
    showingUpto: "8"
  }

  useEffect(() => {
    loadScript("js/custom.js");
  });

  return (
    <>
      <div className="section-full p-t120 p-b90 site-bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 rightSidebar">
              <SectionJobsSidebar1 />
            </div>
            <div className="col-lg-8 col-md-12">
              {/*Filter Short By*/}
              {/* <SectionRecordsFilter _config={_filterConfig} /> */}

              <div className="twm-employer-list-wrap">
                <div className="row">
                  {vacancies.map((vacancy, index) => (
                    <div key={index} className="col-lg-6 col-md-6">
                      <div className="twm-employer-grid-style1 mb-5">
                        <div className="twm-media">
                          {/* Display company logo */}
                          <img 
                            src={`${process.env.REACT_APP_API_URL}/${vacancy.employerDetails.companylogo}`|| 'images/logo-12.jpeg'} 
                            alt={vacancy.employerDetails.companyName} 
                          />
                        </div>
                        <div className="twm-mid-content">
                          <NavLink to={`/emp-detail/${vacancy._id}`} className="twm-job-title">
                            <h4>{vacancy.employerDetails.companyName}</h4>
                          </NavLink>
                          <p className="twm-job-address">
                            {/* Display address or default message */}
                            {vacancy.completeaddress || 'Location not available'}, {vacancy.country}
                          </p>
                          <NavLink to={`/emp-detail/${vacancy.employerDetails.Website}`} className="twm-job-websites site-text-primary">
                            {/* Display website */}
                            {vacancy.employerDetails.Website || 'Website not available'}
                          </NavLink>
                        </div>
                        <div className="twm-right-content">
                          <div className="twm-jobs-vacancies">
                            {/* Display total vacancies */}
                            <span>{vacancy.totalVacancies || 0}</span> Vacancies
                          </div>
                        </div>
                      </div>
                    </div>
              
                  ))}
                </div>
              </div>

              <SectionPagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployersGridPage;
