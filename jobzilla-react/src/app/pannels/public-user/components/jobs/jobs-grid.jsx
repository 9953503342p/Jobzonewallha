import React, { useState } from "react";
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionJobsGrid from "../../sections/jobs/section-jobs-grid";
import { loadScript } from "../../../../../globals/constants";

function JobsGridPage() {
    const [filters, setFilters] = useState({});
    const [perPage, setPerPage] = useState(10);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };
  //   useEffect(()=>{
  //     loadScript("js/custom.js");
  // })

    return (
        <div className="section-full p-t120 p-b90 site-bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 rightSidebar">
                        <SectionJobsSidebar1 onFilterChange={handleFilterChange} />
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <SectionJobsGrid perPage={perPage} filters={filters} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobsGridPage;