import JobZImage from "../jobz-img";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../globals/route-names";
import { useState } from "react";

function Header1({ _config }) {

    const [menuActive, setMenuActive] = useState(false);

    function handleNavigationClick() {
        setMenuActive(!menuActive);
    }



    return (
        <>
            <header className={"site-header " + _config.style + " mobile-sider-drawer-menu " + (menuActive ? "active" : "") }>
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar">
                        <div className="container-fluid clearfix">
                            <div className="logo-header">
                                <div className="logo-header-inner logo-header-one">
                                    <NavLink to={publicUser.HOME1}>
                                        <JobZImage src="images/logo-12.jpeg" alt="images/logo-12.jpeg" style={{height:"70px", width:"300px", objectFit: "contain",}}/>
                                    </NavLink>
                                </div>
                            </div>
                            {/* NAV Toggle Button */}
                            <button id="mobile-side-drawer"
                                data-target=".header-nav"
                                data-toggle="collapse"
                                type="button"
                                className="navbar-toggler collapsed"
                                onClick={handleNavigationClick}
                            >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar icon-bar-first" />
                                <span className="icon-bar icon-bar-two" />
                                <span className="icon-bar icon-bar-three" />
                            </button>

                          
                            {/* MAIN Vav */}
                            <div className="nav-animation header-nav navbar-collapse collapse d-flex justify-content-center">
                                <ul className=" nav navbar-nav">
                                <div className="extra-cell" style={{marginRight:'60px'}}>
                                    <div className="header-search">
                                        <a href="#search" className="header-search-icon"><i className="feather-search" /></a>
                                    </div>
                                </div>
                                    <li className="has-mega-menu"><NavLink to={publicUser.INITIAL}>Home</NavLink> 
                                        {/* <ul className="sub-menu"> */}
                                            {/* <li>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.HOME1}>Home-1</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME2}>Home-2</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME3}>Home-3</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME4}>Home-4</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME5}>Home-5</NavLink></li>
                                                </ul>
                                            </li> */}
                                            {/* <li>
                                                <ul>
                                                    <li><NavLink to={publicUser.HOME6}>Home-6</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME7}>Home-7</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME8}>Home-8</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME9}>Home-9</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME10}>Home-10</NavLink></li>
                                                </ul>
                                            </li> */}
                                            {/* <li>
                                                <ul>
                                                    <li><NavLink to={publicUser.HOME11}>Home-11</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME12}>Home-12</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME13}>Home-13</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME14}>Home-14</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME15}>Home-15</NavLink></li>
                                                </ul>
                                            </li> */}
                                            {/* <li>
                                                <ul>
                                                    <li><NavLink to={publicUser.HOME16}>Home-16</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME17}>Home-17</NavLink></li>
                                                    <li><NavLink to={publicUser.HOME18}>Home-18</NavLink></li>
                                                </ul>
                                            </li> */}
                                        {/* </ul> */}
                                    </li>
                                    <li className="has-child"><NavLink to={publicUser.jobs.GRID}>Jobs</NavLink>
                                        {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.jobs.GRID}>Jobs Grid</NavLink></li>
                                            <li><NavLink to={publicUser.jobs.GRID_MAP}>Jobs Grid with Map</NavLink></li>
                                            <li><NavLink to={publicUser.jobs.LIST}>Jobs List</NavLink></li>
                                            <li className="has-child"><a href="#">Job Detail</a>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.jobs.DETAIL1}>Detail 1</NavLink>
                                                    </li><li><NavLink to={publicUser.jobs.DETAIL2}>Detail 2 </NavLink>
                                                    </li></ul>
                                            </li>
                                            <li><NavLink to={publicUser.jobs.APPLY}>Apply Jobs</NavLink></li>
                                        </ul> */}
                                    </li>
                       
                                    <li className="has-child"><NavLink to={publicUser.Internship.GRID}>Internship</NavLink> 
                                        {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.Internship.GRID}>Internship Grid</NavLink></li>
                                            <li><NavLink to={publicUser.Internship.LIST}>Internship List</NavLink></li> */}
                                            {/* <li className="has-child"><a href="#">Employers Detail</a>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.employer.DETAIL1}>Detail 1</NavLink>
                                                    </li><li><NavLink to={publicUser.employer.DETAIL2}>Detail 2</NavLink>
                                                    </li></ul>
                                            </li> */}
                                        {/* </ul> */}
                                    </li>
                                    <li className="has-child"><a href="#">More</a>
                                        <ul className="sub-menu">
                                            <li><NavLink to={publicUser.pages.ABOUT}>About Us</NavLink></li>
                                            <li><NavLink to={publicUser.pages.PRICING}>Pricing</NavLink></li>
                                            {/* <li><NavLink to={publicUser.pages.ERROR404}>Error-404</NavLink></li> */}
                                            <li><NavLink to={publicUser.pages.FAQ}>FAQ's</NavLink></li>
                                            <li><NavLink to={publicUser.pages.CONTACT}>Contact Us</NavLink></li>
                                            {/* <li><NavLink to={publicUser.pages.MAINTENANCE}>Under Maintenance</NavLink></li> */}
                                            {/* <li><NavLink to={publicUser.pages.COMING}>Coming soon</NavLink></li> */}
                                            {/* <li><NavLink to={publicUser.pages.LOGIN}>Login</NavLink></li> */}
                                            {/* <li><NavLink to={publicUser.pages.AFTER_LOGIN}>After Login</NavLink></li> */}
                                            <li><NavLink to={publicUser.pages.Courses}>Courses </NavLink></li>
                                            {/* <li><NavLink to={publicUser.pages.ICONS}>Icons</NavLink></li> */}
                                        </ul>
                                    </li>
                              
                                    {/* <li className="has-child"><a href="#">Blog</a>
                                        <ul className="sub-menu">
                                            <li><NavLink to={publicUser.blog.GRID1}>Blog</NavLink></li>
                                            <li><NavLink to={publicUser.blog.GRID2}>Blog Grid</NavLink></li>
                                            <li><NavLink to={publicUser.blog.GRID3}>Blog Grid-2</NavLink></li>
                                            <li><NavLink to={publicUser.blog.LIST}>Blog List</NavLink></li>
                                            <li><NavLink to={publicUser.blog.DETAIL}>Blog Detail</NavLink></li>
                                        </ul>
                                    </li> */}

