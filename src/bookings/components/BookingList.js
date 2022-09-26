import Card from "../../shared/components/UIElements/Card";
import BookingItem from "./BookingItem";
import "./BookingList.css";
import { displayDateFormat } from "../../shared/utils/displayDateFormat";

const BookingList = ({ allBookingList }) => {
  if (allBookingList.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Bookings found!</h2>
        </Card>
      </div>
    );
  }

  return (
      <ul className="booking-list">
        {allBookingList?.map((booking) => (
          <BookingItem
            id={booking?.id}
            key={booking?.id}
            fullName={booking?.fullName?.value}
            property={booking?.property?.value}
            startDateValue={displayDateFormat(booking?.date?.startDateValue)}
            endDateValue={displayDateFormat(booking?.date?.endDateValue)}
          />
        )) || []}
      </ul>
  );
};

export default BookingList;
