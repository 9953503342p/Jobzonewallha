import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Employequestion() {
  const [application, setApplication] = useState(null);
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('pending'); // Track the approval status

  useEffect(() => {
    if (!_id) {
      setError('Invalid Application ID');
      setLoading(false);
      return;
    }

    const fetchApplication = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/apply-candidate-detail/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch application details.');
        }

        const data = await response.json();
        setApplication(data);
        setStatus(data.approved || 'pending'); // Set the initial status
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [_id]);

  const handleApprove = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/apply/${_id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve application.');
      }

      const data = await response.json();
      setApplication(data);
      setStatus('approved');
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred while approving the application.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/apply/${_id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject application.');
      }

      const data = await response.json();
      setApplication(data);
      setStatus('rejected');
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred while rejecting the application.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <header className="mb-4">
        <h1>Application Details</h1>
        <nav className="breadcrumb">
          <a className="breadcrumb-item" href="/">Home</a>
          <a className="breadcrumb-item" href="/dashboard">Dashboard</a>
          <span className="breadcrumb-item active">Questions and Answers</span>
        </nav>
      </header>

      {application ? (
        <div className="card p-4">
          <h3 className="mb-3">Job Details</h3>
          <p><strong>Job Title:</strong> {application.JobId?.jobtitle || 'N/A'}</p>
          <p><strong>Job Category:</strong> {application.JobId?.jobcategory || 'N/A'}</p>
          <p><strong>Job Type:</strong> {application.JobId?.jobtype || 'N/A'}</p>
          <p><strong>Offered Salary:</strong> {application.JobId?.offeredsalary || 'N/A'}</p>
          <hr />

          <h4 className="mt-4">Questions and Answers</h4>
          {Array.isArray(application.questionsAndAnswers) && application.questionsAndAnswers.length > 0 ? (
            application.questionsAndAnswers.map((qa, idx) => (
              <div key={idx} className="qa-item my-3 p-3 border rounded">
                <p>
                  <strong>Q{idx + 1}:</strong> {qa.question}
                </p>
                <p>
                  <strong>A{idx + 1}:</strong> {qa.answer || 'No answer provided'}
                </p>
                {qa.video && qa.video.path && (
                  <div className="mt-3">
                    <strong>Video Answer:</strong>
                    <video width="320" height="240" controls className="d-block mt-2">
                      <source src={`${process.env.REACT_APP_API_URL}/${qa.video.path.replace(/\\/g, '/')}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No questions found.</p>
          )}

          <hr />
          <h4 className="mt-4">Resume</h4>
          {application.resume ? (
            <div className="embed-responsive embed-responsive-16by9">
              <embed
                src={`${process.env.REACT_APP_API_URL}/${application.resume}`}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            </div>
          ) : (
            <p>No resume available.</p>
          )}

          {/* Approve and Reject Buttons */}
          <div className="mt-4">
            <button
              onClick={handleApprove}
              disabled={status === 'approved'}
              className="btn btn-success me-2"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              disabled={status === 'rejected'}
              className="btn btn-danger"
            >
              Reject
            </button>
          </div>

          {/* Display current status */}
          <div className="mt-3">
            <strong>Status:</strong> {status}
          </div>
        </div>
      ) : (
        <div>No application details available.</div>
      )}
    </div>
  );
}

export default Employequestion;