<li className="has-child"><NavLink  to={publicUser.employer.GRID}style={{color:'blue',fontSize:'18px', padding:'15px 16px', cursor: 'pointer', margin: '0px 0px',fontWeight:'bold'}}>Employers</NavLink>                                        {/* <ul className="sub-menu"> */}
                                            {/* <li><NavLink to={publicUser.employer.GRID}>Employers Grid</NavLink></li>
                                            <li><NavLink to={publicUser.employer.LIST}>Employers List</NavLink></li> */}
                                            {/* <li className="has-child"><a href="#">Employers Detail</a>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.employer.DETAIL1}>Detail 1</NavLink>
                                                    </li><li><NavLink to={publicUser.employer.DETAIL2}>Detail 2</NavLink>
                                                    </li></ul>
                                            </li> */}
                                        {/* </ul> */}
                                    </li>
                                    <li className="has-child"><NavLink to={publicUser.candidate.GRID} style={{color:'blue',fontSize:'18px', padding:'15px 16px', cursor: 'pointer', margin: '0px 0px',fontWeight:'bold'}}>Candidate</NavLink>
                                        {/* <ul className="sub-menu">
                                            <li><NavLink to={publicUser.candidate.GRID}>Candidates Grid</NavLink></li>
                                            <li><NavLink to={publicUser.candidate.LIST}>Candidates List</NavLink></li> */}
                                            {/* <li className="has-child"><a href="#">Candidate Detail</a>
                                                <ul className="sub-menu">
                                                    <li><NavLink to={publicUser.candidate.DETAIL1}>Detail 1</NavLink>
                                                    </li><li><NavLink to={publicUser.candidate.DETAIL2}>Detail 2</NavLink>
                                                    </li></ul>
                                            </li> */}
                                        {/* </ul> */}
                                    </li>
                                </ul>
                            </div>
                            {/* Header Right Section*/}
                            <div className="extra-nav header-2-nav">
                              
                                <div className="extra-cell">
                                    <div className="header-nav-btn-section">



                                        <div className="twm-nav-btn-left">
                                            <a className="twm-nav-sign-up" data-bs-toggle="modal" href="#sign_up_popup" role="button">
                                                <i className="feather-log-in" /> Sign Up
                                            </a>
                                        </div>
                                        <div className="twm-nav-btn-right">
                                            <NavLink className="twm-nav-post-a-job" to={publicUser.pages.AFTER_LOGIN}>
                                          
                                                <i className="feather-log-in" /> Sign In
                                            
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SITE Search */}
                    <div id="search" className="search-overlay">
                    <span
    className="close"
    onClick={() => {
        document.getElementById('search').style.display = 'none'; // Hide the search bar
        window.location.reload(); // Reload the page
    }}
></span>   <form role="search" id="searchform" action="/search" method="get" className="radius-xl">
        {/* Tabs for search categories */}
        <div className="search-tabs">
                  <NavLink to={publicUser.jobs.GRID}> <button type="button" className="tab" data-category="jobs">Jobs</button></NavLink>
            <NavLink to={publicUser.Internship.GRID}> <button type="button" className="tab" data-category="internships">Internships</button></NavLink>
              <NavLink to={publicUser.employer.GRID}> <button type="button" className="tab" data-category="employers">Employers</button></NavLink>
             <NavLink to={publicUser.candidate.GRID}> <button type="button" className="tab" data-category="candidates">Candidates</button></NavLink>
        </div>

        {/* Search input field */}
        <div className="search-input-container">
            <input 
                className="form-control search-input" 
                name="q" 
                type="search" 
                placeholder="Search for jobs, internships, employers, or candidates..." 
                required
            />
        
        </div>
    </form>
</div>

                </div>
            </header>

        </>
    )
}

export default Header1;