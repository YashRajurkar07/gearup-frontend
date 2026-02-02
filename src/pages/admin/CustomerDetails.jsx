import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerService from "../../apis/CustomerService";
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";

const CustomerDetails = () => {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    const loadData = async () => {

        try {
            const response = await CustomerService.getAllCustomers();
            setCustomers(response.data);

        } catch (error) {
            alert("Error loading customer data" + error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (custId) => {

        try {

            const res = await CustomerService.deleteCustomer(custId);
            alert(res.data.message);
            loadData();

        } catch (error) {
            alert("Error Deleting Owner Record " + error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-header bg-white py-4 ps-4 border-0">
                        <h3 className="mb-0 text-primary fw-bold">Customer Directory</h3>
                    </div>

                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4 py-3 text-uppercase small text-dark">ID</th>
                                        <th className="text-uppercase small text-dark">Full Name</th>
                                        <th className="text-uppercase small text-dark">Contact Info</th>
                                        <th className="text-uppercase small text-dark">Personal Details</th>
                                        <th className="text-uppercase small text-dark">License</th>
                                        <th className="text-uppercase small text-dark">Location</th>
                                        <th className="text-uppercase small text-dark">Zip</th>
                                        <th className="text-center text-uppercase small text-dark">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="border-top-0">
                                    {customers.map((c) => (
                                        <tr key={c.userDetails.id}>
                                            <td className="ps-4 fw-bold text-secondary">#{c.userDetails.id}</td>
                                            <td>
                                                <div className="fw-bold text-dark">{c.userDetails.firstName} {c.userDetails.lastName}</div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <span className="fw-semibold text-dark">{c.userDetails.email}</span>
                                                    <small className="text-muted">{c.userDetails.mobileNumber}</small>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column">
                                                    <span>{c.userDetails.dateOfBirth}</span>
                                                    <span className="badge bg-light text-dark border mt-1" style={{ width: "fit-content" }}>
                                                        {c.userDetails.gender}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="font-monospace text-primary">{c.licenseNumber}</td>
                                            <td>
                                                <div className="text-muted small">
                                                    {c.userDetails.address?.area ?? ""}, { }
                                                    <span className="text-dark fw-semibold">
                                                        {c.userDetails.address?.city ?? "N/A"}, {c.userDetails.address?.state ?? ""}
                                                    </span>
                                                    <br />
                                                    {c.userDetails.address?.country ?? ""}
                                                </div>
                                            </td>
                                            <td>{c.userDetails.address?.zipCode ?? "-"}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary px-3 rounded-pill"
                                                        onClick={() => navigate(`/updatecustomerdetails/${c.userDetails.id}`)}
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
                        {customers.length === 0 && (
                            <div className="text-center py-5 text-muted">
                                <h5>No customers found</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

};

export default CustomerDetails;