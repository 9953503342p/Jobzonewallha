import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SectionCandidateSkills() {
    const [resumeData, setResumeData] = useState(null);  // State to store the fetched resume data
    const { resumeId } = useParams();

    useEffect(() => {
        // Fetch resume data based on resumeId from the backend
        fetch(`${process.env.REACT_APP_API_URL}/resume/${resumeId}`)
            .then((response) => response.json())  // Parse the JSON response
            .then((data) => {
                setResumeData(data);  // Save the fetched data to state
            })
            .catch((error) => {
                console.error('Error fetching resume data:', error);
            });
    }, [resumeId]);  // Ensure useEffect runs again if resumeId changes

    if (!resumeData) {
        return <div>Loading...</div>;  // Show loading while data is being fetched
    }

    // Extracting skills directly from the resume data
    const skills = resumeData.KeySkills || [];  // Default to an empty array if KeySkills is not available

    return (
        <>
            <h4 className="twm-s-title">Skills</h4>
            <div className="tw-sidebar-tags-wrap">
                <div className="tagcloud">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <a key={index} href="#">{skill}</a>  // Render each skill dynamically
                        ))
                    ) : (
                        <p>No skills available</p>  // Display a message if no skills are available
                    )}
                </div>
            </div>
        </>
    );
}

export default SectionCandidateSkills;
