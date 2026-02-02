import { useEffect, useState } from "react";
import { Container, Card, Button, Spinner, Table, Badge, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AppointmentService from "../../apis/AppointmentService";
import RateExperience from "./RateExperience"; 

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [upcoming, setUpcoming] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Rating Modal State
    const [showRateModal, setShowRateModal] = useState(false);
    const [selectedApptId, setSelectedApptId] = useState(null);

    const loadData = async () => {
        setLoading(true);
        const userDetailsString = localStorage.getItem("userDetails");
        if (!userDetailsString) {
            navigate("/signin");
            return;
        }
        const userDetails = JSON.parse(userDetailsString);

        try {
            const [upcomingRes, historyRes] = await Promise.all([
                AppointmentService.getCustomerUpcomingAppointments(userDetails.id),
                AppointmentService.getHistoryAppointments(userDetails.id)
            ]);

            setUpcoming(upcomingRes.data || []);
            setHistory(historyRes.data || []);
        } catch (error) {
            console.error("Error loading dashboard", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Handlers
    const handlePayNow = (appt) => {
        navigate("/payment", { 
            state: { 
                appointmentId: appt.id, 
                amount: 500.00, 
                garageName: appt.garage?.garageName 
            } 
        });
    };

    const handleOpenRateModal = (apptId) => {
        setSelectedApptId(apptId);
        setShowRateModal(true);
    };

    const handleCancel = async (id) => {
        if(!window.confirm("Are you sure you want to cancel?")) return;
        try {
            await AppointmentService.cancelAppointment(id);
            alert("Appointment Cancelled");
            loadData();
        } catch(error) {
            alert("Failed to cancel");
        }
    };

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "80vh", padding: "40px 0" }}>
                <Container>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-light">My Appointments</h2>
                        <Button variant="warning" onClick={() => navigate("/garages")}>Book New Service</Button>
                    </div>

                    {loading ? (
                        <div className="text-center text-light"><Spinner animation="border" /></div>
                    ) : (
                        <Card className="bg-dark text-light border-secondary shadow">
                            <Card.Body>
                                <Tabs defaultActiveKey="upcoming" className="mb-3 custom-tabs">
                                    
                                    {/* --- UPCOMING TAB --- */}
                                    <Tab eventKey="upcoming" title={`Upcoming (${upcoming.length})`}>
                                        {upcoming.length > 0 ? (
                                            <Table hover variant="dark" responsive className="align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>Garage</th>
                                                        <th>Date & Time</th>
                                                        <th>Status</th>
                                                        <th>Payment</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {upcoming.map((appt) => (
                                                        <tr key={appt.id}>
                                                            <td className="fw-bold text-warning">{appt.garage?.garageName}</td>
                                                            <td>
                                                                {new Date(appt.appointmentDate).toLocaleDateString()} <br/>
                                                                <small className="text-info">
                                                                    {new Date(appt.timeslot?.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                                </small>
                                                            </td>
                                                            <td><Badge bg={appt.status === 'CONFIRMED' ? 'primary' : 'warning'}>{appt.status}</Badge></td>
                                                            <td>
                                                                {appt.payment?.status === 'SUCCESS' || appt.status === 'CONFIRMED' ? (
                                                                    <Badge bg="success">PAID</Badge>
                                                                ) : (
                                                                    <Badge bg="danger">PENDING</Badge>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    {/* Show Pay Button only if PENDING */}
                                                                    {appt.status === 'PENDING' && (
                                                                        <Button 
                                                                            size="sm" 
                                                                            variant="success" 
                                                                            onClick={() => handlePayNow(appt)}
                                                                        >
                                                                            Pay Now
                                                                        </Button>
                                                                    )}
                                                                    <Button size="sm" variant="danger" onClick={() => handleCancel(appt.id)}>Cancel</Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <p className="text-center text-secondary py-4">No upcoming appointments.</p>
                                        )}
                                    </Tab>

                                    {/* --- HISTORY TAB --- */}
                                    <Tab eventKey="history" title="History">
                                        {history.length > 0 ? (
                                            <Table hover variant="dark" responsive className="align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>Garage</th>
                                                        <th>Date</th>
                                                        <th>Status</th>
                                                        <th>Rating</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {history.map((appt) => (
                                                        <tr key={appt.id}>
                                                            <td>{appt.garage?.garageName}</td>
                                                            <td>{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                                                            <td>
                                                                <Badge bg={appt.status === 'COMPLETED' ? 'success' : 'secondary'}>
                                                                    {appt.status}
                                                                </Badge>
                                                            </td>
                                                            <td>
                                                                {appt.status === 'COMPLETED' && (
                                                                    appt.rating ? (
                                                                        <span className="text-warning">
                                                                            ★ {appt.rating.score}/5
                                                                        </span>
                                                                    ) : (
                                                                        <Button 
                                                                            size="sm" 
                                                                            variant="outline-warning" 
                                                                            onClick={() => handleOpenRateModal(appt.id)}
                                                                        >
                                                                            Rate Service
                                                                        </Button>
                                                                    )
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        ) : (
                                            <p className="text-center text-secondary py-4">No history available.</p>
                                        )}
                                    </Tab>

                                </Tabs>
                            </Card.Body>
                        </Card>
                    )}
                </Container>
            </div>

            {/* Rating Modal Component */}
            <RateExperience 
                show={showRateModal} 
                handleClose={() => setShowRateModal(false)} 
                appointmentId={selectedApptId}
                onRatingSuccess={loadData} 
            />

            <Footer />
        </>
    );
};

export default CustomerDashboard;