import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import NavigationBar from './Components/NavigationBar';
import Location from './Components/Location';
import AboutUs from './Components/AboutUs';
import MyBooking from './Components/MyBooking';
import Login from './Components/Login';
import Register from "./Components/Register";

import Booking from './Components/Booking';
import { AppProvider, AppContext } from './Components/AppContext';  
import AdminHome from './Components/AdminHome';
import { useContext, useEffect } from 'react';
import FunctionHall from './Components/FunctionHall';
import UserRegistration from './Components/UserRegistration';


function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useContext(AppContext);  

  const spotlight = location.pathname.includes('ContactUs') ? "ContactUs" : "About";

  // Prevent browser back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <div className='App'>
      {/* Agar role 'admin' hai toh sirf AdminHome show hoga */}
      {role === 'admin' && <AdminHome />}
      

      {/* Agar role 'admin' nahi hai aur path '/adminhome' nahi hai toh NavigationBar dikhana hai */}
      {role !== 'admin' && location.pathname !== '/adminhome' && <NavigationBar />}

      {/* Routes ko NavigationBar ke andar nahi rakhna chahiye */}
      {role !== 'admin' && (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Location' element={<Location />} />
          <Route path='/About' element={<AboutUs spotlight={spotlight} />} />
          <Route path='/ContactUs' element={<AboutUs spotlight={spotlight} />} />
          <Route path='/MyBooking' element={<MyBooking />} />
          <Route path='/Login/*' element={<Login />} />
          <Route path='/Registration' element={<UserRegistration />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Booking' element={<Booking />} />
          <Route path='/FunctionHall' element={<FunctionHall />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>  
      <AppContent />
    </AppProvider>
  );
}

export default App;