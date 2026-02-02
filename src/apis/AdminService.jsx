import Api from './Api';

class AdminService {

    getAllAdmins() {

        return Api.get('/admin/getalladmins');
    }

    getAdminById(adminId) {

        return Api.get(`/admin/getadminbyid/${adminId}`);
    }

    registerAdmin(admin) {

        const token = localStorage.getItem("jwtToken");


        return Api.post('/auth/signup', admin, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    updateAdmin(adminId, admin) {

        return Api.put(`/admin/updateadmindetails/${adminId}`, admin);
    }

    deleteAdmin(adminId) {

        return Api.delete(`/admin/delete/${adminId}`);
    }

    verifyOwner(ownerId, status) {

        return Api.put(`/admin/verifyowner/${ownerId}?status=${status}`);
    }

    getOwnerById(ownerId) {

        return Api.get(`/admin/getownerbyid/${ownerId}`);
    }

    updateOwner(ownerId, owner) {

        return Api.put(`/admin/updateownerdetails/${ownerId}`, owner);
    }

    deleteOwner(ownerId) {

        return Api.delete(`/admin/deleteowner/${ownerId}`);
    }

    getCustomerById(customerId) {

        return Api.get(`/admin/getcustomerbyid/${customerId}`);

    }

    updateCustomer(customerId, customer) {

        return Api.put(`/admin/updatecustomerdetails/${customerId}`, customer);
    }

    deleteCustomer(customerId) {

        return Api.delete(`/admin/deletecustomer/${customerId}`);
    }

};

export default new AdminService();