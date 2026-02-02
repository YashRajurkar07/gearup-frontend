import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Star } from "lucide-react";
import RatingService from "../../apis/RatingService";

// This is a component you can use inside CustomerDashboard
const RateExperience = ({ show, handleClose, appointmentId, garageId, onRatingSuccess }) => {
    const [ratingValue, setRatingValue] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        const ratingPayload = {
            rating: ratingValue,
            review: comment,
            appointmentId: appointmentId,
            garageId: garageId
        };

        try {
            await RatingService.addRating(ratingPayload);
            alert("Thank you for your feedback!");
            onRatingSuccess(); // Refresh the list in dashboard
            handleClose();
        } catch (error) {
            console.error("Error submitting rating:", error);
            alert("Failed to submit rating.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-dark text-light border-secondary">
                <Modal.Title>Rate Your Service</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-light">
                <div className="d-flex justify-content-center mb-3 gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                            key={star} 
                            size={32} 
                            fill={star <= ratingValue ? "#f97316" : "none"} 
                            color="#f97316"
                            style={{ cursor: "pointer" }}
                            onClick={() => setRatingValue(star)}
                        />
                    ))}
                </div>
                <Form.Group>
                    <Form.Label>Write a Review</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="How was your experience?"
                        className="bg-secondary text-light border-0"
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="bg-dark border-secondary">
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="warning" onClick={handleSubmit}>Submit Review</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RateExperience;