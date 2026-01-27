
import { Car, Wrench, Phone, Info, User, X, Menu, MapPin, Star, Clock, ShieldCheck, ArrowRight, /*Facebook, Twitter, Instagram */} from 'lucide-react';


const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <Car size={100} />
            <Wrench size={200} />
            <Clock/>
            <ShieldCheck/>
        </div>
    );
}

export default HomePage;