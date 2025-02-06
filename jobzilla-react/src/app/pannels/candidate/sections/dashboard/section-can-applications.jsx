import JobZImage from "../../../../common/jobz-img";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
function SectionCandidateRecentApplications() {

       const [appliedJobs, setAppliedJobs] = useState([]);
       const [loading, setLoading] = useState(true);
       const [error, setError] = useState(null);
     
       useEffect(() => {
         // Fetch the last applied jobs when the component mounts
         fetch(`${process.env.REACT_APP_API_URL}/user/last-5appliedccompany-jobs`, {
           method: 'GET',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json',
           },
         })
           .then((response) => response.json())
           .then((data) => {
             setAppliedJobs(data);  // Set the fetched data in the state
             setLoading(false);      // Stop loading when data is fetched
           })
           .catch((error) => {
             setError('Unable to fetch applied jobs.');
             setLoading(false);      // Stop loading even if there's an error
           });
       }, []); // Empty dependency array to run this effect only once
     
       // If loading, display a loading message
       if (loading) {
         return <div>Loading...</div>;
       }
     
       // If there's an error, display the error message
       if (error) {
         return <div>{error}</div>;
       }
       console.log('appliedcompany',appliedJobs);

       const handleDeleteJob = (applyId) => {
        console.log('Deleting job with ID:', applyId);  // Add this to see if the correct applyId is being passed
      
        fetch(`${process.env.REACT_APP_API_URL}/apply/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ applyId }),  // Send the applyId in the request body
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === 'Apply document deleted successfully') {
              // If delete is successful, update the state
              setAppliedJobs(appliedJobs.filter((job) => job._id !== applyId));
             
              window.location.reload();
            } else {
            }
          })
          .catch((error) => {
            console.error('Error deleting job:', error);
            alert('Error deleting the job');
          });
      };
      
    return (
        <>
          <div className="panel panel-default">
            <div className="panel-heading wt-panel-heading p-a20">
                <h4 className="panel-tittle m-a0">Recent Applicants</h4>
            </div>
            <div className="panel-body wt-panel-body bg-white">
                <div className="twm-dashboard-candidates-wrap">
                    <div className="row">
                        {appliedJobs.map((job, index) => (
                            <div className="col-xl-12 col-lg-12 col-md-12" key={index}>
                                <div className="twm-dash-candidates-list">
                                    <div className="twm-media">
                                        <div className="twm-media-pic">
                                            {/* Show company logo if available */}
                                            <img src={`${process.env.REACT_APP_API_URL}/${job.companylogo}` || "default-logo.jpg"} alt={job.companyName} />
                                        </div>
                                    </div>
                                    <div className="twm-mid-content">
                                        <a href="#" className="twm-job-title">
                                            <h4>{job.companyName}</h4>
                                        </a>
                                        <p>{job.jobCategory}</p>
                                        <div className="twm-fot-content">
                                            <div className="twm-left-info">
                                                <p className="twm-candidate-address"><i className="feather-map-pin" />{job.city}</p>
                                                <div className="twm-jobs-vacancies">{job.offeredsalary} <span>/ Monthly</span></div>
                                            </div>
                                            <div className="twm-right-btn">
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SectionCandidateRecentApplications;