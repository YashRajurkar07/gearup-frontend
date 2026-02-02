

const Footer = () => {
  return (
    <footer
      className="mt-auto"
      style={{ backgroundColor: '#070c16', color: '#9ca3af' }}
    >
      <div className="container py-3">
        <div className="row gy-3">

          <div className="col-md-4">
            <h5>Gear<span style={{ color: '#f97316' }}>Up</span></h5>
            <p className="small">
              Smart garage booking platform with secure payments
              and real-time slot management.
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="text-light">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a className="text-decoration-none text-secondary" href="/home">Home</a></li>
              <li><a className="text-decoration-none text-secondary" href="/aboutus">About</a></li>
              <li><a className="text-decoration-none text-secondary" href="/contactus">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="text-light">Legal</h6>
            <p className="small mb-1">Privacy Policy</p>
            <p className="small">Terms & Conditions</p>
          </div>

        </div>

        <hr className="border-secondary" />

        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} GearUp Service Portal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;