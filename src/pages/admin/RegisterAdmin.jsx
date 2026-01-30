import { useState } from "react";
import { Navigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminService from "../../apis/AdminService";

const RegisterAdmin = () => {

    const [adminDetails, setAdminDetails] = useState({
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
            }
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['area', 'city', 'state', 'country', 'zipCode'].includes(name)) {
            setAdminDetails(a => ({ ...a, userDetails: { ...a.userDetails, address: { ...a.userDetails.address, [name]: value } } }));
        } else {
            setAdminDetails(a => ({ ...a, userDetails: { ...a.userDetails, [name]: value } }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await AdminService.registerAdmin(adminDetails);
            alert(res.data.message);
            Navigate('/admindashboard');

        } catch (error) {
            alert("Failed in Registering Admin" + error);
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
                                <h2 className="mb-4 text-center">Add Admin Details</h2>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">First Name :</label>
                                        <input type="text" className="form-control" name="firstName" value={adminDetails.firstName} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Last Name :</label>
                                        <input type="text" className="form-control" name="lastName" value={adminDetails.lastName} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Email :</label>
                                        <input type="email" className="form-control" name="email" value={adminDetails.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Mobile Number :</label>
                                        <input type="text" className="form-control" name="mobileNumber" value={adminDetails.mobileNumber} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Password :</label>
                                        <input type="password" className="form-control" name="password" value={adminDetails.password} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Confirm Password :</label>
                                        <input type="password" className="form-control" name="confirmPassword" value={adminDetails.confirmPassword} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth :</label>
                                        <input type="date" className="form-control" name="dateOfBirth" value={adminDetails.dateOfBirth} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" name="gender">Gender :</label>
                                        <select className="form-select" name="gender" value={adminDetails.gender} onChange={handleInputChange}>
                                            <option value="null">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHERS">Others</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Area :</label>
                                        <input type="text" className="form-control" name="area" value={adminDetails.area} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">City :</label>
                                        <input type="text" className="form-control" name="city" value={adminDetails.city} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Zip Code :</label>
                                        <input type="text" className="form-control" name="zipCode" value={adminDetails.zipCode} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">State :</label>
                                        <input type="text" className="form-control" name="state" value={adminDetails.state} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country :</label>
                                        <input type="text" className="form-control" name="country" value={adminDetails.country} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-success btn-lg mt-3">Register Admin</button>
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

export default RegisterAdmin;