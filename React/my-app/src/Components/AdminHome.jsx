import React, { useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
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
  // Your existing inquiry data
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
  // Your existing inquiry columns
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
    Header: "Action",
    Cell: ({ row }) => (
      <div className="button-group">
        <button className="btn btn-primary">👁 View</button>
        <button className="btn btn-">✏ Edit</button>
        <button className="btn delete">🗑 Delete</button>
      </div>
    ),
  },
];

const bookingData = [
  // Your existing booking data
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
  // Your existing booking columns
  { Header: "Booking ID", accessor: "BookingID" },
  { Header: "Customer Name", accessor: "Customer" },
  { Header: "Phone No.", accessor: "Phone" },
  { Header: "Email", accessor: "Email" },
  { Header: "Booking Date", accessor: "BookingDate" },
  { Header: "Event", accessor: "Event" },
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




  const [showHallModal, setShowHallModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);

  // Functional Hall Details State
  const [hallData, setHallData] = useState({ name: "", address: "" });
  const [hallList, setHallList] = useState([]); // Stores added halls
  const [editHallIndex, setEditHallIndex] = useState(null); // Tracks which hall is being edited

  // Services State
  const [services, setServices] = useState("");
  const [servicesList, setServicesList] = useState([]); // Stores services
  const [editServiceIndex, setEditServiceIndex] = useState(null); // Tracks which service is being edited

  // Handle input change for Functional Hall
  const handleChangeHall = (e) => {
    setHallData({ ...hallData, [e.target.name]: e.target.value });
  };

  // Handle Hall Form Submit (Add or Edit)
  const handleSubmitHall = (e) => {
    e.preventDefault();
    if (editHallIndex !== null) {
      // Edit Mode
      const updatedHalls = [...hallList];
      updatedHalls[editHallIndex] = hallData;
      setHallList(updatedHalls);
      setEditHallIndex(null);
    } else {
      // Add Mode
      setHallList([...hallList, hallData]);
    }
    setHallData({ name: "", address: "" });
    setShowHallModal(false);
  };

  // Edit Hall
  const handleEditHall = (index) => {
    setHallData(hallList[index]);
    setEditHallIndex(index);
    setShowHallModal(true);
  };

  // Delete Hall
  const handleDeleteHall = (index) => {
    setHallList(hallList.filter((_, i) => i !== index));
  };

  // Handle Service Form Submit (Add or Edit)
  const handleSubmitService = () => {
    if (services.trim() !== "") {
      if (editServiceIndex !== null) {
        const updatedServices = [...servicesList];
        updatedServices[editServiceIndex] = services;
        setServicesList(updatedServices);
        setEditServiceIndex(null);
      } else {
        setServicesList([...servicesList, services]);
      }
      setServices("");
      setShowServicesModal(false);
    }
  };

  // Edit Service
  const handleEditService = (index) => {
    setServices(servicesList[index]);
    setEditServiceIndex(index);
    setShowServicesModal(true);
  };

  // Delete Service
  const handleDeleteService = (index) => {
    setServicesList(servicesList.filter((_, i) => i !== index));
  };



  const [isPopupVisible, setPopupVisible] = useState(false);
  const [view, setView] = useState("dashboard");
  const [details, setDetails] = useState(detailsData);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    services: "",
    image: "",
  });

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    setPopupVisible(false);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDetail = { ...formData, id: details.length + 1 };
    setDetails([...details, newDetail]);
    setFormData({ name: "", address: "", services: "", image: "" });
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

          {/* Details Section */}
          {view === "details" && (
            <div className="container mt-4">
      <h2>Details Management</h2>

      {/* Buttons to Open Modals */}
      <button className="btn btn-primary m-2" onClick={() => setShowHallModal(true)}>
        + Add Functional Hall
      </button>
      <button className="btn btn-secondary m-2" onClick={() => setShowImageModal(true)}>
        Upload Images
      </button>
      <button className="btn btn-success m-2" onClick={() => setShowServicesModal(true)}>
        Manage Services
      </button>

      {/* Functional Hall Modal */}
      {showHallModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editHallIndex !== null ? "Edit Functional Hall" : "Add Functional Hall"}</h5>
                <button className="close" onClick={() => setShowHallModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitHall}>
                  <div className="form-group">
                    <label>Hall Name:</label>
                    <input type="text" className="form-control" name="name" value={hallData.name} onChange={handleChangeHall} required />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="address" 
                      value={hallData.address} 
                      onChange={handleChangeHall} 
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    {editHallIndex !== null ? "Update Hall" : "Save Hall"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Modal */}
      {showServicesModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editServiceIndex !== null ? "Edit Service" : "Add Service"}</h5>
                <button className="close" onClick={() => setShowServicesModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter Service (e.g., Catering, Decoration)" 
                  value={services} 
                  onChange={(e) => setServices(e.target.value)} 
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSubmitService}>
                  {editServiceIndex !== null ? "Update Service" : "Add Service"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Functional Hall Table */}
      <div className="mt-4">
        <h3>Functional Halls</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Hall Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hallList.length > 0 ? (
              hallList.map((hall, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{hall.name}</td>
                  <td>{hall.address}</td>
                  <td>
                    <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditHall(index)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteHall(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No Functional Halls Added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Services Table */}
      <div className="mt-4">
        <h3>Services</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicesList.length > 0 ? (
              servicesList.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service}</td>
                  <td>
                    <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEditService(index)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteService(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No Services Added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;







// view pe function 
