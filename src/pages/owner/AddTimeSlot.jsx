import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TimeSlotService from "../../apis/TimeSlotService";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TimeSlot = () => {
    const { garageId } = useParams();
    const navigate = useNavigate();

    const [slotData, setSlotData] = useState({
        date: "",
        startTime: "",
        endTime: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSlotData({ ...slotData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!slotData.date || !slotData.startTime || !slotData.endTime) {
            alert("Please select Date, Start Time, and End Time.");
            return;
        }

        const formattedPayload = {
            garageId: garageId,
            startTime: `${slotData.date}T${slotData.startTime}:00`,
            endTime: `${slotData.date}T${slotData.endTime}:00`,
            isBooked: false
        };

        try {

            const res = await TimeSlotService.addTimeSlot(formattedPayload);
            alert(res.data.message || "Time Slot Added Successfully!");
            
            navigate('/owner/dashboard');
            
        } catch (error) {
            console.error("Error Adding Time Slot:", error);
            alert("Failed to add slot. Check console for details.");
        }
    };

    return (
        <>
            <AppNavbar />

            <div className="container-fluid" style={{ backgroundColor: "#070c16", minHeight: "80vh", padding: "40px 0" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 bg-dark text-light p-5 rounded border border-secondary shadow">

                            <form onSubmit={handleSubmit}>
                                <h2 className="mb-4 text-center text-warning">Add New Time Slot</h2>

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Select Date :</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        name="date" 
                                        value={slotData.date} 
                                        onChange={handleInputChange} 
                                        required
                                    />
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Start Time :</label>
                                        <input 
                                            type="time" 
                                            className="form-control" 
                                            name="startTime" 
                                            value={slotData.startTime} 
                                            onChange={handleInputChange} 
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">End Time :</label>
                                        <input 
                                            type="time" 
                                            className="form-control" 
                                            name="endTime" 
                                            value={slotData.endTime} 
                                            onChange={handleInputChange} 
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="text-center d-grid gap-2">
                                    <button type="submit" className="btn btn-warning btn-lg fw-bold text-dark">
                                        Confirm & Add Slot
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-light mt-2"
                                        onClick={() => navigate('/owner/dashboard')}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div >
            </div >

            <Footer />
        </>
    );
};

export default TimeSlot;