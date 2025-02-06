import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library




import { canRoute, candidate } from "../../../globals/route-names";

import { empRoute, employer } from "../../../globals/route-names";


function SignUpPopup() {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Phone: "",
  });

  const [employerFormData, setEmployerFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [candidateError, setCandidateError] = useState(""); 
  const [employerError, setEmployerError] = useState("");  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const employerHandleChange = (e) => {
    const { name, value } = e.target;
    setEmployerFormData({
      ...employerFormData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Username, Password, Email, Phone } = formData;

    // Basic validation check
    if (!Username || !Password || !Email || !Phone) {
      setCandidateError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/candidate-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Set the candidateId cookie upon successful sign-up
        Cookies.set('candidateId', data._id, { expires: 7 }); // Store the user ID for 7 days

        // Navigate to the candidate dashboard
        navigate(canRoute(candidate.DASHBOARD));
        window.location.reload();

      } else {
        setCandidateError(data.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
      setCandidateError("An error occurred. Please try again.");
    }
  };


  const handleEmployerSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email, phone } = employerFormData;

    // Basic validation check
    if (!username || !password || !email || !phone) {
      setEmployerError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employer-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employerFormData),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('employeeid', data.id, { expires: 7 }); 
        navigate(empRoute(employer.DASHBOARD));
        window.location.reload();

      } else {
        setEmployerError( "username is already register");
      }
    } catch (error) {
      console.error("Error:", "username is already register");
      setEmployerError("An error occurred. Please try again.");
    }
  };


  return (
    <div className="modal fade twm-sign-up" id="sign_up_popup" aria-hidden="true" aria-labelledby="sign_up_popupLabel" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="sign_up_popupLabel">Sign Up</h2>
            <p>Sign Up and get access to all the features of Jobzoneswallha</p>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="twm-tabs-style-2">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#sign-candidate" type="button">
                    <i className="fas fa-user-tie" /> Candidate
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#sign-employer" type="button">
                    <i className="fas fa-building" /> Employer
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {/* Candidate SignUp */}
                <div className="tab-pane fade show active" id="sign-candidate">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="Username" type="text" value={formData.Username} onChange={handleChange} required className="form-control" placeholder="Username*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="Password" type="password" value={formData.Password} onChange={handleChange} required className="form-control" placeholder="Password*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="Email" type="email" value={formData.Email} onChange={handleChange} required className="form-control" placeholder="Email*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="Phone" type="tel" value={formData.Phone} onChange={handleChange} required className="form-control" placeholder="Phone Number*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <button className="btn btn-primary" type="submit">Sign Up</button>
                        </div>
                        {candidateError && <p className="text-danger">{candidateError}</p>}
                      </div>
                    </div>
                  </form>
                </div>

                {/* Employer SignUp */}
                <div className="tab-pane fade" id="sign-employer">
                  <form onSubmit={handleEmployerSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="username" type="text" value={employerFormData.username} onChange={employerHandleChange} required className="form-control" placeholder="Username*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="password" type="password" value={employerFormData.password} onChange={employerHandleChange} required className="form-control" placeholder="Password*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="email" type="email" value={employerFormData.email} onChange={employerHandleChange} required className="form-control" placeholder="Email*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <input name="phone" type="tel" value={employerFormData.phone} onChange={employerHandleChange} required className="form-control" placeholder="Phone Number*" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group mb-3">
                          <button className="btn btn-primary" type="submit">Sign Up</button>
                        </div>
                        {employerError && <p className="text-danger">{employerError}</p>}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPopup;
