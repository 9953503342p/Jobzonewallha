import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie for cookie handling

const SectionCandidateSocialInfo = () => {

   const [errorMessage, setErrorMessage] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        Facebook: '',
        Twitter: '',
        Linkedin: '',
        Whatsapp: '',
        Instagram: '',
        Pinterest: '',
        Tumblr: '',
        Youtube: ''
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get userId from cookies
        const userId = Cookies.get('candidateId'); // assuming userId is stored in a cookie

        if (!userId) {
            setErrorMessage('User ID not found in cookies');
            return;
        }

        // Add userId to formData
        const dataToSend = { ...formData, userId };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/update-candidate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include', // Ensure cookies are sent with the request
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Social links updated successfully');
            } else {
                setErrorMessage(result.message || 'Failed to update');
            }
        } catch (error) {
            console.error('Error updating candidate data:', error);
            setErrorMessage('Error updating data');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="panel panel-default">
                    <div className="panel-heading wt-panel-heading p-a20">
                        <h4 className="panel-title m-a0">Social Network</h4>
                    </div>
                    <div className="panel-body wt-panel-body p-a20 m-b30 ">
                        <div className="row">
                            {/* Facebook Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Facebook</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Facebook" 
                                            type="text" 
                                            value={formData.Facebook}
                                            onChange={handleInputChange}
                                            placeholder="https://www.facebook.com/"  
                                        />
                                        <i className="fs-input-icon fab fa-facebook-f" />
                                    </div>
                                </div>
                            </div>

                            {/* Twitter Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Twitter</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Twitter" 
                                            type="text" 
                                            value={formData.Twitter}
                                            onChange={handleInputChange} 
                                            placeholder="https://twitter.com/" 
                                        />
                                        <i className="fs-input-icon fab fa-twitter" />
                                    </div>
                                </div>
                            </div>

                            {/* Linkedin Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Linkedin</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Linkedin" 
                                            type="text" 
                                            value={formData.Linkedin}
                                            onChange={handleInputChange} 
                                            placeholder="https://in.linkedin.com/" 
                                        />
                                        <i className="fs-input-icon fab fa-linkedin-in" />
                                    </div>
                                </div>
                            </div>

                            {/* Whatsapp Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Whatsapp</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Whatsapp" 
                                            type="text" 
                                            value={formData.Whatsapp}
                                            onChange={handleInputChange} 
                                            placeholder="https://www.whatsapp.com/" 
                                        />
                                        <i className="fs-input-icon fab fa-whatsapp" />
                                    </div>
                                </div>
                            </div>

                            {/* Instagram Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Instagram</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Instagram" 
                                            type="text" 
                                            value={formData.Instagram}
                                            onChange={handleInputChange} 
                                            placeholder="https://www.instagram.com/" 
                                        />
                                        <i className="fs-input-icon fab fa-instagram" />
                                    </div>
                                </div>
                            </div>

                            {/* Pinterest Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Pinterest</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Pinterest" 
                                            type="text" 
                                            value={formData.Pinterest}
                                            onChange={handleInputChange} 
                                            placeholder="https://in.pinterest.com/" 
                                        />
                                        <i className="fs-input-icon fab fa-pinterest-p" />
                                    </div>
                                </div>
                            </div>

                            {/* Tumblr Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Tumblr</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Tumblr" 
                                            type="text" 
                                            value={formData.Tumblr}
                                            onChange={handleInputChange} 
                                            
                                            placeholder="https://www.tumblr.com/" 
                                        />
                                        <i className="fs-input-icon fab fa-tumblr" />
                                    </div>
                                </div>
                            </div>

                            {/* Youtube Input */}
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Youtube</label>
                                    <div className="ls-inputicon-box">
                                        <input 
                                            className="form-control wt-form-control" 
                                            name="Youtube" 
                                            type="text" 
                                            value={formData.Youtube}
                                            onChange={handleInputChange} 
                                            
                                            placeholder="https://www.youtube.com/" 
                                        />
                                        <i className="fs-input-icon fab fa-youtube" />
                                    </div>
                                </div>
                            </div>

                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            {/* Submit Button */}
                            <div className="col-lg-12 col-md-12">
                                <div className="text-left">
                                    <button type="submit" className="site-button">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SectionCandidateSocialInfo;
