import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import TimeSlotService from "../../apis/TimeSlotService";

const UpdateTimeSlotDetails = () => {

    const { timeSlotId } = useParams();

    const [timeSlotDetails, setTimeSlotDetails] = useState({
        startTime: "",
        endTime: "",
        isBooked: false
    });

    const loadData = async () => {

        try {
            const response = await TimeSlotService.getTimeSlotById(timeSlotId);
            setTimeSlotDetails(ts => ({ ...ts, ...response.data }));

        } catch (error) {
            alert("Error loading time slot data" + error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTimeSlotDetails({ ...timeSlotDetails, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await TimeSlotService.updateTimeSlot(timeSlotId, timeSlotDetails);
            alert(res.data.message);
            Navigate('/owner/timeslotdetails/');
        } catch (error) {
            alert("Error Updating Time Slot:", error);
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
                                <h2 className="mb-4 text-center">Update Time Slot Details</h2>

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

export default UpdateTimeSlotDetails;