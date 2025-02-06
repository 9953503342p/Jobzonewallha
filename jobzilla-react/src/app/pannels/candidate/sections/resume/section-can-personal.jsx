
import React, { useEffect, useState } from "react";
import axios from "axios";
function SectionCanPersonalDetail() {
    const [details, setDetails] = useState({
        dob: '',
        gender: 'Female',
        permanentAddress: '',
        hometown: '',
        pincode: '',
        maritalStatus: '',
        passportNumber: '',
        assistance: '',
        workPermitCountry: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/personal-details`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ details }),
          });
    
          const data = await response.json();
          if (response.ok) {
            // Handle success
            alert(data.message);
          } else {
            // Handle error
            alert(data.message);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Something went wrong. Please try again.');
        }
      };
      const [personalDetail, setPersonalDetail] = useState(null);
      const [error, setError] = useState("");
    
      useEffect(() => {
        const fetchResume = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resumes`, {
              method: "GET",
              credentials: "include", // Include cookies for authentication
            });
    
            if (!response.ok) {
              const { message } = await response.json();
              throw new Error(message || "Failed to fetch resume.");
            }
    
            const data = await response.json();
            setPersonalDetail(data.PersonalDetail); // Assuming the API returns `personalDetail`
          } catch (err) {
            setError(err.message);
          }
        };
    
        fetchResume();
      }, []);
      console.log(personalDetail);
    

    

    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Personal Details</h4>
                <a data-bs-toggle="modal" href="#Personal_Details" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
      {error ? (
        <div className="error-message">{error}</div>
      ) : personalDetail ? (
        <div className="twm-panel-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Date of Birth</div>
                <span className="twm-s-info-discription">{personalDetail.dob}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Permanent Address</div>
                <span className="twm-s-info-discription">{personalDetail.permanentAddress || "Add Permanent Address"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Gender</div>
                <span className="twm-s-info-discription">{personalDetail.gender}</span>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Area Pin Code</div>
                <span className="twm-s-info-discription">{personalDetail.areaPinCode}</span>
              </div>
            </div> */}
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Marital Status</div>
                <span className="twm-s-info-discription">{personalDetail.maritalStatus}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Hometown</div>
                <span className="twm-s-info-discription">{personalDetail.hometown}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Passport Number</div>
                <span className="twm-s-info-discription">{personalDetail.passportNumber}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Work Permit of Other Country</div>
                <span className="twm-s-info-discription">{personalDetail.workPermitCountry || "None"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">assistance</div>
                <span className="twm-s-info-discription">{personalDetail.assistance || "None"}</span>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Languages</div>
                <span className="twm-s-info-discription">{personalDetail.languages}</span>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>


          
            {/*Personal Details Modal */}
            <div className="modal fade twm-saved-jobs-view" id="Personal_Details" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h2 className="modal-title">Personal Detail</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="row">
                {/* Birth Date */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="mm/dd/yyyy"
                        name="dob"
                        value={details.dob}
                        onChange={handleInputChange}
                      />
                      <i className="fs-input-icon far fa-calendar" />
                    </div>
                  </div>
                </div>
                {/* Gender */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Gender</label>
                    <div className="row twm-form-radio-inline">
                      <div className="col-md-6">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="S_male"
                          value="Male"
                          checked={details.gender === 'Male'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="S_male">Male</label>
                      </div>
                      <div className="col-md-6">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="S_female"
                          value="Female"
                          checked={details.gender === 'Female'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="S_female">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Permanent Address */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Permanent Address</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        name="permanentAddress"
                        value={details.permanentAddress}
                        onChange={handleInputChange}
                        placeholder="Enter Permanent Address"
                      />
                      <i className="fs-input-icon fa fa-map-marker-alt" />
                    </div>
                  </div>
                </div>
                {/* Hometown */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Hometown</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        name="hometown"
                        value={details.hometown}
                        onChange={handleInputChange}
                        placeholder="Enter Hometown"
                      />
                      <i className="fs-input-icon fa fa-home" />
                    </div>
                  </div>
                </div>
                {/* Pincode */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Pincode</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        name="pincode"
                        value={details.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter Pincode"
                      />
                      <i className="fs-input-icon fa fa-map-pin" />
                    </div>
                  </div>
                </div>
                {/* Marital Status */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Marital Status</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        name="maritalStatus"
                        value={details.maritalStatus}
                        onChange={handleInputChange}
                        placeholder="Enter Marital Status"
                      />
                      <i className="fs-input-icon fa fa-heart" />
                    </div>
                  </div>
                </div>
                {/* Passport Number */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Passport Number</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        name="passportNumber"
                        value={details.passportNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Passport Number"
                      />
                      <i className="fs-input-icon fa fa-passport" />
                    </div>
                  </div>
                </div>
                {/* Assistance */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Assistance Required</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        name="assistance"
                        value={details.assistance}
                        onChange={handleInputChange}
                        placeholder="Enter Assistance Required"
                      />
                      <i className="fs-input-icon fa fa-question-circle" />
                    </div>
                  </div>
                </div>
                {/* Work Permit Country */}
                <div className="col-xl-12 col-lg-12">
                  <div className="form-group">
                    <label>Work Permit Country</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        type="text"
                        name="workPermitCountry"
                        value={details.workPermitCountry}
                        onChange={handleInputChange}
                        placeholder="Enter Work Permit Country"
                      />
                      <i className="fs-input-icon fa fa-flag" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="site-button">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
    )
}
export default SectionCanPersonalDetail;