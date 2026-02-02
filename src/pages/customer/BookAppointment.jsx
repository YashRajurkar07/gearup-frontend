import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Badge } from "react-bootstrap";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";
import TimeSlotService from "../../apis/TimeSlotService";
import AppointmentService from "../../apis/AppointmentService";

const BookAppointment = () => {
    const { garageId } = useParams();
    const navigate = useNavigate();

    const [garage, setGarage] = useState(null);
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const garageRes = await GarageService.getGarageById(garageId);
                setGarage(garageRes.data);

                const slotsRes = await TimeSlotService.getAvailableTimeSlots(garageId);
                setSlots(slotsRes.data);
            } catch (error) {
                alert("Failed to load garage details."); // Optional: suppress alert on load
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [garageId]);

    const handleBooking = async () => {

        const userDetailsString = localStorage.getItem("userDetails");
        if (!userDetailsString) {
            alert("Please Log In to book an appointment.");
            navigate("/signin");
            return;
        }
        
        const userDetails = JSON.parse(userDetailsString);
        const customerId = userDetails.id; 

        if (!selectedSlot) {
            alert("Please select a time slot first.");
            return;
        }

        const appointmentDate = selectedSlot.startTime.split("T")[0];

        const payload = {
            appointmentDate: appointmentDate,
            customerId: customerId,
            timeSlotId: selectedSlot.id,
            paymentMode: "CASH"
        };

        try {
            await AppointmentService.scheduleAppointment(payload);
            alert("Appointment Booked Successfully!");
            navigate("/customer/dashboard");
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking Failed: " + (error.response?.data?.message || "Server Error"));
        }
    };

    // Helper to format time (e.g. "2026-02-02T09:30:00" -> "09:30 AM")
    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Helper to format date for the header
    const formatDate = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleDateString();
    };

    if (loading) return <div className="text-center mt-5 text-light">Loading...</div>;

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", padding: "40px 0" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            {/* Garage Info */}
                            <Card className="bg-dark text-light border-secondary mb-4">
                                <Card.Body>
                                    <h2 className="text-warning">{garage?.garageName}</h2>
                                    <p className="text-secondary">
                                        {garage?.address?.area}, {garage?.address?.city} <br />
                                        Phone: {garage?.garagePhone}
                                    </p>
                                </Card.Body>
                            </Card>

                            <Card className="bg-dark text-light border-secondary">
                                <Card.Header className="border-secondary text-warning">
                                    Select a Time Slot
                                </Card.Header>
                                <Card.Body>
                                    {slots.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-3">
                                            {slots.map((slot) => (
                                                <Button
                                                    key={slot.id}
                                                    variant={selectedSlot?.id === slot.id ? "warning" : "outline-light"}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className="p-3"
                                                >
                                                    <div className="fw-bold">{formatDate(slot.startTime)}</div>
                                                    <div>
                                                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                                    </div>
                                                </Button>
                                            ))}
                                        </div>
                                    ) : (
                                        <Alert variant="info" className="bg-dark text-info border-info">
                                            No available slots found for this garage.
                                        </Alert>
                                    )}

                                    <div className="mt-4 border-top border-secondary pt-3">
                                        <Button
                                            variant="success"
                                            size="lg"
                                            className="w-100 fw-bold"
                                            disabled={!selectedSlot}
                                            onClick={handleBooking}
                                        >
                                            Confirm Booking
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default BookAppointment;