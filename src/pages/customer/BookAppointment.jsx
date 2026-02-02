import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, Badge } from "react-bootstrap";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";
import TimeSlotService from "../../apis/TimeSlotService";
import AppointmentService from "../../apis/AppointmentService";
import { getUserId } from "../../store/AuthHandler";

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
                // 1. Fetch Garage Details
                const garageRes = await GarageService.getGarageById(garageId);
                setGarage(garageRes.data);

                // 2. Fetch Available Slots
                const slotsRes = await TimeSlotService.getAvailableTimeSlots(garageId);
                setSlots(slotsRes.data);
            } catch (error) {
                console.error("Error loading data:", error);
                alert("Failed to load garage details.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [garageId]);

    const handleBooking = async () => {
        if (!selectedSlot) return;

        const customerId = getUserId();
        if (!customerId) {
            alert("Please login to book an appointment.");
            navigate("/signin");
            return;
        }

        const appointmentPayload = {
            customer: { id: customerId }, // Depending on your Backend DTO structure
            garage: { id: garageId },
            timeslot: { id: selectedSlot.id },
            appointmentDate: new Date().toISOString().split('T')[0], // Today's date for simplicity, or add a DatePicker
            status: "PENDING"
        };

        try {
            await AppointmentService.scheduleAppointment(appointmentPayload);
            alert("Appointment Booked Successfully!");
            navigate("/customer/dashboard");
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking Failed. Please try again.");
        }
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

                            {/* Slot Selection */}
                            <Card className="bg-dark text-light border-secondary">
                                <Card.Header className="border-secondary">Select a Time Slot</Card.Header>
                                <Card.Body>
                                    {slots.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-3">
                                            {slots.map((slot) => (
                                                <Button
                                                    key={slot.id}
                                                    variant={selectedSlot?.id === slot.id ? "warning" : "outline-light"}
                                                    onClick={() => setSelectedSlot(slot)}
                                                >
                                                    {slot.startTime} - {slot.endTime}
                                                </Button>
                                            ))}
                                        </div>
                                    ) : (
                                        <Alert variant="info">No available slots for this garage.</Alert>
                                    )}

                                    <div className="mt-4 border-top border-secondary pt-3">
                                        <Button
                                            variant="success"
                                            size="lg"
                                            className="w-100"
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