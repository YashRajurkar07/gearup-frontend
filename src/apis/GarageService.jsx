import Api from './Api';

class GarageService {

    getAllGarages() {

        return Api.get('/garage/getallgarages');
    }

    getGarageById(garageId) {

        return Api.get(`/garage/getgaragebyid/${garageId}`);
    }

    getGarageByOwnerId(ownerId) {

        return Api.get(`/garage/getgaragebyowner/${ownerId}`);
    }

    getGarageByArea(area) {

        return Api.get('/garage/getgaragesbyarea/', area);
    }

    getGarageSearchResults(searchParams) {

        return Api.get('/garage/searchgarages', searchParams);
    }

    getGarageAreas() {

        return Api.get('/garage/getallareas');
    }

    registerGarage(garage) {

        return Api.post('/garage/registergarage', garage);
    }

    updateGarage(garageId, garage) {

        return Api.put(`/garage/updategaragedetails/${garageId}`, garage);
    }

    deleteGarage(garageId) {

        return Api.delete(`/garage/delete/${garageId}`);
    }

    getGarageStatistics(garageId) {

        return Api.get(`/garage/garagestatistics/${garageId}`);
    }
};

export default new GarageService();