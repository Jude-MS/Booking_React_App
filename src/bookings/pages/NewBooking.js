import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_START_DATE,
  VALIDATOR_END_DATE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import "./NewBooking.css";
import { useForm } from "../../shared/hooks/booking-hook";
import BookingContext from "../../shared/context/booking-context";

const NewBooking = () => {
  const bookingContext = useContext(BookingContext);
  let navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      fullName: {
        value: "",
        isValid: false,
      },
      date: {
        startDateValue: new Date(),
        endDateValue: new Date(),
        isValid: false,
      },
    },
    false
  );

  const bookingSubmitHandler = (event) => {
    event.preventDefault();
    bookingContext.addBooking({
      id: Math.random(),
      ...formState?.inputs,
    });
    navigate("/bookings");
  };

  return (
    <form className="booking-form" onSubmit={bookingSubmitHandler}>
      <Input
        id="fullName"
        element="input"
        type="text"
        label="Full Name"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
      />
      <Input
        id="date"
        type="date"
        validators={[
          VALIDATOR_START_DATE(formState?.inputs?.date?.startDateValue || new Date()),
          VALIDATOR_END_DATE(formState?.inputs?.date?.endDateValue || new Date()),
        ]}
        label="Date range (Start - End)"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState?.isValid}>
        ADD BOOKING
      </Button>
    </form>
  );
};

export default NewBooking;
