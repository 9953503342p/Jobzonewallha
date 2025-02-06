import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SectionSideAdvert from "./section-side-advert";

function SectionJobsSidebar1({ onFilterChange }) {
  const [filters, setFilters] = useState({
    jobcategory: "",
    offersalary: "",
    location: "",
    datePosted: "",
  });

  // Sample job categories
  const jobCategories = [
    "Web Designer",
    "Developer",
    "Accountant",
    "Data Scientist",
    "Project Manager",
    "Marketing Specialist",
  ];

  // Handle input changes for text fields and dropdowns
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <>
      <div className="side-bar">
        <div className="sidebar-elements search-bx">
          <form onSubmit={handleFilterSubmit}>
            {/* Category Search Bar */}
            <div className="form-group mb-4">
              <h4 className="section-head-small mb-4">Category</h4>
              <input
                type="text"
                className="form-control"
                placeholder="Search category"
                name="jobcategory"
                value={filters.jobcategory}
                onChange={handleInputChange}
                list="job-categories" // Connect to the datalist
              />
             
            </div>

            {/* Offered Salary Input */}
            <div className="form-group mb-4">
              <h4 className="section-head-small mb-4">Offered Salary</h4>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter salary"
                  name="offersalary"
                  value={filters.offersalary}
                  onChange={handleInputChange}
                />
                <button className="btn" type="button">
                  <i className="feather-dollar-sign" />
                </button>
              </div>
            </div>

            {/* Location Search Bar */}
            <div className="form-group mb-4">
              <h4 className="section-head-small mb-4">Location</h4>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search location"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                />
                <button className="btn" type="button">
                  <i className="feather-map-pin" />
                </button>
              </div>
            </div>

            {/* Date Posted Filter */}
            {/* <div className="twm-sidebar-ele-filter">
              <h4 className="section-head-small mb-4">Date Posts</h4>
              <ul>
                <li>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="datePosted"
                      value="last 24 hours"
                      checked={filters.datePosted === "last 24 hours"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Last hour</label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="datePosted"
                      value="last 7 days"
                      checked={filters.datePosted === "last 7 days"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Last 7 days</label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="datePosted"
                      value="last 30 days"
                      checked={filters.datePosted === "last 30 days"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">Last 30 days</label>
                  </div>
                  
                </li>
              </ul>
            </div> */}

            {/* Apply Filters Button */}
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>
          </form>
        </div>
      </div>
      <SectionSideAdvert />
    </>
  );
}

export default SectionJobsSidebar1;