import { useContext, useState } from "react";
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
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { validateRegisteredDate } from "../../shared/utils/validators";

const NewBooking = () => {
  const bookingContext = useContext(BookingContext);
  const [error, setError] = useState();
  let navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      fullName: {
        value: "",
        isValid: false,
      },
      property: {
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

  const clearError = () => {
    setError(null);
  };

  const bookingSubmitHandler = (event) => {
    event.preventDefault();
    let startValue = formState?.inputs?.date?.startDateValue;
    let endValue = formState?.inputs?.date?.endDateValue;
    const isDateRegistered = validateRegisteredDate(
      startValue,
      endValue,
      bookingContext.bookings
    );


    if(startValue && endValue) {
      if (!isDateRegistered) {
        bookingContext.addBooking({
          id: Math.random(),
          ...formState?.inputs,
        });
        navigate("/bookings");
      } else {
        setError(
          "There is already a booking with that date, please choose another date and try again!"
        );
      }
    } else {
      setError(
        "The end date needs to be added, please select the start and end date.."
      );

    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
          id="property"
          element="select"
          type="select"
          label="Select Properties"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please select a property."
          onInput={inputHandler}
        />
        <Input
          id="date"
          type="date"
          validators={[
            VALIDATOR_START_DATE(
              formState?.inputs?.date?.startDateValue || new Date()
            ),
            VALIDATOR_END_DATE(
              formState?.inputs?.date?.endDateValue || new Date()
            ),
          ]}
          label="Date range (Start - End)"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState?.isValid}>
          ADD BOOKING
        </Button>
      </form>
    </>
  );
};

export default NewBooking;
