import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";
import { getUserId } from "../../store/AuthHandler";

const RegisterGarage = () => {

    const navigate = useNavigate();

    const [garageDetails, setGarageDetails] = useState({
        garageName: "",
        garagePhone: "",
        address: {
            area: "",
            city: "",
            state: "",
            country: "",
            zipCode: ""
        },
        ownerId: "",
        totalMechanics: 0,
        openingTime: "",
        closingTime: ""
    });

    useEffect(() => {

        const id = getUserId();

        if (id) {

            setGarageDetails(g => ({ ...g, ownerId: id }));
        } else {
            alert("Please Login First");
            navigate('/signin');
        }
    }, [navigate]);

    const handleDetailsInput = (e) => {

        const { name, value } = e.target;

        if (name in garageDetails.address) {
            setGarageDetails(g => ({ ...g, address: { ...g.address, [name]: value } }));
        } else {
            setGarageDetails(g => ({ ...g, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await GarageService.registerGarage(garageDetails);
            console.log(response.data.message);
            navigate("/owner/dashboard");

        } catch (error) {
            console.error("Error Registering Garage:", error);
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
                                <h2 className="mb-4 text-center">Add New Garage</h2>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Garage Name :</label>
                                        <input type="text" className="form-control" name="garageName" value={garageDetails.garageName} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Garage Phone :</label>
                                        <input type="text" className="form-control" name="garagePhone" value={garageDetails.garagePhone} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Opening Time :</label>
                                        <input type="time" className="form-control" name="openingTime" value={garageDetails.openingTime} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Closing Time :</label>
                                        <input type="time" className="form-control" name="closingTime" value={garageDetails.closingTime} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Total Mechanics :</label>
                                        <input type="number" className="form-control" name="totalMechanics" value={garageDetails.totalMechanics} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">Area :</label>
                                        <input type="text" className="form-control" name="area" value={garageDetails.address.area} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">City :</label>
                                        <input type="text" className="form-control" name="city" value={garageDetails.address.city} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Zip Code :</label>
                                        <input type="text" className="form-control" name="zipCode" value={garageDetails.address.zipCode} onChange={handleDetailsInput} />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">State :</label>
                                        <input type="text" className="form-control" name="state" value={garageDetails.state} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country :</label>
                                        <input type="text" className="form-control" name="country" value={garageDetails.country} onChange={handleDetailsInput} />
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

export default RegisterGarage;