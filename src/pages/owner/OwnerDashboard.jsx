import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Spinner, Table, Badge, Tab, Tabs, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";
import AppointmentService from "../../apis/AppointmentService";
import { getUserId } from "../../store/AuthHandler";

const OwnerDashboard = () => {
    const navigate = useNavigate();
    
    // State for managing multiple garages
    const [garages, setGarages] = useState([]);
    const [selectedGarage, setSelectedGarage] = useState(null);
    
    // State for the currently selected garage's data
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apptLoading, setApptLoading] = useState(false);

    // 1. Initial Load: Fetch All Garages for the Owner
    const loadOwnerGarages = async () => {
        setLoading(true);
        const ownerId = getUserId();
        try {
            const garageRes = await GarageService.getGarageByOwnerId(ownerId);
            const garageList = garageRes.data || [];
            
            setGarages(garageList);

            // Automatically select the first garage if available
            if (garageList.length > 0) {
                handleGarageChange(garageList[0]);
            }
        } catch (error) {
            console.error("Error loading garages:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Fetch Appointments for a specific Garage
    const fetchAppointments = async (garageId) => {
        setApptLoading(true);
        try {
            const apptRes = await AppointmentService.getGarageAppointments(garageId);
            setAppointments(apptRes.data || []);
        } catch (error) {
            console.error("Error loading appointments:", error);
            setAppointments([]);
        } finally {
            setApptLoading(false);
        }
    };

    // 3. Handle Garage Switch
    const handleGarageChange = (garage) => {
        setSelectedGarage(garage);
        fetchAppointments(garage.id);
    };

    // Trigger initial load
    useEffect(() => {
        loadOwnerGarages();
    }, []);

    // --- Action Handlers (Refreshes only the current garage's appointments) ---

    const handleAccept = async (appt) => {
        try {
            const payload = {
                customerId: appt.customer.id,
                timeSlotId: appt.timeslot.id,
                appointmentDate: appt.appointmentDate,
                status: "CONFIRMED"
            };
            
             await AppointmentService.updateAppointmentStatus(appt.id, payload); 
             
            alert("Appointment Confirmed!");
            fetchAppointments(selectedGarage.id); // Refresh list
        } catch (error) {
            console.error("Error confirming:", error);
            alert("Failed to confirm. Ensure backend supports status updates.");
        }
    };

    const handleMarkCompleted = async (apptId) => {
        if (!window.confirm("Mark this service as Completed?")) return;
        try {
            await AppointmentService.markAppointmentAsCompleted(apptId);
            alert("Service Completed!");
            fetchAppointments(selectedGarage.id); // Refresh list
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    const handleCancel = async (apptId) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        try {
            await AppointmentService.cancelAppointment(apptId);
            alert("Appointment Cancelled.");
            fetchAppointments(selectedGarage.id); // Refresh list
        } catch (error) {
            console.error("Error cancelling:", error);
            alert("Failed to cancel appointment.");
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
    
    // Filter appointments for the *Selected* Garage
    const activeAppointments = appointments.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED');
    const historyAppointments = appointments.filter(a => a.status === 'COMPLETED' || a.status === 'CANCELLED');

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "80vh", padding: "40px 0" }}>
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-light">Owner Dashboard</h2>
                        
                        {/* --- GARAGE SWITCHER (Only visible if > 1 garage) --- */}
                        {garages.length > 1 && (
                            <div className="d-flex align-items-center gap-2">
                                <label className="text-light fw-bold">Select Garage:</label>
                                <Form.Select 
                                    style={{ width: "250px", cursor: "pointer" }}
                                    value={selectedGarage?.id || ""}
                                    onChange={(e) => {
                                        const g = garages.find(g => g.id === parseInt(e.target.value));
                                        handleGarageChange(g);
                                    }}
                                >
                                    {garages.map(g => (
                                        <option key={g.id} value={g.id}>{g.garageName} ({g.address?.city})</option>
                                    ))}
                                </Form.Select>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center text-light"><Spinner animation="border" /></div>
                    ) : selectedGarage ? (
                        <>
                            {/* --- GARAGE INFO CARD (Dynamic based on selectedGarage) --- */}
                            <Row className="mb-5">
                                <Col md={12}>
                                    <Card className="bg-dark text-light border-secondary shadow">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <Card.Title className="display-6 text-warning">{selectedGarage.garageName}</Card.Title>
                                                    <Card.Text className="text-secondary">
                                                        {selectedGarage.address?.area}, {selectedGarage.address?.city} | Phone: {selectedGarage.garagePhone}
                                                    </Card.Text>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <Button variant="success" onClick={() => navigate(`/addtimeslot/${selectedGarage.id}`)}>
                                                        Manage Slots
                                                    </Button>
                                                    <Button variant="outline-light" onClick={() => navigate(`/updategaragedetails/${selectedGarage.id}`)}>
                                                        Edit Details
                                                    </Button>
                                                </div>
                                            </div>

                                            <Row className="g-3 mt-3">
                                                <Col sm={3}>
                                                    <div className="p-3 border border-secondary rounded text-center">
                                                        <h6 className="text-secondary">Total Mechanics</h6>
                                                        <h3 className="text-info">{selectedGarage.totalMechanics}</h3>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="p-3 border border-secondary rounded text-center">
                                                        <h6 className="text-secondary">Shop Status</h6>
                                                        <h3 className={selectedGarage.isActive ? "text-success" : "text-danger"}>
                                                            {selectedGarage.isActive ? "Open" : "Closed"}
                                                        </h3>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="p-3 border border-secondary rounded text-center">
                                                        <h6 className="text-secondary">Active Appts</h6>
                                                        <h3 className="text-warning">
                                                            {apptLoading ? <Spinner size="sm" /> : activeAppointments.length}
                                                        </h3>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* --- APPOINTMENTS TABS --- */}
                            <Card className="bg-dark text-light border-secondary shadow">
                                <Card.Header className="border-secondary d-flex justify-content-between align-items-center">
                                    <h4 className="mb-0 text-warning">Appointments Management</h4>
                                    {apptLoading && <Spinner animation="border" size="sm" variant="warning" />}
                                </Card.Header>
                                <Card.Body>
                                    <Tabs defaultActiveKey="upcoming" id="owner-tabs" className="mb-3 custom-tabs">
                                        
                                        {/* TAB 1: UPCOMING / ACTIVE */}
                                        <Tab eventKey="upcoming" title={`Upcoming (${activeAppointments.length})`}>
                                            {activeAppointments.length > 0 ? (
                                                <Table hover variant="dark" responsive className="align-middle">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Customer</th>
                                                            <th>Date & Time</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {activeAppointments.map((appt) => (
                                                            <tr key={appt.id}>
                                                                <td>#{appt.id}</td>
                                                                <td>
                                                                    <div className="fw-bold">{appt.customer?.userDetails?.firstName} {appt.customer?.userDetails?.lastName}</div>
                                                                    <div className="small text-secondary">{appt.customer?.userDetails?.mobileNumber}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{formatDate(appt.appointmentDate)}</div>
                                                                    <div className="text-info">
                                                                        {new Date(appt.timeslot?.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Badge bg={appt.status === 'CONFIRMED' ? 'primary' : 'warning'} className="p-2">
                                                                        {appt.status}
                                                                    </Badge>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        {/* logic: If PENDING, show Accept. If CONFIRMED, show Complete */}
                                                                        {appt.status === 'PENDING' && (
                                                                             <Button 
                                                                                size="sm" 
                                                                                variant="outline-primary" 
                                                                                onClick={() => handleAccept(appt)}
                                                                             >
                                                                                Accept
                                                                             </Button>
                                                                        )}

                                                                        {appt.status === 'CONFIRMED' && (
                                                                            <Button 
                                                                                size="sm" 
                                                                                variant="success" 
                                                                                onClick={() => handleMarkCompleted(appt.id)}
                                                                            >
                                                                                Complete
                                                                            </Button>
                                                                        )}

                                                                        <Button 
                                                                            size="sm" 
                                                                            variant="danger"
                                                                            onClick={() => handleCancel(appt.id)}
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            ) : (
                                                <div className="text-center py-5 text-secondary">
                                                    <h5>No upcoming appointments.</h5>
                                                    <p>Relax! Your schedule for <strong>{selectedGarage.garageName}</strong> is clear.</p>
                                                </div>
                                            )}
                                        </Tab>

                                        {/* TAB 2: HISTORY */}
                                        <Tab eventKey="history" title="History">
                                            {historyAppointments.length > 0 ? (
                                                <Table hover variant="dark" responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Customer</th>
                                                            <th>Date</th>
                                                            <th>Status</th>
                                                            <th>Payment</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {historyAppointments.map((appt) => (
                                                            <tr key={appt.id}>
                                                                <td>#{appt.id}</td>
                                                                <td>{appt.customer?.userDetails?.firstName}</td>
                                                                <td>{formatDate(appt.appointmentDate)}</td>
                                                                <td>
                                                                    <Badge bg={appt.status === 'COMPLETED' ? 'success' : 'danger'}>
                                                                        {appt.status}
                                                                    </Badge>
                                                                </td>
                                                                <td>
                                                                    {appt.payment?.status === 'SUCCESS' ? 
                                                                        <span className="text-success fw-bold">Paid</span> : 
                                                                        <span className="text-secondary">{appt.payment?.status}</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            ) : (
                                                <div className="text-center py-5 text-secondary">No history found for this garage.</div>
                                            )}
                                        </Tab>

                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </>
                    ) : (
                        <div className="text-center text-light py-5 border border-secondary rounded">
                            <h3>No Garage Found</h3>
                            <p>You haven't registered your shop yet.</p>
                            <Button variant="warning" onClick={() => navigate('/registergarage')}>
                                Register Garage Now
                            </Button>
                        </div>
                    )}
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default OwnerDashboard;