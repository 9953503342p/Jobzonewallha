import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { canRoute, candidate } from "../../../globals/route-names";

import { empRoute, employer } from "../../../globals/route-names";
import Cookies from "js-cookie"; 

function SignInPopup() {
    const navigate = useNavigate();

    const settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000, // Slide changes every 3 seconds
      };
      
    // State for managing form data and errors
    const [candidateFormData, setCandidateFormData] = useState({
        Username: "",
        Password: "",
    });

    const [employerFormData, setEmployerFormData] = useState({
        username: "",
        password: "",
    });

    const [candidateError, setCandidateError] = useState(""); 
    const [employerError, setEmployerError] = useState("");  

    const handleCandidateChange = (e) => {
        const { name, value } = e.target;
        setCandidateFormData({
            ...candidateFormData,
            [name]: value,
        });
        setCandidateError(""); 
    };

    const handleEmployerChange = (e) => {
        const { name, value } = e.target;
        setEmployerFormData({
            ...employerFormData,
            [name]: value,
        });
        setEmployerError(""); 
    };

    const handleCandidateSubmit = async (e) => {
        e.preventDefault();
        const { Username, Password } = candidateFormData;

        if (!Username || !Password) {
            setCandidateError("Both username and password are required.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/candidate-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Username, Password }),
            });

            const data = await response.json();

            if (response.ok) {
                Cookies.set('candidateId', data._id, { expires: 7 }); 
                navigate(canRoute(candidate.DASHBOARD));
                window.location.reload();
            } else if (response.status === 401) {
                setCandidateError("Incorrect password. Please try again.");
            } else if (response.status === 404) {
                setCandidateError("User not found. Please check your username.");
            } else {
                setCandidateError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setCandidateError("An error occurred. Please try again later.");
        }
    };

    const handleEmployerSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = employerFormData;

        if (!username || !password) {
            setEmployerError("Both username and password are required.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/employer-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log(data.id)
            if (response.ok) {
                
                Cookies.set('employeeid', data.id, { expires: 7 }); 
                navigate(empRoute(employer.DASHBOARD));
                window.location.reload();
            } else if (response.status === 401) {
                setEmployerError("Incorrect password. Please try again.");
            } else if (response.status === 404) {
                setEmployerError("User not found. Please check your username.");
            } else {
                setEmployerError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setEmployerError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="modal fade twm-sign-up" id="sign_up_popup2" aria-hidden="true" aria-labelledby="sign_up_popupLabel2" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="sign_up_popupLabel2">Login</h2>
                        <p>Login and get access to all the features of Jobzilla</p>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="twm-tabs-style-2">
                            <ul className="nav nav-tabs" id="myTab2" role="tablist">
                                <li className="nav-item">
                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#login-candidate" type="button">
                                        <i className="fas fa-user-tie" /> Candidate
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#login-Employer" type="button">
                                        <i className="fas fa-building" /> Employer
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTab2Content">
                                <form onSubmit={handleCandidateSubmit} className="tab-pane fade show active" id="login-candidate">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input
                                                    name="Username"
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    placeholder="Username*"
                                                    value={candidateFormData.Username}
                                                    onChange={handleCandidateChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input
                                                    name="Password"
                                                    type="password"
                                                    required
                                                    className="form-control"
                                                    placeholder="Password*"
                                                    value={candidateFormData.Password}
                                                    onChange={handleCandidateChange}
                                                />
                                            </div>
                                        </div>
                                        {candidateError && (
                                            <div className="col-lg-12 text-danger mb-3">{candidateError}</div>
                                        )}
                                        <div className="col-md-12">
                                            <button type="submit" className="site-button" data-bs-dismiss="modal">
                                                Log in
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <form onSubmit={handleEmployerSubmit} className="tab-pane fade" id="login-Employer">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input
                                                    name="username"
                                                    type="text"
                                                    required
                                                    className="form-control"
                                                    placeholder="Username*"
                                                    value={employerFormData.username}
                                                    onChange={handleEmployerChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <input
                                                    name="password"
                                                    type="password"
                                                    required
                                                    className="form-control"
                                                    placeholder="Password*"
                                                    value={employerFormData.password}
                                                    onChange={handleEmployerChange}
                                                />
                                            </div>
                                        </div>
                                        {employerError && (
                                            <div className="col-lg-12 text-danger mb-3">{employerError}</div>
                                        )}
                                        <div className="col-md-12">
                                            <button type="submit" className="site-button" data-bs-dismiss="modal">
                                                Log in
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <span className="modal-f-title">Login or Sign up with</span>
                        <ul className="twm-modal-social">
                            <li><a href="https://www.facebook.com/" className="facebook-clr"><i className="fab fa-facebook-f" /></a></li>
                            <li><a href="https://www.twitter.com/" className="twitter-clr"><i className="fab fa-twitter" /></a></li>
                            <li><a href="https://in.linkedin.com/" className="linkedin-clr"><i className="fab fa-linkedin-in" /></a></li>
                            <li><a href="https://www.google.com/" className="google-clr"><i className="fab fa-google" /></a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default SignInPopup;
