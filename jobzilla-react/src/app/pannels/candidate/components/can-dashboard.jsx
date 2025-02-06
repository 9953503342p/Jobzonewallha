import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router's hook for navigation
import SectionCandidateOverview from "../sections/dashboard/section-can-overview";
import SectionCandidateInbox from "../sections/dashboard/section-can-inbox";
import SectionCandidateProfileViews from "../sections/dashboard/section-can-profile-views";
import SectionCandidateRecentActivities from "../sections/dashboard/section-can-activities";
import SectionCandidateRecentApplications from "../sections/dashboard/section-can-applications";
import { loadScript } from "../../../../globals/constants";

function CanDashboardPage() {

    
    const navigate = useNavigate();

    useEffect(() => {
        // Load custom scripts
        loadScript("js/custom.js");

        // Check for candidateId in cookies
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});

        if (!cookies.candidateId) {
            // Redirect to login page if candidateId cookie is not present
            navigate("/after-login");
        }
    }, [navigate]);

    return (
        <>
            <div className="twm-right-section-panel site-bg-gray">
                <SectionCandidateOverview />

                <div className="twm-pro-view-chart-wrap">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <SectionCandidateProfileViews />
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <SectionCandidateInbox />
                        </div>
                        <div className="col-lg-12 col-md-12 mb-4">
                            <SectionCandidateRecentActivities />
                        </div>
                        <div className="col-lg-12 col-md-12 mb-4">
                            <SectionCandidateRecentApplications />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CanDashboardPage;
