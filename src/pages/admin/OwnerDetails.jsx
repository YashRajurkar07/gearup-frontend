import { useState, useEffect } from "react";
import OwnerService from "../../apis/OwnerService";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

const OwnerDetails = () => {

    const [owners, setOwners] = useState([]);

    const loadData = async () => {
        try {
            const response = await OwnerService.getAllOwners();
            setOwners(response.data);
        }
        catch (error) {
            alert("Error loading owner data" + error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Owner Details</h2>
                <table className="table table-bordered mt-3">

                    <thead>
                        <tr>
                            <th>Owner ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Alternate Phone</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Registration Number</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Zip Code</th>
                            <th>Verified</th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.map((c) => (
                            <tr key={c.userDetails.id}>
                                <td>{c.userDetails.id}</td>
                                <td>{c.userDetails.firstName}</td>
                                <td>{c.userDetails.lastName}</td>
                                <td>{c.userDetails.email}</td>
                                <td>{c.userDetails.mobileNumber}</td>
                                <td>{c.alternatePhone}</td>
                                <td>{c.userDetails.dateOfBirth}</td>
                                <td>{c.userDetails.gender}</td>
                                <td>{c.registrationNumber}</td>
                                <td>{c.userDetails.address?.area ?? "No Data"}</td>
                                <td>{c.userDetails.address?.city ?? "No Data"}</td>
                                <td>{c.userDetails.address?.state ?? "No Data"}</td>
                                <td>{c.userDetails.address?.country ?? "No Data"}</td>
                                <td>{c.userDetails.address?.zipCode ?? "No Data"}</td>
                                <td>{c.verified ? "Yes" : "No"}</td>
                                <td>Verify</td>
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

export default OwnerDetails;