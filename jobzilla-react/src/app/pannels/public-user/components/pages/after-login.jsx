import { NavLink, useNavigate } from "react-router-dom";
import JobZImage from "../../../../common/jobz-img";
import { canRoute, candidate, empRoute, employer, publicUser } from "../../../../../globals/route-names";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header1 from "../../../../common/header/header1";

function AfterLoginPage() {
    const navigate = useNavigate();
    const [canusername, setCanUsername] = useState('guest');
    const [empusername, setEmpUsername] = useState('admin');
    const [password, setPassword] = useState('12345');
    const [candidateError, setCandidateError] = useState('');
    const [employerError, setEmployerError] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 1, src: "images/1.png", alt: "Slide 1" },
        { id: 2, src: "images/2.png", alt: "Slide 2" },
        { id: 3, src: "images/3.png", alt: "Slide 3" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop back to 0 after the last slide
        }, 2000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index % slides.length); // Ensure index is within bounds
    };

    const handleCandidateLogin = async (event) => {
        event.preventDefault();
        setCandidateError(''); // Clear previous errors

        if (!canusername || !password) {
            setCandidateError("Both username and password are required.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/candidate-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Username: canusername, Password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                Cookies.set('candidateId', data._id, { expires: 7 }); // Save candidate ID in cookies
                navigate(canRoute(candidate.DASHBOARD)); // Redirect to candidate dashboard
                window.location.reload(); // Refresh the page
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

    const handleEmployerLogin = async (event) => {
        event.preventDefault();
        setEmployerError(''); // Clear previous errors

        if (!empusername || !password) {
            setEmployerError("Both username and password are required.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/employer-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: empusername, password: password }),
            });

            const data = await response.json();

            if (response.ok) {
                Cookies.set('employeeid', data.id, { expires: 7 }); // Save employer ID in cookies
                navigate(empRoute(employer.DASHBOARD)); // Redirect to employer dashboard
                window.location.reload(); // Refresh the page
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
        <>
    
            <div className="section-full popup-form">
                <div className="loginbg">
                    <div className="container" style={{ borderRadius: '40px' }}>
                        <div className="row popup-form-section">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 popup-cards-left flex">
                                <div className="slider">
                                    <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
                                        {slides.map((slide) => (
                                            <div key={slide.id} className="slide">
                                                <JobZImage src={slide.src} alt={slide.alt} className="popup-right-img" />
                                            </div>
                                        ))}
                                    </div>
                                    {/* Dots Navigation */}
                                    <div className="slider-dots">
                                        {slides.map((_, index) => (
                                            <span
                                                key={index}
                                                className={`dot ${index === currentSlide ? "active" : ""}`}
                                                onClick={() => goToSlide(index)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Login Form */}
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 popup-cards-right">
                                <div className="twm-log-reg-logo-head">
                                    <NavLink to={publicUser.HOME1}>
                                        <img src="/assets/images/skins-logo/logo-skin-6-ftr.png" alt="" className="logo" />
                                    </NavLink>
                                </div>
                                <div className="twm-log-reg-inner">
                                    <div className="twm-log-reg-head">
                                        <div className="twm-log-reg-logo">
                                            <span className="log-reg-form-title">LogIn</span>
                                        </div>
                                    </div>
                                    <div className="twm-tabs-style-2">
                                        <ul className="nav nav-tabs" id="myTab2" role="tablist">
                                            {/* Candidate Tab */}
                                            <li className="nav-item">
                                                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#twm-login-candidate" type="button">
                                                    <i className="fas fa-user-tie" /> Candidate
                                                </button>
                                            </li>
                                            {/* Employer Tab */}
                                            <li className="nav-item">
                                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#twm-login-Employer" type="button">
                                                    <i className="fas fa-building" /> Employer
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTab2Content">
                                            {/* Candidate Login Form */}
                                            <form onSubmit={handleCandidateLogin} className="tab-pane fade show active" id="twm-login-candidate">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3">
                                                            <input
                                                                name="username"
                                                                type="text"
                                                                required
                                                                className="form-control"
                                                                placeholder="Username*"
                                                                onChange={(e) => setCanUsername(e.target.value)}
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
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {candidateError && (
                                                        <div className="col-lg-12 text-danger mb-3">{candidateError}</div>
                                                    )}
                                                    
                                                    <div className="col-md-12">
                                                        <button type="submit" className="site">
                                                            Log in
                                                        </button>
                                                    </div>
                                                    <div>

<h1 style={{fontSize:'20px', marginTop:'20px'}}>Don't have an Account      <a className="twm-nav-sign-up" data-bs-toggle="modal" href="#sign_up_popup" role="button" style={{color:'blue'}}>
                                                 Sign Up!
                                            </a></h1>
                        </div>
                                                </div>
                                            </form>

                                            {/* Employer Login Form */}
                                            <form onSubmit={handleEmployerLogin} className="tab-pane fade" id="twm-login-Employer">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group mb-3">
                                                            <input
                                                                name="username"
                                                                type="text"
                                                                required
                                                                className="form-control"
                                                                placeholder="Username*"
                                                                onChange={(e) => setEmpUsername(e.target.value)}
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
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {employerError && (
                                                        <div className="col-lg-12 text-danger mb-3">{employerError}</div>
                                                    )}
                                                    <div className="col-md-12">
                                                        <button type="submit" className="site">
                                                        LogIn
                                                        </button>
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
            </div>
        </>
    );
}

export default AfterLoginPage;