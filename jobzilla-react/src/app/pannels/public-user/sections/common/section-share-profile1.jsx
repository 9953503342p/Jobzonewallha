import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  PinterestShareButton,
  PinterestIcon,
} from 'react-share';

function SectionShareProfile1() {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:8080/post-job/${jobId}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Error fetching job data');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setJob(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [jobId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const shareUrl = window.location.href; // URL to be shared
//   const title = job.title 

  return (
    <>
      <h4 className="twm-s-title">Share Profile</h4>
      <div className="twm-social-tags">
        <FacebookShareButton   className="fb-clr">
        <a className="fb-clr">Facebook</a>
        </FacebookShareButton>
        <TwitterShareButton   className="tw-clr">
        <a  className="tw-clr">Twitter</a>
        </TwitterShareButton>
        <LinkedinShareButton   className="link-clr">
        <a className="link-clr">Linkedin</a>
        </LinkedinShareButton>
        <WhatsappShareButton  className="whats-clr">
        <a className="whats-clr">Whatsapp</a>
        </WhatsappShareButton>
        <PinterestShareButton  media={`${window.location.origin}/path-to-image.jpg`} className="pinte-clr">
        <a className="pinte-clr">Pinterest</a>
        </PinterestShareButton>
      </div>
    </>
  );
}

export default SectionShareProfile1;
