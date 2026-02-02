import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminService from "../../apis/AdminService";

const RegisterAdmin = () => {
    const navigate = useNavigate();

    // 1. FLATTENED STATE (Matches SignupRequest.java)
    const [adminDetails, setAdminDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        dateOfBirth: '',
        gender: 'MALE', // Default

        // Address fields directly at root
        city: '',
        state: '',
        country: '',
        area: '',
        zipCode: '',

        role: 'ROLE_ADMIN' // <--- CRITICAL: Defines the user type
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminDetails({ ...adminDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (adminDetails.password !== adminDetails.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Sends the flat object directly
            const res = await AdminService.registerAdmin(adminDetails);
            alert(res.data.message || "Admin Registered Successfully!");
            navigate('/signin');
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Registration Failed: " + (error.response?.data?.message || "Server Error"));
        }
    }

    return (
        <>
            <AppNavbar />
            <div className="container-fluid" style={{ backgroundColor: "#070c16", minHeight: "100vh" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 bg-dark text-light my-5 p-4 pt-3 rounded border border-secondary">
                            
                            <form onSubmit={handleSubmit}>
                                <h2 className="mb-4 text-center text-warning">Register New Admin</h2>

                                {/* --- PERSONAL DETAILS --- */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">First Name :</label>
                                        <input type="text" className="form-control" name="firstName" value={adminDetails.firstName} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Last Name :</label>
                                        <input type="text" className="form-control" name="lastName" value={adminDetails.lastName} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Email :</label>
                                        <input type="email" className="form-control" name="email" value={adminDetails.email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Mobile Number :</label>
                                        <input type="text" className="form-control" name="mobileNumber" value={adminDetails.mobileNumber} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Password :</label>
                                        <input type="password" className="form-control" name="password" value={adminDetails.password} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Confirm Password :</label>
                                        <input type="password" className="form-control" name="confirmPassword" value={adminDetails.confirmPassword} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Date of Birth :</label>
                                        <input type="date" className="form-control" name="dateOfBirth" value={adminDetails.dateOfBirth} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Gender :</label>
                                        <select className="form-select" name="gender" value={adminDetails.gender} onChange={handleInputChange}>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHERS">Others</option>
                                        </select>
                                    </div>
                                </div>

                                {/* --- ADDRESS DETAILS (FLAT) --- */}
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Area :</label>
                                        <input type="text" className="form-control" name="area" value={adminDetails.area} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">City :</label>
                                        <input type="text" className="form-control" name="city" value={adminDetails.city} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Zip Code :</label>
                                        <input type="number" className="form-control" name="zipCode" value={adminDetails.zipCode} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">State :</label>
                                        <input type="text" className="form-control" name="state" value={adminDetails.state} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country :</label>
                                        <input type="text" className="form-control" name="country" value={adminDetails.country} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning btn-lg mt-3 fw-bold">Register Admin</button>
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

export default RegisterAdmin;