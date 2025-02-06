import React, { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function SectionCanITSkills() {
    const [skills, setSkills] = useState('');
    const [version, setVersion] = useState('');
    const [lastUsed, setLastUsed] = useState('');
    const [experienceYear, setExperienceYear] = useState('');
    const [month, setMonth] = useState('');
       const [success,setsuccess]=useState('')
        const [error,seterror]=useState('')
        const [skillss, setSkillss] = useState([]);
        const [errors, setErrors] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userId = Cookies.get('candidateId'); // Get userId from cookies
    
        const newItSkill = {
            userId,
            Skills: skills,
            Version: version,
            lastused: lastUsed,
            Experienceyear: experienceYear,
            Month: month
        };
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/it-skills`, newItSkill, {
                withCredentials: true // Ensure cookies are sent with the request
            });
            setsuccess('IT skill added successfully!');
            // Optionally, refresh the IT skills table after successful submission
        } catch (error) {
            seterror('Error adding IT skill: ' + error.message);
        }
    };


  
    // Fetch data from the backend
    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resumes`, {
            method: "GET",
            credentials: "include", // Include cookies for authentication
          });
  
          if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message || "Failed to fetch skills data.");
          }
  
          const data = await response.json();
          setSkillss(data.Itskill || []); // Assuming `skills` is the field in the response
        } catch (err) {
            setErrors(err.message);
        }
      };
      console.log("skladkfnsd",skillss);
  
      fetchSkills();
    }, []);
  
  
    

    
    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Skills</h4>
                <a data-bs-toggle="modal" href="#IT_skills" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
      <div className="twm-panel-inner">
        <p>Mention your employment details, including your current and previous company work experience</p>
        <div className="table-responsive">
          <table className="table twm-table table-striped table-borderless">
            <thead>
              <tr>
                <th>Skills</th>
                <th>Version</th>
                <th>Last Used</th>
                <th>Last used</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="5" className="error">
                    Error: {error}
                  </td>
                </tr>
              ) : skillss.length > 0 ? (
                skillss.map((skill, index) => (
                  <tr key={index}>
                    <td>{skill.Skills}</td>
                    <td>{skill.Version}</td>
                    <td>{skill.lastused}</td>
                    <td>{skill.Month}</td>
                    <td>{skill.Experienceyear}</td>
                    <td>
                      <a
                        data-bs-toggle="modal"
                        href="#IT_skills"
                        role="button"
                        title="Edit"
                        className="site-text-primary"
                      >
                        <span className="fa fa-edit" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No skills data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
            {/*IT_skills */}
            <div className="modal fade twm-saved-jobs-view" id="IT_skills" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h2 className="modal-title">Skills</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Skills</label>
                                            <div className="ls-inputicon-box">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter IT Skills"
                                                    value={skills}
                                                    onChange={(e) => setSkills(e.target.value)}
                                                />
                                                <i className="fs-input-icon fa fa-address-card" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Version</label>
                                            <div className="ls-inputicon-box">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter Version"
                                                    value={version}
                                                    onChange={(e) => setVersion(e.target.value)}
                                                />
                                                <i className="fs-input-icon fa fa-info" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Last Used</label>
                                            <div className="ls-inputicon-box">
                                                <input
                                                    className="form-control"
                                                    value={lastUsed}
                                                    onChange={(e) => setLastUsed(e.target.value)}
                                                />
                                                
                                                <i className="fs-input-icon fa fa-calendar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Experience year</label>
                                            <div className="ls-inputicon-box">
                                                <input
                                                    className="form-control"
                                                    value={experienceYear}
                                                    onChange={(e) => setExperienceYear(e.target.value)}
                                                />
                                                 
                                                <i className="fs-input-icon fa fa-user-edit" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Month</label>
                                            <div className="ls-inputicon-box">
                                                <select
                                                    className="wt-select-box selectpicker"
                                                    value={month}
                                                    onChange={(e) => setMonth(e.target.value)}
                                                >
                                                    <option value="">Select Month</option>
                                                    <option value="January">January</option>
                                                    <option value="February">February</option>
                                                </select>
                                                <i className="fs-input-icon fa fa-user-edit" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {success && <div style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center' }}>{success}</div>}
        {error && <div style={{ backgroundColor: 'lightcoral', color: 'darkred', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center'}}>{error}</div>}

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
    )
}
export default SectionCanITSkills;