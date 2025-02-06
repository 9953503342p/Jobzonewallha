import React, { useEffect, useState } from 'react';
function SectionCandidateRecentActivities() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    

    
  
    useEffect(() => {
      // Fetch the last applied jobs when the component mounts
      fetch(`${process.env.REACT_APP_API_URL}/user/last-applied-jobs`, {
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
    console.log("application",appliedJobs);
    return (
        <>
             <div className="panel panel-default site-bg-white m-t30">
      <div className="panel-heading wt-panel-heading p-a20">
        <h4 className="panel-tittle m-a0">
          <i className="far fa-list-alt" /> Recent Activities
        </h4>
      </div>
      <div className="panel-body wt-panel-body">
        <div className="dashboard-list-box list-box-with-icon">
          <ul>
            {appliedJobs.length > 0 ? (
              appliedJobs.map((apply, index) => (
                <li key={index}>
                <i className="fa fa-suitcase text-primary list-box-icon" />
                You applied to <strong>{apply.companyName}</strong> for the 
                <strong> {apply.jobCategory}</strong> job on{' '}
                {new Date(apply.appliedAt).toLocaleDateString()}.
              </li>
              ))
            ) : (
              <li>No recent applied jobs.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
        </>
    )
}

export default SectionCandidateRecentActivities;