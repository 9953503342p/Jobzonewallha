import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  

function SectionProfile() {
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
    // const imageUrl = `http://localhost:8080/${jobData?.Profileimage || "pic2.jpg"}`;


    if (!jobData) {
        return <div>Loading...</div>;  
    }
    return (
        <>
            <h4 className="section-head-small mb-4">Profile Info</h4>
            <div className="twm-s-info">
                <ul>
                    <li>
                        <div className="twm-s-info-inner">
                            <i className="fas fa-money-bill-wave" />
                            <span className="twm-title">Offered Salary</span>
                            <div className="twm-s-info-discription">{jobData.Expectedsalery || '$20 / Day'}</div>
                        </div>
                    </li>
                    <li>
                        <div className="twm-s-info-inner">
                            <i className="fas fa-clock" />
                            <span className="twm-title">Experience</span>
                            <div className="twm-s-info-discription">{jobData.Experience || '6 Year'}</div>
                        </div>
                    </li>
                    <li>
                        <div className="twm-s-info-inner">
                            <i className="fas fa-venus-mars" />
                            <span className="twm-title">Gender</span>
                            <div className="twm-s-info-discription">{jobData.gender || 'Male'}</div>
                        </div>
                    </li>
                    <li>
                        <div className="twm-s-info-inner">
                            <i className="fas fa-mobile-alt" />
                            <span className="twm-title">Phone</span>
                            <div className="twm-s-info-discription">{jobData.Phone || '+291  560 56456'}</div>
                        </div>
                    </li>
                    <li>
                        <div className="twm-s-info-inner">
                            <i className="fas fa-at" />
                            <span className="twm-title">Email</span>
                            <div className="twm-s-info-discription">{jobData.Email || 'thewebmaxdemo@gmail.com'}</div>
                        </div>
                    </li>
                    <li>
                        <div className="twm-s-info-inner">
                            <i className="fas fa-book-reader" />
                            <span className="twm-title">Qualification</span>
                            <div className="twm-s-info-discription">{jobData.Qualification || 'Developer'}</div>
                        </div>
                    </li>
                    <li>
                        <div className="twm-s-info-inner">
                            <i className="fas fa-map-marker-alt" />
                            <span className="twm-title">Address</span>
                            <div className="twm-s-info-discription">{jobData.Fulladdress || '1363-1385 Sunset Blvd Angeles, CA 90026 ,USA'}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SectionProfile;
