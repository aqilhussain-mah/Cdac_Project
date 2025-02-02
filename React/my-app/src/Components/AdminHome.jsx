import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
// import { AppContext } from "./AppContext";
import "./AdminHome.css";
import "./Inquiry.css";
import Profile from "./Profile";

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
    Action: "Action",
  },
  {
    SRNo: 2,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "unread",
    Action: "Action",
  },
  {
    SRNo: 3,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 4,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "unread",
    Action: "Action",
  },
  {
    SRNo: 5,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 6,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 7,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 8,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 9,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 10,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 11,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 12,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
  {
    SRNo: 13,
    Inquirer: "Ali",
    Email: "demo@gmail.com",
    Message: "Testing",
    Status: "read",
    Action: "Action",
  },
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

const bookingData = [
  {
    BookingID: "B001",
    Customer: "John Doe",
    Phone: "1234567890",
    Email: "john@example.com",
    BookingDate: "2025-02-15",
    Event: "Wedding",
  },
  {
    BookingID: "B002",
    Customer: "Jane Smith",
    Phone: "9876543210",
    Email: "jane@example.com",
    BookingDate: "2025-03-10",
    Event: "Conference",
  },
];

const bookingColumns = [
  { Header: "Booking ID", accessor: "BookingID" },
  { Header: "Customer Name", accessor: "Customer" },
  { Header: "Phone No.", accessor: "Phone" },
  { Header: "Email", accessor: "Email" },
  { Header: "Booking Date", accessor: "BookingDate" },
  { Header: "Event", accessor: "Event" },
];

function AdminHome() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [view, setView] = useState("dashboard");

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your logout logic here
    setPopupVisible(false); // Close popup after logout
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const {
    getTableProps: getInquiryTableProps,
    getTableBodyProps: getInquiryTableBodyProps,
    headerGroups: inquiryHeaderGroups,
    page: inquiryPage,
    previousPage: previousInquiryPage,
    nextPage: nextInquiryPage,
    canPreviousPage: canPreviousInquiryPage,
    canNextPage: canNextInquiryPage,
    state: { pageIndex: inquiryPageIndex },
    pageCount: inquiryPageCount,
    prepareRow: prepareInquiryRow,
  } = useTable({ columns, data }, useSortBy, usePagination);

  const {
    getTableProps: getBookingTableProps,
    getTableBodyProps: getBookingTableBodyProps,
    headerGroups: bookingHeaderGroups,
    page: bookingPage,
    previousPage: previousBookingPage,
    nextPage: nextBookingPage,
    canPreviousPage: canPreviousBookingPage,
    canNextPage: canNextBookingPage,
    state: { pageIndex: bookingPageIndex },
    pageCount: bookingPageCount,
    prepareRow: prepareBookingRow,
  } = useTable(
    { columns: bookingColumns, data: bookingData },
    useSortBy,
    usePagination
  );

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Wedding Solutions</h2>
        <ul>
          <li onClick={() => setView("dashboard")}>
            <i className="fas fa-home"></i> Dashboard
          </li>
          <li onClick={() => setView("inquiries")}>
            <i className="fas fa-home"></i> Inquiries
          </li>
          <li onClick={() => setView("bookings")}>
            <i className="fas fa-calendar-check"></i> Booking Applications
          </li>
          <li>
            <i className="fas fa-users"></i> Clients List
          </li>
          <li>
            <i className="fas fa-concierge-bell"></i>Details
          </li>
          <li>
            <i className="fas fa-user"></i> User List
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <div className="navbar-left">
            <h3 className="p-1 m-2">Wedding Solutions - Admin</h3>
          </div>
          <div className="navbar-right">
            <span>Administrator Admin</span>
            <Profile></Profile>

            {/* Popup */}
          </div>
        </div>

        <div className="container">
          {/* Dashboard */}
          {view === "dashboard" && (
            <div className="dashboard">
              <h1>Welcome to Wedding Solutions - Admin Panel</h1>
              <div className="cards">
                {cards.map((card, index) => (
                  <div key={index} className="card">
                    <i className={card.icon} style={{ cursor: "pointer" }}></i>
                    <h3>{card.value}</h3>
                    <p>{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inquiry Table */}
          {view === "inquiries" && (
            <table {...getInquiryTableProps()}>
              <thead>
                {inquiryHeaderGroups.map((hg) => (
                  <tr {...hg.getHeaderGroupProps()}>
                    {hg.headers.map((header) => (
                      <th
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                      >
                        {header.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getInquiryTableBodyProps()}>
                {inquiryPage.map((row) => {
                  prepareInquiryRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.original.SRNo}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Booking Table */}
          {view === "bookings" && (
            <table {...getBookingTableProps()}>
              <thead>
                {bookingHeaderGroups.map((hg) => (
                  <tr {...hg.getHeaderGroupProps()}>
                    {hg.headers.map((header) => (
                      <th
                        {...header.getHeaderProps(
                          header.getSortByToggleProps()
                        )}
                      >
                        {header.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getBookingTableBodyProps()}>
                {bookingPage.map((row) => {
                  prepareBookingRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.original.BookingID}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
