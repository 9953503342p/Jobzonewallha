import EmpHeaderSection from "../app/pannels/admin/common/emp-header";
import EmpSidebarSection from "../app/pannels/admin/common/emp-sidebar";
// import YesNoPopup from "../app/common/popups/popup-yes-no";
import CourseRoutes from "../routing/courses-routes";
// import { popupType } from "../globals/constants";
import { useState } from "react";

function CourseRoutes() {

    const [sidebarActive, setSidebarActive] = useState(true);

    const handleSidebarCollapse = () => {
        setSidebarActive(!sidebarActive);
    }

    return (
        <>
            <div className="page-wraper">

                <EmpHeaderSection onClick={handleSidebarCollapse} sidebarActive={sidebarActive} />
                <EmpSidebarSection sidebarActive={sidebarActive} />

                <div id="content" className={sidebarActive ? "" : "active"}>
                    <div className="content-admin-main">
                        <CourseRoutes />
                    </div>
                </div>

                {/* <YesNoPopup id="delete-dash-profile" type={popupType.DELETE} msg={"Do you want to delete your profile?"} />
                <YesNoPopup id="logout-dash-profile" type={popupType.LOGOUT} msg={"Do you want to Logout your profile?"} /> */}

            </div>
        </>
    )
}

export default CourseRoutes;