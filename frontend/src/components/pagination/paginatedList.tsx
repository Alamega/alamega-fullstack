"use client";

import React, {JSX} from "react";
import "./paginatedList.css";

export default function PaginatedList<T>({
                                             pageable,
                                             onPageChangeAction,
                                             renderItem,
                                         }: {
    pageable?: IPageable<T>;
    onPageChangeAction: (page: number) => void;
    renderItem: (item: T) => JSX.Element;
}) {
    if (!pageable) return null;

    const {totalPages, number: currentPage} = pageable.page;

    if (totalPages < 2) {
        return (
            <div>
                {pageable.content.map((item) => renderItem(item))}
            </div>
        );
    }

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

    const pageNumbers = Array.from(
        {length: endPage - startPage + 1},
        (_, index) => startPage + index
    );

    return (
        <div>
            <div>
                {pageable.content.map((item, index) => (
                    <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
                ))}
            </div>

            <div className="pagination">
                {currentPage > 0 && (
                    <button onClick={() => onPageChangeAction(currentPage - 1)}>
                        Предыдущая
                    </button>
                )}

                {startPage > 0 && (
                    <>
                        <button onClick={() => onPageChangeAction(0)}>1</button>
                        {startPage > 1 && <span>...</span>}
                    </>
                )}

                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => onPageChangeAction(number)}
                        className={number === currentPage ? "active" : ""}
                    >
                        {number + 1}
                    </button>
                ))}

                {endPage < totalPages - 1 && (
                    <>
                        {endPage < totalPages - 2 && <span>...</span>}
                        <button onClick={() => onPageChangeAction(totalPages - 1)}>
                            {totalPages}
                        </button>
                    </>
                )}

                {currentPage < totalPages - 1 && (
                    <button onClick={() => onPageChangeAction(currentPage + 1)}>
                        Следующая
                    </button>
                )}
            </div>
        </div>
    );
}
