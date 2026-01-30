import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";

const GarageDetails = () => {

    const [garageDetails, setGarageDetails] = useState([]);

    const loadData = async () => {

        try {
            const response = await GarageService.getGarageByOwnerId();
            setGarageDetails(response.data);
        } catch (error) {
            alert("Error loading garage data" + error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Your Garage Details</h2>
                <table className="table table-bordered mt-3">

                    <thead>
                        <tr>
                            <th>Garage ID</th>
                            <th>Garage Name</th>
                            <th>Garage Phone</th>
                            <th>Opening Time</th>
                            <th>Closing Time</th>
                            <th>Total Mechanics</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Zip Code</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garageDetails.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.garageName}</td>
                                <td>{c.garagePhone}</td>
                                <td>{c.openingTime}</td>
                                <td>{c.closingTime}</td>
                                <td>{c.totalMechanics}</td>
                                <td>{c.address?.area ?? "No Data"}</td>
                                <td>{c.address?.city ?? "No Data"}</td>
                                <td>{c.address?.state ?? "No Data"}</td>
                                <td>{c.address?.country ?? "No Data"}</td>
                                <td>{c.address?.zipCode ?? "No Data"}</td>
                                <td>Delete</td>
                                <td>Update</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default GarageDetails;