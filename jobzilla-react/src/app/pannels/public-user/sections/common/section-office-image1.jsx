import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Correctly using useParams to get jobId from URL

function SectionOfficeImage1() {
  const  {userId}  = useParams(); // Extract jobId from URL
  const [job, setJob] = useState(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState(11); // Show 11 images initially

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employers/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data); // Store the fetched job data
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (userId) {
      fetchJobData();
    }
  }, [userId]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const galleryImages = job.gallery || [];
  const visibleImages = galleryImages.slice(0, visibleImagesCount); // Show the first 'visibleImagesCount' images
  const hasMoreImages = galleryImages.length > visibleImagesCount; // Check if more images exist

  const handleShowMore = () => {
    setVisibleImagesCount((prevCount) => prevCount + 11); // Show 11 more images
  };
  console.log('galleryImages:', galleryImages);

  return (
    <>
      <h4 className="twm-s-title">Office Photos</h4>
      <div className="tw-sidebar-gallery">
        <ul className="gallery-list">
          {visibleImages.map((image, index) => (
            <li key={index} className="gallery-item">
              <div className="tw-service-gallery-thumb">
                <a
                  className="elem"
                  href={`${process.env.REACT_APP_API_URL}/${image}`}
                  title={`Gallery Image ${index + 1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                    alt={`Gallery image ${index + 1}`}
                    className="gallery-image"
                    style={{ height: "85px", width: "85px", objectFit: "cover" }}
                  />
                  <i className="fa fa-file-image" />
                </a>
              </div>
            </li>
          ))}
          {hasMoreImages && (
            <li className="gallery-item more-images" onClick={handleShowMore}>
              <div className="tw-service-gallery-thumb">
                <span className="more-images-icon">+</span>
                <p>More images</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default SectionOfficeImage1;
