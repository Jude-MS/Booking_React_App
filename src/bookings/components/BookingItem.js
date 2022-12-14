import { useState, useContext } from "react";
import "./BookingItem.css";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import BookingContext from "../../shared/context/booking-context";

const BookingItem = ({ id, fullName, property, startDateValue, endDateValue }) => {
  const bookingContext = useContext(BookingContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    bookingContext.deleteBooking(id);
  };

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="booking__modal-actions"
        footer={
          <>
            <Button onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this booking? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="booking-item">
        <Card className="booking-item__content">
          <div className="booking-item__info">
            <h2 className="booking-item__fullname">FullName: {fullName}</h2>
            <div className="booking-item__info">
              Property:
              <p className="booking-item__desc">{property}</p>
            </div>
            <div className="booking-item__info">
              Start: <p className="booking-item__desc">{startDateValue}</p>
            </div>
            <div className="booking-item__info">
              End: <p className="booking-item__desc">{endDateValue}</p>
            </div>
          </div>
          <div className="booking__actions">
            <Button className="button" to={`/${id}/booking`}>
              EDIT
            </Button>
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default BookingItem;
