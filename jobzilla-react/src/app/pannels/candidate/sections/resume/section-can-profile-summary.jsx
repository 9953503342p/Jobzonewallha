import React, { useState,useEffect } from "react";

function SectionCanProfileSummary() {
    const [profileSummary, setProfileSummary] = useState("");
    const [newProfileSummary, setNewProfileSummary] = useState("");
    const [message, setMessage] = useState(""); // State for displaying messages
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    const handleSave = async () => {
        if (!newProfileSummary.trim()) {
            setMessage("Profile Summary cannot be empty.");
            setMessageType("error"); // Error message
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/profilesummery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ProfileSummary: newProfileSummary,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile summary");
            }

            const data = await response.json();
            setProfileSummary(data.ProfileSummary);
            setMessage("Profile Summary updated successfully");
            setMessageType("success"); // Success message

            // Hide the modal
            const modal = new window.bootstrap.Modal(document.getElementById("Profile_Summary"));
            modal.hide();
        } catch (error) {
            console.error("Error updating profile summary:", error);
            setMessage("An error occurred while updating profile summary: " + error.message);
            setMessageType("error"); // Error message
        }
    };


    const [resumeData, setResumeData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchResume = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resumes`, {
            method: "GET",
            credentials: "include", // To include cookies
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch resume.");
          }
  
          const data = await response.json();
          setResumeData(data);
        } catch (error) {
          setError(error.message);
          console.error("Error fetching resume:", error);
        }
      };
  
      fetchResume();
    }, []);
  

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Profile Summary</h4>
                <a data-bs-toggle="modal" href="#Profile_Summary" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
                <div className="twm-panel-inner">
                    <p>Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.</p>
                    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {resumeData ? (
        <div>
          <p>{resumeData.ProfileSummary}</p>
          {/* Render other resume data as needed */}
        </div>
      ) : (
        <p>Loading resume...</p>
      )}
    </div>

                </div>
            </div>

          

            {/* Modal Popup */}
            <div className="modal fade twm-saved-jobs-view" id="Profile_Summary" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSave();
                            }}
                        >
                            <div className="modal-header">
                                <h2 className="modal-title">Profile Summary</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <p>Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.</p>
                                
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group twm-textarea-full">
                                            <textarea
                                                className="form-control"
                                                placeholder="Detail of Project"
                                                value={newProfileSummary}
                                                onChange={(e) => setNewProfileSummary(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Message Display */}
            {message && (
                <div className={`alert alert-${messageType === "success" ? "success" : "danger"} mt-3 ` } style={{width:'80%', marginLeft:'10%'}}>
                    {message}
                </div>
            )}
                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="site-button">
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

export default SectionCanProfileSummary;
