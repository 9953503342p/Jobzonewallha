import JobZImage from "../../../common/jobz-img";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom"; 
import React, { useEffect, useState } from 'react';
import SectionCandidateProfileViews from "../../candidate/sections/dashboard/section-can-profile-views";

function EmpDashboardPage() {
      const [employerData, setEmployerData] = useState(null);
      const [stats, setStats] = useState({
        totalJobPosts: '',
        totalApplications: '',
        totalMessages: 0,
        totalNotifications: 0,
      });
      const [applications, setApplications] = useState([]);
      const [totalJobPosts, setTotalJobPosts] = useState(0);
      const [totalApplications, setTotalApplications] = useState(0);
      const [jobPosts, setJobPosts] = useState([]);
  const [error, setError] = useState(null);


      const navigate = useNavigate();
  
      useEffect(() => {
          // Load custom scripts
        
          // Check for candidateId in cookies
          const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
              const [key, value] = cookie.split("=");
              acc[key] = value;
              return acc;
          }, {});
  
          if (!cookies.employeeid) {
              // Redirect to login page if candidateId cookie is not present
              navigate("/after-login");
          }
      }, [navigate]);

  useEffect(() => {
    
    // Fetch recent job posts
    fetch(`${process.env.REACT_APP_API_URL}/employer-recent-activity`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // If using cookies for employerId, ensure the cookies are sent with the request
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // Handle errors here
          setError(data.message);
        } else {
          // Handle successful data fetch
          setJobPosts(data.last10JobPosts);
        }
      })
      .catch((err) => {
        setError('Error fetching data');
        console.error(err);
      });
  }, []);

      
    
      useEffect(() => {
        // Fetch recent applicants data
        const fetchApplications = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/employer-last-application`, {
              method: 'GET',
              credentials: 'include', // to include cookies (like employerId)
            });
            const data = await response.json();
            setApplications(data.lastFiveApplications);
            setTotalJobPosts(data.totalJobPosts);
            setTotalApplications(data.totalApplications);
          } catch (error) {
            console.error('Error fetching applications:', error);
          }
        };
    
        fetchApplications();
      }, []);
      useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/employer-stats`, {
              method: 'GET',
              credentials: 'include', 
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              setStats({
                totalJobPosts: data.totalJobPosts,
                totalApplications: data.totalApplications,
                totalMessages: 28, // Replace with dynamic value when available
                totalNotifications: 18, // Replace with dynamic value when available
              });
            } else {
              // Log the status and message for better debugging
              const errorText = await response.text();
              console.error('Failed to fetch employer stats', response.status, errorText);
            }
          } catch (error) {
            console.error('Error fetching stats:', error);
          }
        };
      
        fetchStats();
      }, []);
      
    
      // Fetch employer data when the component is mounted
      useEffect(() => {
        const fetchEmployerData = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/emploercandidate`, {
              method: 'GET',
              credentials: 'include',  // Include cookies with the request
            });
    
            if (response.ok) {
              const data = await response.json();
              setEmployerData(data); // Store the employer data in state
            } else {
              console.log('Error fetching employer data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching employer data:', error);
          }
        };
    
        fetchEmployerData();
      }, []); // Empty dependency array means this effect runs once after the first render
    
      if (!employerData) {
        return <div>Loading...</div>; // Show loading state until data is fetched
      }

  
    
    return (
        <>
            <div className="wt-admin-right-page-header clearfix">
                <h2>Hello, {employerData.companyName}</h2>
                <div className="breadcrumbs"><a href="#">Home</a><span>Dasboard</span></div>
            </div>
            <div className="twm-dash-b-blocks mb-5">
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
                        <div className="panel panel-default">
                            <div className="panel-body wt-panel-body gradi-1 dashboard-card ">
                                <div className="wt-card-wrap">
                                    <div className="wt-card-icon"><i className="far fa-address-book" /></div>
                                    <div className="wt-card-right wt-total-active-listing counter ">
                                        <CountUp end={stats.totalJobPosts} duration={10} />
                                    </div>
                                    <div className="wt-card-bottom ">
                                        <h4 className="m-b0">Posted Jobs</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
                        <div className="panel panel-default">
                            <div className="panel-body wt-panel-body gradi-2 dashboard-card ">
                                <div className="wt-card-wrap">
                                    <div className="wt-card-icon"><i className="far fa-file-alt" /></div>
                                    <div className="wt-card-right  wt-total-listing-view counter ">
                                        <CountUp end={stats.totalApplications} duration={10} />
                                    </div>
                                    <div className="wt-card-bottom">
                                        <h4 className="m-b0">Total Applications</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
                        <div className="panel panel-default">
                            <div className="panel-body wt-panel-body gradi-3 dashboard-card ">
                                <div className="wt-card-wrap">
                                    <div className="wt-card-icon"><i className="far fa-envelope" /></div>
                                    <div className="wt-card-right wt-total-listing-review counter ">
                                        <CountUp end={28} duration={10} />
                                    </div>
                                    <div className="wt-card-bottom">
                                        <h4 className="m-b0">Messages</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12 mb-3">
                        <div className="panel panel-default">
                            <div className="panel-body wt-panel-body gradi-4 dashboard-card ">
                                <div className="wt-card-wrap">
                                    <div className="wt-card-icon"><i className="far fa-bell" /></div>
                                    <div className="wt-card-right wt-total-listing-bookmarked counter ">
                                        <CountUp end={18} duration={10} />
                                    </div>
                                    <div className="wt-card-bottom">
                                        <h4 className="m-b0">Notifications</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="twm-pro-view-chart-wrap">
                <div className="row">
                    {/* <div className="col-xl-6 col-lg-12 col-md-12 mb-4">

                        <SectionCandidateProfileViews />

                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 mb-4">
                        <div className="panel panel-default">
                            <div className="panel-heading wt-panel-heading p-a20">
                                <h4 className="panel-tittle m-a0">Inbox</h4>
                            </div>
                            <div className="panel-body wt-panel-body bg-white">
                                <div className="dashboard-messages-box-scroll scrollbar-macosx">
                                    <div className="dashboard-messages-box">
                                        <div className="dashboard-message-avtar"><JobZImage src="images/user-avtar/pic1.jpg" alt="" /></div>
                                        <div className="dashboard-message-area">
                                            <h5>Lucy Smith<span>18 June 2023</span></h5>
                                            <p>Bring to the table win-win survival strategies to ensure proactive domination. at the end of the day, going forward, a new normal that has evolved from generation.</p>
                                        </div>
                                    </div>
                                    <div className="dashboard-messages-box">
                                        <div className="dashboard-message-avtar"><JobZImage src="images/user-avtar/pic3.jpg" alt="" /></div>
                                        <div className="dashboard-message-area">
                                            <h5>Richred paul<span>19 June 2023</span></h5>
                                            <p>Bring to the table win-win survival strategies to ensure proactive domination. at the end of the day, going forward, a new normal that has evolved from generation.</p>
                                        </div>
                                    </div>
                                    <div className="dashboard-messages-box">
                                        <div className="dashboard-message-avtar"><JobZImage src="images/user-avtar/pic4.jpg" alt="" /></div>
                                        <div className="dashboard-message-area">
                                            <h5>Jon Doe<span>20 June 2023</span></h5>
                                            <p>Bring to the table win-win survival strategies to ensure proactive domination. at the end of the day, going forward, a new normal that has evolved from generation.</p>
                                        </div>
                                    </div>
                                    <div className="dashboard-messages-box">
                                        <div className="dashboard-message-avtar"><JobZImage src="images/user-avtar/pic1.jpg" alt="" /></div>
                                        <div className="dashboard-message-area">
                                            <h5>Thomas Smith<span>22 June 2023</span></h5>
                                            <p>Bring to the table win-win survival strategies to ensure proactive domination. at the end of the day, going forward, a new normal that has evolved from generation. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-lg-12 col-md-12 mb-4">
                        <div className="panel panel-default site-bg-white m-t30">
                            <div className="panel-heading wt-panel-heading p-a20">
                                <h4 className="panel-tittle m-a0"><i className="far fa-list-alt" />Recent Activities</h4>
                            </div>
                            <div className="panel-body wt-panel-body">
                                <div className="dashboard-list-box list-box-with-icon">
                                {error && <p>{error}</p>}

<ul>
  {jobPosts.length > 0 ? (
    jobPosts.map((post, index) => (
      <li key={index}>
        <i className="fa fa-suitcase text-primary list-box-icon" />
        Your job for
        <a href="" className="text-primary">{post.jobcategory}</a>
        has been created!
      
      </li>
    ))
  ) : (
    <li>No recent job posts available.</li>
  )}
</ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 mb-4">
                        <div className="panel panel-default">
                            <div className="panel-heading wt-panel-heading p-a20">
                                <h4 className="panel-tittle m-a0">Recent Applicants</h4>
                            </div>
                            <div className="panel-body wt-panel-body bg-white">
                                <div className="twm-dashboard-candidates-wrap">
                                    <div className="row">
                                    {applications.length > 0 ? (
  applications.map((app, index) => (
    <div className="col-xl-6 col-lg-12 col-md-12" key={index}>
      <div className="twm-dash-candidates-list">
        <div className="twm-media">
          <div className="twm-media-pic">
            <img
              src={`${process.env.REACT_APP_API_URL}/${app.candidate.profileImage}` || 'default-profile.jpg'}
              alt="Candidate"
            />
          </div>
        </div>
        <div className="twm-mid-content">
          <a href={`http://localhost:3000/can-detail/${app.application.userId}`} className="twm-job-title">
            <h4>{app.candidate.name}</h4>
          </a>
          <p>{app.candidate.Jobcategory}</p>
          <div className="twm-fot-content">
            <div className="twm-left-info">
              <p className="twm-candidate-address">
                <i className="feather-map-pin" />
               {app.candidate.Country}
              </p>
              <div className="twm-jobs-vacancies">
                {app.candidate.Expectedsalery}
                <span>/Monthly</span>
              </div>
            </div>
            <div className="twm-right-btn">
         
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <p>No recent applicants found.</p>
)}
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

export default EmpDashboardPage;