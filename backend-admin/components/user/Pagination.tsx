'use client';

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ users, itemsPerPage }) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    console.log("fyfyfyt: " + itemsPerPage)

    //const itemsPerPage = 3
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log("users: " + users);
    console.log("itemsPerPage: " + itemsPerPage);
    //const currentItems = users.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(users / itemsPerPage);
    console.log("pageCount: " + pageCount);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % users;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);

        const params = new URLSearchParams(searchParams.toString());
        console.log("params: " + JSON.stringify(params.get("query")))
        const pageNumber = (newOffset.valueOf()).toString()
        params.set('page', pageNumber);
        replace(`${pathname}?${params.toString()}`);
    };

    const currentPage = Number(searchParams.get('page')) || 1;

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap10">
                <div className="text-tiny">Showing</div>
                <div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        activeClassName="active"
                        containerClassName="wg-pagination"
                    />
                </div>
            </div>
        </div>
    )
}