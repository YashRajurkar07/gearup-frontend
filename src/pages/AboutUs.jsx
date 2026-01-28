import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="bg-dark text-light">
        <div className="container py-5">
        <h2>About Gearup Service Portal </h2>
        <p className="mt-3">
          GearUp is a Garage Service Booking Platform Designed to Optimize
          Appointment Scheduling, Reduce Conflicts, and Improve Transparency
          Between Customers and Garage Owners.
        </p>
        <p>
            GearUp Service Portal is a web-based application designed to streamline garage service bookings and operations. 
            The platform enables customers to schedule service appointments, choose available time slots, 
            and complete payments seamlessly.
            It incorporates a transactional booking engine with real-time status updates to ensure efficient resource allocation and smooth operational flow.
        </p>
        <p>
             The system acts as a centralized management hub for garage owners, allowing them to monitor daily bookings, manage services, 
             and track revenue effectively. 
             Additionally, it offers customers a transparent platform to discover garages, rate services, 
             and provide feedback, ultimately improving service quality and customer satisfaction.
        </p>
      </div>
      </div>
      <Footer />
    </>
  );
}


export default AboutUs;