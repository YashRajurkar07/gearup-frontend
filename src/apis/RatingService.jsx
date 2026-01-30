import Api from './Api';

class RatingService {

    getAllRatings() {

        return Api.get('/rating/getallratings');
    }

    getRatingsByGarageId(garageId) {

        return Api.get(`/rating/garagerating/${garageId}`);
    }

    addRating(rating) {

        return Api.post('/rating/addrating', rating);
    }

    getAverageRating(garageId) {

        return Api.get(`/rating/averagerating/${garageId}`);
    }
};

export default new RatingService();