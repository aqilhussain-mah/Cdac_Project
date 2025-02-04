import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import { Modal, Button, Form } from "react-bootstrap";

const Booked = () => {
  // State for bookings
  const [data, setData] = useState([
    { BookingID: "B001", Customer: "John Doe", Phone: "1234567890", Email: "john@example.com", BookingDate: "2025-02-15", Event: "Wedding" },
    { BookingID: "B002", Customer: "Jane Smith", Phone: "9876543210", Email: "jane@example.com", BookingDate: "2025-03-10", Event: "Conference" },
  ]);

  // Modal State
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [editData, setEditData] = useState({});

  // Open Modal
  const openModal = (type, row) => {
    setSelectedRow(row);
    setModalType(type);

    if (type === "edit") {
      setEditData({ ...row });
    }
  };

  // Close Modal
  const closeModal = () => {
    setSelectedRow(null);
    setModalType(null);
  };

  // Handle Edit Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Edited Data
  const saveEdit = () => {
    setData((prevData) =>
      prevData.map((item) => (item.BookingID === editData.BookingID ? editData : item))
    );
    closeModal();
  };

  // Delete Row
  const deleteRow = () => {
    setData((prevData) => prevData.filter((item) => item.BookingID !== selectedRow.BookingID));
    closeModal();
  };

  // Table Columns
  const columns = React.useMemo(
    () => [
      { Header: "Booking ID", accessor: "BookingID" },
      { Header: "Customer Name", accessor: "Customer" },
      { Header: "Phone No.", accessor: "Phone" },
      { Header: "Email", accessor: "Email" },
      { Header: "Booking Date", accessor: "BookingDate" },
      { Header: "Event", accessor: "Event" },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="button-group">
            <Button onClick={() => openModal("view", row.original)}>View</Button>
            <Button onClick={() => openModal("edit", row.original)} className="ms-2">Edit</Button>
            <Button onClick={() => openModal("delete", row.original)} className="ms-2" >Delete</Button>
          </div>
        ),
      },
    ],
    []
  );

  // Table Instance with Pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    usePagination
  );

  return (
    <div className="container mt-4">
      <h2>Booked Applicants</h2>
      <table {...getTableProps()} className="table table-bordered">
        <thead className="thead-dark">
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()} key={hg.id}>
              {hg.headers.map((header) => (
                <th {...header.getHeaderProps()}>{header.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
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

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button onClick={previousPage} disabled={!canPreviousPage}>Previous</Button>
        <span>Page {pageIndex + 1} of {pageOptions.length}</span>
        <Button onClick={nextPage} disabled={!canNextPage}>Next</Button>
      </div>

      {/* View Modal */}
      <Modal show={modalType === "view"} onHide={closeModal} centered>
        <Modal.Header>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <>
              <p><strong>Booking ID:</strong> {selectedRow.BookingID}</p>
              <p><strong>Customer:</strong> {selectedRow.Customer}</p>
              <p><strong>Phone:</strong> {selectedRow.Phone}</p>
              <p><strong>Email:</strong> {selectedRow.Email}</p>
              <p><strong>Booking Date:</strong> {selectedRow.BookingDate}</p>
              <p><strong>Event:</strong> {selectedRow.Event}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={modalType === "edit"} onHide={closeModal} centered>
        <Modal.Header>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control type="text" name="Customer" value={editData.Customer} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="Phone" value={editData.Phone} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="Email" value={editData.Email} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Booking Date</Form.Label>
                <Form.Control type="date" name="BookingDate" value={editData.BookingDate} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event</Form.Label>
                <Form.Control type="text" name="Event" value={editData.Event} onChange={handleEditChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={saveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={modalType === "delete"} onHide={closeModal} centered>
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <p>Are you sure you want to delete the booking for <strong>{selectedRow.Customer}</strong>?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={deleteRow} variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Booked;
