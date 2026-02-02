import Api from './Api';

class TimeSlotService {

    getAllTimeSlots() {

        return Api.get('/timeslot/getalltimeslots');
    }

    getTimeSlotsByGarageId(garageId) {

        return Api.get(`/timeslot/garagetimeslots/${garageId}`);
    }

    getAvailableTimeSlots(garageId) {

        return Api.get(`/timeslot/garagetimeslots/${garageId}/available`);
    }

    addTimeSlot(timeSlot) {

        return Api.post('/timeslot/addtimeslot', timeSlot);
    }

    updateTimeSlot(timeSlotId, timeSlot) {

        return Api.put(`/timeslot/updatetimeslot/${timeSlotId}`, timeSlot);
    }

    deleteTimeSlot(timeSlotId) {

        return Api.delete(`/timeslot/deletetimeslot/${timeSlotId}`);
    }
};

export default new TimeSlotService();