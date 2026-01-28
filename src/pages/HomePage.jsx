import AppNavbar from './Navbar';
import Footer from './Footer';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { CalendarCheck, ShieldCheck, Star } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />

      <main className="flex-fill" style={{ backgroundColor: '#01030c', color: '#e5e7eb' }}>
        <Container className="py-5 text-center">
          <h1 className="fw-bold display-5">
            Book Garage Appointments <span style={{ color: '#f97316' }}>Smarter</span>
          </h1>
          <p className="lead text-secondary mt-3">
            Real-Time Slots · Verified Garages · Secure Payments
          </p>
          <Button href="/signup" size="lg" variant="warning" className="mt-4">
            Get Started
          </Button>
        </Container>

        <Container className="pb-5">
          <Row className="g-4">
            {[
              { icon: CalendarCheck, title: 'Live Slot Booking', text: 'No overbooking, fully transactional.' },
              { icon: ShieldCheck, title: 'Secure Payments', text: 'Payment-confirmed appointments only.' },
              { icon: Star, title: 'Verified Reviews', text: 'Only completed jobs can be rated.' }
            ].map((f, i) => (
              <Col md={4} key={i}>
                <Card bg="dark" text="light" className="h-100 border-secondary">
                  <Card.Body>
                    <f.icon size={32} color="#38bdf8" />
                    <Card.Title className="mt-3">{f.title}</Card.Title>
                    <Card.Text className="text-secondary">
                      {f.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;