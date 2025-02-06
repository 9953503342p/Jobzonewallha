import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionPagination from "../../sections/common/section-pagination";
import { useEffect } from "react";
import { loadScript } from "../../../../../globals/constants";
import React, { useState,  } from "react";

function EmployersListPage() {

    const _filterConfig = {
        prefix: "Showing",
        type: "Result",
        total: "10",
        showRange: true,
        showingUpto: "8"
    }

    const [vacancies, setVacancies] = useState([]);
  
    useEffect(() => {
      // Fetch job data from the backend (endpoint to fetch total vacancies and employer details)
      fetch(`${process.env.REACT_APP_API_URL}/vacancies/total`) // Replace with your API endpoint
        .then(response => response.json())
        .then(data => setVacancies(data.vacancies)) // Set the fetched vacancies data
        .catch(error => console.error('Error fetching job data:', error));
    }, []);
  

    useEffect(()=>{
        loadScript("js/custom.js")
    })

    return (
        <>
            <div className="section-full p-t120  p-b90 site-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 rightSidebar">
                            <SectionJobsSidebar1 /> 
                        </div>
                        <div className="col-lg-8 col-md-12">
                            {/*Filter Short By*/}
                            {/* <SectionRecordsFilter _config={_filterConfig} /> */}

                            <div className="twm-employer-list-wrap">
                            <ul>
                {vacancies.map((vacancy, index) => (
                    <li key={index}>
                      
                        <div className="twm-employer-list-style1 mb-5">
                            <div className="twm-media">
                                <img src={`${process.env.REACT_APP_API_URL}/${vacancy.employerDetails.companylogo}` || `images/logo-12.jpeg`} alt={vacancy.employerDetails.companyName} /> {/* Replace with employer image */}
                            </div>
                            <div className="twm-mid-content">
                                <NavLink to={`/emp-detail/${vacancy._id}`} className="twm-job-title">
                                    <h4>{vacancy.employerDetails.companyName}</h4>
                                </NavLink>
                                <p className="twm-job-address">{vacancy.completeaddress || 'complete Address not Availble'},{vacancy.country || 'country not Availble'} </p>
                                <NavLink to={vacancy.employerDetails.Website} className="twm-job-websites site-text-primary">
                                    {vacancy.employerDetails.Website}
                                </NavLink>
                            </div>
                            <div className="twm-right-content">
                                <div className="twm-jobs-vacancies">
                                    <span>{vacancy.totalVacancies || 35}</span> Vacancies
                                </div>
                            </div>
                          
                        </div>
                  
                    </li>
                ))}
            </ul>
                            </div>

                            <SectionPagination />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployersListPage;