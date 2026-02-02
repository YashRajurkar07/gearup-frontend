import Api from "./Api";

class AppointmentService {

    getAllAppointments() {

        return Api.get('/appointment/getallappointments');
    }   

    getAppointmentById(appointmentId) {

        return Api.get(`/appointment/getappointmentbyid/${appointmentId}`);
    }

    getCustomerAppointments(userId) {

        return Api.get(`/appointment/customerappointments/${userId}`);
    }

    getGarageAppointments(garageId) {

        return Api.get(`/appointment/garageappointments/${garageId}`);
    }

    getCustomerUpcomingAppointments(userId) {

        return Api.get(`/appointment/getupcomingappointments/${userId}`);
    }

    getHistoryAppointments(userId) {

        return Api.get(`/appointment/getappointmentshistory/${userId}`);
    }

    scheduleAppointment(appointment) {

        return Api.post('/appointment/bookappointment', appointment);
    }

    markAppointmentAsCompleted(appointmentId) {

        return Api.put(`/appointment/markcompleted/${appointmentId}`);
    }

    updateAppointment(appointmentId, appointment) {

        return Api.put(`/appointment/updateappointment/${appointmentId}`, appointment);
    }

    updateAppointmentStatus(appointmentId, statusPayload) {

        return Api.put(`/appointment/updatestatus/${appointmentId}`, statusPayload);
    }

    cancelAppointment(appointmentId) {

        return Api.delete(`/appointment/cancelappointment/${appointmentId}`);
    }
};

export default new AppointmentService();