import React, { useState, useEffect } from "react";
import JobZImage from "../../../../common/jobz-img";
import { NavLink, useLocation } from "react-router-dom";
import { setMenuActive } from "../../../../../globals/constants";
import { candidate, canRoute, publicUser } from "../../../../../globals/route-names";
import Cookies from "js-cookie"; // Import js-cookie to access cookies

function CanSidebarSection() {
    const currentpath = useLocation().pathname;
    const [profileImage, setProfileImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const candidateId = Cookies.get("candidateId");
                if (candidateId) {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/get-candidate-profileimage`, {
                        method: "GET",
                        credentials: "include",
                    });
                    const data = await response.json();
                    if (data && data.Profileimage) {
                        setProfileImage(data.Profileimage);
                    } else {
                        console.error("Profile image not found:", data.message);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };
        fetchProfileImage();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const candidateId = Cookies.get("candidateId");
        if (file && candidateId) {
            const formData = new FormData();
            formData.append("Profileimage", file);
            formData.append("candidateId", candidateId);
            console.log(candidateId);
            console.log("File to upload:", file.name);

            setUploading(true);

            fetch(`${process.env.REACT_APP_API_URL}/update-candidate-profileimage`, {
                method: "POST",
                body: formData,
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setUploading(false);
                    if (data && data.filePath) {
                        window.location.reload();

                    }
                })
                .catch((error) => {
                    setUploading(false);
                    console.error("Error uploading image:", error);
                   
                });
        } else {
        }
    };

      const [candidateData, setCandidateData] = useState(null);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchCandidateData = async () => {
            try {
              const response = await fetch(`${process.env.REACT_APP_API_URL}/candidates`, {
                method: 'GET',
                credentials: 'include', 
                headers: {
                  'Content-Type': 'application/json',
                },
              });
      
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch candidate data');
              }
      
              const data = await response.json();
              setCandidateData(data);
            } catch (err) {
              console.error(err);
              setError(err.message);
            }
          };
      
          fetchCandidateData();
        }, []);
      
        if (error) {
          return <div>Error: {error}</div>;
        }
      
        if (!candidateData) {
          return <div>Loading...</div>;
        }
    console.log(candidateData)


    return (
        <>
            <div className="twm-candidate-profile-pic">
                {/* Display the fetched profile image or a default image */}
                <img
                src={`${process.env.REACT_APP_API_URL}/${profileImage || "assets/default-profile-image.jpg"}`}

                    alt="Profile"
                />
                <div className="upload-btn-wrapper">
                    <div id="upload-image-grid" />
                    <button className="site-button button-sm">Upload Photo</button>
                    <input
                        type="file"
                        id="file-uploader"
                        accept=".jpg, .jpeg, .png"
                        name="ProfileImage"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </div>
            </div>
            <div className="twm-mid-content text-center">
                <NavLink to={canRoute(publicUser.candidate.DETAIL1)} className="twm-job-title">
                    <h4>{candidateData.Name}</h4>
                </NavLink>
                <p>{candidateData.Jobcategory}</p>
            </div>
            <div className="twm-nav-list-1">
                <ul>
                    <li className={setMenuActive(currentpath, canRoute(candidate.DASHBOARD))}>
                        <NavLink to={canRoute(candidate.DASHBOARD)}>
                            <i className="fa fa-tachometer-alt" /> Dashboard
                        </NavLink>
                    </li>
                    <li className={setMenuActive(currentpath, canRoute(candidate.PROFILE))}>
                        <NavLink to={canRoute(candidate.PROFILE)}>
                            <i className="fa fa-user" /> My Profile
                        </NavLink>
                    </li>
                    <li className={setMenuActive(currentpath, canRoute(candidate.APPLIED_JOBS))}>
                        <NavLink to={canRoute(candidate.APPLIED_JOBS)}>
                            <i className="fa fa-suitcase" /> Applied Jobs
                        </NavLink>
                    </li>
                    <li className={setMenuActive(currentpath, canRoute(candidate.RESUME))}>
                        <NavLink to={canRoute(candidate.RESUME)}>
                            <i className="fa fa-receipt" /> My Resume
                        </NavLink>
                    </li>
                    {/* <li className={setMenuActive(currentpath, canRoute(candidate.SAVED_JOBS))}>
                        <NavLink to={canRoute(candidate.SAVED_JOBS)}>
                            <i className="fa fa-file-download" /> Saved Jobs
                        </NavLink>
                    </li> */}
                    {/* <li className={setMenuActive(currentpath, canRoute(candidate.CV_MANAGER))}>
                        <NavLink to={canRoute(candidate.CV_MANAGER)}>
                            <i className="fa fa-paperclip" /> CV Manager
                        </NavLink>
                    </li> */}
                    {/* <li className={setMenuActive(currentpath, canRoute(candidate.ALERTS))}>
                        <NavLink to={canRoute(candidate.ALERTS)}>
                            <i className="fa fa-bell" /> Job Alerts
                        </NavLink>
                    </li> */}
                    <li className={setMenuActive(currentpath, canRoute(candidate.CHANGE_PASSWORD))}>
                        <NavLink to={canRoute(candidate.CHANGE_PASSWORD)}>
                            <i className="fa fa-fingerprint" /> Change Password
                        </NavLink>
                    </li>
                    {/* <li className={setMenuActive(currentpath, canRoute(candidate.CHAT))}>
                        <NavLink to={canRoute(candidate.CHAT)}>
                            <i className="fa fa-comments" /> Chat
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </>
    );
}

export default CanSidebarSection;
