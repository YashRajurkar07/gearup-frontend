import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomerService from "../../apis/CustomerService";

const RegisterCustomer = () => {
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: 'MALE',
    licenseNumber: '',

    city: '',
    state: '',
    country: '',
    area: '',
    zipCode: '',

    role: 'ROLE_CUSTOMER' 
  });

  const handleDetailsInput = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (customerDetails.password !== customerDetails.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      
      const res = await CustomerService.registerCustomer(customerDetails);
      alert(res.data.message); 
      navigate('/signin');

    } catch (error) {
      console.error(error);
      alert("Registration Failed: " + (error.response?.data?.message || "Server Error"));
    }
  }

  return (
    <>
      <AppNavbar />
      <div className="container-fluid" style={{ backgroundColor: "#070c16" }}>
        <div className="container">
          <p className="d-flex align-items-center mt-3 text-light">
            <span>Join With Us as A Business? &nbsp; <a href="/signupowner"><button className="btn btn-outline-success" type="button">Join Here</button></a></span>
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 bg-dark text-light my-1 p-4 pt-3 rounded">
              <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Join Us</h2>

                {/* --- PERSONAL DETAILS --- */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name :</label>
                    <input type="text" className="form-control" name="firstName" value={customerDetails.firstName} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name :</label>
                    <input type="text" className="form-control" name="lastName" value={customerDetails.lastName} onChange={handleDetailsInput} required />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email :</label>
                    <input type="email" className="form-control" name="email" value={customerDetails.email} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Mobile Number :</label>
                    <input type="text" className="form-control" name="mobileNumber" value={customerDetails.mobileNumber} onChange={handleDetailsInput} required />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Password :</label>
                    <input type="password" className="form-control" name="password" value={customerDetails.password} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Confirm Password :</label>
                    <input type="password" className="form-control" name="confirmPassword" value={customerDetails.confirmPassword} onChange={handleDetailsInput} required />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">License Number :</label>
                    <input type="text" className="form-control" name="licenseNumber" value={customerDetails.licenseNumber} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth :</label>
                    <input type="date" className="form-control" name="dateOfBirth" value={customerDetails.dateOfBirth} onChange={handleDetailsInput} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Gender :</label>
                    <select className="form-select" name="gender" value={customerDetails.gender} onChange={handleDetailsInput}>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHERS">Others</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Area :</label>
                    <input type="text" className="form-control" name="area" value={customerDetails.area} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">City :</label>
                    <input type="text" className="form-control" name="city" value={customerDetails.city} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Zip Code :</label>
                    <input type="number" className="form-control" name="zipCode" value={customerDetails.zipCode} onChange={handleDetailsInput} required />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">State :</label>
                    <input type="text" className="form-control" name="state" value={customerDetails.state} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country :</label>
                    <input type="text" className="form-control" name="country" value={customerDetails.country} onChange={handleDetailsInput} required />
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
}

export default RegisterCustomer;