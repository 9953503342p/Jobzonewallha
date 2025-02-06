import React from 'react'
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";

function Sectionsubcategory() {
  return (
    <div>
          <div className="section-full p-t120 p-b90 site-bg-gray twm-job-categories-area2">
                        {/* title="" START*/}
                        <div className="section-head center wt-small-separator-outer">
                            <div className="wt-small-separator site-text-primary">
                                <div>Jobs by Categories</div>
                            </div>
                            <h2 className="wt-title"></h2>
                        </div>
                        {/* title="" END*/}
                        <div className="container">
                            <div className="twm-job-categories-section-2 m-b30">
                                <div className="job-categories-style1 m-b30">
                                    <div className="row">
                                        {/* COLUMNS 1 */}
                                        <div className="col-lg-3 col-md-6">
                                            <div className="job-categories-block-2 m-b30">
                                                <div className="twm-media">
                                                    <div className="flaticon-dashboard" />
                                                </div>
                                                <div className="twm-content">
                                                    <NavLink to={publicUser.jobs.GRID}>
                                                    Get Alerts within 24 hrs of job being posted on JW</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        {/* COLUMNS 2 */}
                                        <div className="col-lg-3 col-md-6">
                                            <div className="job-categories-block-2 m-b30">
                                                <div className="twm-media">
                                                    <div className="flaticon-project-management" />
                                                </div>
                                                <div className="twm-content">
                                                    <NavLink to={publicUser.jobs.GRID}>Be among the first candidates to Apply on Jobs</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        {/* COLUMNS 3 */}
                                        <div className="col-lg-3 col-md-6">
                                            <div className="job-categories-block-2 m-b30">
                                                <div className="twm-media">
                                                    <div className="flaticon-job-search" />
                                                </div>
                                                <div className="twm-content">
                                                    <NavLink to={publicUser.jobs.GRID}>Your application gets highlighted to recruiters</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        {/* COLUMNS 4 */}
                                        <div className="col-lg-3 col-md-6">
                                            <div className="job-categories-block-2 m-b30">
                                                <div className="twm-media">
                                                    <div className="flaticon-phone" />
                                                </div>
                                                <div className="twm-content">
                                                    <NavLink to={publicUser.jobs.GRID}>You have a higher chance of
                                                    getting a call</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
    </div>
  )
}

export default Sectionsubcategory