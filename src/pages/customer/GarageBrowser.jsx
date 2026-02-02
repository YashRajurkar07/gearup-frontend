import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { Search, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";

const GarageBrowser = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [garages, setGarages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load all garages initially
    useEffect(() => {
        loadGarages();
    }, []);

    const loadGarages = async () => {
        setLoading(true);
        try {
            const res = await GarageService.getAllGarages();
            setGarages(res.data);
        } catch (error) {
            console.error("Error loading garages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // If search is empty, reload all. Otherwise search by city/area
            if (!searchTerm.trim()) {
                loadGarages();
            } else {
                // Assuming you have a search method or filter locally
                // Ideally: GarageService.getGarageByArea(searchTerm)
                const res = await GarageService.getGarageByArea(searchTerm); 
                setGarages(res.data);
            }
        } catch (error) {
            console.error("Search failed:", error);
            // Fallback: Filter locally if API fails
            // setGarages(prev => prev.filter(g => g.city.includes(searchTerm))); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", padding: "40px 0" }}>
                <Container>
                    <div className="text-center text-light mb-5">
                        <h1 className="fw-bold">Find a <span className="text-warning">Garage</span> Near You</h1>
                        <p className="text-secondary">Search by City, Area, or Zip Code</p>
                        
                        <Row className="justify-content-center mt-4">
                            <Col md={6}>
                                <Form onSubmit={handleSearch}>
                                    <InputGroup size="lg">
                                        <Form.Control
                                            placeholder="Enter City or Area..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            style={{ backgroundColor: "#1e293b", border: "none", color: "white" }}
                                        />
                                        <Button variant="warning" type="submit">
                                            <Search size={20} /> Search
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </div>

                    {/* Results Grid */}
                    {loading ? (
                        <div className="text-center text-light"><Spinner animation="border" /></div>
                    ) : (
                        <Row className="g-4">
                            {garages.length > 0 ? (
                                garages.map((garage) => (
                                    <Col key={garage.id} md={6} lg={4}>
                                        <Card className="h-100 bg-dark text-light border-secondary hover-shadow">
                                            {/* Placeholder Image */}
                                            <div style={{ height: "150px", backgroundColor: "#334155", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <span className="text-secondary">Garage Image</span>
                                            </div>
                                            
                                            <Card.Body>
                                                <Card.Title className="fw-bold text-warning">{garage.garageName}</Card.Title>
                                                <div className="d-flex align-items-center gap-2 text-secondary mb-2">
                                                    <MapPin size={16} />
                                                    <small>{garage.address?.area}, {garage.address?.city}</small>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 text-secondary mb-3">
                                                    <Clock size={16} />
                                                    <small>{garage.openingTime} - {garage.closingTime}</small>
                                                </div>
                                                <div className="d-grid">
                                                    <Button 
                                                        variant="outline-light" 
                                                        onClick={() => navigate(`/book-appointment/${garage.id}`)}
                                                    >
                                                        Book Appointment
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <div className="text-center text-secondary">
                                    <h4>No Garages Found</h4>
                                    <p>Try searching for a different area.</p>
                                </div>
                            )}
                        </Row>
                    )}
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default GarageBrowser;