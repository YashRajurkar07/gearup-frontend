import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { Search, MapPin, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";
import RatingService from "../../apis/RatingService";

const GarageBrowser = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [garages, setGarages] = useState([]);
    const [ratings, setRatings] = useState({}); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadGarages();
    }, []);

    const loadGarages = async () => {
        setLoading(true);
        try {
            const res = await GarageService.getAllGarages();
            setGarages(res.data);
            fetchRatings(res.data); 
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
            let data = [];
            if (!searchTerm.trim()) {
                const res = await GarageService.getAllGarages();
                data = res.data;
            } else {
                const res = await GarageService.getGarageByArea(searchTerm);
                data = res.data;
            }
            setGarages(data);
            fetchRatings(data); 
        } catch (error) {
            console.error("Search failed:", error);
            setGarages([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchRatings = async (garageList) => {
        const ratingMap = {};
        
        await Promise.all(garageList.map(async (garage) => {
            try {
                
                const avgRes = await RatingService.getAverageRating(garage.id);
                
                const listRes = await RatingService.getRatingsByGarageId(garage.id);

                ratingMap[garage.id] = {
                    avg: avgRes.data || 0,
                    count: listRes.data ? listRes.data.length : 0
                };
            } catch (error) {
                
                ratingMap[garage.id] = { avg: 0, count: 0 };
                console.log(error);
            }
        }));

        setRatings(ratingMap);
    };

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", padding: "40px 0" }}>
                <Container>
                    <div className="text-center text-light mb-5">
                        <h1 className="fw-bold">Find a <span className="text-warning">Garage</span> Near You</h1>
                        <p className="text-secondary">Search by City or Area</p>

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

                    {loading ? (
                        <div className="text-center text-light"><Spinner animation="border" /></div>
                    ) : (
                        <Row className="g-4">
                            {garages.length > 0 ? (
                                garages.map((garage) => {
                                    
                                    const ratingInfo = ratings[garage.id] || { avg: 0, count: 0 };
                                    
                                    return (
                                        <Col key={garage.id} md={6} lg={4}>
                                            <Card className="h-100 bg-dark text-light border-secondary hover-shadow">
                                                {/* Placeholder Image */}
                                                <div style={{ height: "150px", backgroundColor: "#334155", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <span className="text-secondary fw-bold fs-5">{garage.garageName.charAt(0)}</span>
                                                </div>

                                                <Card.Body>
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <Card.Title className="fw-bold text-warning mb-0">{garage.garageName}</Card.Title>
                                                        
                                                        {/* --- RATING BADGE --- */}
                                                        <div className="d-flex align-items-center bg-secondary bg-opacity-25 px-2 py-1 rounded">
                                                            <Star size={16} className="text-warning me-1" fill={ratingInfo.avg > 0 ? "#f59e0b" : "none"} />
                                                            <span className="fw-bold me-1">
                                                                {ratingInfo.avg > 0 ? ratingInfo.avg.toFixed(1) : "0"}
                                                            </span>
                                                            <span className="text-secondary small" style={{ fontSize: "0.75rem" }}>
                                                                ({ratingInfo.count})
                                                            </span>
                                                        </div>
                                                    </div>

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
                                                            onClick={() => navigate(`/bookappointment/${garage.id}`)}
                                                        >
                                                            Book Appointment
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })
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