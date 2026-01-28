import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import AppNavbar from './Navbar';
import Footer from './Footer';

const SignIn = () => {

    const [userDetails, setUserDetails] = useState({ email: '', password: '' });


    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
    }

    return (
        <>
            <div style={{ backgroundColor: "#070c16"}}>
                <AppNavbar />
                <Container className="my-5">
                    <Row className="justify-content-center text-light">
                        <Col md={6}>
                        <h1>Sign In to Your Account</h1>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={userDetails.email}
                                        onChange={handleUserInput}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 mt-4" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={userDetails.password}
                                        onChange={handleUserInput}
                                    />
                                </Form.Group>

                                <Button className='mt-4' variant="success" type="submit">
                                    Sign In
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container >
            </div>

            <Footer />

        </>
    );
}

export default SignIn;