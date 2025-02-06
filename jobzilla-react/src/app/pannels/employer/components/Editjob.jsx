import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EmployeeEditjob({  }) {
  const { id } =useParams() // Get the job ID from the URL
  console.log(id)
  const [formData, setFormData] = useState({
    jobtitle: '',
    jobcategory: '',
    jobtype: '',
    offeredsalary: '',
    experience: '',
    qualification: '',
    gender: '',
    country: '',
    city: '',
    location: '',
    latitude: '',
    longitude: '',
    email: '',
    website: '',
    estsince: '',
    completeaddress: '',
    description: '',
    startDate: '',
    endDate: '',
    Vacnices: '',
    question: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch job details when the component mounts
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(` ${process.env.REACT_APP_API_URL}/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setFormData(data); // Populate form with fetched data
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details');
      }
    };

    fetchJobDetails();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle question input changes
  const handleQuestionChange = (e, index) => {
    const newQuestions = [...formData.question];
    newQuestions[index] = e.target.value;
    setFormData({ ...formData, question: newQuestions });
  };

  // Add a new question field
  const addQuestion = () => {
    setFormData({ ...formData, question: [...formData.question, ''] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(` ${process.env.REACT_APP_API_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      const data = await response.json();
      setSuccess('Job updated successfully');
      setError('');
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job');
      setSuccess('');
    }
  };

  return (
    <>
      <div className="wt-admin-right-page-header clearfix">
        <h2>Edit Post a Job</h2>
        <div className="breadcrumbs">
          <a href="#">Home</a>
          <a href="#">Dashboard</a>
          <span>Edit Job Submission Form</span>
        </div>
      </div>

      {/* Basic Information */}
      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-tittle m-a0">
            <i className="fa fa-suitcase" /> Edit Job Details
          </h4>
        </div>
        <div className="panel-body wt-panel-body p-a20 m-b30 ">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Job Title */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Job Title</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="jobtitle"
                      value={formData.jobtitle}
                      onChange={handleChange}
                      type="text"
                      placeholder="Devid Smith"
                    />
                    <i className="fs-input-icon fa fa-address-card" />
                  </div>
                </div>
              </div>

              {/* Job Category */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Job Category</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="jobcategory"
                      value={formData.jobcategory}
                      onChange={handleChange}
                      type="text"
                      placeholder="Accounting and Finance"
                    />
                    <i className="fs-input-icon fa fa-laptop-code" />
                  </div>
                </div>
              </div>

              {/* Job Type */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Job Type</label>
                  <div className="ls-inputicon-box">
                    <select
                      className="wt-select-box selectpicker"
                      name="jobtype"
                      value={formData.jobtype}
                      onChange={handleChange}
                      data-live-search="true"
                      title=""
                      id="s-category"
                      data-bv-field="size"
                    >
                      <option className="bs-title-option" value="">
                        Select Category
                      </option>
                      <option>Full Time</option>
                      <option>Internship</option>
                    </select>
                    <i className="fs-input-icon fa fa-file-alt" />
                  </div>
                </div>
              </div>

              {/* Offered Salary */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Salary</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="offeredsalary"
                      value={formData.offeredsalary}
                      onChange={handleChange}
                      type="text"
                      placeholder="Salary"
                    />
                    <i className="fs-input-icon fa fa-money-bill-wave" />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Experience</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      type="text"
                      placeholder="E.g. Minimum 3 years"
                    />
                    <i className="fs-input-icon fa fa-user-edit" />
                  </div>
                </div>
              </div>

              {/* Qualification */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Qualification</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      type="text"
                      placeholder="Qualification Title"
                    />
                    <i className="fs-input-icon fa fa-user-graduate" />
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Gender</label>
                  <div className="ls-inputicon-box">
                    <select
                      className="wt-select-box selectpicker"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      data-live-search="true"
                      title=""
                      id="gender"
                      data-bv-field="size"
                    >
                      <option className="bs-title-option" value="">
                        Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <i className="fs-input-icon fa fa-venus-mars" />
                  </div>
                </div>
              </div>

              {/* Country */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Country</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      type="text"
                      placeholder="Country Name"
                    />
                    <i className="fs-input-icon fa fa-globe" />
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>City</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      type="text"
                      placeholder="City Name"
                    />
                    <i className="fs-input-icon fa fa-city" />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Location</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      type="text"
                      placeholder="Type Address"
                    />
                    <i className="fs-input-icon fa fa-map-marker-alt" />
                  </div>
                </div>
              </div>

              {/* Latitude */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Latitude</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      type="text"
                      placeholder="Los Angeles"
                    />
                    <i className="fs-input-icon fa fa-map-pin" />
                  </div>
                </div>
              </div>

              {/* Longitude */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Longitude</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      type="text"
                      placeholder="Los Angeles"
                    />
                    <i className="fs-input-icon fa fa-map-pin" />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Devid@example.com"
                    />
                    <i className="fs-input-icon fas fa-at" />
                  </div>
                </div>
              </div>

              {/* Website */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Website</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      type="text"
                      placeholder="https://..."
                    />
                    <i className="fs-input-icon fa fa-globe-americas" />
                  </div>
                </div>
              </div>

              {/* Est. Since */}
              <div className="col-xl-4 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Est. Since</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="estsince"
                      value={formData.estsince}
                      onChange={handleChange}
                      type="text"
                      placeholder="Since..."
                    />
                    <i className="fs-input-icon fa fa-clock" />
                  </div>
                </div>
              </div>

              {/* Complete Address */}
              <div className="col-xl-12 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Complete Address</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="completeaddress"
                      value={formData.completeaddress}
                      onChange={handleChange}
                      type="text"
                      placeholder="1363-1385 Sunset Blvd Los Angeles, CA 90026, USA"
                    />
                    <i className="fs-input-icon fa fa-home" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="col-md-12">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Greetings! We are Galaxy Software Development Company. We hope you enjoy our services and quality."
                    defaultValue={""}
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control datepicker"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      data-provide="datepicker"
                      type="text"
                      placeholder="mm/dd/yyyy"
                    />
                    <i className="fs-input-icon far fa-calendar" />
                  </div>
                </div>
              </div>

              {/* End Date */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>End Date</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control datepicker"
                      data-provide="datepicker"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      type="text"
                      placeholder="mm/dd/yyyy"
                    />
                    <i className="fs-input-icon far fa-calendar" />
                  </div>
                </div>
              </div>

              {/* Vacancies */}
              <div className="col-xl-12 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Vacancies</label>
                  <div className="ls-inputicon-box">
                    <input
                      className="form-control"
                      name="Vacnices"
                      value={formData.Vacnices}
                      onChange={handleChange}
                      type="text"
                      placeholder="35"
                    />
                    <i
                      className="fas fa-briefcase"
                      style={{
                        color: 'blue',
                        position: 'relative',
                        bottom: '42px',
                        left: '6px',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="col-xl-12 col-lg-6 col-md-12">
                <div className="form-group">
                  <label>Questions</label>
                  {formData.question.map((q, index) => (
                    <div className="ls-inputicon-box" key={index}>
                      <input
                        className="form-control"
                        name="question"
                        value={q}
                        onChange={(e) => handleQuestionChange(e, index)}
                        type="text"
                        placeholder={`Enter question #${index + 1}`}
                      />
                      <i
                        className="fas fa-question-circle"
                        style={{
                          color: 'blue',
                          position: 'relative',
                          bottom: '42px',
                          left: '6px',
                        }}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="btn btn-primary mt-2"
                  >
                    Add Question
                  </button>
                </div>
              </div>

              {/* Error and Success Messages */}
              {error && !success && (
                <p
                  style={{
                    color: 'red',
                    backgroundColor: '#f8d7da',
                    height: '40px',
                    borderRadius: '8px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                  }}
                >
                  {error}
                </p>
              )}

              {success && !error && (
                <p
                  style={{
                    color: 'green',
                    backgroundColor: '#d4edda',
                    height: '40px',
                    borderRadius: '8px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                  }}
                >
                  {success}
                </p>
              )}

              {/* Buttons */}
              <div className="col-lg-12 col-md-12">
                <div className="text-left">
                  <button type="submit" className="site-button m-r5">
                    Publish Job
                  </button>
                  <button type="submit" className="site-button outline-primary">
                    Save Draft
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeEditjob;