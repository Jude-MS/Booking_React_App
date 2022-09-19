import { createContext, useState } from "react";

const BookingContext = createContext({
    bookings: [],
    addBooking: () => {},
    updateBooking: () => {},
    deleteBooking: () => {},
    totalBookings: 0
});

export const BookingContextProvider = ({children}) => {
    const [bookingState, setBookingState] = useState([]);

    const addBookingHandler = (booking) => {
        setBookingState(prevBookingState => {
            return prevBookingState.concat(booking);
        })
    };

    const updateBookingHandler = (bookingUpdated) => {
        setBookingState(prevBookingState => {
            const newBookingState = [...prevBookingState];
            const getBookingId = newBookingState.findIndex(booking => booking.id !== bookingUpdated.id);
            newBookingState[getBookingId] = bookingUpdated;

            return newBookingState;
        })
    };

    const deleteBookingHandler = (bookingId) => {
        setBookingState(prevBookingState => {
            return prevBookingState.filter(booking => booking.id !== bookingId);
        })
    };

    const bookingLength = bookingState.length;

    const contextValue = {
        bookings: bookingState,
        addBooking: addBookingHandler,
        updateBooking: updateBookingHandler,
        deleteBooking: deleteBookingHandler,
        totalBookings: bookingLength
    }

    return <BookingContext.Provider value={contextValue}>
        {children}
    </BookingContext.Provider>
}

export default BookingContext;