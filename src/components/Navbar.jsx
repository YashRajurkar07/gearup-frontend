import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Wrench, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole, doLogout, isLoggedIn } from '../store/AuthHandler';

const AppNavbar = () => {
    const navigate = useNavigate();
    const role = getUserRole();
    const loggedIn = isLoggedIn();

    const handleLogout = () => {
        doLogout(() => {
            navigate('/signin');
        });
    };

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#070c16', paddingTop: '15px', paddingBottom: '15px' }} variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/home" className="fw-bold d-flex align-items-center gap-2 text-light">
                    <div style={{
                        border: '2px solid #f97316',
                        padding: '4px',
                        borderRadius: '6px',
                        display: 'flex'
                    }}>
                        <Wrench size={20} color="#f97316" />
                    </div>
                    GearUp
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-3">
                        
                        {role === 'ROLE_ADMIN' && (
                            <>
                                <Nav.Link as={Link} to="/admin/dashboard" className="text-warning fw-bold">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/allowners" className="text-light">Manage Owners</Nav.Link>
                                <Nav.Link as={Link} to="/allcustomers" className="text-light">Manage Customers</Nav.Link>
                            </>
                        )}

                        {role === 'ROLE_OWNER' && (
                            <>
                                <Nav.Link as={Link} to="/owner/dashboard" className="text-warning fw-bold">My Garages</Nav.Link>
                                <Nav.Link as={Link} to="/registergarage" className="text-light">Add Garage</Nav.Link>
                            </>
                        )}

                        {role === 'ROLE_CUSTOMER' && (
                            <>
                                <Nav.Link as={Link} to="/customer/dashboard" className="text-warning fw-bold">My Bookings</Nav.Link>
                                <Nav.Link as={Link} to="/garages" className="text-light">Find Garage</Nav.Link>
                            </>
                        )}

                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/aboutus">About</Nav.Link>
                        <Nav.Link as={Link} to="/contactus">Contact</Nav.Link>

                        {!loggedIn && (
                            <Nav.Link as={Link} to="/signin">
                                <Button variant="outline-warning" size="sm">Sign In</Button>
                            </Nav.Link>
                        )}

                        {loggedIn && (
                            <Button
                                variant="link"
                                className="text-danger text-decoration-none d-flex align-items-center gap-1"
                                onClick={handleLogout}
                            >
                                <LogOut size={18} /> Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;