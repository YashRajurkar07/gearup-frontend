import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Spinner, Table, Badge, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";
import AppointmentService from "../../apis/AppointmentService";
import { getUserId } from "../../store/AuthHandler";

const OwnerDashboard = () => {
    const navigate = useNavigate();
    const [garage, setGarage] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDashboardData = async () => {
        setLoading(true);
        const ownerId = getUserId();
        try {
            const garageRes = await GarageService.getGarageByOwnerId(ownerId);
            
            if (garageRes.data && garageRes.data.length > 0) {
                const myGarage = garageRes.data[0];
                setGarage(myGarage);

                const apptRes = await AppointmentService.getGarageAppointments(myGarage.id);
                setAppointments(apptRes.data || []);
            }
        } catch (error) {
            console.error("Error loading dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

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
            loadDashboardData();
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
            loadDashboardData(); 
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
            loadDashboardData(); 
        } catch (error) {
            console.error("Error cancelling:", error);
            alert("Failed to cancel appointment.");
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
    
    const activeAppointments = appointments.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED');
    const historyAppointments = appointments.filter(a => a.status === 'COMPLETED' || a.status === 'CANCELLED');

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "80vh", padding: "40px 0" }}>
                <Container>
                    <h2 className="text-light mb-4">Owner Dashboard</h2>

                    {loading ? (
                        <div className="text-center text-light"><Spinner animation="border" /></div>
                    ) : garage ? (
                        <>
                            {/* --- GARAGE INFO CARD --- */}
                            <Row className="mb-5">
                                <Col md={12}>
                                    <Card className="bg-dark text-light border-secondary shadow">
                                        <Card.Body>
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <Card.Title className="display-6 text-warning">{garage.garageName}</Card.Title>
                                                    <Card.Text className="text-secondary">
                                                        {garage.address?.area}, {garage.address?.city} | Phone: {garage.garagePhone}
                                                    </Card.Text>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <Button variant="success" onClick={() => navigate(`/addtimeslot/${garage.id}`)}>
                                                        Manage Slots
                                                    </Button>
                                                    <Button variant="outline-light" onClick={() => navigate(`/updategaragedetails/${garage.id}`)}>
                                                        Edit Details
                                                    </Button>
                                                </div>
                                            </div>

                                            <Row className="g-3 mt-3">
                                                <Col sm={3}>
                                                    <div className="p-3 border border-secondary rounded text-center">
                                                        <h6 className="text-secondary">Total Mechanics</h6>
                                                        <h3 className="text-info">{garage.totalMechanics}</h3>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="p-3 border border-secondary rounded text-center">
                                                        <h6 className="text-secondary">Shop Status</h6>
                                                        <h3 className={garage.isActive ? "text-success" : "text-danger"}>
                                                            {garage.isActive ? "Open" : "Closed"}
                                                        </h3>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="p-3 border border-secondary rounded text-center">
                                                        <h6 className="text-secondary">Active Appts</h6>
                                                        <h3 className="text-warning">
                                                            {activeAppointments.length}
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
                                <Card.Header className="border-secondary">
                                    <h4 className="mb-0 text-warning">Appointments Management</h4>
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
                                                    <p>Relax! Your schedule is clear.</p>
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
                                                <div className="text-center py-5 text-secondary">No history found.</div>
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