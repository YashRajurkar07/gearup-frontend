import Api from './Api';

class AdminService {

    getAllAdmins() {

        return Api.get('/admin/getalladmins');
    }

    getAdminById(adminId) {

        return Api.get(`/admin/getadminbyid/${adminId}`);
    }

    registerAdmin(admin) {

        return Api.post('/admin/register', admin);
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

};

export default new AdminService();