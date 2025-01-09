import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from 'react-table';
import './AdminHome.css';
import './Inquiry.css';

const cards = [
  { title: "Active Locations", value: 2, icon: "fas fa-map-marker-alt" },
  { title: "Active Services", value: 4, icon: "fas fa-concierge-bell" },
  { title: "Bookings", value: 2, icon: "fas fa-calendar-alt" },
  { title: "Unread Inquiries", value: 1, icon: "fas fa-envelope" },
];

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

function AdminHome() {
    const [showInquiryTable, setShowInquiryTable] = useState(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        state: { pageIndex },
        pageCount,
        prepareRow
    } = useTable(
        {
            columns,
            data
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="app">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Wedding Solutions</h2>
                <ul>
                    <li onClick={() => setShowInquiryTable(false)}><i className="fas fa-home"></i> Dashboard</li>
                    <li><i className="fas fa-calendar-check"></i> Booking Applications</li>
                    <li onClick={() => setShowInquiryTable(true)}><i className="fas fa-envelope"></i> Inquiries</li>
                    <li><i className="fas fa-users"></i> Clients List</li>
                    <hr />
                    <li><i className="fas fa-map-marker-alt"></i> Locations List</li>
                    <li><i className="fas fa-concierge-bell"></i> Services List</li>
                    <li><i className="fas fa-user"></i> User List</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Navbar */}
                <div className="navbar">
                    <div className="navbar-left">
                        <i className="fas fa-bars"></i>
                        <h3>Wedding Solutions - Admin</h3>
                    </div>
                    <div className="navbar-right">
                        <span>Administrator Admin</span>
                        <i className="fas fa-user-circle"></i>
                    </div>
                </div>

                <div className='container'>
                    {showInquiryTable ? (
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
                    ) : (
                        <div className="dashboard">
                            <h1>Welcome to Wedding Solutions - Admin Panel</h1>
                            <div className="cards">
                                {cards.map((card, index) => (
                                    <div key={index} className="card">
                                        <i className={card.icon}></i>
                                        <h3>{card.value}</h3>
                                        <p>{card.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {showInquiryTable && (
                        <div className='d-flex justify-content-center my-3'>
                            <button className='btn btn-primary me-2' disabled={!canPreviousPage} onClick={previousPage}>Prev</button>
                            <span className='mx-2'>{pageIndex + 1} of {pageCount}</span>
                            <button className='btn btn-primary ms-2' disabled={!canNextPage} onClick={nextPage}>Next</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
