import { useEffect, useState } from "react";
import { Container, Table, Badge, Button } from "react-bootstrap";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AppointmentService from "../../apis/AppointmentService";
import { getUserId } from "../../store/AuthHandler";

const CustomerDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const userId = getUserId();
            try {
                // You might need to implement this endpoint in backend if missing
                const res = await AppointmentService.getCustomerUpcomingAppointments(userId);
                setAppointments(res.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "80vh", padding: "40px 0" }}>
                <Container>
                    <h2 className="text-light mb-4">My Bookings</h2>

                    <div className="bg-dark p-4 rounded border border-secondary">
                        {appointments.length > 0 ? (
                            <Table variant="dark" hover responsive>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Garage</th>
                                        <th>Service</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(apt => (
                                        <tr key={apt.id}>
                                            <td>{apt.appointmentDate}</td>
                                            <td>{apt.garageName}</td>
                                            <td>General Service</td>
                                            <td>
                                                <Badge bg={apt.status === 'CONFIRMED' ? 'success' : 'warning'}>
                                                    {apt.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Button size="sm" variant="danger">Cancel</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p className="text-secondary text-center">No upcoming appointments.</p>
                        )}

                        <div className="mt-4 text-center">
                            <Button variant="primary" href="/garages">Book New Appointment</Button>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default CustomerDashboard;