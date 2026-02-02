import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { doLogin } from '../store/AuthHandler';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Call Backend
            const response = await axios.post("http://localhost:8080/auth/signin", credentials);

            console.log("Backend Response:", response.data);

            const { token, role } = response.data;

            // 3. Force Save to LocalStorage (Bypassing potential bugs in doLogin)
            if (token) {
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("userRole", role);
                localStorage.setItem("userDetails", JSON.stringify(response.data));

            } else {
                alert("Login successful but no token received!");
                return;
            }

            if (role === 'ROLE_ADMIN') {
                navigate('/admin/dashboard');
            } else if (role === 'ROLE_OWNER') {
                navigate('/owner/dashboard');
            } else {
                navigate('/customer/dashboard');
            }

        } catch (error) {
            console.error(error);
            alert("Invalid Credentials or Server Error");
        }
    }

    return (
        <>
            <div style={{ backgroundColor: "#070c16", minHeight: "50vh" }}>
                <AppNavbar />
                <Container className="my-4">
                    <Row className="justify-content-center text-light">
                        <Col md={6}>
                            <h1>Sign In to Your <span style={{ color: '#f97316' }}>Account</span></h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleUserInput}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 mt-4" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleUserInput}
                                    />
                                </Form.Group>

                                <Button className='mt-4' variant="success" type="submit">
                                    Sign In
                                </Button>
                            </Form>
                            <p className="d-flex align-items-center mt-3">
                                <span>Do Not Have an Account? <a href="/signup"><Button variant="outline-success" type="button">Register</Button></a>
                                </span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default SignIn;