"use client";

import "./pagination.css";

export default function Pagination({pageable, onPageChange}: {
    pageable?: IPageablePostResponse;
    onPageChange: (page: number) => void;
}) {
    if (!pageable || pageable.page.totalPages < 2) {
        return null;
    }

    const totalPages = pageable.page.totalPages;
    const currentPage = pageable.page.number;
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(0, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages - 1, currentPage + halfVisiblePages);
    if (endPage - startPage < maxVisiblePages - 1) {
        if (startPage === 0) {
            endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);
        } else if (endPage === totalPages - 1) {
            startPage = Math.max(endPage - (maxVisiblePages - 1), 0);
        }
    }

    const pageNumbers = Array.from({length: endPage - startPage + 1}, (_, index) => startPage + index);

    return (
        <div className="pagination">
            {currentPage > 0 && (
                <button onClick={() => onPageChange(currentPage - 1)}>Предыдущая</button>
            )}

            {startPage > 0 && (
                <>
                    <button onClick={() => onPageChange(0)}>1</button>
                    {startPage > 1 && <span>...</span>}
                </>
            )}

            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={number === currentPage ? "active" : ""}
                >
                    {number + 1}
                </button>
            ))}

            {endPage < totalPages - 1 && (
                <>
                    {endPage < totalPages - 2 && <span>...</span>}
                    <button onClick={() => onPageChange(totalPages - 1)}>{totalPages}</button>
                </>
            )}

            {currentPage < totalPages - 1 && (
                <button onClick={() => onPageChange(currentPage + 1)}>Следующая</button>
            )}
        </div>
    );
}