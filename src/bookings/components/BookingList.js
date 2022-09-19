import Card from '../../shared/components/UIElements/Card';
import './BookingList.css';

const BookingList = ({ allBookingList }) => {
    if (allBookingList.length === 0) {
        return (
          <div className="center">
            <Card>
                <h2>No Bookings found!</h2>;
            </Card>
          </div>
        );
      }
    

  return (
    <div>
        <ul>
        {
            allBookingList.map(booking => (
                <li>{booking.fullName.value} | {booking.date.startDateValue.toString()} | {booking.date.endDateValue.toString()}</li>
            ))
        }
        </ul>
    </div>
  )
}

export default BookingList