import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router's hook for navigation
import SectionCandicateBasicInfo from "../sections/profile/section-can-basic-info";
import SectionCandidateSocialInfo from "../sections/profile/section-can-social-info";

function CanProfilePage() {
    const navigate = useNavigate();

    useEffect(() => {
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
                {/* Basic Information */}
                <SectionCandicateBasicInfo />

                {/* Social Network */}
                <SectionCandidateSocialInfo />
            </div>
        </>
    );
}

export default CanProfilePage;
