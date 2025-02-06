import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";

function SectionPricingAnnual() {
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
                                    {/* <span>₹1,999/</span>
                                    <p> 45 day</p> */}
                                       <br />
                                       <br/>
                                </div>
                                <div className="p-table-list">
                                    <ul>
                                        
                                        <li className="disable"><i className="feather-x" />Get upto 10X advention from Recruiters.</li>
                                        <li className="disable"><i className="feather-x" />Highlight your application to Recruiter </li>
                                        <li className="disable"><i className="feather-x" />Profile is tagged of priority applicant.</li>
                                        <li className="disable"><i className="feather-x" />Increase your chance of shortlisting.</li>
                                        <li className="disable"><i className="feather-x" />Active Support From our customer Service team.</li>
                                        <li className="disable"><i className="feather-x" />Guaranteed Job.</li>
                                        <li className="disable"><i className="feather-x" />Search and Apply to Jobs on JW</li>
                                        <li className="disable"><i className="feather-x" />Jobzonwallah & Receive Job within 24 hours of being posted</li>
                                        <li className="disable"><i className="feather-x" />Receive Customized Job alerts on mail</li>
                                       
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
                            <div className="p-table-title">
                                <h4 className="wt-title">
                                    Pro Gold
                                </h4>
                            </div>
                            <div className="p-table-inner">
                                <div className="p-table-price">
                                    {/* <span>$499/</span>
                                    <p>Year</p> */}
                                    <br />
                                    <br/>
                                </div>
                                <div className="p-table-list">
                                    <ul>
                                    <li className="disable"><i className="feather-x" />Get upto 10X advention from Recruiters.</li>
                                        <li className="disable" ><i className="feather-x" />Highlight your application to Recruiter </li>
                                        <li className="disable" ><i className="feather-x" />Profile is tagged of priority applicant.</li>
                                        <li className="disable" ><i className="feather-x" />Increase your chance of shortlisting.</li>
                                        <li className="disable" ><i className="feather-x" />Active Support From our customer Service team.</li>
                                        <li className="disable" ><i className="feather-x" />Guaranteed Job.</li>
                                        <li className="disable" ><i className="feather-x" />Search and Apply to Jobs on JW</li>
                                        <li className="disable" ><i className="feather-x" />Jobzonwallah & Receive Job within 24 hours of being posted</li>
                                        <li className="disable" ><i className="feather-x" />Receive Customized Job alerts on mail</li>
                                       
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
                                    {/* <span>$1499/</span>
                                    <p>Year</p> */}
                                       <br />
                                       <br/>
                                </div>
                                <div className="p-table-list">
                                    <ul>
                                        <li className="disable"><i className="feather-x" />Get upto 10X advention from Recruiters.</li>
                                        <li className="disable"><i className="feather-x" />Highlight your application to Recruiter </li>
                                        <li className="disable"><i className="feather-x" />Profile is tagged of priority applicant.</li>
                                        <li className="disable"><i className="feather-x" />Increase your chance of shortlisting.</li>
                                        <li className="disable"><i className="feather-x" />Active Support From our customer Service team.</li>
                                        <li className="disable"><i className="feather-x" />Guaranteed Job.</li>
                                        <li className="disable"><i className="feather-x" />Search and Apply to Jobs on JW</li>
                                        <li className="disable"><i className="feather-x" />Jobzonwallah & Receive Job within 24 hours of being posted</li>
                                        <li className="disable"><i className="feather-x" />Receive Customized Job alerts on mail</li>
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

export default SectionPricingAnnual;