import React, { useState, useEffect } from "react";
import axios from 'axios';
function SectionCanDesiredProfile() {
 const [message, setMessage] = useState('');
   const [error,seterror]=useState('')
     const [success,setsuccess]=useState('')
  const [formData, setFormData] = useState({
    Industry: '',
    Department: '',
    Role: '',
    Jobtype: '',
    EmploymentType: '',
    PreferredShift: '',
    AvailabilitytoJoin: '',
    ExpectedSalary: {
      MoneyType: "",
      money:''
    },
    DesiredLocation: '',
    DesiredIndustry: '',
  });

  console.log(formData.ExpectedSalary.thousand)

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/candidate/Career`, formData, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setMessage(response.data.message);
      setsuccess(' updated successfully!');
      window.location.href = "/candidate/my-resume";  // Display success message
    } catch (error) {
      seterror(error.response?.data?.message || 'Something went wrong');
      
    }
  };

  const [resume, setResume] = useState(null);
  const [Error, setError] = useState("");

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
        setResume(data.Career); // Set the fetched resume data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResume();
  }, []);

  
    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn ">
                <h4 className="panel-tittle m-a0">Desired Career Profile</h4>
                <a data-bs-toggle="modal" href="#Desired_Career" role="button" title="Edit" className="site-text-primary">
                    <span className="fa fa-edit" />
                </a>
            </div>
            <div className="panel-body wt-panel-body p-a20">
      <div className="twm-panel-inner">
        {error ? (
          <p className="error">Error: {error}</p>
        ) : resume ? (
          <div className="row">
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Industry</div>
                <span className="twm-s-info-discription">{resume.Industry || "Add Industry"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Functional Area</div>
                <span className="twm-s-info-discription">{resume.Department || "Add Functional Area"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Role</div>
                <span className="twm-s-info-discription">{resume.Role || "Add Role"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Job Type</div>
                <span className="twm-s-info-discription">{resume.Jobtype || "Add Job Type"}</span>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Employment Type</div>
                <span className="twm-s-info-discription">{resume.employmentType || "Add Employment Type"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Desired Shift</div>
                <span className="twm-s-info-discription">{resume.desiredShift || "Add Desired Shift"}</span>
              </div>
            </div> */}
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Availability to Join</div>
                <span className="twm-s-info-discription">{resume.AvailabilitytoJoin || "Add Availability"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Expected Salary</div>
                <span className="twm-s-info-discription">{resume.ExpectedSalary.money || "Add Salary"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Desired Location</div>
                <span className="twm-s-info-discription">{resume.DesiredLocation || "Add Desired Location"}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="twm-s-detail-section">
                <div className="twm-title">Desired Industry</div>
                <span className="twm-s-info-discription">{resume.DesiredIndustry || "Add Desired Industry"}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading job details...</p>
        )}
      </div>
    </div>
            {/*Desired Career Profile */}
            <div className="modal fade twm-saved-jobs-view" id="Desired_Career" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form  onSubmit={handleSubmit} >
                            <div className="modal-header">
                                <h2 className="modal-title">Desired Career Profile</h2>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    {/*Industry*/}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Industry</label>
                                            <div className="ls-inputicon-box">
                                                <input className="form-control"name="Industry" value={formData.Industry} onChange={handleChange} data-live-search="true" title="" placeholder="Industry" data-bv-field="size"/>
                                               
                                                <i className="fs-input-icon fa fa-industry" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*Functional Area / Department*/}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Functional Area / Department</label>
                                            <div className="ls-inputicon-box">
                                                <input className="form-control"name="Department" value={formData.Department} onChange={handleChange} placeholder="Functional Area / Department" data-live-search="true" title="" data-bv-field="size" />
                                                 
                                                <i className="fs-input-icon fa fa-building" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*Role*/}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Role</label>
                                            <div className="ls-inputicon-box">
                                                <input className="form-control" name="Role" value={formData.Role} onChange={handleChange} data-live-search="true" placeholder="Role" title="" data-bv-field="size" />
                                                
                                                <i className="fs-input-icon fa fa-globe-americas" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*Job Type*/}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Job Type</label>
                                            <div className="row twm-form-radio-inline">
                                                <div className="col-md-6">
                                                    <input className="form-check-input" type="radio" name="Jobtype" checked={formData.Jobtype === "Permanent"} onChange={handleChange} value="Permanent" id="Permanent" />
                                                    <label className="form-check-label" htmlFor="Permanent">
                                                        Permanent
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input className="form-check-input" type="radio" name="Jobtype" checked={formData.Jobtype === "Contractual"} onChange={handleChange}  value="Contractual" id="Contractual" defaultChecked />
                                                    <label className="form-check-label" htmlFor="Contractual">
                                                        Contractual
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*Employment Type*/}
                                    {/* <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Employment Type</label>
                                            <div className="row twm-form-radio-inline">
                                                <div className="col-md-6">
                                                    <input className="form-check-input"  n type="radio" name="EmploymentType"checked={formData.EmploymentType === "Full Time"} onChange={handleChange} value="Full Time" id="Full_Time" />
                                                    <label className="form-check-label" htmlFor="Full_Time">
                                                        Full Time
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input className="form-check-input" n type="radio" name="EmploymentType" checked={formData.EmploymentType === "Part Time"} onChange={handleChange} value="Part Time" id="part_Time"  />
                                                    <label className="form-check-label" htmlFor="part_Time">
                                                        Part Time
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/*Preferred Shift*/}
                                    {/* <div className="col-xl-12 col-lg-12">
    <div className="form-group">
        <label>Preferred Shift</label>
        <div className="row twm-form-radio-inline">
            <div className="col-md-4">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="PreferredShift" 
                    checked={formData.PreferredShift === "Day"} 
                    onChange={handleChange} 
                    value="Day" 
                    id="S_day" 
                />
                <label className="form-check-label" htmlFor="S_day">
                    Day
                </label>
            </div>
            <div className="col-md-4">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="PreferredShift" 
                    checked={formData.PreferredShift === "Night"} 
                    onChange={handleChange} 
                    value="Night" 
                    id="S_night" 
                />
                <label className="form-check-label" htmlFor="S_night">
                    Night
                </label>
            </div>
            <div className="col-md-4">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="PreferredShift" 
                    checked={formData.PreferredShift === "Part Time"} 
                    onChange={handleChange} 
                    value="Part Time" 
                    id="s_part_time" 
                />
                <label className="form-check-label" htmlFor="s_part_time">
                    Part Time
                </label>
            </div>
        </div>
    </div>
</div> */}

                                    {/*Availability to join*/}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Availability to Join</label>
                                            <div className="ls-inputicon-box">
                                                <input className="form-control datepicker" name="AvailabilitytoJoin" value={formData.AvailabilitytoJoin} onChange={handleChange}  data-provide="datepicker"  type="text" placeholder="mm/dd/yyyy" />
                                                <i className="fs-input-icon far fa-calendar" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*Expected Salary*/}
                                    <div className="col-xl-12 col-lg-12">
  <div className="form-group">
    <label>Expected Salary</label>
    <div className="row twm-form-radio-inline">
      <div className="col-md-6">
        <input
          className="form-check-input"
          type="radio"
          name="ExpectedSalary.MoneyType" // Matches the state structure
          value="US Dollars"
          id="s_US_Dollars"
          checked={formData.ExpectedSalary.MoneyType === "US Dollars"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="USDollars">US Dollars</label>
      </div>
      <div className="col-md-6">
        <input
          className="form-check-input"
          type="radio"
          name="ExpectedSalary.MoneyType" // Matches the state structure
          value="Indian Rupees"
          id="s_Indian_Rupees"
          checked={formData.ExpectedSalary.MoneyType === "Indian Rupees"}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="IndianRupees">Indian Rupees</label>
      </div>
    </div>
  </div>
</div>

{/* Money Amount Fields (Lakh and Thousand) */}
<div className="col-xl-12 col-lg-12">
  <div className="form-group">
    <label>Salary Amount</label>
    <div className="row">
      
      <div className="ls-inputicon-box">
        <input
          type="text"
          name="ExpectedSalary.money"
          value={formData.ExpectedSalary.money}
          onChange={handleChange}
          className="form-control"
          placeholder="Salary Amount"
        />
      </div>
    </div>
  </div>
</div>


            {/*Desired Location*/}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>Desired Location</label>
                                            <div className="ls-inputicon-box">
                                                <input className="form-control" data-live-search="true"name="DesiredLocation" value={formData.DesiredLocation} onChange={handleChange} placeholder="Desired Location" title="" data-bv-field="size" />
                                              
                                                <i className="fs-input-icon fa fa-map-marker-alt" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group mb-0">
                                            <label>Desired Industry</label>
                                            <div className="ls-inputicon-box">
                                                <input className="form-control" data-live-search="true" name="DesiredIndustry" value={formData.DesiredIndustry} onChange={handleChange}  title="" data-bv-field="size" placeholder="Desired Industry" />
                                                
                                                <i className="fs-input-icon fa fa-globe-americas" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {success && <div style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center' }}>{success}</div>}
        {error && <div style={{ backgroundColor: 'lightcoral', color: 'darkred', padding: '10px', borderRadius: '5px', marginBottom: '10px', width:'80%', marginLeft:'10%', textAlign:'center'}}>{error}</div>}

                            <div className="modal-footer">
                                <button type="button" className="site-button" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="site-button" onClick={handleSubmit}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SectionCanDesiredProfile;