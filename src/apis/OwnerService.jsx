import Api from './Api';

class OwnerService {

    getAllOwners () {

    return Api.get('/owner/getallowners');
    }

    getOwnerById (ownerId) {
        
    return Api.get(`/owner/getownerbyid/${ownerId}`);
    }

    registerOwner (owner) {

    return Api.post('/owner/register', owner);
    }

    updateOwner (ownerId, owner) {

    return Api.put(`/owner/updateownerdetails/${ownerId}`, owner);
    }

    deleteOwner (ownerId) {

    return Api.delete(`/owner/deletemyaccount/${ownerId}`);
    }

};

export default new OwnerService();