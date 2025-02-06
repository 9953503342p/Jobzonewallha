import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

function SectionCanAttachment() {
    const [message, setMessage] = useState('');

    // Configure the dropzone component to upload to the correct API endpoint
    const onDrop = (acceptedFiles) => {
        // Create a new FormData instance
        const formData = new FormData();
    
        // Append the file to FormData (for a single file upload)
        acceptedFiles.forEach((file) => {
            formData.append('resumefile', file); // Append file directly (not the file path)
            console.log(file); // Check the file data
        });
    
        // Make the API request to upload the file
        fetch(`${process.env.REACT_APP_API_URL}/upload-resume`, {
            method: 'POST',
            body: formData,
            credentials: 'include', // If you're sending cookies like candidateId
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('File uploaded successfully:', data);
            // Display success message
            setMessage('File uploaded successfully!');
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
            // Display error message
            setMessage('Error uploading file.');
        });
    };
    
    return (
        <>
            <div className="panel-heading wt-panel-heading p-a20 panel-heading-with-btn">
                <h4 className="panel-tittle m-a0">Attach Resume</h4>
            </div>
            <div className="panel-body wt-panel-body p-a20">
                <div className="twm-panel-inner">
                    <p>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>
                    <div className="dashboard-cover-pic">
                        {/* Dropzone for file upload */}
                        <Dropzone
                            onDrop={onDrop}
                            accept=".pdf,.doc,.docx,.txt"
                            maxFiles={1}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="dropzone">
                                    <input {...getInputProps()} />
                                    <p>Drag & drop a resume here, or click to select a file</p>
                                </div>
                            )}
                        </Dropzone>
                    </div>
                    {/* Display message with inline styles */}
                    {message && (
                        <div
                            style={{
                                padding: '10px',
                                marginTop: '20px',
                                borderRadius: '5px',
                                backgroundColor: message.includes('success') ? '#28a745' : '#f8d7da',
                                color: message.includes('success') ? 'white' : '#721c24',
                                border: message.includes('success') ? '1px solid #28a745' : '1px solid #f5c6cb',
                            }}
                        >
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SectionCanAttachment;
