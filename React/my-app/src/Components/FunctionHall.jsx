import React, { useState, useContext } from "react";
import { Modal, Button, Table, Form, Card, Pagination } from "react-bootstrap";
import { AppContext } from "../Components/AppContext";

const FunctionHall = () => {
    const { role } = useContext(AppContext);
    const [showHallModal, setShowHallModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);

    const [hallName, setHallName] = useState("");
    const [hallAddress, setHallAddress] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [serviceType, setServicePrice] = useState("");
    const[serviceCategory,setServiceCategory] = useState("")

    const [functionHalls, setFunctionHalls] = useState([]);
    const [services, setServices] = useState([]);

    const [hallPage, setHallPage] = useState(1);
    const [servicePage, setServicePage] = useState(1);
    const rowsPerPage = 4;

    const [selectedHall, setSelectedHall] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    const handleAddFunctionHall = () => {
        const newHall = { id: Date.now(), name: hallName, address: hallAddress };
        setFunctionHalls([...functionHalls, newHall]);
        setShowHallModal(false);
        setHallName("");
        setHallAddress("");
    };

    const handleAddService = () => {
        const newService = { id: Date.now(), name: serviceName, price: serviceType, category:serviceCategory };
        setServices([...services, newService]);
        setShowServiceModal(false);
        setServiceName("");
        setServicePrice("");
        setServiceCategory("")
    };

    const indexOfLastHall = hallPage * rowsPerPage;
    const indexOfFirstHall = indexOfLastHall - rowsPerPage;
    const currentHalls = functionHalls.slice(indexOfFirstHall, indexOfLastHall);

    const indexOfLastService = servicePage * rowsPerPage;
    const indexOfFirstService = indexOfLastService - rowsPerPage;
    const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    const handleEditHall = (hall) => {
        setSelectedHall(hall);
        setHallName(hall.name);
        setHallAddress(hall.address);
        setShowHallModal(true);
    };

    const handleEditService = (service) => {
        setSelectedService(service);
        setServiceName(service.name);
        setServicePrice(service.price);
        setServiceCategory(service.category)
        setShowServiceModal(true);
    };

    return (
        <div className="container-fluid mt-4">

            <Card className="shadow-lg p-4">
              
                <h2 className="text-center">Function Hall Details</h2>

                {role === "admin" && (
                    <div className="d-flex justify-content-center gap-3 my-3">
                        <Button onClick={() => setShowHallModal(true)}>Add Function Hall</Button>
                        <Button onClick={() => setShowServiceModal(true)}>Add Services</Button>
                    </div>
                )}

                <h4 className="mt-4">Function Halls</h4>
                <Table striped bordered hover responsive>
                    <thead className="table">
                        <tr>
                            <th>#</th>
                            <th>Function Hall Name</th>
                            <th>Address</th>
                            {role === "admin" && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentHalls.map((hall, index) => (
                            <tr key={hall.id}>
                                <td>{index + 1 + (hallPage - 1) * rowsPerPage}</td>
                                <td>{hall.name}</td>
                                <td>{hall.address}</td>
                                {role === "admin" && (
                                    <td>
                                        <Button size="sm" className="me-2" onClick={() => handleEditHall(hall)}>Edit</Button>
                                        <Button size="sm">Delete</Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(functionHalls.length / rowsPerPage))].map((_, i) => (
                        <Pagination.Item key={i + 1} active={hallPage === i + 1} onClick={() => setHallPage(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

                <h4 className="mt-4">Services</h4>
                <Table striped bordered hover responsive>
                    <thead className="table">
                        <tr>
                            <th>#</th>
                            <th>Service Name</th>
                            <th>Type</th>
                            <th>Category(Veg/Non-Veg)</th>
                            {role === "admin" && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentServices.map((service, index) => (
                            <tr key={service.id}>
                                <td>{index + 1 + (servicePage - 1) * rowsPerPage}</td>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                                <td>{service.category}</td>
                                {role === "admin" && (
                                    <td>
                                        <Button size="sm" className="me-2" onClick={() => handleEditService(service)}>Edit</Button>
                                        <Button size="sm">Delete</Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(services.length / rowsPerPage))].map((_, i) => (
                        <Pagination.Item key={i + 1} active={servicePage === i + 1} onClick={() => setServicePage(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Card>

            {/* Function Hall Modal */}
            <Modal show={showHallModal} onHide={() => setShowHallModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedHall ? "Edit Function Hall" : "Add Function Hall"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Function Hall Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter hall name" value={hallName} onChange={(e) => setHallName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address" value={hallAddress} onChange={(e) => setHallAddress(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  onClick={() => setShowHallModal(false)}>Close</Button>
                    <Button  onClick={handleAddFunctionHall}>Save Hall</Button>
                </Modal.Footer>
            </Modal>

            {/* Service Modal */}
            <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedService ? "Edit Service" : "Add Service"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter service name" value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="text" placeholder="Enter Type" value={serviceType} onChange={(e) => setServicePrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category" value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowServiceModal(false)}>Close</Button>
                    <Button  onClick={handleAddService}>Save Service</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FunctionHall;
