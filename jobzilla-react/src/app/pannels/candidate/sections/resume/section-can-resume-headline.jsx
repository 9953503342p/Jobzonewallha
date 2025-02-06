import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function SectionCanResumeHeadline() {
    const [headline, setHeadline] = useState('');  // State to hold current headline
    const [newHeadline, setNewHeadline] = useState(''); // State to hold new headline input
    const [loading, setLoading] = useState(true);
    const [head,setHead]=useState('')
    const [success,setsuccess]=useState('')
    const [error,seterror]=useState('')

    useEffect(() => {
        const fetchHeadline = async () => {
            const userId = Cookies.get('candidateId'); // Get userId from cookies
            if (!userId) {
                console.error('User ID is not found');
                return;
            }
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/resumeHeadline/${userId}`, {
                    method: 'GET',
                    credentials: 'include', // Ensure credentials are included
                });
                const data = await response.json();
                if (response.status === 200) {
                    
                    setHead(data.resumeHeadline.headline); // Initialize modal input with fetched headline
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching resume headline:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeadline();
    }, []);

    // Handle input change in the modal textarea
    const handleHeadlineChange = (e) => {
        setNewHeadline(e.target.value);
    };

    // Save the new headline
    const saveHeadline = async () => {
        const userId = Cookies.get('candidateId'); // Get userId from cookies
        if (!userId) {
            console.error('User ID is not found');
            return;
        }
        try {
            const response = await fetch(`${process.env.React_App_url}/resumeHeadline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ headline: newHeadline }),
                credentials: 'include', // Include cookies for session management
            });
            const data = await response.json();
            if (response.status === 200) {
                setHeadline(newHeadline); // Update displayed headline
                setsuccess('Resume headline updated successfully!');
                window.location.href = "/candidate/my-resume"; 
            } else {
                seterror(data.message); // Show error message
            }
        } catch (error) {
            console.error('Error saving resume headline:', error);
            seterror('Error saving resume headline');
        }
    };

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn">
                <h4 className="panel-title m-a0">Resume Headline</h4>
                <a data-bs-toggle="modal" href="#Resume_Headline" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
                <div className="twm-panel-inner">
                    {loading ? (
                        <p>Loading...</p> // Show loading message while fetching data
                    ) : (
                        <p>{head  || 'No headline available'}</p> // Show fetched headline or placeholder
                    )}
                </div>
            </div>
            {/* Modal Popup */}
            <div className="modal fade twm-saved-jobs-view" id="Resume_Headline" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h2 className="modal-title">Resume Headline</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <p>It is the first thing recruiters notice in your profile. Write concisely what makes you unique and right person for the job you are looking for.</p>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group twm-textarea-full">
                                            <textarea
                                                className="form-control"
                                                placeholder="Type Description"
                                                value={newHeadline}
                                                onChange={handleHeadlineChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {success && <div style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center' }}>{success}</div>}
        {error && <div style={{ backgroundColor: 'lightcoral', color: 'darkred', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center'}}>{error}</div>}

                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="site-button" onClick={saveHeadline}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SectionCanResumeHeadline;
