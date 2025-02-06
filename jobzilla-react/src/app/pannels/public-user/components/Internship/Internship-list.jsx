import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionJobsList from "../../sections/jobs/section-jobs-list";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import { useEffect,useState } from "react";
import { loadScript } from "../../../../../globals/constants";
import SectionInternshipsGrid from "../../sections/Internship/section-Internship-grid";
import SectionInternshipsList from "../../sections/Internship/section-Internship-list";

function InternshipListPage() {

    const _filterConfig = {
        prefix: "Showing",
        type: "jobs",
        total: "2,150",
        showRange: false,
        showingUpto: ""
    }
    const [perPage] = useState(10);

    useEffect(()=>{
        loadScript("js/custom.js")
    })

    return (
        <>
            <div className="section-full p-t120  p-b90 site-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 rightSidebar">
                            <SectionJobsSidebar1 />
                        </div>
                        <div className="col-lg-8 col-md-12">
                            {/*Filter Short By*/}
                            {/* <SectionRecordsFilter _config={_filterConfig} /> */}
                         <SectionInternshipsList perPage={perPage} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default InternshipListPage;