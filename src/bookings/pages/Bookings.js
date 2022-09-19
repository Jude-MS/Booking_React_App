import React, { useContext } from 'react';
import BookingList from '../components/BookingList';
import BookingContext from '../../shared/context/booking-context';

const Bookings = () => {
    const bookingContext = useContext(BookingContext);

  return (
    <BookingList allBookingList={bookingContext.bookings} />
  )
}

export default Bookings