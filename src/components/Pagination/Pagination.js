import React, { useState, useEffect } from "react";
import "./Pagination.css"
import ArrowRight from "../../assets/images/arrow-right-s-line.svg"
import ArrowLeft from "../../assets/images/arrow-left-s-line.svg";

const Pagination = ({
    totalItems,
    itemsPerPage,
    rowsPerPageOptions,
    onPageChange,
    setRowLimit,
    showOptions = false,
    goToPage
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (goToPage || goToPage == 0) {
            handleChangePage((goToPage - 1))
        }
    }, [goToPage]);

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
        onPageChange(newPage);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            handleChangePage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            handleChangePage(currentPage + 1);
        }
    };


    const handleRowLimitChange = (event) => {
        setRowLimit(event.target.value);
        handleChangePage(0);
    };


    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = +event.target.value;
        const newPage = Math.floor((currentPage * itemsPerPage) / newRowsPerPage);
        setCurrentPage(newPage);
        onPageChange(newPage);
    };

    const startIdx = currentPage * itemsPerPage + 1;
    const endIdx = Math.min((currentPage + 1) * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 3) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else if (currentPage === 0 || currentPage === 1) {
            pageNumbers.push(0, 1, 2);
        } else if (currentPage === totalPages - 1 || currentPage === totalPages - 2) {
            pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1);
        } else {
            pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        }

        return pageNumbers;
    };

    return (
        <div className="pagination-container">
            <div className="drawdown">
                {showOptions && (
                    <div className="pagination-select">
                        <span className="showhead">Show</span>
                        <select
                            onChange={handleRowLimitChange}
                            value={itemsPerPage}
                            className="pagination-item"
                        >
                            {rowsPerPageOptions.map((option) => (
                                <option className="my" key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <span className="entrieshead">entries</span>
                    </div>
                )}
            </div>
            <div className="pagination-actions">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className={`pagination-item ${currentPage === 0 ? "arrowdisabled" : ""}`}
                >
                    <img className='arrows lefts' src={ArrowLeft} alt='hello' />
                </button>
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        onClick={() => handleChangePage(page)}
                        disabled={currentPage === page}
                        className={`pagination-item ${currentPage === page ? "selected" : ""}`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`pagination-item ${currentPage === totalPages - 1 ? "arrowdisabled" : ""}`}
                >
                    <img className='arrows rights' src={ArrowRight} alt='hello' />
                </button>
                <span>{startIdx}-{endIdx} Results from {totalItems}</span>
            </div>
        </div>
    );
};

export default Pagination;