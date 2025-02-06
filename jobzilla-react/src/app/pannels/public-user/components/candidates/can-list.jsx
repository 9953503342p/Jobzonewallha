import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import SectionPagination from "../../sections/common/section-pagination";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import { loadScript } from "../../../../../globals/constants";

function CandidateListPage() {
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [candidatesPerPage, setCandidatesPerPage] = useState(10);

    const _filterConfig = {
        prefix: "Showing",
        type: "Candidates",
        total: candidates.length,
        showRange: false,
        showingUpto: ""
    };

    useEffect(() => {
        // Load custom script
        loadScript("js/custom.js");

        // Fetch candidate data from API
        const fetchCandidates = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/candidate`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to fetch candidates");
                }

                setCandidates(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCandidates();
    }, []);

    // Pagination Logic: Slice the candidates based on the current page and candidatesPerPage
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle candidates per page change
    const handleCandidatesPerPageChange = (event) => {
        setCandidatesPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    return (
        <div className="section-full p-t120 p-b90 site-bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 rightSidebar">
                        <SectionJobsSidebar1 />
                    </div>
                    <div className="col-lg-8 col-md-12">
                        {/* Filter Short By */}
                        {/* <SectionRecordsFilter
                            _config={_filterConfig}
                            onCandidatesPerPageChange={handleCandidatesPerPageChange}
                        /> */}

                        <div className="twm-candidates-list-wrap">
                            {error ? (
                                <p className="text-danger">{error}</p>
                            ) : (
                                <ul>
                                    {currentCandidates.map((candidate, index) => (
                                        <a href={`/can-detail/${candidate._id}`} key={candidate._id || index}>
                                            <li>
                                                <div className="twm-candidates-list-style1 mb-5">
                                                    <div className="twm-media">
                                                        <div className="twm-media-pic">
                                                            <img
                                                                src={`${process.env.REACT_APP_API_URL}/${candidate.Profileimage}` || 'images/candidates/default.jpg'}
                                                                style={{ objectFit: 'contain' }}
                                                                alt="Candidate"
                                                            />
                                                        </div>
                                                        <div className="twm-candidates-tag">
                                                            <span>Featured</span>
                                                        </div>
                                                    </div>
                                                    <div className="twm-mid-content">
                                                        <NavLink
                                                            to={`/can-detail/${candidate._id}`}
                                                            className="twm-job-title"
                                                        >
                                                            <h4>{candidate.Username}</h4>
                                                        </NavLink>
                                                        <p>{candidate.Jobcategory}</p>
                                                        <div className="twm-fot-content">
                                                            <div className="twm-left-info">
                                                                <p className="twm-candidate-address">
                                                                    <i className="feather-map-pin" />
                                                                    {candidate.Country || "Not Specified"}
                                                                </p>
                                                                <div className="twm-jobs-vacancies">
                                                                    {candidate.Expectedsalery || "$0"}
                                                                    <span>{candidate.rateType || "/ Month"}</span>
                                                                </div>
                                                            </div>
                                                            <div className="twm-right-btn">
                                                                <NavLink
                                                                    to={`/can-detail/${candidate._id}`}
                                                                    className="twm-view-prifile site-text-primary"
                                                                >
                                                                    View Profile
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </a>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Pagination */}
                        <SectionPagination
                            totalItems={candidates.length}
                            perPage={candidatesPerPage} 
                            currentPage={currentPage}
                            paginate={paginate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateListPage;
