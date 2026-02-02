import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerService from "../../apis/OwnerService";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RegisterOwner = () => {
  const navigate = useNavigate();

  const [ownerDetails, setOwnerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: 'MALE',

    alternatePhone: '',
    registrationNumber: '',

    city: '',
    state: '',
    country: '',
    area: '',
    zipCode: '',

    role: 'ROLE_OWNER'
  });

  const handleDetailsInput = (e) => {
    const { name, value } = e.target;
    setOwnerDetails({ ...ownerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ownerDetails.password !== ownerDetails.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await OwnerService.registerOwner(ownerDetails);
      alert(res.data.message);
      navigate('/signin');

    } catch (error) {
      console.error("Error Registering Owner:", error);
      alert("Registration failed");
    }
  }

  return (
    <>
      <AppNavbar />
      <div className="container-fluid" style={{ backgroundColor: "#070c16" }}>
        <div className="container">
          {/* ... (Existing HTML layout for form) ... */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 bg-dark text-light my-1 p-4 pt-3 rounded">
              <form onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">Let's Do Business</h2>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name :</label>
                    <input type="text" className="form-control" name="firstName" value={ownerDetails.firstName} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name :</label>
                    <input type="text" className="form-control" name="lastName" value={ownerDetails.lastName} onChange={handleDetailsInput} required />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Email :</label>
                    <input type="email" className="form-control" name="email" value={ownerDetails.email} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Mobile Number :</label>
                    <input type="text" className="form-control" name="mobileNumber" value={ownerDetails.mobileNumber} onChange={handleDetailsInput} required />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Password :</label>
                    <input type="password" className="form-control" name="password" value={ownerDetails.password} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Confirm Password :</label>
                    <input type="password" className="form-control" name="confirmPassword" value={ownerDetails.confirmPassword} onChange={handleDetailsInput} required />
                  </div>
                </div>

                {/* Specific Owner Fields */}
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
                    <label className="form-label">Date of Birth :</label>
                    <input type="date" className="form-control" name="dateOfBirth" value={ownerDetails.dateOfBirth} onChange={handleDetailsInput} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Gender :</label>
                    <select className="form-select" name="gender" value={ownerDetails.gender} onChange={handleDetailsInput}>
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
                    <input type="text" className="form-control" name="city" value={ownerDetails.city} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Zip Code :</label>
                    <input type="number" className="form-control" name="zipCode" value={ownerDetails.zipCode} onChange={handleDetailsInput} required />
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">State :</label>
                    <input type="text" className="form-control" name="state" value={ownerDetails.state} onChange={handleDetailsInput} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country :</label>
                    <input type="text" className="form-control" name="country" value={ownerDetails.country} onChange={handleDetailsInput} required />
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

export default RegisterOwner;