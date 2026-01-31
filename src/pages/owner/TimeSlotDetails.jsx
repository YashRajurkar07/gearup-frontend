import { useState, useEffect } from "react";
import TimeSlotService from "../../apis/TimeSlotService";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

const TimeSlotDetails = () => {

    const [timeSlots, setTimeSlots] = useState([]);

    const loadData = async () => {

        try {
            const response = await TimeSlotService.getAllTimeSlots();
            setTimeSlots(response.data);
        } catch (error) {
            console.error("Error loading time slots:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-fluid" style={{ backgroundColor: "#070c16", minHeight: "60vh" }}>
                <div className="container">
                    <h2 className="text-center text-light my-4">Time Slot Details</h2>
                    <div className="row">
                        {timeSlots.map((slot) => (
                            <div key={slot.id} className="col-md-4 mb-3">
                                <div className="card bg-dark text-light">
                                    <div className="card-body">
                                        <h5 className="card-title">{slot.startTime} - {slot.endTime}</h5>
                                        <p className="card-text">Booked: {slot.isBooked ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TimeSlotDetails;