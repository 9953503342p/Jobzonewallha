import { useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import { useNavigate } from "react-router-dom"; 
import { loadScript } from "../../../../globals/constants";
import { DropzoneComponent } from "react-dropzone-component";
function EmpCompanyProfilePage() {


    const [companylogo, setcompanylogo] = useState(null);
    const [backgroundbannerlogo, setBackgroundBanner] = useState(null);
    const [error,seterror]=useState('')
    const [success,setSuccess]=useState('')
    const [message, setMessage] = useState('');
  const [imagePath, setImagePath] = useState('');
    const [formData, setFormData] = useState({
      companyName: "",
      phone: "",
      email: "",
      Website: "",
      Estsince: "",
      TeamSize: "",
      description: "",
      companylogo:"",
      about:'',
      Address:''
    });
  
              const navigate = useNavigate();
          
              useEffect(() => {
                  // Load custom scripts
                
                  // Check for candidateId in cookies
                  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
                      const [key, value] = cookie.split("=");
                      acc[key] = value;
                      return acc;
                  }, {});
          
                  if (!cookies.employeeid) {
                      // Redirect to login page if candidateId cookie is not present
                      navigate("/after-login");
                  }
              }, [navigate]);
        

    
    const handleFileUpload = (file, type) => {
      if (type === "companylogo") {
        setcompanylogo(file);
      } else if (type === "backgroundbannerlogo") {
        setBackgroundBanner(file);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = new FormData();
      form.append("companylogo", companylogo);
      form.append("backgroundbannerlogo", backgroundbannerlogo);
      form.append("companyName", formData.companyName);
      form.append("phone", formData.phone);
      form.append("email", formData.email);
      form.append("Website", formData.Website);
      form.append("Estsince", formData.Estsince);
      form.append("TeamSize", formData.TeamSize);
      form.append("description", formData.description);
      form.append("about", formData.about);
      form.append("Address", formData.Address);
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/update-employor-info`, {
          method: "POST",
          body: form,
          credentials: "include", // Ensures cookies are sent
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccess("Profile updated successfully!");
        } else {
          seterror(` ${data.message}`);
         
        }
      } catch (error) {
        console.error("Error updating profile", error);
        seterror("An error occurred while updating the profile.");
      }
    };
  
  
    useEffect(() => {
        loadScript("js/custom.js")
    })

    var componentConfig = {
        postUrl: 'upload.php'
    };

    const [youtubeFields, setYoutubeFields] = useState(0);
    const [vimeoFields, setVimeoFields] = useState(0);

    function handleYoutubeClick() {
        setYoutubeFields(youtubeFields + 1);
    }

    function handleVimeoClick() {
        setVimeoFields(vimeoFields+1);
    }

    
    const [socialLinks, setSocialLinks] = useState({
        Facebook: '',
        Twitter: '',
        Linkedin: '',
        Whatsapp: '',
        Instagram: '',
        Pinterest: '',
        Tumblr: '',
        Youtube: '',
      });
      
      // Handle form changes
      const handleChange1 = (e) => {
        setSocialLinks({
          ...socialLinks,
          [e.target.name]: e.target.value,
        });
      };
      
      
const socialMediaLinksemployer = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-employer-socialmedia`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socialLinks }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error updating social media links');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred');
    }
  };

  const [youtubeLinks, setYoutubeLinks] = useState(['']);
  const [vimeoLinks, setVimeoLinks] = useState(['']);
  const [customVideo, setCustomVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle adding YouTube fields
  const addYoutubeField = () => {
    setYoutubeLinks([...youtubeLinks, '']);
  };

  const removeYoutubeField = (index) => {
    const newLinks = youtubeLinks.filter((_, i) => i !== index);
    setYoutubeLinks(newLinks);
  };

  const handleYoutubeChange = (index, value) => {
    const newLinks = [...youtubeLinks];
    newLinks[index] = value;
    setYoutubeLinks(newLinks);
  };

  // Handle adding Vimeo fields
  const addVimeoField = () => {
    setVimeoLinks([...vimeoLinks, '']);
  };

  const removeVimeoField = (index) => {
    const newLinks = vimeoLinks.filter((_, i) => i !== index);
    setVimeoLinks(newLinks);
  };

  const handleVimeoChange = (index, value) => {
    const newLinks = [...vimeoLinks];
    newLinks[index] = value;
    setVimeoLinks(newLinks);
  };

  // Handle custom video file selection
  const handleCustomVideoChange = (file) => {
    setCustomVideo(file);
  };

  // Handle form submission
  const handleSubmit1 = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('youtubeLinks', JSON.stringify(youtubeLinks));
    formData.append('vimeoLinks', JSON.stringify(vimeoLinks));

    if (customVideo) {
      formData.append('customVideo', customVideo);
    }

    try {
      setUploading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update-employer-videogallery`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies in the request
      });

      const result = await response.json();

      if (response.ok) {
        alert('Video gallery updated successfully!');
      } else {
        alert('Failed to update video gallery.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload3 = async (file) => {
    const formData = new FormData();
    formData.append('gallery', file);  // Append the file to the FormData
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/upload-gallery`, {
        method: 'POST',
        body: formData,
        credentials: 'include',  // Ensure cookies are sent with the request
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('File uploaded successfully');
        setImagePath(data.imagePath);  // Assuming backend returns the image path
      } else {
        setMessage('Error: ' + data.message);
      }
    } catch (error) {
      setMessage('An error occurred during the upload.');
    }
  };
  
  
      
    return (
        <>
            <div className="wt-admin-right-page-header clearfix">
                <h2>Company Profile!</h2>
                <div className="breadcrumbs"><a href="#">Home</a><a href="#">Dasboard</a><span>Company Profile!</span></div>
            </div>
            {/*Logo and Cover image*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Logo and Cover image</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 p-b0 m-b30 ">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                                <div className="dashboard-profile-pic">
                                    <div className="dashboard-profile-photo">
                                        <JobZImage src="images/jobs-company/pic1.jpg" alt="" />
                                        <div className="upload-btn-wrapper">
                                            <div id="upload-image-grid" />
                                            <button className="site-button button-sm"  name="companylogo" accept=".jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e.target.files[0], "companylogo")}>Upload Photo
                                            <input type="file" name="companylogo" id="file-uploader" accept=".jpg, .jpeg, .png" />
                                            </button>
                                        </div>
                                    </div>
                                    <p><b>Company Logo :- </b> Max file size is 1MB, Minimum dimension: 136 x 136 And Suitable files are .jpg &amp; .png</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
  <div className="dashboard-cover-pic">
    {/* Configuring Dropzone to send the file under the correct field name */}
    <DropzoneComponent
      config={{
        postUrl: '/update-employor-info',  // Assuming this is the correct backend endpoint
      }}
      eventHandlers={{
        addedfile: (file) => handleFileUpload(file, "backgroundbannerlogo"),  // Sending file as 'backgroundbannerlogo'
      }}
    />
    <p>
      <b>Background Banner Image :- </b> Max file size is 1MB, Minimum dimension: 770 x 310 And Suitable files are .jpg &amp; .png
    </p>
  </div>
</div>

                    </div>
                </div>
            </div>
            {/*Basic Information*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Basic Informations</h4>
                </div>
                <div className="panel-body wt-panel-body p-a20 m-b30 ">
                <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <div className="ls-inputicon-box">
                                    <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter company name"
              />        <i className="fs-input-icon fa fa-user " />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <div className="ls-inputicon-box">
                                    <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter phone number"
              />      <i className="fs-input-icon fa fa-phone-alt" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>email Address</label>
                                    <div className="ls-inputicon-box">
                                    <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email address"
              />       <i className="fs-input-icon fa fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Website</label>
                                    <div className="ls-inputicon-box">
                                    <input
                type="text"
                name="Website"
                value={formData.Website}
                onChange={handleChange}
                className="form-control"
                placeholder="https://example.com"
              />       <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Est. Since</label>
                                    <div className="ls-inputicon-box">
                                    <input
                type="text"
                name="Estsince"
                value={formData.Estsince}
                onChange={handleChange}
                className="form-control"
                placeholder="Year of establishment"
              />     <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group city-outer-bx has-feedback">
                                    <label>Team Size</label>
                                    <div className="ls-inputicon-box">
                                    <select
                name="TeamSize"
                value={formData.TeamSize}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Team Size</option>
                <option value="5-10">5-10</option>
                <option value="10+">10+</option>
                <option value="20+">20+</option>
                <option value="50+">50+</option>
              </select>
                                        <i className="fs-input-icon fa fa-sort-numeric-up" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description</label>
                                   <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Company description"
                rows="3"
              />   </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>ABOUT COMPANY</label>
                                   <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="form-control"
                placeholder="Company description"
                rows="3"
              />   </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Address</label>
                                   <textarea
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                className="form-control"
                placeholder="Company description"
                rows="3"
              />   </div>
                            </div>
                            {error && !success&&( <p style={{color: "red",backgroundColor: "#f8d7da",height: "40px",borderRadius: "8px",width: "100%",display: "flex",alignItems:"center",padding: "0 10px" }}>{error}</p>)}

{success && !error && (<p style={{color: "green",backgroundColor: "#d4edda",height: "40px",borderRadius: "8px",width: "100%",display: "flex",alignItems: "center" ,padding: "0 10px" }}>{success}</p>
)}

                            <div className="col-lg-12 col-md-12">
                                <div className="text-left">
                                    <button type="submit" className="site-button">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/*Photo gallery*/}
            <div className="panel panel-default">
      <div className="panel-heading wt-panel-heading p-a20">
        <h4 className="panel-title m-a0">Photo Gallery</h4>
      </div>
      <div className="panel-body wt-panel-body p-a20 m-b30">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              {/* DropzoneComponent with the specified configuration */}
              <DropzoneComponent
  config={{
    postUrl: '/upload-gallery',
  }}
  eventHandlers={{
    addedfile: (file) => handleFileUpload3(file ,"gallery"),  // Only pass the file
  }}
/>


            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="text-left">
              <button type="submit" className="site-button">Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Display message after upload */}
      {message && <p>{message}</p>}

    </div>
            {/*Video gallery*/}
            {/* <form onSubmit={handleSubmit1}>
      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-title m-a0">Video Gallery</h4>
        </div>

        <div className="panel-body wt-panel-body p-a20 m-b30">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label>YouTube</label>
                <div className="ls-inputicon-box input_fields_youtube">
                  {youtubeLinks.map((link, index) => (
                    <div key={index} className="ls-inputicon-box m-tb10">
                      <input
                        className="form-control wt-form-control"
                        type="text"
                        placeholder="https://www.youtube.com/"
                        value={link}
                        onChange={(e) => handleYoutubeChange(index, e.target.value)}
                      />
                      <i className="fs-input-icon fab fa-youtube" />
                      {index > 0 && (
                        <a
                          href="#"
                          onClick={() => removeYoutubeField(index)}
                          className="remove_field"
                        >
                          <i className="fa fa-times"></i>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-right m-tb10">
                  <button type="button" onClick={addYoutubeField} className="add_field_youtube">
                    Add More Fields <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label>Vimeo</label>
                <div className="ls-inputicon-box input_fields_vimeo">
                  {vimeoLinks.map((link, index) => (
                    <div key={index} className="ls-inputicon-box m-tb10">
                      <input
                        className="form-control wt-form-control"
                        type="text"
                        placeholder="https://vimeo.com/"
                        value={link}
                        onChange={(e) => handleVimeoChange(index, e.target.value)}
                      />
                      <i className="fs-input-icon fab fa-vimeo-v" />
                      {index > 0 && (
                        <a
                          href="#"
                          onClick={() => removeVimeoField(index)}
                          className="remove_field"
                        >
                          <i className="fa fa-times"></i>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-right m-tb10">
                  <button type="button" onClick={addVimeoField} className="add_field_vimeo">
                    Add More Fields <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="custome-video-upload form-group">
                <label>Custom Video</label>
                <DropzoneComponent
                  config={{
                    postUrl: `${process.env.REACT_APP_API_URL}/update-employer-videogallery`,
                  }}
                  eventHandlers={{
                    addedfile: (file) => {
                      handleCustomVideoChange(file); // Handle the file change
                    },
                  }}
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="text-left">
                <button type="submit" className="site-button">
                  {uploading ? 'Uploading...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form> */}
            {/*Social Network*/}
            <div className="panel panel-default">
      <div className="panel-heading wt-panel-heading p-a20">
        <h4 className="panel-tittle m-a0">Social Network</h4>
      </div>
      <div className="panel-body wt-panel-body p-a20 m-b30">
        <form onSubmit={socialMediaLinksemployer}>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>Facebook</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Facebook"
                    type="text"
                    placeholder="https://www.facebook.com/"
                    value={socialLinks.Facebook}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-facebook-f" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>Twitter</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Twitter"
                    type="text"
                    placeholder="https://twitter.com/"
                    value={socialLinks.Twitter}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-twitter" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>Linkedin</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Linkedin"
                    type="text"
                    placeholder="https://in.linkedin.com/"
                    value={socialLinks.Linkedin}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-linkedin-in" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>Whatsapp</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Whatsapp"
                    type="text"
                    placeholder="https://www.whatsapp.com/"
                    value={socialLinks.Whatsapp}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-whatsapp" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>Instagram</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Instagram"
                    type="text"
                    placeholder="https://www.instagram.com/"
                    value={socialLinks.Instagram}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-instagram" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>Pinterest</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Pinterest"
                    type="text"
                    placeholder="https://in.pinterest.com/"
                    value={socialLinks.Pinterest}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-pinterest-p" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>Tumblr</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Tumblr"
                    type="text"
                    placeholder="https://www.tumblr.com/"
                    value={socialLinks.Tumblr}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-tumblr" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <label>YouTube</label>
                <div className="ls-inputicon-box">
                  <input
                    className="form-control wt-form-control"
                    name="Youtube"
                    type="text"
                    placeholder="https://www.youtube.com/"
                    value={socialLinks.Youtube}
                    onChange={handleChange1}
                  />
                  <i className="fs-input-icon fab fa-youtube" />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="text-left">
                <button type="submit" className="site-button">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
        </>
    )
}

export default EmpCompanyProfilePage;