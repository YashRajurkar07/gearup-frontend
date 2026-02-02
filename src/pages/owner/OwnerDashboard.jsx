import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";
import { getUserId } from "../../store/AuthHandler";

const OwnerDashboard = () => {
    const navigate = useNavigate();
    const [garage, setGarage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGarage = async () => {
            const ownerId = getUserId();
            try {
                // Fetch garage specifically for this owner
                const res = await GarageService.getGarageByOwnerId(ownerId);
                // Assuming API returns a list, we take the first one
                if (res.data && res.data.length > 0) {
                    setGarage(res.data[0]);
                }
            } catch (error) {
                console.error("Error fetching garage:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGarage();
    }, []);

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "80vh", padding: "40px 0" }}>
                <Container>
                    <h2 className="text-light mb-4">Owner Dashboard</h2>

                    {loading ? (
                        <div className="text-center text-light"><Spinner animation="border" /></div>
                    ) : garage ? (
                        <Row>
                            {/* Garage Status Card */}
                            <Col md={8}>
                                <Card className="bg-dark text-light border-secondary mb-4">
                                    <Card.Body>
                                        <Card.Title className="display-6 text-warning">{garage.garageName}</Card.Title>
                                        <Card.Text className="text-secondary mb-4">
                                            {garage.address?.city}, {garage.address?.state}
                                        </Card.Text>

                                        <Row className="g-3">
                                            <Col sm={6}>
                                                <div className="p-3 border border-secondary rounded">
                                                    <h5>Mechanics</h5>
                                                    <h3 className="text-info">{garage.totalMechanics}</h3>
                                                </div>
                                            </Col>
                                            <Col sm={6}>
                                                <div className="p-3 border border-secondary rounded">
                                                    <h5>Status</h5>
                                                    <h3 className={garage.active ? "text-success" : "text-danger"}>
                                                        {garage.active ? "Open" : "Closed"}
                                                    </h3>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                                {/* Actions */}
                                <div className="d-flex gap-3">
                                    <Button variant="success" onClick={() => navigate(`/addtimeslot/${garage.id}`)}>
                                        Manage Time Slots
                                    </Button>
                                    <Button variant="outline-light" onClick={() => navigate('/updategarage')}>
                                        Edit Details
                                    </Button>
                                </div>
                            </Col>
                        </Row>
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