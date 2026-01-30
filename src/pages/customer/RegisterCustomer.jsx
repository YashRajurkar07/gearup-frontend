import { useState } from "react";
import { Navigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CustomerService from "../../apis/CustomerService";

const RegisterCustomer = () => {

  const [customerDetails, setCustomerDetails] = useState({
    userDetails: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobileNumber: '',
      dateOfBirth: '',
      gender: '',
      licenseNumber: '',
      address: {
        city: '',
        state: '',
        country: '',
        area: '',
        zipCode: ''
      }
    }
  });

  const handleDetailsInput = (e) => {

    const { name, value } = e.target;
    // setCustomerDetails(c => ({ ...c, [name]: value }));

    if (['area', 'city', 'state', 'country', 'zipCode'].includes(name)) {
      setCustomerDetails(c => ({ ...c, userDetails: { ...c.userDetails, address: { ...c.userDetails.address, [name]: value } } }));
    }
    else if (name === 'licenseNumber') {
      setCustomerDetails(c => ({ ...c, [name]: value }));
    }
    else {
      setCustomerDetails(c => ({ ...c, userDetails: { ...c.userDetails, [name]: value } }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await CustomerService.registerCustomer(customerDetails);
      alert(res.data.message);
      Navigate('/signin');

    } catch (error) {
      alert("Error Registering Customer" + error);
    }
  }

  return (
    <>
      <AppNavbar />
      <div className="container-fluid" style={{ backgroundColor: "#070c16" }}>
        <div className="container">
          <p className="d-flex align-items-center mt-3 text-light">
            <span>Join With Us as A Business? &nbsp; <a href="/signupowner"><button className="btn btn-outline-success" type="button">Join Here</button></a>
            </span>
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 bg-dark text-light my-1 p-4 pt-3 rounded">
              <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Join Us</h2>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name :</label>
                    <input type="text" className="form-control" name="firstName" value={customerDetails.firstName} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name :</label>
                    <input type="text" className="form-control" name="lastName" value={customerDetails.lastName} onChange={handleDetailsInput} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email :</label>
                    <input type="email" className="form-control" name="email" value={customerDetails.email} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Mobile Number :</label>
                    <input type="text" className="form-control" name="mobileNumber" value={customerDetails.mobileNumber} onChange={handleDetailsInput} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Password :</label>
                    <input type="password" className="form-control" name="password" value={customerDetails.password} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Confirm Password :</label>
                    <input type="password" className="form-control" name="confirmPassword" value={customerDetails.confirmPassword} onChange={handleDetailsInput} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div>
                    <label className="form-label">License Number :</label>
                    <input type="text" className="form-control" name="licenseNumber" value={customerDetails.licenseNumber} onChange={handleDetailsInput} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth :</label>
                    <input type="date" className="form-control" name="dateOfBirth" value={customerDetails.dateOfBirth} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" name="gender">Gender :</label>
                    <select className="form-select" name="gender" value={customerDetails.gender} onChange={handleDetailsInput}>
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
                    <input type="text" className="form-control" name="area" value={customerDetails.area} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">City :</label>
                    <input type="text" className="form-control" name="city" value={customerDetails.city} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Zip Code :</label>
                    <input type="text" className="form-control" name="zipCode" value={customerDetails.zipCode} onChange={handleDetailsInput} />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">State :</label>
                    <input type="text" className="form-control" name="state" value={customerDetails.state} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country :</label>
                    <input type="text" className="form-control" name="country" value={customerDetails.country} onChange={handleDetailsInput} />
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success btn-lg mt-3">Register Now</button>
                </div>
                
              </form>

            </div>
          </div>
        </div >
      </div >
      <Footer />
    </>
  );
}

export default RegisterCustomer;