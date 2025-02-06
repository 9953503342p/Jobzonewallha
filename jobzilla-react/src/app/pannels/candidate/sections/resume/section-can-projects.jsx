import React, { useState,useEffect } from "react";

function SectionCanProjects() {
  
    const [message, setMessage] = useState('');
    const [error,seterror]=useState('')
    const [formData, setFormData] = useState({
        Projecttitle: "",
        Education: "",
        Client: "",
        Projectstatus: "In Progress", // Default value
        Startworking: "",
        endwork: "",
        Detailofproject: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/candidate/Add-project`, {
            method: "POST",
            credentials: "include", // Ensures cookies are sent with the request
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
    
          const data = await response.json();
    
          if (response.ok) {
            setMessage("Project added successfully!");
          } else {
            seterror(data.message || "Failed to add project");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          seterror("An error occurred. Please try again later.");
        }
      };
      const [projects, setProjects] = useState([]);
      const [Error, setError] = useState("");
    
      useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resumes`, {
              method: "GET",
              credentials: "include", // Include cookies for authentication
            });
    
            if (!response.ok) {
              const { message } = await response.json();
              throw new Error(message || "Failed to fetch projects.");
            }
    
            const data = await response.json();
            setProjects(data.Addproject); // Expecting an array of projects
          } catch (err) {
            setError(err.message);
          }
        };
    
        fetchProjects();
      }, []);
 
    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Project</h4>
                <a data-bs-toggle="modal" href="#Pro_ject" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
      <div className="twm-panel-inner">
        {error ? (
          <p className="error">Error: {error}</p>
        ) : projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="project">
              <p>
                <b>{project.Projecttitle}</b>
              </p>
              <p>{project.Client}</p>
              <p>{`${project.Startworking} to ${project.endwork || "Present"}`}</p>
              <p>{project.Detailofproject}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>Loading projects...</p>
        )}
      </div>
    </div>
            {/*Project */}
            <div className="modal fade twm-saved-jobs-view" id="Pro_ject" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h2 className="modal-title">Add Project</h2>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="form-group">
              <label>Project Title</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Project Title"
                  name="Projecttitle"
                  value={formData.Projecttitle}
                  onChange={handleChange}
                  required
                />
                <i className="fs-input-icon fa fa-address-card" />
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12">
            <div className="form-group">
              <label>Education</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  name="Education"
                  value={formData.Education}
                  placeholder="Enter Education"
                  onChange={handleChange}
                  required
                />
                 
                <i className="fs-input-icon fa fa-user-graduate" />
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12">
            <div className="form-group">
              <label>Client</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Client Name"
                  name="Client"
                  value={formData.Client}
                  onChange={handleChange}
                  required
                />
                <i className="fs-input-icon fa fa-user" />
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12">
            <div className="form-group">
              <label>Project Status</label>
              <div className="row twm-form-radio-inline">
                <div className="col-md-6">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Projectstatus"
                    value="In Progress"
                    checked={formData.Projectstatus === "In Progress"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">In Progress</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Projectstatus"
                    value="Finished"
                    checked={formData.Projectstatus === "Finished"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Finished</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Started Working From</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  type="date"
                  name="Startworking"
                  value={formData.Startworking}
                  onChange={handleChange}
                  required
                />
                <i className="fs-input-icon far fa-calendar" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Worked Till</label>
              <div className="ls-inputicon-box">
                <input
                  className="form-control"
                  type="date"
                  name="endwork"
                  value={formData.endwork}
                  onChange={handleChange}
                  required
                />
                <i className="fs-input-icon far fa-calendar" />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group mb-0">
              <label>Detail of Projects</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Describe your Job"
                name="Detailofproject"
                value={formData.Detailofproject}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
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
    )
}
export default SectionCanProjects;