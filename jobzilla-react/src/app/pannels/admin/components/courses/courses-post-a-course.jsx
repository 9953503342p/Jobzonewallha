import React, { useState } from 'react';

function EmpPostAJobPage() {
  const [formData, setFormData] = useState({
    jobtitle: '',
    website: '',
    estsince: '',
    courseimage: null,
    description: '',
    placementprice:'',
    courseseat:''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'courseimage') {
      // Handle file input
      setFormData((prevData) => ({
        ...prevData,
        courseimage: files[0], // Store the selected file
      }));
    } else {
      // Handle text input
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('coursetitle', formData.jobtitle); // Map jobtitle to coursetitle
      formDataToSend.append('courseprice', formData.website); // Map website to courseprice
      formDataToSend.append('courseduration', formData.estsince); // Map estsince to courseduration
      formDataToSend.append('courseimage', formData.courseimage); // Add the course image file
      formDataToSend.append('coursedescription', formData.description);
      formDataToSend.append('placementprice', formData.placementprice);
      formDataToSend.append('courseseat', formData.courseseat);
      


      const response = await fetch(`${process.env.REACT_APP_API_URL}/post-course`, {
        method: 'POST',
        body: formDataToSend, // Send the FormData
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Course posted successfully');
        setError('');
        // Clear form
        setFormData({
          jobtitle: '',
          website: '',
          estsince: '',
          courseimage: null,
          coursedescription: '',
          placementprice:'',
          courseseat:''
        });
      } else {
        setError(result.message || 'Failed to post course');
      }
    } catch (error) {
      console.error('Error posting course:', error);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <div style={{ width: '80%' }}>
        <div className="wt-admin-right-page-header clearfix">
          <h2>Post a Course</h2>
          <div className="breadcrumbs">
            <a href="#">Home</a>
            <a href="#">Dashboard</a>
            <span>Course Submission Form</span>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading wt-panel-heading p-a20">
            <h4 className="panel-title m-a0">
              <i className="fa fa-suitcase" /> Course Details
            </h4>
          </div>
          <div className="panel-body wt-panel-body p-a20 m-b30">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Course Title */}
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Course Title</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="jobtitle"
                        value={formData.jobtitle}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course title"
                      />
                      <i className="fs-input-icon fa fa-address-card" />
                    </div>
                  </div>
                </div>

                {/* Course Price */}
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Course Price</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course price"
                      />
                      <i className="fs-input-icon fa fa-money-bill-wave" />
                    </div>
                  </div>
                </div>

                {/* Course Duration */}
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Course Duration</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="estsince"
                        value={formData.estsince}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course duration"
                      />
                      <i className="fs-input-icon fa fa-clock" />
                    </div>
                  </div>
                </div>

                          {/* Course Duration */}
                          <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Placemant Price</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="placementprice"
                        value={formData.placementprice}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course duration"
                      />
                      <i className="fs-input-icon fa fa-clock" />
                    </div>
                  </div>
                </div>

                {/* Course Image */}
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Course Image</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="courseimage"
                        onChange={handleChange}
                        type="file"
                        accept="image/*"
                      />
                      <i className="fs-input-icon fa fa-image" />
                    </div>
                  </div>
                </div>
                          {/* Course Duration */}
                          <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Course Seat</label>
                    <div className="ls-inputicon-box">
                      <input
                        className="form-control"
                        name="courseseat"
                        value={formData.courseseat}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter course duration"
                      />
                      <i className="fs-input-icon fa fa-clock" />
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
                      placeholder="Enter course description"
                    />
                  </div>
                </div>
                

                {/* Submit Button */}
                <div className="col-lg-12 col-md-12">
                  <div className="text-left">
                    <button type="submit" className="site-button m-r5">
                      Publish Course
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* Success/Error Messages */}
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpPostAJobPage;
