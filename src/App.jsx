import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import SignIn from './pages/SignIn'
import SignUp from './pages/customer/RegisterCustomer'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import CustomerDetails from './pages/customer/CustomerDetails'
import UpdateCustomerDetails from './pages/customer/UpdateCustomerDetails'
import SignUpOwner from './pages/owner/RegisterOwner'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import OwnerDetails from './pages/admin/OwnerDetails'
import UpdateOwnerDetails from './pages/owner/UpdateOwnerDetails'
import RegisterGarage from './pages/owner/RegisterGarage'
import RegisterAdmin from './pages/admin/RegisterAdmin'
import AdminDashboard from './pages/admin/AdminDashboard';
import TimeSlot from './pages/owner/AddTimeSlot'
import UpdateTimeSlotDetails from './pages/owner/UpdateTimeSlotDetails'
import GarageBrowser from './pages/customer/GarageBrowser';
import BookAppointment from './pages/customer/BookAppointment';

import PrivateRoute from './components/PrivateRoute';
// import NotFound from './pages/NotFound'

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
          <Route path='/customer/dashboard' element={<CustomerDashboard />} />
          <Route path='/garages' element={<GarageBrowser />} />
          <Route path='/book-appointment/:garageId' element={<BookAppointment />} />
          <Route path='/signupowner' element={<SignUpOwner />} />
          <Route path='/owner/dashboard' element={<OwnerDashboard />} />
          <Route path='/allcustomers' element={<CustomerDetails />} />
          <Route path='/allowners' element={<OwnerDetails />} />
          <Route path='/registergarage' element={<RegisterGarage />} />
          <Route path='/registeradmin' element={<RegisterAdmin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/updatecustomerdetails' element={<UpdateCustomerDetails />} />
          <Route path='/updateownerdetails' element={<UpdateOwnerDetails />} />
          <Route path='/addtimeslot/:garageId' element={<TimeSlot />} />
          <Route path='/updatetimeslot/:timeSlotId' element={<UpdateTimeSlotDetails />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
