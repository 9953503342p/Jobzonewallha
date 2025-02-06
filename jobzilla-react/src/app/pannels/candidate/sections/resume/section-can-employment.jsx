import React, { useState,useEffect } from 'react';

function SectionCanEmployment() {
    const [designation, setDesignation] = useState('');
    const [organization, setOrganization] = useState('');
    const [currentCompany, setCurrentCompany] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [success,setsuccess]=useState('')
    const [error,seterror]=useState('')
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Error, setError] = useState('');
  

    const handleSaveEmployment = async () => {
        try {
            const employmentData = {
                designation,
                organization,
                currentCompany,
                startDate,
                endDate,
                jobDescription,
            };
            console.log('Employment data:', employmentData);
            // Send employment data to backend
            const response = await fetch(`${process.env.REACT_APP_API_URL}/resumeHeadline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employment: [employmentData], // Pass the employment data as an array
                }),
                credentials: 'include', // Include cookies (e.g., candidateId)
            });

            const data = await response.json();
            if (response.status === 200) {
                // Handle success (e.g., show a success message)
                setsuccess('Employment details saved successfully:', data);
            } else {
                // Handle error (e.g., show an error message)
                seterror('Error saving employment details:', data);
            }
        } catch (error) {
            seterror('Error:', error);
        }

    };
 

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/resumes`, {
            method: 'GET',
            credentials: 'include', // Ensure cookies are sent with the request
        })
            .then((response) => response.json())
            .then((data) => {
                setResumeData(data);  // Save the fetched resume data
                setLoading(false);     // Set loading state to false
            })
            .catch((err) => {
                console.error('Error fetching resume:', err);
                setError('Error fetching resume');
                setLoading(false); // Set loading state to false in case of an error
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Extract employment data from resumeData
    const employmentData = resumeData?.employment || [];



    

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn">
                <h4 className="panel-title m-a0">Employment</h4>
                <a data-bs-toggle="modal" href="#Employment" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
            <div className="twm-panel-inner">
    {employmentData.length > 0 ? (
        employmentData.map((item, index) => (
            <div key={index}>
                <p><b>{item.designation}</b></p>
                <p> Organization:{item.organization}</p>
                <p>
                    Experience :({item.startDate} - {item.currentCompany === "true" ? 'Present' : item.endDate})
                </p>
                <p>Job Description:{item.jobDescription}</p>
            </div>
        ))
    ) : (
        <p>No employment data available.</p>
    )}
</div>


        </div>

            {/* Employment Modal */}
            <div className="modal fade twm-saved-jobs-view" id="Employment" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h2 className="modal-title">Add Employment</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    {/* Form inputs for employment details */}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Your Designation</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                placeholder="Enter Your Designation"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Your Organization</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={organization}
                                                onChange={(e) => setOrganization(e.target.value)}
                                                placeholder="Enter Your Organization"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Is this your current company?</label>
                                            <div className="row twm-form-radio-inline">
                                                <div className="col-md-6">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="currentCompany"
                                                        checked={currentCompany}
                                                        onChange={() => setCurrentCompany(true)}
                                                    />
                                                    <label className="form-check-label">Yes</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="currentCompany"
                                                        checked={!currentCompany}
                                                        onChange={() => setCurrentCompany(false)}
                                                    />
                                                    <label className="form-check-label">No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Started Working From</label>
                                            <input
                                                className="form-control datepicker"
                                                type="text"
                                                name="startDate"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                placeholder="mm/dd/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Worked Till</label>
                                            <input
                                                className="form-control datepicker"
                                                type="text"
                                                value={endDate}
                                                name='endDate'
                                                onChange={(e) => setEndDate(e.target.value)}
                                                placeholder="mm/dd/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-0">
                                            <label>Describe your Job Profile</label>
                                            <textarea
                                                className="form-control"
                                                rows={3}
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                placeholder="Describe your Job"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {success && <div style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center' }}>{success}</div>}
        {error && <div style={{ backgroundColor: 'lightcoral', color: 'darkred', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center'}}>{error}</div>}

                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="site-button" onClick={handleSaveEmployment}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SectionCanEmployment;
