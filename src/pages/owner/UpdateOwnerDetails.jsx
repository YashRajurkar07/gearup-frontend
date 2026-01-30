import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import OwnerService from "../../apis/OwnerService";

const UpdateOwnerDetails = () => {

    const { ownerId } = useParams();

    const [ownerDetails, setOwnerDetails] = useState({
        userDetails: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobileNumber: '',
            dateOfBirth: '',
            gender: '',
            address: {
                city: '',
                state: '',
                country: '',
                area: '',
                zipCode: ''
            },
        },

        alternatePhone: '',
        registrationNumber: ''
    });

    const loadData = async () => {

        try {
            const response = await OwnerService.getOwnerById(ownerId);
            const prevData = response.data;
            setOwnerDetails(o => ({ ...o, ...prevData, userDetails: { ...o.userDetails, ...prevData.userDetails, address: { ...o.userDetails.address, ...prevData.userDetails.address } } }));
        } catch (error) {
            alert("Error loading owner data" + error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDetailsInput = (e) => {
        const { name, value } = e.target;
        if (['area', 'city', 'state', 'country', 'zipCode'].includes(name)) {
            setOwnerDetails(o => ({ ...o, userDetails: { ...o.userDetails, address: { ...o.userDetails.address, [name]: value } } }));
        } else if (name === 'alternatePhone' || name === 'registrationNumber') {
            setOwnerDetails(o => ({ ...o, [name]: value }));
        } else {
            setOwnerDetails(o => ({ ...o, userDetails: { ...o.userDetails, [name]: value } }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await OwnerService.updateOwner(ownerId, ownerDetails);
            alert(res.data.message);
            Navigate('/owner/ownerdetails');
        } catch (error) {
            console.error("Error updating owner details:", error);
        }
    };

    return (
        <>
            <AppNavbar />
            <div className="container-fluid" style={{ backgroundColor: "#070c16" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 bg-dark text-light my-1 p-4 pt-3 rounded">
                            <form onSubmit={handleSubmit}>
                                <h2 className="mb-4 text-center">Update Your Details</h2>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">First Name :</label>
                                        <input type="text" className="form-control" name="firstName" value={ownerDetails.firstName} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Last Name :</label>
                                        <input type="text" className="form-control" name="lastName" value={ownerDetails.lastName} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Email :</label>
                                        <input type="email" className="form-control" name="email" value={ownerDetails.email} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Mobile Number :</label>
                                        <input type="text" className="form-control" name="mobileNumber" value={ownerDetails.mobileNumber} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Alternate Phone :</label>
                                        <input type="text" className="form-control" name="alternatePhone" value={ownerDetails.alternatePhone} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Registration Number :</label>
                                        <input type="text" className="form-control" name="registrationNumber" value={ownerDetails.registrationNumber} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Password :</label>
                                        <input type="password" className="form-control" name="password" value={ownerDetails.password} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Confirm Password :</label>
                                        <input type="password" className="form-control" name="confirmPassword" value={ownerDetails.confirmPassword} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth :</label>
                                        <input type="date" className="form-control" name="dateOfBirth" value={ownerDetails.dateOfBirth} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Gender :</label>
                                        <select className="form-select" name="gender" value={ownerDetails.gender} onChange={handleDetailsInput}>
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHERS">Others</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Area :</label>
                                        <input type="text" className="form-control" name="area" value={ownerDetails.area} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">City :</label>
                                        <input type="text" className="form-control" name="city" value={ownerDetails.city} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Zip Code :</label>
                                        <input type="text" className="form-control" name="zipCode" value={ownerDetails.zipCode} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">State :</label>
                                        <input type="text" className="form-control" name="state" value={ownerDetails.state} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country :</label>
                                        <input type="text" className="form-control" name="country" value={ownerDetails.country} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-success btn-lg mt-3">Register Now</button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default UpdateOwnerDetails;