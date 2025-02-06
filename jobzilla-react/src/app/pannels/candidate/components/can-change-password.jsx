import React, { useState,useEffect } from 'react';

import { useNavigate } from "react-router-dom"; 
function CanChangePasswordPage() {
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


     const navigate = useNavigate();
      
          useEffect(() => {
              // Check for candidateId in cookies
              const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
                  const [key, value] = cookie.split("=");
                  acc[key] = value;
                  return acc;
              }, {});
      
              if (!cookies.candidateId) {
                  // Redirect to login page if candidateId cookie is not present
                  navigate("/after-login");
              }
          }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          previousPassword,
          newPassword,
          confirmPassword,
        }),
        credentials: 'include',  // Ensure cookies are sent with the request
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'An error occurred');
        setSuccessMessage('');
      } else {
        setSuccessMessage(data.message);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="twm-right-section-panel site-bg-gray">
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-tittle m-a0">Change Password</h4>
          </div>
          <div className="panel-body wt-panel-body p-a20">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>Old Password</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control wt-form-control"
                      type="password"
                      placeholder="Enter old password"
                      value={previousPassword}
                      onChange={(e) => setPreviousPassword(e.target.value)}
                    />
                    <i className="fs-input-icon fa fa-asterisk" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label>New Password</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control wt-form-control"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <i className="fs-input-icon fa fa-asterisk" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control wt-form-control"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <i className="fs-input-icon fa fa-asterisk" />
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="text-left">
                  <button type="submit" className="site-button">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Error or Success message */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    </div>
  );
}

export default CanChangePasswordPage;
