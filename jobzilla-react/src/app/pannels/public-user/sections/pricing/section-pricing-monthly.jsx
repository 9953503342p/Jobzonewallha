import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";

function SectionPricingMonthly() {
    return (
        <>
            <div className="pricing-block-outer">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 m-b30">
                        <div className="pricing-table-1">
                            <div className="p-table-title">
                                <h4 className="wt-title">
                                Pro silver
                                </h4>
                            </div>
                            <div className="p-table-inner">
                                <div className="p-table-price">
                                    <span>₹1,999/</span>
                                    <p> 45 day</p>
                                </div>
                                <div className="p-table-list">
                                    <ul>
                                        <li><i className="feather-check" />Get upto 10X advention from Recruiters.</li>
                                        <li><i className="feather-check" />Highlight your application to Recruiter </li>
                                        <li><i className="feather-check" />Profile is tagged of priority applicant.</li>
                                        <li><i className="feather-check" />Increase your chance of shortlisting.</li>
                                        <li><i className="feather-check" />Active Support From our customer Service team.</li>
                                        <li><i className="feather-check" />Guaranteed Job.</li>
                                        <li><i className="feather-check" />Search and Apply to Jobs on JW</li>
                                        <li><i className="feather-check" />Jobzonwallah & Receive Job within 24 hours of being posted</li>
                                        <li><i className="feather-check" />Receive Customized Job alerts on mail</li>
                                       
                                    </ul>
                                </div>
                                <div className="p-table-btn">
                                    <NavLink to={publicUser.pages.ABOUT} className="site-button">Purchase Now</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 p-table-highlight m-b30">
                        <div className="pricing-table-1 circle-yellow">
                            {/* <div className="p-table-recommended">Recommended</div> */}
                            <div className="p-table-title">
                                <h4 className="wt-title">
                                Pro Gold
                                </h4>
                            </div>
                            <div className="p-table-inner">
                                <div className="p-table-price">
                                    <span>₹2,999/</span>
                                    <p>90 Days</p>
                                </div>
                                <div className="p-table-list">
                                    <ul>
                                        
                                    <li><i className="feather-check" />Get upto 10X advention from Recruiters.</li>
                                        <li><i className="feather-check" />Highlight your application to Recruiter </li>
                                        <li><i className="feather-check" />Profile is tagged of priority applicant.</li>
                                        <li><i className="feather-check" />Increase your chance of shortlisting.</li>
                                        <li><i className="feather-check" />Active Support From our customer Service team.</li>
                                        <li><i className="feather-check" />Guaranteed Job.</li>
                                        <li><i className="feather-check" />Search and Apply to Jobs on JW</li>
                                        <li><i className="feather-check" />Jobzonwallah & Receive Job within 24 hours of being posted</li>
                                        <li><i className="feather-check" />Receive Customized Job alerts on mail</li>
                                    </ul>
                                </div>
                                <div className="p-table-btn">
                                    <NavLink to={publicUser.pages.ABOUT} className="site-button">Purchase Now</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 m-b30">
                        <div className="pricing-table-1 circle-pink">
                            <div className="p-table-title">
                                <h4 className="wt-title">
                                Pro Diamond
                                </h4>
                            </div>
                            <div className="p-table-inner">
                                <div className="p-table-price">
                                    <span>₹3,999/</span>
                                    <p>180 days</p>
                                </div>
                                <div className="p-table-list">
                                    <ul>
                                        
                                    <li><i className="feather-check" />Get upto 10X advention from Recruiters.</li>
                                        <li><i className="feather-check" />Highlight your application to Recruiter </li>
                                        <li><i className="feather-check" />Profile is tagged of priority applicant.</li>
                                        <li><i className="feather-check" />Increase your chance of shortlisting.</li>
                                        <li><i className="feather-check" />Active Support From our customer Service team.</li>
                                        <li><i className="feather-check" />Guaranteed Job.</li>
                                        <li><i className="feather-check" />Search and Apply to Jobs on JW</li>
                                        <li><i className="feather-check" />Jobzonwallah & Receive Job within 24 hours of being posted</li>
                                        <li><i className="feather-check" />Receive Customized Job alerts on mail</li>
                                    </ul>
                                </div>
                                <div className="p-table-btn">
                                    <NavLink to={publicUser.pages.ABOUT} className="site-button">Purchase Now</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionPricingMonthly;