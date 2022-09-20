
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Bookings from './bookings/pages/Bookings';
import NewBooking from './bookings/pages/NewBooking';
import UpdateBooking from './bookings/pages/UpdateBooking';
import { BookingContextProvider } from './shared/context/booking-context';

function App() {

  let routes = (
    <Routes>
        <Route index element={<Bookings />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path="/:bookingId/booking" element={<UpdateBooking />} />
        <Route path="/new-booking" element={<NewBooking />} />
    </Routes>
  );

  return (
    <BookingContextProvider>
      <Router>
        <MainNavigation />
          <main>
            {routes}
          </main>
      </Router>
    </BookingContextProvider>
  );
}

export default App;

