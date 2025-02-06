import CountUp from "react-countup";
import React, { useEffect, useState } from 'react';

function SectionCandidateOverview() {
    const [candidateData, setCandidateData] = useState(null);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalAppliedApplications: 0,
        totalAppliedJobs: 0,
        totalAppliedCompanies: 0,
      });
    
      const [loading, setLoading] = useState(true);
      const [error1, setError1] = useState(null);
    
      // Fetch data from the backend
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user-application-stats`, {
              credentials: 'include', // Include cookies in the request
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch stats');
            }
    
            const data = await response.json();
            setStats({
              totalAppliedApplications: data.totalAppliedApplications,
              totalAppliedJobs: data.totalAppliedJobs,
              totalAppliedCompanies: data.totalAppliedCompanies,
            });
            setLoading(false);
          } catch (err) {
            console.error(err);
            setError1(err.message);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      
      
      
        useEffect(() => {
          const fetchCandidateData = async () => {
            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/candidates`, {
                method: 'GET',
                credentials: 'include', 
                headers: {
                  'Content-Type': 'application/json',
                },
              });
      
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch candidate data');
              }
      
              const data = await response.json();
              setCandidateData(data);
            } catch (err) {
              console.error(err);
              setError(err.message);
            }
          };
      
          fetchCandidateData();
        }, []);
      
        if (error) {
          return <div>Error: {error}</div>;
        }
      
        if (!candidateData) {
          return <div>Loading...</div>;
        }
    console.log(candidateData)
    return (
        <>
            <div className="wt-admin-right-page-header">
                <h2>{candidateData.Name}</h2>
                <p>{candidateData.Jobcategory}</p>
            </div>
            <div className="twm-dash-b-blocks mb-5">
                <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
          <div className="panel panel-default">
            <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-2">
              <div className="wt-card-wrap-2">
                <div className="wt-card-icon-2"><i className="flaticon-resume" /></div>
                <div className="wt-card-right wt-total-listing-view counter">
                  <CountUp end={stats.totalAppliedApplications} duration={2} />
                </div>
                <div className="wt-card-bottom-2">
                  <h4 className="m-b0">Total Applications</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
          <div className="panel panel-default">
            <div className="panel-body wt-panel-body dashboard-card-2 block-gradient">
              <div className="wt-card-wrap-2">
                <div className="wt-card-icon-2"><i className="flaticon-job" /></div>
                <div className="wt-card-right wt-total-active-listing counter">
                  <CountUp end={stats.totalAppliedJobs} duration={2} />
                </div>
                <div className="wt-card-bottom-2">
                  <h4 className="m-b0">Posted Jobs</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                        <div className="panel panel-default">
                            <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-3">
                                <div className="wt-card-wrap-2">
                                    <div className="wt-card-icon-2"><i className="flaticon-envelope" /></div>
                                    <div className="wt-card-right wt-total-listing-review counter ">
                                        <CountUp end={28} duration={10} />
                                    </div>
                                    <div className="wt-card-bottom-2">
                                        <h4 className="m-b0">Messages</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                        <div className="panel panel-default">
                            <div className="panel-body wt-panel-body dashboard-card-2 block-gradient-4">
                                <div className="wt-card-wrap-2">
                                    <div className="wt-card-icon-2"><i className="flaticon-bell" /></div>
                                    <div className="wt-card-right wt-total-listing-bookmarked counter ">
                                        <CountUp end={18} duration={10} />
                                    </div>
                                    <div className="wt-card-bottom-2">
                                        <h4 className="m-b0">Notifications</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionCandidateOverview;