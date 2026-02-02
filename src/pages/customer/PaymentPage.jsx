import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { CreditCard } from "lucide-react";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PaymentService from "../../apis/PaymentService";

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    const { appointmentId, amount, garageName } = location.state || {};

    useEffect(() => {
        if (!appointmentId) {
            alert("Invalid Payment Session");
            navigate("/customer/dashboard");
        }
    }, [appointmentId, navigate]);

    const handlePayment = async () => {
        setProcessing(true);

        setTimeout(async () => {
            try {
                const fakeTransactionId = Math.floor(10000000 + Math.random() * 90000000);

                const payload = {
                    appointmentId: appointmentId,
                    transactionId: fakeTransactionId
                };

                await PaymentService.addNewPayment(payload);
                alert(`Payment Successful! Transaction ID: ${fakeTransactionId}`);
                navigate("/customer/dashboard");
            } catch (error) {
                console.error("Payment failed", error);
                alert("Payment Failed: " + (error.response?.data?.message || "Server Error"));
                setProcessing(false);
            }
        }, 2000);
    };

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "80vh", padding: "80px 0" }}>
                <Container className="d-flex justify-content-center">
                    <Card className="bg-dark text-light border-secondary p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
                        <Card.Body className="text-center">
                            <CreditCard size={64} className="text-warning mb-4" />
                            <h2 className="mb-3">Secure Payment</h2>
                            <p className="text-secondary mb-4">
                                You are paying <strong className="text-light">₹{amount || 500}</strong> to <br />
                                <span className="text-info">{garageName || "Garage Service"}</span>
                            </p>

                            <div className="d-grid gap-3">
                                <Button 
                                    variant="success" 
                                    size="lg" 
                                    onClick={handlePayment} 
                                    disabled={processing}
                                    className="fw-bold"
                                >
                                    {processing ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Processing...
                                        </>
                                    ) : (
                                        "Confirm Payment"
                                    )}
                                </Button>
                                <Button variant="outline-light" onClick={() => navigate("/customer/dashboard")} disabled={processing}>
                                    Cancel
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default PaymentPage;