"use client"

import "./pagination.css"

export default function Pagination({currentPage, totalPages, onPageChange}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}) {
    if (totalPages < 2) {
        return null;
    }

    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
    const pageNumbers = [];

    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, validCurrentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, validCurrentPage + halfVisiblePages);

    if (endPage - startPage < maxVisiblePages - 1) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {validCurrentPage > 1 && (
                <button onClick={() => onPageChange(validCurrentPage - 1)}>
                    Назад
                </button>
            )}

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={validCurrentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}

            {validCurrentPage < totalPages && (
                <button onClick={() => onPageChange(validCurrentPage + 1)}>
                    Вперед
                </button>
            )}
        </div>
    );
}