import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import AdminService from "../../apis/AdminService";

const UpdateAdminDetails = () => {

    const [allAdmins, setAdminDetails] = useState([]);

    const loadData = async () => {
        try {
            const response = await AdminService.getAdminById(101);
            setAdminDetails(response.data);
        } catch (error) {
            alert("Error Loading Admin Data" + error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

     return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Admin Details</h2>
                <table className="table table-bordered mt-3">

            <thead>
                <tr>
                    <th>Admin ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>License Number</th>
                    <th>Area</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Zip Code</th>
                    <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody>
                {allAdmins.map((c) => (
                    <tr key={c.userDetails.id}>
                        <td>{c.userDetails.id}</td>
                        <td>{c.userDetails.firstName}</td>
                        <td>{c.userDetails.lastName}</td>
                        <td>{c.userDetails.email}</td>
                        <td>{c.userDetails.mobileNumber}</td>
                        <td>{c.userDetails.dateOfBirth}</td>
                        <td>{c.userDetails.gender}</td>
                        <td>{c.userDetails.address?.area ?? "No Data"}</td>
                        <td>{c.userDetails.address?.city ?? "No Data"}</td>
                        <td>{c.userDetails.address?.state ?? "No Data"}</td>
                        <td>{c.userDetails.address?.country ?? "No Data"}</td>
                        <td>{c.userDetails.address?.zipCode ?? "No Data"}</td>
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

export default UpdateAdminDetails;