import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Star } from "lucide-react"; 
import RatingService from "../../apis/RatingService";

const RateExperience = ({ show, handleClose, appointmentId, onRatingSuccess }) => {
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if(!appointmentId) return;

        const payload = {
            score: score,     
            comment: comment,  
            appointmentId: appointmentId
        };

        try {
            await RatingService.addRating(payload);
            alert("Thank you for your feedback!");
            onRatingSuccess();
            handleClose();
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("Failed to submit rating: " + (error.response?.data?.message || "Server Error"));
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-dark text-light border-secondary">
                <Modal.Title className="text-warning">Rate Your Service</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
                <div className="d-flex justify-content-center mb-4 gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            size={36} 
                            fill={star <= score ? "#f97316" : "none"} 
                            color="#f97316" 
                            style={{ cursor: "pointer", transition: "transform 0.2s" }}
                            onClick={() => setScore(star)}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                    ))}
                </div>
                <Form.Group>
                    <Form.Label>Write a Review (Optional)</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about your experience..."
                        className="bg-secondary text-light border-0"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="bg-dark border-secondary">
                <Button variant="outline-light" onClick={handleClose}>Cancel</Button>
                <Button variant="warning" onClick={handleSubmit} className="fw-bold">Submit Review</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RateExperience;