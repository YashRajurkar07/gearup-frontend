import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import GarageService from "../../apis/GarageService";

const UpdateGarageDetails = () => {

    const { garageId } = useParams();

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
        totalMechanics: 0,
        openingTime: "",
        closingTime: ""
    });

    const loadData = async () => {

        try {
            const response = await GarageService.getGarageByIdOwner(garageId);
            const prevData = response.data;
            setGarageDetails(g => ({ ...g, ...prevData, address: { ...g.address, ...prevData.address } }));
        } catch (error) {
            alert("Error loading garage data" + error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleDetailsInput = (e) => {
        const { name, value } = e.target;
        if (['area', 'city', 'state', 'country', 'zipCode'].includes(name)) {
            setGarageDetails(g => ({ ...g, address: { ...g.address, [name]: value } }));
        } else {
            setGarageDetails(g => ({ ...g, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await GarageService.updateGarage(garageId, garageDetails);
            alert(res.data.message);
            Navigate('/owner/garagedetails');
        } catch (error) {
            console.error("Error updating garage details:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid" style={{ backgroundColor: "#070c16" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 bg-dark text-light my-1 p-4 pt-3 rounded">

                            <form onSubmit={handleSubmit}>
                                <h2 className="mb-4 text-center">Update Garage Details</h2>

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
                                        <input type="text" className="form-control" name="state" value={garageDetails.address.state} onChange={handleDetailsInput} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Country :</label>
                                        <input type="text" className="form-control" name="country" value={garageDetails.address.country} onChange={handleDetailsInput} />
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

export default UpdateGarageDetails;