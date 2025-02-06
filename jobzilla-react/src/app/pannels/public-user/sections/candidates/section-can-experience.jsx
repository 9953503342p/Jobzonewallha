import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SectionCandidateExperience() {
    const [employmentData, setEmploymentData] = useState([]); // To store fetched employment data
    const [loading, setLoading] = useState(true); // To show loading state while data is fetching
    const [error, setError] = useState(null); // To handle errors
    const { resumeId } = useParams(); // Get resumeId from URL parameters

    useEffect(() => {
        const fetchEmploymentData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/resume/${resumeId}`); // Make API call with resumeId
                if (!response.ok) {
                    throw new Error('Failed to fetch resume data');
                }
                const data = await response.json();
                setEmploymentData(data.employment || []); // Assuming your response contains employment data in the 'employment' field
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmploymentData();
    }, [resumeId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <h4 className="twm-s-title">Work Experience</h4>
            <div className="twm-timing-list-wrap">
                {employmentData.length > 0 ? (
                    employmentData.map((job, index) => (
                        <div className="twm-timing-list" key={index}>
                            <div className="twm-time-list-date">
                            {job.startDate ? new Date(job.startDate).toLocaleDateString(undefined, { year: 'numeric' }) : 'N/A'} to {job.endDate ? new Date(job.endDate).toLocaleDateString(undefined, { year: 'numeric' }) : 'Present'}
                            </div>
                            <div className="twm-time-list-title">{job.organization || 'N/A'}</div>
                            <div className="twm-time-list-position">{job.designation || 'N/A'}</div>
                            <div className="twm-time-list-discription">
                                <p>{job.jobDescription || 'No description available.'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No work experience available.</p>
                )}
            </div>
        </>
    );
}

export default SectionCandidateExperience;
