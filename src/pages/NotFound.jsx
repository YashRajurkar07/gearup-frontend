import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MapPinOff, Home, Wrench } from 'lucide-react';
import AppNavbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
    
    const navigate = useNavigate();

    return (
        <>
            <AppNavbar />
            <div style={{
                backgroundColor: "#0f172a",
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
            }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6}>
                            
                            <div className="mb-4 text-warning">
                                <Wrench size={80} style={{ transform: "rotate(-45deg)" }} />
                                <MapPinOff size={60} className="ms-3 text-secondary" />
                            </div>

                            <h1 style={{
                                fontSize: "8rem",
                                fontWeight: "800",
                                lineHeight: "1",
                                background: "-webkit-linear-gradient(#fff, #94a3b8)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                404
                            </h1>

                            <h2 className="text-light mt-2 mb-3 fw-bold">Wrong Turn?</h2>
                            <p className="text-secondary fs-5 mb-5">
                                Looks Like Your Engine Stalled. The Page You Are Looking For
                                Doesn't Exist or Has Been Moved to Another Garage.
                            </p>

                            <div className="d-flex justify-content-center gap-3">
                                <Button
                                    variant="warning"
                                    size="lg"
                                    className="fw-bold px-4 d-flex align-items-center gap-2"
                                    onClick={() => navigate('/')}
                                >
                                    <Home size={20} />
                                    Go Home
                                </Button>
                                <Button
                                    variant="outline-light"
                                    size="lg"
                                    className="px-4"
                                    onClick={() => navigate(-1)} // Go Back One Page
                                >
                                    Go Back
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;