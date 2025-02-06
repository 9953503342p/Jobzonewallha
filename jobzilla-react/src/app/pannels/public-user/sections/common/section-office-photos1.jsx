import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // Import useParams to get the jobId from URL

function SectionOfficePhotos1() {
  const { jobId } = useParams();  // Extract jobId from the URL
  const [job, setJob] = useState(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState(11);  // Track how many images are visible

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/post-job/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);  // Store the fetched job data
        } else {
          console.error("Failed to fetch job data");
        }
      } catch (error) {
        console.error("Error fetching job data", error);
      }
    };

    if (jobId) {
      fetchJobData();  // Fetch job data if jobId is available
    }
  }, [jobId]);  // Re-run the effect if jobId changes

  // If job is still loading or not found
  if (!job) {
    return <div>Loading...</div>;
  }

  console.log(job);
  const galleryImages = job.userId.gallery || [];
  const visibleImages = galleryImages.slice(0, visibleImagesCount);  // Show the first 'visibleImagesCount' images
  const hasMoreImages = galleryImages.length > visibleImagesCount;  // Check if there are more images to show

  const handleShowMore = () => {
    setVisibleImagesCount(prevCount => prevCount + 11);  // Show 12 more images when user clicks "More images"
  };

  return (
    <>
      <h4 className="twm-s-title">Above Portfolio</h4>
      <div className="tw-sidebar-gallery">
        <ul className="gallery-list">
          {visibleImages.map((image, index) => (
            <li key={index} className="gallery-item">
              <div className="tw-service-gallery-thumb">
                <a
                  className="elem"
                  href={`${process.env.REACT_APP_API_URL}/${image}`}
                  title={`Title ${index + 1}`}
                  data-lcl-author
                  data-lcl-thumb={`${process.env.REACT_APP_API_URL}/${image}`}
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${image}`}
                    alt={`Gallery image ${index + 1}`}
                    className="gallery-image"
                    style={{ objectFit:'cover', height:'150px'}}
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

export default SectionOfficePhotos1;
