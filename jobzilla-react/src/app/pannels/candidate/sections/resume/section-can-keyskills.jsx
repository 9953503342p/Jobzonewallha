import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function SectionCanKeySkills() {
    const [skills, setSkills] = useState([]);  // State to hold the current skills as an array
    const [newSkills, setNewSkills] = useState(''); // State for updated skills as a string
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [success,setsuccess]=useState('')

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
                    setSkills(data.resumeHeadline.KeySkills || []); // Initialize with fetched KeySkills, or an empty array
                    setNewSkills(data.resumeHeadline.KeySkills.join(', ') || ''); // Set the string input with comma-separated skills
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

    const handleSkillsChange = (e) => {
        setNewSkills(e.target.value); // Update skills input as a string
    };

    const saveResume = async () => {
        // Clear any previous error
        setError('');

        // Validate input to ensure it's not empty
        if (!newSkills.trim()) {
            setError('Please enter valid skills.');
            return;
        }

        try {
            // Split the newSkills input by commas to convert it into an array
            const skillsArray = newSkills.split(',').map(skill => skill.trim()).filter(skill => skill);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/resumeHeadline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ KeySkills: skillsArray }), // Send skills as array
                credentials: 'include', // Include cookies for session management
            });
            const data = await response.json();

            if (response.status === 200) {
                setSkills(skillsArray); // Update displayed skills
                setError('');  // Clear any previous error messages
                setsuccess('Resume headline updated successfully!');
            } else {
                setError(data.message || 'Error saving resume');
            }
        } catch (error){
            console.error('Error saving resume:', error);
            setError('Error saving resume');
        }
    };

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn">
                <h4 className="panel-title m-a0">Key Skills</h4>
                <a data-bs-toggle="modal" href="#Key_Skills" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
                <div className="tw-sidebar-tags-wrap">
                    <div className="tagcloud">
                        {/* Display current skills as tags */}
                        {skills.map((skill, index) => (
                            <a href="javascript:void(0)" key={index} className="skill-tag">{skill}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal popup for editing skills */}
            <div className="modal fade twm-saved-jobs-view" id="Key_Skills" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h2 className="modal-title">Key Skills</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <p>It is the first thing recruiters notice in your profile. Write concisely what makes you unique and the right person for the job you are looking for.</p>
                                <div className="form-group">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        value={newSkills} 
                                        onChange={handleSkillsChange} 
                                        placeholder="Enter your skills, separated by commas"
                                    />
                                    {error && <div className="error-message text-danger">{error}</div>}
                                    {success && <div style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center' }}>{success}</div>}
        {error && <div style={{ backgroundColor: 'lightcoral', color: 'darkred', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center'}}>{error}</div>}

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
                                <button 
                                    type="button" 
                                    className="site-button"
                                    onClick={saveResume}  // Call saveResume when Save button is clicked
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SectionCanKeySkills;
