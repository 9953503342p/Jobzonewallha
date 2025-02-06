import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignUpPopup from "../app/common/popups/popup-signup";
import SignInPopup from "../app/common/popups/popup-signin";
import PublicUserRoutes from "../routing/public-user-routes";
import InnerPageBanner from "../app/common/inner-page-banner";
import { showBanner, setBanner } from "../globals/banner-data";
import { showHeader, showFooter, setFooterType, setHeaderType, showFloatingMenus } from "../globals/layout-config";
import Cookies from "js-cookie"; // Import js-cookie

function PublicUserLayout() {
    const currentpath = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        const candidateId = Cookies.get("candidateId");
        const employerId = Cookies.get("employerId");

        if (!candidateId && !employerId) {
            navigate("/after-login"); // Redirect to sign-in if neither is found
        }
    }, [navigate]);

    return (
        <>
            <div className="page-wraper">

           
                {showHeader(currentpath) && setHeaderType(currentpath)}

                <div className="page-content">
                    {showBanner(currentpath) && <InnerPageBanner _data={setBanner(currentpath)} />}
                    <PublicUserRoutes />
                </div>

                {/* Footer */}
                {showFooter(currentpath) && setFooterType(currentpath)}

                {/* BUTTON TOP START */}
                <button className="scroltop"><span className="fa fa-angle-up relative" id="btn-vibrate" /></button>

                <SignUpPopup />
                <SignInPopup />

            </div>
        </>
    );
}

export default PublicUserLayout;
