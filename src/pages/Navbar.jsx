import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#070c16', paddingTop: '20px', paddingBottom: '20px' }} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="fw-bold d-flex align-items-center gap-2">
         <div style={{
            border: '3px solid #f97316',
              borderColor: '#f97316',
              width: 36,
              height: 36,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} >
          <Wrench className="border-warning border-3 rounded-2" color="#f97316"/>
          </div>
          GearUp
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-lg-center gap-3">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About</Nav.Link>
            <Nav.Link as={Link} to="/contactus">Contact</Nav.Link>
            <Button as={Link} to="/signin" variant="outline-warning">
              Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;