import JobZImage from "../../../../../common/jobz-img";
import { publicUrlFor } from "../../../../../../globals/constants";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get the resumeId from the URL

function SectionCandidateShortIntro1() {
    const { resumeId } = useParams();  // Get the resumeId from the URL using useParams
    const [jobData, setJobData] = useState(null);  // Store the fetched resume data here

    useEffect(() => {
        // Only fetch if resumeId is available
        if (resumeId) {
            // Fetch resume data from the backend API using fetch
            fetch(`${process.env.REACT_APP_API_URL}/can-detail/${resumeId}`)
                .then((response) => response.json())  // Parse the JSON response
                .then((data) => {
                    setJobData(data);  // Save the fetched data to state
                })
                .catch((error) => {
                    console.error('Error fetching resume data:', error);
                });
        }
    }, [resumeId]);  
    const imageUrl = `${process.env.REACT_APP_API_URL}/${jobData?.Profileimage || "pic2.jpg"}`;


    if (!jobData) {
        return <div>Loading...</div>;  
    }

    // Ensure the structure of jobData before rendering
    return (
        <div className="twm-candi-self-wrap overlay-wraper" style={{ backgroundImage: `url(${publicUrlFor("images/candidates/candidate-bg.jpg")})` }}>
            <div className="overlay-main site-bg-primary opacity-01" />
            <div className="twm-candi-self-info">
                <div className="twm-candi-self-top">
                    <div className="twm-candi-fee">{jobData.Expectedsalery} / Month</div>  {/* Show dynamic salary */}
                    <div className="twm-media">
    {imageUrl ? (
      <img src={imageUrl} alt={jobData?.Username || 'Candidate'} />
    ) : (
      <i className="fa fa-user"></i>
    )}
  </div>
                    <div className="twm-mid-content">
                        <h4 className="twm-job-title">{jobData?.Username || "Candidate Name"}</h4>
                        <p>{jobData?.Jobcategory || "Job Category"}</p> {/* Show dynamic job title */}
                        <p className="twm-candidate-address"><i className="feather-map-pin" />{jobData?.Country || "Location"}</p> {/* Show dynamic location */}
                    </div>
                </div>
                {/* <div className="twm-candi-self-bottom">
                    <a href="#" className="site-button outline-white">Hire Me Now</a>
                    <a href="#" className="site-button secondry">Download CV</a>
                </div> */}
            </div>
        </div>
    );
}

export default SectionCandidateShortIntro1;
