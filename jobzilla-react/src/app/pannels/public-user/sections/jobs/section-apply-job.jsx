import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import DropzoneComponent from "react-dropzone-component";
import Cookies from "js-cookie";

function SectionApplyJob() {
  
     const [errorMessage, setErrorMessage] = useState('');
     const [successMessage, setSuccessMessage] = useState('');
  

  const [jobs, setJobs] = useState({}); // Initialize jobs as an empty object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    answers: [], // Store answers as an array
    resume: null,
    jobId: "",
    phone:"",
    videoFiles: [], // Store video files as an array
  });

  const userId = Cookies.get("candidateId"); // Get the user ID from cookies
  const location = useLocation();
  const { jobId } = useParams(); // Assuming you're passing the JobId in the route params

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobIdFromUrl = params.get("JobId");
    if (jobIdFromUrl) {
      setFormData((prev) => ({ ...prev, jobId: jobIdFromUrl }));
    }
  }, [location]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post-job/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data); // Store the fetched job data
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data", error);
      }
    };

    if (jobId) {
      fetchJobData(); // Fetch job data if jobId is available
    }
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("answer-")) {
      // Dynamically set the answer for each question based on index
      const index = parseInt(name.split("-")[1], 10);
      setFormData((prev) => {
        const newAnswers = [...prev.answers];
        newAnswers[index] = value; // Update the specific answer
        return { ...prev, answers: newAnswers };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleVideoChange = (file, questionIndex) => {
    setFormData((prev) => {
      const newVideoFiles = [...prev.videoFiles];
      newVideoFiles[questionIndex] = file; // Assign video to specific question index
      return { ...prev, videoFiles: newVideoFiles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("JobId", jobId);
    formDataToSend.append("userId", userId);

    // Construct questionsAndAnswers array from formData.answers and video files
    const questionsAndAnswers = jobs?.question?.map((q, index) => ({
      question: q,
      answer: formData.answers[index] || "",
      video: formData.videoFiles[index] || null, // Associate video with each answer
    }));

    // Append the questionsAndAnswers to the FormData
    formDataToSend.append("questionsAndAnswers", JSON.stringify(questionsAndAnswers));

    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }

    // Add video files to formData
    formData.videoFiles.forEach((video, index) => {
      if (video) formDataToSend.append("video", video); // Only append if video exists
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/apply-job`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        console.log(data.message);
      } else {
        setErrorMessage(data.error || "There was an error submitting your application.");
        console.log(data.error || "There was an error submitting your application.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("There was an error submitting your application.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="twm-tabs-style-1">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="form-group">
              <label>Your Name</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  name="name"
                  required={true}
                  type="text"
                  placeholder="Devid Smith"
                  value={formData.name}
                  onChange={handleChange}
                />
                <i className="fs-input-icon fa fa-user" />
              </div>
            </div>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="form-group">
              <label>Email Address</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  required={true}
                  placeholder="Devid@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <i className="fs-input-icon fas fa-at" />
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="form-group">
              <label>Mobile No.</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  name="phone"
                  type="text"
                  required={true}
                  placeholder="+91 91462896323"
                  value={formData.phone}
                  onChange={handleChange}
                />
                 <i className="fas fa-mobile-alt fs-input-icon" />
              </div>
            </div>
          </div>
          
          <div className="col-md-12">
            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                name="message"
                rows={3}
                required={true}
                placeholder="Message sent to the employer"
                value={formData.message}
                onChange={handleChange}
              />
              
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <label>Upload Resume</label>
              <DropzoneComponent
                config={{
                  postUrl: "/apply-job",
                }}
                eventHandlers={{
                  addedfile: handleFileChange,
                }}
              />
              <small>
                If you do not have a resume document, you may write your brief professional profile{" "}
                <NavLink to={publicUser.pages.CONTACT} className="site-text-primary">
                  here
                </NavLink>
              </small>
            </div>
          </div>
<h4 style={{textAlign:'center'}}>Employer Inquiry Responses</h4>
          {/* Displaying multiple questions */}
          {jobs?.question && jobs.question.length > 0 && (
            <div className="col-md-12">
              {jobs.question.map((q, index) => (
                <div key={index} className="form-group">
                  <label>Q{index+1}     {q}</label>
                  <textarea
                    className="form-control"
                    name={`answer-${index}`}
                    rows={3}
                    placeholder="Your answer"
                    value={formData.answers[index] || ""}
                    onChange={handleChange}   
                    required={true}
                  />
                  <div className="form-group">
                    <label>Upload Video (Optional)</label>
                    <DropzoneComponent
  config={{
    postUrl: "/apply-job",
    acceptedFiles: "video/*",
  }}
  eventHandlers={{
    addedfile: (file) => handleVideoChange(file, index),
 
  }}
  
  required
/>

                  </div>
                </div>
              ))}
            </div>
          )}

                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="text-left">
              <button type="submit" className="site-button">
                Send Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SectionApplyJob;
