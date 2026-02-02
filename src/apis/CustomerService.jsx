import Api from './Api';

class CustomerService {

  getAllCustomers() {

    return Api.get('/customer/getallcustomers');
  }

  getCustomerById(customerId) {
    return Api.get(`/customer/getcustomerbyid/${customerId}`);
  }

  registerCustomer(customer) {

    return Api.post('/auth/signup', customer);
  }

  updateCustomer(customerId, customer) {

    return Api.put(`/customer/updatecustomerdetails/${customerId}`, customer);
  }

  deleteCustomer(customerId) {

    return Api.delete(`/customer/deletemyaccount/${customerId}`);
  }

};

export default new CustomerService();
