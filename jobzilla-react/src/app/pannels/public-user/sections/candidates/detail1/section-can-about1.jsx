import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ResumeDetails() {
    const [profileSummary, setProfileSummary] = useState(''); // To store fetched profile summary data
    const [loading, setLoading] = useState(true); // To show loading state while data is fetching
    const [error, setError] = useState(null); // To handle errors
    const { resumeId } = useParams(); // Get resumeId from URL

    useEffect(() => {
        const fetchProfileSummary = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/resume/${resumeId}`); // API call with resumeId
                if (!response.ok) {
                    throw new Error('Failed to fetch resume data');
                }
                const data = await response.json();
                // Assuming the profile summary is in a field called 'profileSummary'
                setProfileSummary(data.ProfileSummary || ''); // Set profile summary
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Data fetch completed (either success or failure)
            }
        };

        fetchProfileSummary();
    }, [resumeId]); // Re-run if resumeId changes

    // Handle loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Handle error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Render the fetched profile summary
    return (
        <div>
            <h4 className="twm-s-title">About Me</h4>
            <p>{profileSummary || 'No profile summary available.'}</p>
        </div>
    );
}

export default ResumeDetails;
