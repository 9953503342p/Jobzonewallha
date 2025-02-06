import { useState,useEffect } from 'react';
import Cookies from 'js-cookie'; // Import the js-cookie library

function SectionCanEducation() {
    const [education, setEducation] = useState({
        educationCategory: '',  // Correct field name
        course: '',
        university: '',
        startyear:'',
        lastyear:''
      });

        const [success,setsuccess]=useState('')
          const [error,seterror]=useState('')
      
      const handleInputChange = (e) => {


        const { name, value } = e.target;
        setEducation((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      
      const handleSave = async () => {
        if (!education.educationCategory || !education.course || !education.university) {  // Updated from educationType to educationCategory
          seterror('Please fill in all the fields.');
          return;
        }
      
        const userId = Cookies.get('candidateId'); // Fetching userId from cookies
      
        if (!userId) {
          seterror('User ID not found. Please log in again.');
          return;
        }
      
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/resume-education`, {  // Use '/resume-education' here
            method: 'POST',
            headers: {
              'Content-Type': 'appLication/json',
            },
            body: JSON.stringify({
              education: [education], // Send education data as an array
            }),
            credentials: 'include',
          });
      
          const data = await response.json();
      
          if (response.ok) {
           setsuccess('Education details saved successfully!');
            setEducation({ educationCategory: '', course: '', university: '',startyear:'',lastyear:'' }); // Clear the form
          } else {
          seterror(data.message || 'Error saving education details');
          }
        } catch (error) {
          seterror('Error saving education details:', error);
        }
      };


      const [resume, setResume] = useState(null);
  const [Error, setError] = useState('');

  // Fetch resume data from the backend
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/resumes`, {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message || 'Failed to fetch resume data.');
        }

        const data = await response.json();
        setResume(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResume();
  }, []);
  
 
      
      

  return (
    <>
      <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn">
        <h4 className="panel-tittle m-a0">Education</h4>
        <a
          data-bs-toggle="modal"
          href="#Education"
          role="button"
          title="Edit"
          className="site-text-primary"
        >
          <span className="fa fa-edit" />
        </a>
      </div>
      <div className="panel-body wt-panel-body p-a20">
      <div className="twm-panel-inner">
        {error ? (
          <p className="error">Error: {error}</p>
        ) : resume ? (
          <>
            <p>Mention your employment details including your current and previous company work experience</p>

            {/* Education Details */}
            {resume.education && resume.education.length > 0 ? (
              resume.education.map((edu, index) => (
                <div key={index} className="education-entry">
                  
                  <b>{edu.educationCategory}</b>
                  <p>
                    {edu.startyear} to {edu.lastyear || 'Present'}
                  </p>
              
                  <p>
                    {edu.university}
                  </p>
                  <p>
                  </p>
                </div>
              ))
            ) : (
              <p>No education details available.</p>
            )}

            {/* Add Links */}
            <p>
              <a className="site-text-primary" href="#">
                Add Doctorate/PhD
              </a>
            </p>
            <p>
              <a className="site-text-primary" href="#">
                Add Masters/Post-Graduation
              </a>
            </p>
            <p>
              <a className="site-text-primary" href="#">
                Add Graduation/Diploma
              </a>
            </p>
          </>
        ) : (
          <p>Loading resume details...</p>
        )}
      </div>
    </div>

      {/* Education Modal */}
      <div className="modal fade twm-saved-jobs-view" id="Education" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h2 className="modal-title">Education</h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <div className="form-group">
                      <label>Education</label>
                      <div className="ls-inputicon-box">
                        <input
                          className="form-control"
                          name="educationCategory"
                          value={education.educationCategory}
                          onChange={handleInputChange}
                          required
                          data-live-search="true"
                          title=""
                          type="text"
                          placeholder='Education'
                          data-bv-field="size"
                       />
                          
                        <i className="fs-input-icon fa fa-user-graduate" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12">
                    <div className="form-group">
                      <label>Course</label>
                      <div className="ls-inputicon-box">
                        <input
                          className="form-control"
                          name="course"
                          value={education.course}
                          onChange={handleInputChange}
                          required
                          data-live-search="true"
                          title=""
                          type="text"
                          data-bv-field="size"
                          placeholder='Course'
                        />
                       
                        <i className="fs-input-icon fa fa-book" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12">
                    <div className="form-group">
                      <label>University/Institute</label>
                      <div className="ls-inputicon-box">
                        <input
                          className="form-control"
                          name="university"
                          value={education.university}
                          onChange={handleInputChange}
                          required
                          data-live-search="true"
                          title=""
                          type="text"
                          data-bv-field="size"
                          placeholder='University/Institute'
                        />
                      
                        <i className="fs-input-icon fas fa-book-reader" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12">
                    <div className="form-group">
                      <label>Start Year</label>
                      <div className="ls-inputicon-box">
                      <input
  className="form-control"
  name="startyear"
  value={education.startyear}
  onChange={handleInputChange}
  required
  type="date"  // Use date input type to trigger the calendar picker
  placeholder="Start Year"
  data-bv-field="size"
/>

                      <i className="fs-input-icon fas fa-calendar" />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12">
                    <div className="form-group">
                      <label>Last Year</label>
                      <div className="ls-inputicon-box">
                        <input
                          className="form-control"
                          name="lastyear"
                          type='date'
                          value={education.lastyear}
                          onChange={handleInputChange}
                          required
                          data-live-search="true"
                          title=""
                          placeholder='Last year'
                          data-bv-field="size"
                       />
                         
                        <i className="fs-input-icon fas fa-calendar" />
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
                <button type="button" className="site-button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionCanEducation;
