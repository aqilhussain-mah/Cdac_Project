import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import './Inquiry.css'
const data = [
    {
        SRNo: 1,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 2,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "unread",
        Action: "Action"
    },
    {
        SRNo: 3,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 4,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "unread",
        Action: "Action"
    },
    {
        SRNo: 5,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 6,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 7,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 8,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 9,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 10,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 11,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 12,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    },
    {
        SRNo: 13,
        Inquirer: "Ali",
        Email: "demo@gmail.com",
        Message: "Testing",
        Status: "read",
        Action: "Action"
    }
];

const columns = [
    {
        Header: "SrNo",
        accessor: "SRNo",
    },
    {
        Header: "Inquirer",
        accessor: "Inquirer",
    },
    {
        Header: "Email",
        accessor: "Email",
    },
    {
        Header: "Message",
        accessor: "Message",
    },
    {
        Header: "Status",
        accessor: "Status",
    },
    {
        Header: "Action",
        accessor: "Action",
    },
];

const InquiryTable = () => {
    const { getTableProps, getTableBodyProps, headerGroups, page,previousPage,nextPage,canPreviousPage,canNextPage, state:{pageIndex},pageCount, prepareRow } = useTable(
        { 
            columns, data
         },
        useSortBy,
        usePagination
    );

    return (
        <div className='container'>
            <table {...getTableProps()}>
                <thead>
                        {headerGroups.map(hg => (
                            <tr {...hg.getHeaderGroupProps()}>
                                {hg.headers.map(header => (
                                    <th {...header.getHeaderProps(header.getSortByToggleProps())}>
                                        {header.render("Header")}
                                        {header.isSorted && (
                                            <span className={`sort-indicator ${header.isSortedDesc ? "sort-desc" : "sort-asc"}`}></span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.original.SRNo}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className='d-flex justify-content-center my-3'>
                <button className='btn btn-primary me-2' disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
                <span className='mx-2'>{pageIndex+1} of {pageCount}</span>
                <button className='btn btn-primary ms-2' disabled={!canNextPage} onClick={nextPage}>Next</button>
            </div>
        </div>
    );
};

export default InquiryTable;
