import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import BookingContext from '../../context/booking-context';

const NavLinks = props => {
    const bookingContext = useContext(BookingContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>Bookings 
                <span className="nav-links--badge">
                    {bookingContext.totalBookings}
                </span>
              </NavLink>
            </li>
            <li>
                <NavLink to="/new-booking">New Booking</NavLink>
            </li>
            <li>
                <NavLink to="/bookings/:mid">Booking Details</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks;
