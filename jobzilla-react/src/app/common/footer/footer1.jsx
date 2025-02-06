import { publicUrlFor } from "../../../globals/constants";
import JobZImage from "../jobz-img";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../globals/route-names";

function Footer1() {
    return (
        <>
            <footer className="footer-dark" style={{ backgroundImage: `url(${publicUrlFor("images/f-bg.jpg")})` }}>
                <div className="container">
                    {/* NEWS LETTER SECTION START */}
              
                    {/* NEWS LETTER SECTION END */}
                    {/* FOOTER BLOCKS START */}
                    <div className="footer-top">
                        <div className="row">
                            <div className="col-lg-3 col-md-12">
                                <div className="widget widget_about">
                                    <div className="logo-footer clearfix">
                                        <NavLink to={publicUser.HOME1}>
                                            <JobZImage id="skin_footer_dark_logo" src="images/logo-12.jpeg" alt="images/logo-12.jpeg" style={{ height: "70px", width: "70px", objectFit: "cover", borderRadius: "50%" }} />
                                        </NavLink>
                                        <img id="skin_footer_dark_logo" src="logo-skin-6.png" alt="" />
                                    </div>
                                    <p>Many desktop publishing packages and web page editors now.</p>
                                    <ul className="ftr-list">
                                        <li><p><span>Address :</span>Suite No. 1164, 15A, 4th Floor, A Building City Vista, Fountain Road Kharadi, Pune - 411014</p></li>
                                        <li><p><span>Email :</span>info@jobzonwallah.com</p></li>
                                        <li><p><span>Call :</span>+91 9527793571</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title" style={{ color: 'white' }}>For Candidate</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.pages.ABOUT}>About us</NavLink></li>
                                                <li><NavLink to={publicUser.candidate.GRID}>Candidates Grid</NavLink></li>
                                                {/* <li><NavLink to={publicUser.candidate.LIST}>Candidate Listing</NavLink></li> */}
                                                <li><NavLink to={publicUser.pages.Courses}>Courses</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title" style={{ color: 'white' }}>For Employers</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.candidate.GRID}>Candidate Grid</NavLink></li>
                                                {/* <li><NavLink to={publicUser.candidate.LIST}>Candidate Listing</NavLink></li> */}
                                                <li><NavLink to={publicUser.pages.CONTACT}>Contact</NavLink></li>
                                                {/* <li><NavLink to={publicUser.employer.LIST}>Employee Listing</NavLink></li> */}
                                                <li><NavLink to={publicUser.employer.GRID}>Employee Grid</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title" style={{color:'white'}} >Helpful Resources</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.pages.FAQ}>FAQs</NavLink></li>
                                                <li><NavLink to={publicUser.pages.CONTACT}>Contact Us</NavLink></li>
                                                <li><NavLink to={publicUser.pages.ABOUT}>About US</NavLink></li>
                                                <li><NavLink to={publicUser.pages.PRICING}>Pricing</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        <div className="widget widget_services ftr-list-center">
                                            <h3 className="widget-title" style={{color:'white '}} >Quick Links</h3>
                                            <ul>
                                                <li><NavLink to={publicUser.HOME1}>Home</NavLink></li>
                                                <li><NavLink to={publicUser.pages.ABOUT}>About us</NavLink></li>
                                                <li><NavLink to={publicUser.jobs.GRID}>Jobs</NavLink></li>
                                                <li><NavLink to={publicUser.employer.GRID}>Employer</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="https://api.whatsapp.com/send?phone=919527793571" class="floating" target="_blank">
        <i className="fab fa-whatsapp" style={{fontSize:'42px'}}></i> </a>
                    {/* FOOTER COPYRIGHT */}
                    <div className="footer-bottom">
                        <div className="footer-bottom-info">
                            <div className="footer-copy-right">
                                <span className="copyrights-text">Copyright © 2025 by Jobzone Wallha All Rights Reserved.</span>
                            </div>
                            <ul className="social-icons">
                                
                            <li><a  style={{color:'white'}}href="https://www.instagram.com/jobzonwallah?igsh=MWtuYmthM2hoazY4dg==" className="fab fa-instagram" /></li>
                                <li><a  style={{color:'white'}}href="https://api.whatsapp.com/send?phone=919527793571" className="fab fa-whatsapp" /></li>
                                <li><a  style={{color:'white'}}href="https://www.twitter.com/" className="fab fa-twitter" /></li>
                                <li><a  style={{color:'white'}}href="https://www.youtube.com/" className="fab fa-youtube" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer1;