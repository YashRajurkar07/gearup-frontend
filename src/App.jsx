import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import SignIn from './pages/SignIn'
import SignUp from './pages/customer/RegisterCustomer'
import SignUpOwner from './pages/owner/RegisterOwner'

import RegisterAdmin from './pages/admin/RegisterAdmin'
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerDetails from './pages/admin/CustomerDetails'
import OwnerDetails from './pages/admin/OwnerDetails'


import CustomerDashboard from './pages/customer/CustomerDashboard'
import GarageBrowser from './pages/customer/GarageBrowser';
import BookAppointment from './pages/customer/BookAppointment';
import PaymentPage from './pages/customer/PaymentPage';
import UpdateCustomerDetails from './pages/customer/UpdateCustomerDetails'

import OwnerDashboard from './pages/owner/OwnerDashboard'
import RegisterGarage from './pages/owner/RegisterGarage'
import UpdateGarageDetails from './pages/owner/UpdateGarageDetails'
import UpdateOwnerDetails from './pages/owner/UpdateOwnerDetails'
import TimeSlot from './pages/owner/AddTimeSlot'
import UpdateTimeSlotDetails from './pages/owner/UpdateTimeSlotDetails'

import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signupowner' element={<SignUpOwner />} />

          <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>

            <Route path='/registeradmin' element={<RegisterAdmin />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/allcustomers' element={<CustomerDetails />} />
            <Route path='/allowners' element={<OwnerDetails />} />

            <Route path='/updatecustomerdetails/:cid' element={<UpdateCustomerDetails />} />
            <Route path='/updateownerdetails/:oid' element={<UpdateOwnerDetails />} />

          </Route>

          <Route element={<PrivateRoute allowedRoles={['ROLE_CUSTOMER']} />}>

            <Route path='/customer/dashboard' element={<CustomerDashboard />} />
            <Route path='/garages' element={<GarageBrowser />} />
            <Route path='/bookappointment/:garageId' element={<BookAppointment />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/updatecustomerdetails' element={<UpdateCustomerDetails />} />

          </Route>

          <Route element={<PrivateRoute allowedRoles={['ROLE_OWNER']} />}>

            <Route path='/owner/dashboard' element={<OwnerDashboard />} />
            <Route path='/registergarage' element={<RegisterGarage />} />
            <Route path='/updategaragedetails/:garageId' element={<UpdateGarageDetails />} />
            <Route path='/updateownerdetails' element={<UpdateOwnerDetails />} />
            <Route path='/addtimeslot/:garageId' element={<TimeSlot />} />
            <Route path='/updatetimeslot/:timeSlotId' element={<UpdateTimeSlotDetails />} />

          </Route>

          <Route path='*' element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
