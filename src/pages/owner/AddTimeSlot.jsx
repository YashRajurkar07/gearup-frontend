import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import TimeSlotService from "../../apis/TimeSlotService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TimeSlot = () => {

    const { garageId } = useParams();

    const [timeSlotDetails, setTimeSlotDetails] = useState({
        startTime: "",
        endTime: "",
        isBooked: false,
        garageId: garageId
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTimeSlotDetails({ ...timeSlotDetails, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await TimeSlotService.addTimeSlot(timeSlotDetails);

            alert(res.data.message);
            Navigate('/owner/garagedetails/');
            
        }catch (error){
            alert("Error Adding Time Slot:", error);
        }
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid" style={{ backgroundColor: "#070c16", minHeight: "60vh" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 bg-dark text-light my-5 p-4 pt-3 rounded">

                            <form onSubmit={handleSubmit}>
                                <h2 className="mb-4 text-center">Add New Time Slot To Garage</h2>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Start Time :</label>
                                        <input type="time" className="form-control" name="startTime" value={timeSlotDetails.startTime} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">End Time :</label>
                                        <input type="time" className="form-control" name="endTime" value={timeSlotDetails.endTime} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-success btn-lg mt-3">Submit Data</button>
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