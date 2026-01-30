import { useParams } from 'react-router-dom';
import Api from './Api';

class PaymentService {

    getAllPayments() {

        return Api.get('/payment/getallpayments');
    }

    addNewPayment(payment) {

        return Api.post(`/payment/success?appointmentId=${payment.appointmentId}&transactionId=${payment.transactionId}`);
    }
};

export default new PaymentService();