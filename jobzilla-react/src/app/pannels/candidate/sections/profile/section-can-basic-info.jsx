import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie'; // Import the js-cookie library


function SectionCandicateBasicInfo() {
   const [errorMessage, setErrorMessage] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Website: '',
        Qualification: '',
        Language: '',
        Jobcategory: '',
        Experience: '',
        Currentsalery: '',
        Expectedsalery: '',
        Age: '',
        Country: '',
        City: '',
        Postcode: '',
        Fulladdress: '',
        Description: '',
    });

    useEffect(() => {
        const userId = Cookies.get('candidateId');
        if (userId) {
            // Fetch user information from the backend
            fetch(`${process.env.REACT_APP_API_URL}/get-candidate-info`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // Ensure cookies are sent
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then((data) => {
                setFormData({
                    Name: data.Name,
                    Email: data.Email,
                    Phone: data.Phone || '',  // Optional field, ensure it's handled
                    Website: data.Website,
                    Qualification: data.Qualification,
                    Language: data.Language,
                    Jobcategory: data.Jobcategory,
                    Experience: data.Experience,
                    Currentsalery: data.Currentsalery,
                    Expectedsalery: data.Expectedsalery,
                    Age: data.Age,
                    Country: data.Country,
                    City: data.City,
                    Postcode: data.Postcode,
                    Fulladdress: data.Fulladdress,
                    Description: data.Description,
                });
            })
            .catch((error) => console.error('Error fetching user data:', error));
        }
    }, []);


    useEffect(() => {
        const userId = Cookies.get('candidateId');
        console.log(userId)
        if (userId) {
            setFormData((prevData) => ({
                ...prevData,
                userId, 
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userId, ...updatedData } = formData;  
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/update-candidate-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
                credentials: 'include',
            });
    
            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Information updated successfully');
            } else {
                const error = await response.json();
                setErrorMessage('Error: ' + error.message);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Error: ' + err.message);
        }
    };
    

    return (
        <>
           <form onSubmit={handleSubmit}>
                <div className="panel panel-default">
                    <div className="panel-heading wt-panel-heading p-a20">
                        <h4 className="panel-tittle m-a0">Basic Informations</h4>
                    </div>
                    <div className="panel-body wt-panel-body p-a20 m-b30">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Devid Smith"
                                        />
                                        <i className="fs-input-icon fa fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Phone"
                                            value={formData.Phone}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="(251) 1234-456-7890"
                                        />
                                        <i className="fs-input-icon fa fa-phone-alt" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Devid@example.com"
                                        />
                                        <i className="fs-input-icon fas fa-at" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Website</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Website"
                                            value={formData.Website}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="https://devsmith.net"
                                        />
                                        <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Qualification</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Qualification"
                                            value={formData.Qualification}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="BTech"
                                        />
                                        <i className="fs-input-icon fa fa-user-graduate" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Language</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Language"
                                            value={formData.Language}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="e.x English, Spanish"
                                        />
                                        <i className="fs-input-icon fa fa-language" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Job Category</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Jobcategory"
                                            value={formData.Jobcategory}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="IT & Software"
                                        />
                                        <i className="fs-input-icon fa fa-border-all" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Experience</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Experience"
                                            value={formData.Experience}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="05 Years"
                                        />
                                        <i className="fs-input-icon fa fa-user-edit" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Current Salary</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Currentsalery"
                                            value={formData.Currentsalery}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="65K"
                                        />
                                        <i className="fs-input-icon fa fa-dollar-sign" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Expected Salary</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Expectedsalery"
                                            value={formData.Expectedsalery}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="75K"
                                        />
                                        <i className="fs-input-icon fa fa-dollar-sign" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Age</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Age"
                                            value={formData.Age}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="35 Years"
                                        />
                                        <i className="fs-input-icon fa fa-child" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>Country</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Country"
                                            value={formData.Country}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="USA"
                                        />
                                        <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-12">
                                <div className="form-group">
                                    <label>City</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="City"
                                            value={formData.City}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Texas"
                                        />
                                        <i className="fs-input-icon fa fa-globe-americas" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Postcode</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Postcode"
                                            value={formData.Postcode}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder={75462}
                                        />
                                        <i className="fs-input-icon fas fa-map-pin" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Full Address</label>
                                    <div className="ls-inputicon-box">
                                        <input
                                            className="form-control"
                                            name="Fulladdress"
                                            value={formData.Fulladdress}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="1363-1385 Sunset Blvd Angeles, CA 90026 ,USA"
                                        />
                                        <i className="fs-input-icon fas fa-map-marker-alt" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        name="Description"
                                        value={formData.Description}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Enter description"
                                    />
                                </div>
                            </div>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
}

export default SectionCandicateBasicInfo;
