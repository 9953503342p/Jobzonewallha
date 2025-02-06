import { NavLink } from "react-router-dom";
import { publicUrlFor } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";
import { publicUser } from "../../../../../globals/route-names";

function SectionUploadCV() {
    return (
        <>
            <div className="section-full p-t120 p-b120 twm-explore-area bg-cover " style={{ backgroundImage: `url(${publicUrlFor("images/background/bg-1.jpg")})` }}>
                <div className="container">
                    <div className="section-content">
                        <div className="row">
                            <div className="col-lg-4 col-md-12">
                                <div className="twm-explore-media-wrap">
                                    <div className="twm-media">
                                        <JobZImage src="images/gir-large.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                                <div className="twm-explore-content-outer">
                                    <div className="twm-explore-content">
                                        <div className="twm-l-line-1" />
                                        <div className="twm-l-line-2" />
                                        <div className="twm-r-circle-1" />
                                        <div className="twm-r-circle-2" />
                                        <div className="twm-title-small">Explore New Life</div>
                                        <div className="twm-title-large">
                                            <h2>Find Your Perfect Job & Internship – Your Career Starts Here!</h2>
                                            <p>Unlock countless opportunities across various industries. Whether you’re seeking your first job or a new internship, we help you connect with employers who value your skills and ambitions.</p>
                                        </div>
                                        <div className="twm-upload-file ">
                                           <NavLink  to={publicUser.jobs.GRID}> <button type="button"  className="site-button mr-4">Find Your Jobs </button></NavLink>
                                           <NavLink  to={publicUser.Internship.GRID}> <button type="button"  className="site-button">Find Your Internship </button></NavLink>
                                   
                                        </div>
                                    </div>
                                    <div className="twm-bold-circle-right" />
                                    <div className="twm-bold-circle-left" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionUploadCV;