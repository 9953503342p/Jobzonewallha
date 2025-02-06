import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SectionCandidateEducation() {

    const [educationData, setEducationData] = useState([]); // To store fetched education data
    const [loading, setLoading] = useState(true); // To show loading state while data is fetching
    const [error, setError] = useState(null); // To handle errors
    const { resumeId } = useParams();

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/resume/${resumeId}`); // Make API call with resumeId
                if (!response.ok) {
                    throw new Error('Failed to fetch resume data');
                }
                const data = await response.json();
                setEducationData(data.education || []); // Assuming your response contains education data in the 'education' field
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEducationData();
    }, [resumeId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <h4 className="twm-s-title">Education &amp; Training</h4>
            <div className="twm-timing-list-wrap">
                {educationData.length > 0 ? (
                    educationData.map((edu, index) => (
                        <div key={index} className="twm-timing-list">
                            <div className="twm-time-list-date">
                                {edu.startyear  ? new Date(edu.startyear).toLocaleDateString(undefined, { year: 'numeric' }) : 'N/A'} to {edu.lastyear  ? new Date(edu.lastyear).toLocaleDateString(undefined, { year: 'numeric' }) : 'Present'}
                            </div>
                            <div className="twm-time-list-title">{edu.course}</div>
                            <div className="twm-time-list-position">{edu.university}</div>
                            <div className="twm-time-list-discription">
                                <p>{edu.educationCategory}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No education data available.</p>
                )}
            </div>
        </>
    );
}

export default SectionCandidateEducation;
