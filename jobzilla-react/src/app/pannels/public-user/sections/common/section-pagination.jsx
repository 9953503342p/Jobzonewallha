import React from 'react';

function SectionPagination({ totalItems, perPage, currentPage, paginate }) {
    // Calculate total pages
    const totalPages = Math.ceil(totalItems / perPage);

    // Handle the range of pages to display (e.g., show previous, next, etc.)
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-outer">
            <div className="pagination-style1">
                <ul className="clearfix">
                    {/* Prev Button */}
                    <li className="prev">
                        <a 
                            href="#"
                            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        >
                            <span><i className="fa fa-angle-left" /></span>
                        </a>
                    </li>

                    {/* Page Numbers */}
                    {pageNumbers.map((pageNumber) => (
                        <li 
                            key={pageNumber}
                            className={currentPage === pageNumber ? "active" : ""}
                        >
                            <a href="#" onClick={() => paginate(pageNumber)}>
                                {pageNumber}
                            </a>
                        </li>
                    ))}

                    {/* Next Button */}
                    <li className="next">
                        <a 
                            href="#"
                            onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        >
                            <span><i className="fa fa-angle-right" /></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SectionPagination;
