import Navbar from './Navbar';
import Footer from './Footer';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className='bg-dark text-light p-4'>
        <div className="container py-5">
        <h2>Contact Us</h2>
        <form className="mt-3 col-md-6 mb-3">
          <input className="form-control mb-3" placeholder="Name" />
          <input className="form-control mb-3" placeholder="Email" />
          <textarea className="form-control mb-3" placeholder="Message"></textarea>
          <button className="btn btn-outline-light">Submit</button>
        </form>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
