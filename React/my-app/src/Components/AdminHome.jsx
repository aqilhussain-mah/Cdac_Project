import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "./AdminHome.css";
import "./FunctionHall"
import "./Inquiry.css";
import Profile from "./Profile";
import FunctionHall from "./FunctionHall";
import Booked from "./Booked";
import Inquiries from "./Inquiries";

const cards = [
  { title: "Active Locations", value: 2, icon: "fas fa-map-marker-alt" },
  { title: "Active Services", value: 4, icon: "fas fa-concierge-bell" },
  { title: "Bookings", value: 2, icon: "fas fa-calendar-alt" },
  { title: "Unread Inquiries", value: 1, icon: "fas fa-envelope" },
];


// Details Data and Columns
const detailsData = [
  {
    id: 1,
    name: "Grand Hall",
    address: "123 Main St, City",
    services: "Catering, Photography, Decoration",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Royal Venue",
    address: "456 Elm St, Town",
    services: "Catering, Music, Lighting",
    image: "https://via.placeholder.com/150",
  },
];

const detailsColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Address", accessor: "address" },
  { Header: "Services", accessor: "services" },
  {
    Header: "Image",
    accessor: "image",
    Cell: ({ value }) => <img src={value} alt="Venue" width="50" />,
  },
];

function AdminHome() {


  

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [view, setView] = useState("dashboard");
  const [details, setDetails] = useState(detailsData);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    services: "",
    image: "",
  });


  // const {
  //   getTableProps: getInquiryTableProps,
  //   getTableBodyProps: getInquiryTableBodyProps,
  //   headerGroups: inquiryHeaderGroups,
  //   page: inquiryPage,
  //   previousPage: previousInquiryPage,
  //   nextPage: nextInquiryPage,
  //   canPreviousPage: canPreviousInquiryPage,
  //   canNextPage: canNextInquiryPage,
  //   state: { pageIndex: inquiryPageIndex },
  //   pageCount: inquiryPageCount,
  //   prepareRow: prepareInquiryRow,
  // } = useTable({ columns, data }, useSortBy, usePagination);

  // const {
  //   getTableProps: getBookingTableProps,
  //   getTableBodyProps: getBookingTableBodyProps,
  //   headerGroups: bookingHeaderGroups,
  //   page: bookingPage,
  //   previousPage: previousBookingPage,
  //   nextPage: nextBookingPage,
  //   canPreviousPage: canPreviousBookingPage,
  //   canNextPage: canNextBookingPage,
  //   state: { pageIndex: bookingPageIndex },
  //   pageCount: bookingPageCount,
  //   prepareRow: prepareBookingRow,
  // } = useTable(
  //   { columns: bookingColumns, data: bookingData },
  //   useSortBy,
  //   usePagination
  // );

  const {
    getTableProps: getDetailsTableProps,
    getTableBodyProps: getDetailsTableBodyProps,
    headerGroups: detailsHeaderGroups,
    page: detailsPage,
    previousPage: previousDetailsPage,
    nextPage: nextDetailsPage,
    canPreviousPage: canPreviousDetailsPage,
    canNextPage: canNextDetailsPage,
    state: { pageIndex: detailsPageIndex },
    pageCount: detailsPageCount,
    prepareRow: prepareDetailsRow,
  } = useTable(
    { columns: detailsColumns, data: details },
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
            <i className="fas fa-calendar-check"></i> Booked Applicants
          </li>
          <li onClick={() => setView("details")}>
            <i className="fas fa-concierge-bell"></i> Details
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
            <Profile></Profile>
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
          {view === "inquiries" && <Inquiries></Inquiries>}

          {/* Booking Table */}
          {view === "bookings" && <Booked></Booked>}
          {view==="details" && <FunctionHall></FunctionHall>}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;







// view pe function 
