import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext'; // Assuming the AppContext is in the same directory
import './MyBooking.css'; // Keep your custom CSS file

const MyBooking = () => {
  const { userId } = useContext(AppContext); // Get the userId from context
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      // Fetch the booking details for the logged-in user
      const fetchBookingDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:3000/booking/user/${userId}`);
          const data = await response.json();
          
          if (response.ok) {
            setBookingDetails(data); // Assuming the response is an array of booking details
          } else {
            setError('No bookings found');
          }
        } catch (err) {
          setError('Error fetching booking details');
        } finally {
          setLoading(false);
        }
      };

      fetchBookingDetails();
    } else {
      setError('User not found');
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className='booking-container'>
      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title'>My Bookings</h2>

          {loading && <p>Loading booking details...</p>}
          {error && <p className='text-danger'>{error}</p>}

          {bookingDetails.length > 0 ? (
            <div className='list-group'>
              {bookingDetails.map((booking, index) => (
                <div key={index} className='list-group-item'>
                  <h5 className='mb-1'>Function Hall Name: {booking.functionHallName}</h5>
                  <p className='mb-1'>Date: {booking.date}</p>
                  <p className='mb-1'>Status: {booking.status}</p>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>No bookings found.</p> // Only show this when not loading
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
