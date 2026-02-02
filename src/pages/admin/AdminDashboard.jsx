import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Spinner, Badge } from "react-bootstrap";
import { Users, Briefcase, Wrench, CheckCircle, XCircle, UserPlus } from "lucide-react"; // Added UserPlus icon
import { useNavigate } from "react-router-dom"; // Import hook for navigation
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import OwnerService from "../../apis/OwnerService";
import CustomerService from "../../apis/CustomerService";
import GarageService from "../../apis/GarageService";
import AdminService from "../../apis/AdminService";

const AdminDashboard = () => {
    const navigate = useNavigate(); // Hook to navigate

    const [stats, setStats] = useState({
        customers: 0,
        owners: 0,
        garages: 0,
        pendingApprovals: 0
    });
    const [pendingOwners, setPendingOwners] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            // 1. Fetch all data in parallel
            const [customersRes, ownersRes, garagesRes] = await Promise.all([
                CustomerService.getAllCustomers(),
                OwnerService.getAllOwners(),
                GarageService.getAllGarages()
            ]);

            const owners = ownersRes.data || [];
            
            // 2. Filter Pending Owners (Not Verified)
            const pending = owners.filter(o => !o.isVerified);

            setPendingOwners(pending);
            setStats({
                customers: customersRes.data.length,
                owners: owners.length,
                garages: garagesRes.data.length,
                pendingApprovals: pending.length
            });

        } catch (error) {
            console.error("Error loading dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    const handleVerify = async (ownerId) => {
        if(!window.confirm("Are you sure you want to verify this owner?")) return;

        try {
            await AdminService.verifyOwner(ownerId, "true"); 
            alert("Owner Verified Successfully");
            loadDashboardData(); 
        } catch (error) {
            console.error("Verification failed", error);
            alert("Failed to verify owner.");
        }
    };

    return (
        <>
            <AppNavbar />
            <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", padding: "40px 0" }}>
                <Container>
                    {/* --- HEADER WITH BUTTON --- */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-light mb-0">Admin Dashboard</h2>
                        <Button 
                            variant="warning" 
                            onClick={() => navigate('/registeradmin')}
                            className="fw-bold d-flex align-items-center gap-2"
                        >
                            <UserPlus size={18} /> Register New Admin
                        </Button>
                    </div>

                    {/* --- STATS CARDS --- */}
                    <Row className="g-4 mb-5">
                        <Col md={3}>
                            <Card className="bg-dark text-light border-primary h-100">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 className="text-secondary">Total Customers</h6>
                                        <h3>{stats.customers}</h3>
                                    </div>
                                    <Users size={40} className="text-primary" />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="bg-dark text-light border-success h-100">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 className="text-secondary">Total Owners</h6>
                                        <h3>{stats.owners}</h3>
                                    </div>
                                    <Briefcase size={40} className="text-success" />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="bg-dark text-light border-warning h-100">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 className="text-secondary">Active Garages</h6>
                                        <h3>{stats.garages}</h3>
                                    </div>
                                    <Wrench size={40} className="text-warning" />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="bg-dark text-light border-danger h-100">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h6 className="text-secondary">Pending Approvals</h6>
                                        <h3>{stats.pendingApprovals}</h3>
                                    </div>
                                    <XCircle size={40} className="text-danger" />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* --- PENDING APPROVALS TABLE --- */}
                    <Card className="bg-dark text-light border-secondary">
                        <Card.Header className="border-secondary d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Pending Owner Verifications</h5>
                            <Badge bg="danger">{stats.pendingApprovals} New</Badge>
                        </Card.Header>
                        <Card.Body>
                            {loading ? (
                                <div className="text-center"><Spinner animation="border" variant="light" /></div>
                            ) : pendingOwners.length > 0 ? (
                                <div className="table-responsive">
                                    <Table hover variant="dark" className="mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Reg. Number</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingOwners.map((owner) => (
                                                <tr key={owner.id}>
                                                    <td>{owner.userDetails?.firstName} {owner.userDetails?.lastName}</td>
                                                    <td>{owner.userDetails?.email}</td>
                                                    <td>{owner.userDetails?.mobileNumber}</td>
                                                    <td>{owner.registrationNumber}</td>
                                                    <td>
                                                        <Button 
                                                            size="sm" 
                                                            variant="success" 
                                                            onClick={() => handleVerify(owner.id)}
                                                            className="d-flex align-items-center gap-1"
                                                        >
                                                            <CheckCircle size={16} /> Approve
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-center text-secondary my-3">No pending approvals.</p>
                            )}
                        </Card.Body>
                    </Card>

                </Container>
            </div>
            <Footer />
        </>
    );
};

export default AdminDashboard;