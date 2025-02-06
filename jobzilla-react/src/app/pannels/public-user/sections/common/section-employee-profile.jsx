import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SectionEmployeProfile() {
  const  {userId}  = useParams(); // Extract userId from the URL parameters
  const [jobData, setJobData] = useState(null); // Store fetched employer data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employers/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employer data');
        }
        const data = await response.json();
        setJobData(data); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (userId) {
      fetchEmployerData(); // Fetch data only if userId is available
    }
  }, [userId]);

 

 
  console.log('imdfnsdn' ,jobData);

  return (
    <>
      <h4 className="section-head-small mb-4">Profile Info</h4>
      <div className="twm-s-info">
        <ul>
          <li>
            <div className="twm-s-info-inner">
            <i className="fas fa-building" /> 
              <span className="twm-title">Company Name</span>
              <div className="twm-s-info-discription">{jobData?.companyName }</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
            <i className="fas fa-calendar-alt" />
              <span className="twm-title">Estsince</span>
              <div className="twm-s-info-discription">{jobData?.Estsince || '6 Year'}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">  
              <i className="fas fa-users" /> 
              <span className="twm-title">TeamSize</span>
              <div className="twm-s-info-discription">{jobData?.TeamSize || 'Male'}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
            <i className="fas fa-map-marker-alt" /> 
              <span className="twm-title">Address</span>
              <div className="twm-s-info-discription">{jobData?.Address || '+291 560 56456'}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
            <i className="fas fa-at" /> 
              <span className="twm-title">Email</span>
              <div className="twm-s-info-discription">{jobData?.email || 'thewebmaxdemo@gmail.com'}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner">
            <i className="fas fa-phone-alt" />
              <span className="twm-title">phone</span>
              <div className="twm-s-info-discription">{jobData?.phone || 'Developer'}</div>
            </div>
          </li>
          <li>
            <div className="twm-s-info-inner"> 
              <i className="fas fa-globe" />
              <span className="twm-title">Website</span>
              <div className="twm-s-info-discription">{jobData?.Website || '1363-1385 Sunset Blvd Angeles, CA 90026, USA'}</div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SectionEmployeProfile;
