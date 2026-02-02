import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerService from "../../apis/OwnerService";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

const OwnerDetails = () => {

    const navigate = useNavigate();

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

    const handleDelete = async (ownerId) => {

        try{

            const res = await OwnerService.deleteOwner(ownerId);
            alert(res.data.message);
            loadData();

        }catch(error){
            alert("Error Deleting Owner Record "+error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
    <div className="card shadow-sm border-0 rounded-4">
        <div className="card-header bg-white py-4 ps-4 border-0">
            <h3 className="mb-0 text-primary fw-bold">Garage Owners Directory</h3>
        </div>

        <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="ps-4 py-3 text-uppercase small text-dark">ID</th>
                            <th className="text-uppercase small text-dark">Owner Profile</th>
                            <th className="text-uppercase small text-dark">Contact Details</th>
                            <th className="text-uppercase small text-dark">Registration Info</th>
                            <th className="text-uppercase small text-dark">Location</th>
                            <th className="text-center text-uppercase small text-dark">Status</th>
                            <th className="text-center text-uppercase small text-dark">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="border-top-0">
                        {owners.map((c) => (
                            <tr key={c.userDetails.id}>

                                <td className="ps-4 fw-bold text-secondary">#{c.userDetails.id}</td>

                                <td>
                                    <div className="fw-bold text-dark fs-6">
                                        {c.userDetails.firstName} {c.userDetails.lastName}
                                    </div>
                                    <div className="d-flex align-items-center gap-2 mt-1">
                                        <span className="badge bg-light text-dark border">
                                            {c.userDetails.gender}
                                        </span>
                                        <small className="text-muted">{c.userDetails.dateOfBirth}</small>
                                    </div>
                                </td>

                                <td>
                                    <div className="d-flex flex-column">
                                        <span className="fw-semibold text-dark">{c.userDetails.email}</span>
                                        <small className="text-muted">
                                            <i className="bi bi-phone me-1"></i>{c.userDetails.mobileNumber}
                                        </small>
                                        {c.alternatePhone && (
                                            <small className="text-muted">
                                                <i className="bi bi-telephone me-1"></i>Alt: {c.alternatePhone}
                                            </small>
                                        )}
                                    </div>
                                </td>

                                <td>
                                    <span className="font-monospace bg-light px-2 py-1 rounded border text-dark">
                                        {c.registrationNumber}
                                    </span>
                                </td>

                                <td>
                                    <div className="text-muted small">
                                        {c.userDetails.address?.area ?? ""}, { }
                                        <span className="text-dark fw-semibold">
                                            {c.userDetails.address?.city ?? "N/A"}, {c.userDetails.address?.state ?? ""}
                                        </span>
                                        <br />
                                        {c.userDetails.address?.zipCode ?? ""}
                                    </div>
                                </td>

                                <td className="text-center">
                                    {c.verified ? (
                                        <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2 rounded-pill">
                                            Pending
                                        </span>
                                    )}
                                </td>

                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-outline-primary px-3 rounded-pill"
                                            onClick={() => navigate(`/updateownerdetails/${c.userDetails.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-outline-danger px-3 rounded-pill"
                                            onClick={() => handleDelete(c.userDetails.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {owners.length === 0 && (
                <div className="text-center py-5 text-muted">
                    <h5>No owners found</h5>
                </div>
            )}
        </div>
    </div>
</div>
            <Footer />
        </>
    );
};

export default OwnerDetails;