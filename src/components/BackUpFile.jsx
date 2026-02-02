import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  X, 
  Menu, 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Phone
} from 'lucide-react';

// --- Mock Data ---
const SERVICES = [
  {
    id: 1,
    name: "Express Tune-Up",
    price: "$49.99",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Oil Change", "Fluid Top-up", "Tire Pressure"]
  },
  {
    id: 2,
    name: "Full Diagnostic",
    price: "$89.99",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1530046339160-ce3e41600f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Engine Scan", "Battery Test", "Brake Check"]
  },
  {
    id: 3,
    name: "Premium Overhaul",
    price: "$199.99",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1507767845848-e6502ff25574?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Full Detailing", "Engine Tuning", "AC Service"]
  },
  {
    id: 4,
    name: "Tire & Wheel Care",
    price: "$69.99",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1578844251758-2f71da645217?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    features: ["Alignment", "Rotation", "Balancing"]
  }
];

// --- Sub-Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  // Mapping custom variants to Bootstrap classes + custom classes
  const variantClasses = {
    primary: "btn-brand text-white shadow",
    secondary: "btn-outline-dark",
    dark: "btn-dark border-secondary",
    outline: "btn-outline-light"
  };

  return (
    <button 
      type={type}
      className={`btn rounded-pill px-4 py-2 fw-bold transition-transform ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      style={{ transition: 'all 0.3s' }}
    >
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow-lg border-0 overflow-hidden">
          <div className="modal-header bg-light border-bottom-0 p-4">
            <h5 className="modal-title fw-bold text-dark">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, type, placeholder }) => (
  <div className="mb-3">
    <label className="form-label fw-bold text-secondary small">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="form-control form-control-lg fs-6"
      style={{ padding: '0.75rem 1rem' }}
    />
  </div>
);

// --- Sections ---

const Navbar = ({ onSignIn, onRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="bg-brand text-white p-2 rounded">
            <Wrench size={24} />
          </div>
          <span className={`h3 mb-0 fw-bold fst-italic ${isScrolled ? 'text-dark' : 'text-white'}`}>
            TURBO<span className="text-brand">FIX</span>
          </span>
        </a>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler border-0 text-brand" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} color={isScrolled ? '#ea580c' : 'white'} />}
        </button>

        {/* Desktop Nav */}
        <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex">
          <ul className="navbar-nav align-items-center gap-4">
            {['Home', 'About Us', 'Services', 'Contact Us'].map((item) => (
              <li className="nav-item" key={item}>
                <button 
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`nav-link fw-semibold bg-transparent border-0 ${isScrolled ? 'text-secondary hover-brand' : 'text-white hover-brand-light'}`}
                >
                  {item}
                </button>
              </li>
            ))}
            <li className="nav-item ms-2">
              <button 
                onClick={onSignIn}
                className={`btn fw-bold me-2 ${isScrolled ? 'text-dark' : 'text-white'}`}
              >
                Sign In
              </button>
            </li>
            <li className="nav-item">
              <Button onClick={onRegister} variant="primary">Register</Button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="d-lg-none position-absolute top-100 start-0 w-100 bg-white shadow-lg p-4 border-top animate-slide-down">
            <div className="d-flex flex-column gap-3">
              {['Home', 'About Us', 'Services', 'Contact Us'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-start btn btn-link text-decoration-none text-secondary fw-semibold ps-0"
                >
                  {item}
                </button>
              ))}
              <hr className="my-1" />
              <button onClick={() => { onSignIn(); setIsMobileMenuOpen(false); }} className="btn btn-link text-decoration-none text-dark fw-bold text-start ps-0">Sign In</button>
              <Button onClick={() => { onRegister(); setIsMobileMenuOpen(false); }} className="w-100">Register Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = ({ onRegister }) => (
  <section id="home" className="position-relative d-flex align-items-center min-vh-100 overflow-hidden">
    {/* Background */}
    <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
      <img 
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
        alt="Garage Background" 
        className="w-100 h-100 object-fit-cover"
      />
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(90deg, #111827 0%, rgba(17, 24, 39, 0.8) 50%, transparent 100%)' }}></div>
    </div>

    <div className="container position-relative z-1 pt-5">
      <div className="row">
        <div className="col-lg-7 text-white animate-fade-in-left">
          <div className="d-inline-flex align-items-center gap-2 bg-dark-glass border border-secondary border-opacity-25 text-brand px-3 py-1 rounded-pill mb-4 text-uppercase fw-bold small tracking-wide">
            <Star size={14} className="fill-current" /> Premium Auto Care
          </div>
          <h1 className="display-3 fw-black lh-1 mb-4">
            REVIVE YOUR <br />
            <span className="text-gradient-brand">
              ENGINE'S SOUL
            </span>
          </h1>
          <p className="lead text-light opacity-75 mb-5" style={{ maxWidth: '500px' }}>
            Top-tier mechanics, state-of-the-art diagnostics, and a passion for speed. 
            Experience the service your car deserves.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3">
            <Button onClick={onRegister} className="px-5 py-3 fs-5">Book Service Now</Button>
            <Button variant="outline" className="px-5 py-3 fs-5" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth'})}>
              Explore Services
            </Button>
          </div>
          
          <div className="d-flex gap-5 mt-5 text-secondary">
            <div className="d-flex align-items-center gap-2">
              <ShieldCheck className="text-brand" />
              <span className="fw-semibold text-light">Certified Pros</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Clock className="text-brand" />
              <span className="fw-semibold text-light">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutUs = () => (
  <section id="about-us" className="py-5 bg-white">
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 position-relative">
          <div className="position-absolute top-0 start-0 translate-middle w-25 h-25 bg-warning opacity-25 rounded-circle z-n1"></div>
          <div className="position-absolute bottom-0 end-0 translate-middle w-50 h-50 bg-info opacity-10 rounded-circle z-n1"></div>
          <img 
            src="https://images.unsplash.com/photo-1597762470488-3877b1f538c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Mechanic working" 
            className="img-fluid rounded-4 shadow-lg w-100 object-fit-cover"
            style={{ height: '500px' }}
          />
          <div className="position-absolute bottom-0 start-0 m-4 bg-white p-4 rounded-3 shadow border-start border-4 border-brand" style={{ maxWidth: '200px' }}>
            <p className="display-4 fw-black text-dark mb-0">15+</p>
            <p className="text-secondary fw-medium small mb-0">Years of Experience in Tuning</p>
          </div>
        </div>
        
        <div className="col-lg-6">
          <h6 className="text-brand fw-bold text-uppercase letter-spacing-2 mb-2">About Us</h6>
          <h2 className="display-4 fw-bold text-dark mb-4">
            We Don't Just Fix Cars, <br/> We <span className="text-brand">Elevate</span> Them.
          </h2>
          <p className="lead text-secondary mb-4">
            Founded in 2010, TurboFix started as a small passion project. Today, we combine old-school expertise with modern diagnostics.
          </p>
          <ul className="list-unstyled d-flex flex-column gap-3">
            {[
              "Factory-trained technicians for luxury brands",
              "Genuine parts with 2-year warranty",
              "Transparent pricing - no hidden fees",
              "Comfortable lounge with free Wi-Fi & coffee"
            ].map((item, idx) => (
              <li key={idx} className="d-flex align-items-center gap-3 text-secondary fw-medium">
                <div className="rounded-circle bg-orange-light p-1 d-flex align-items-center justify-center text-brand" style={{ width: '24px', height: '24px' }}>
                  <ArrowRight size={14} />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const ServiceCard = ({ service, onClick }) => (
  <div className="col-md-6 col-lg-3">
    <div 
      onClick={onClick}
      className="card h-100 bg-dark border-secondary border-opacity-25 overflow-hidden text-white cursor-pointer service-card"
    >
      <div className="position-relative" style={{ height: '200px' }}>
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-100 h-100 object-fit-cover opacity-75 card-img-top"
        />
      </div>
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title fw-bold mb-1">{service.name}</h5>
            <div className="d-flex align-items-center gap-1 text-warning small">
              <Star size={14} fill="currentColor" />
              <span>{service.rating}</span>
            </div>
          </div>
          <span className="badge bg-brand rounded-pill px-3 py-2 fs-6">
            {service.price}
          </span>
        </div>
        
        <ul className="list-unstyled mb-4 small text-secondary flex-grow-1">
          {service.features.map((feature, idx) => (
            <li key={idx} className="d-flex align-items-center gap-2 mb-2">
              <span className="bg-secondary rounded-circle" style={{ width: '6px', height: '6px' }}></span>
              {feature}
            </li>
          ))}
        </ul>

        <button className="btn btn-outline-light w-100 fw-semibold mt-auto">
          Select Service
        </button>
      </div>
    </div>
  </div>
);

const Services = ({ onSelect }) => (
  <section id="services" className="py-5 bg-dark position-relative">
    <div className="container py-5 position-relative z-1">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
        <h6 className="text-brand fw-bold text-uppercase letter-spacing-2 mb-2">Our Services</h6>
        <h2 className="display-4 fw-bold text-white mb-4">
          Premium Care for <br /> Your Machine
        </h2>
        <p className="text-secondary fs-5">
          Select a service package below. We use only the highest quality parts tailored to your vehicle.
        </p>
      </div>

      <div className="row g-4">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} onClick={() => onSelect(service)} />
        ))}
      </div>
    </div>
  </section>
);

const ContactUs = () => (
  <section id="contact-us" className="py-5 bg-light">
    <div className="container py-5">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="row g-0">
          
          {/* Contact Info Side */}
          <div className="col-lg-5 bg-dark text-white p-5 d-flex flex-column justify-content-between">
            <div>
              <h3 className="fw-bold mb-4">Get in Touch</h3>
              <p className="text-secondary mb-5">
                Have a weird noise in your engine? Need a quote? Fill out the form or drop by the shop.
              </p>
              
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-3">
                  <MapPin className="text-brand flex-shrink-0" />
                  <div>
                    <h5 className="fw-bold h6 mb-1">Location</h5>
                    <p className="text-secondary small mb-0">123 Motor City Blvd, Pistonville, ST 45678</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <Phone className="text-brand flex-shrink-0" />
                  <div>
                    <h5 className="fw-bold h6 mb-1">Phone</h5>
                    <p className="text-secondary small mb-0">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <Clock className="text-brand flex-shrink-0" />
                  <div>
                    <h5 className="fw-bold h6 mb-1">Hours</h5>
                    <p className="text-secondary small mb-0">Mon - Sat: 8:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 d-flex gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" onClick={(e) => e.preventDefault()} className="btn btn-dark bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center p-2" style={{ width: '40px', height: '40px' }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="col-lg-7 p-5 bg-white">
            <h3 className="fw-bold text-dark mb-4">Send us a Message</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <FormInput label="First Name" type="text" placeholder="John" />
                </div>
                <div className="col-md-6">
                  <FormInput label="Last Name" type="text" placeholder="Doe" />
                </div>
              </div>
              <FormInput label="Email Address" type="email" placeholder="john@example.com" />
              <div className="mb-4">
                <label className="form-label fw-bold text-secondary small">Message</label>
                <textarea 
                  rows="4" 
                  className="form-control"
                  placeholder="Describe your car issue..."
                ></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <Button type="submit" variant="primary">Send Message</Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-dark text-white pt-5 pb-3 border-top border-secondary border-opacity-25">
    <div className="container">
      <div className="row g-5 mb-5">
        <div className="col-lg-3">
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="bg-brand p-1 rounded text-white">
              <Wrench size={20} />
            </div>
            <span className="h4 mb-0 fw-bold fst-italic">
              TURBO<span className="text-brand">FIX</span>
            </span>
          </div>
          <p className="text-secondary small">
            Your trusted partner for all automotive needs. We bring the garage to the 21st century with technology and expertise.
          </p>
        </div>
        
        <div className="col-lg-3 col-6">
          <h5 className="fw-bold h6 mb-3">Services</h5>
          <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
            {['Engine Diagnostics', 'Lube, Oil & Filters', 'Belts & Hoses', 'Air Conditioning', 'Brake Repair'].map(s => (
              <li key={s}><a href="#" onClick={e=>e.preventDefault()} className="text-secondary text-decoration-none hover-text-brand">{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="col-lg-3 col-6">
          <h5 className="fw-bold h6 mb-3">Company</h5>
          <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
            {['About Us', 'Careers', 'Our Team', 'Privacy Policy', 'Terms of Service'].map(s => (
              <li key={s}><a href="#" onClick={e=>e.preventDefault()} className="text-secondary text-decoration-none hover-text-brand">{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="col-lg-3">
          <h5 className="fw-bold h6 mb-3">Newsletter</h5>
          <p className="text-secondary small mb-3">Subscribe for tips & exclusive offers.</p>
          <div className="input-group">
            <input 
              type="email" 
              className="form-control bg-dark border-secondary text-white" 
              placeholder="Email" 
            />
            <button className="btn btn-brand text-white">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-top border-secondary border-opacity-25 pt-4 text-center text-secondary small">
        <p className="mb-0">&copy; {new Date().getFullYear()} TurboFix Garage Services. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

export default function App2() {
  const [modalType, setModalType] = useState(null); // 'login', 'register', 'service'
  const [selectedService, setSelectedService] = useState(null);

  // Inject Bootstrap CSS dynamically
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    }
  }, []);

  const openLogin = () => setModalType('login');
  const openRegister = () => setModalType('register');
  const closeModal = () => {
    setModalType(null);
    setSelectedService(null);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setModalType('service');
  };

  return (
    <div className="font-sans">
      {/* Custom Styles for Branding Override */}
      <style>{`
        :root {
          --brand-color: #ea580c; /* Orange 600 */
        }
        .text-brand { color: var(--brand-color) !important; }
        .text-gradient-brand {
          background: linear-gradient(90deg, #f97316 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bg-brand { background-color: var(--brand-color) !important; }
        .bg-orange-light { background-color: #ffedd5 !important; }
        .btn-brand {
          background: linear-gradient(90deg, #f97316 0%, #dc2626 100%);
          border: none;
        }
        .btn-brand:hover {
          background: linear-gradient(90deg, #ea580c 0%, #b91c1c 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(234, 88, 12, 0.3);
        }
        .hover-brand:hover { color: var(--brand-color) !important; }
        .hover-text-brand:hover { color: var(--brand-color) !important; }
        .object-fit-cover { object-fit: cover; }
        .cursor-pointer { cursor: pointer; }
        .bg-dark-glass { background-color: rgba(17, 24, 39, 0.5); backdrop-filter: blur(4px); }
        .service-card { transition: all 0.3s ease; }
        .service-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); border-color: var(--brand-color) !important; }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out; }
        .animate-slide-down { animation: slideDown 0.3s ease-out; }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      <Navbar onSignIn={openLogin} onRegister={openRegister} />
      
      <main>
        <Hero onRegister={openRegister} />
        <AboutUs />
        <Services onSelect={handleServiceSelect} />
        <ContactUs />
      </main>

      <Footer />

      {/* --- Modals --- */}

      {/* Login Modal */}
      <Modal isOpen={modalType === 'login'} onClose={closeModal} title="Welcome Back">
        <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
          <FormInput label="Email" type="email" placeholder="you@example.com" />
          <FormInput label="Password" type="password" placeholder="••••••••" />
          <div className="d-flex justify-content-between align-items-center mb-4 small">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" />
              <label className="form-check-label text-secondary" htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="text-brand text-decoration-none">Forgot password?</a>
          </div>
          <Button type="submit" className="w-100">Sign In</Button>
          <p className="text-center text-secondary small mt-3 mb-0">
            Don't have an account? <button type="button" onClick={() => setModalType('register')} className="btn btn-link text-brand fw-bold text-decoration-none p-0">Register</button>
          </p>
        </form>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={modalType === 'register'} onClose={closeModal} title="Join the Club">
        <form onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
          <div className="row g-3 mb-3">
            <div className="col-6">
              <FormInput label="First Name" type="text" placeholder="John" />
            </div>
            <div className="col-6">
              <FormInput label="Last Name" type="text" placeholder="Doe" />
            </div>
          </div>
          <FormInput label="Email" type="email" placeholder="you@example.com" />
          <FormInput label="Password" type="password" placeholder="Create a password" />
          <div className="form-text mb-4 text-center">
            By registering, you agree to our <a href="#" className="text-brand text-decoration-none">Terms of Service</a>.
          </div>
          <Button type="submit" className="w-100">Create Account</Button>
          <p className="text-center text-secondary small mt-3 mb-0">
            Already have an account? <button type="button" onClick={() => setModalType('login')} className="btn btn-link text-brand fw-bold text-decoration-none p-0">Sign In</button>
          </p>
        </form>
      </Modal>

      {/* Service Selection Modal */}
      <Modal isOpen={modalType === 'service'} onClose={closeModal} title="Book Service">
        {selectedService && (
          <div className="d-flex flex-column gap-4">
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded border border-warning border-opacity-25">
              <img src={selectedService.image} alt="" className="rounded object-fit-cover" style={{ width: '64px', height: '64px' }} />
              <div>
                <h5 className="fw-bold mb-0 text-dark">{selectedService.name}</h5>
                <p className="text-brand fw-bold fs-5 mb-0">{selectedService.price}</p>
              </div>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Booking Request Sent!'); closeModal(); }}>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold text-secondary small">Time Slot</label>
                  <select className="form-select">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
              </div>
              <FormInput label="Vehicle Model" type="text" placeholder="e.g. 2018 Ford Mustang" />
              <Button type="submit" className="w-100">Confirm Booking</Button>
            </form>
          </div>
        )}
      </Modal>

    </div>
  );
}
