import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_START_DATE, VALIDATOR_END_DATE } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/booking-hook';
import Card from '../../shared/components/UIElements/Card';
import BookingContext from '../../shared/context/booking-context';
import './NewBooking.css';

const UpdateBooking = () => {
  const bookingContext = useContext(BookingContext);
  let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const bookingId = useParams()?.bookingId;

    const [formState, inputHandler, setFormData] = useForm({
        fullName: {
          value: '',
          isValid: false
        },
        date: {
          startDateValue: new Date(),
          endDateValue: new Date(),
          isValid: false
        },
      }, false);

      const identifierBooking = bookingContext.getBooking(bookingId || '');

      useEffect(() => {
        setFormData({
            fullName: identifierBooking?.fullName,
            date: identifierBooking?.date,
          }, true); 
          setIsLoading(false)
      }, [setFormData, identifierBooking])

      const bookingUpdateSubmitHandler = event => {
          event.preventDefault();
          bookingContext.updateBooking({
            id: bookingId,
            ...formState.inputs
          });
          navigate("/bookings");
      }


    if(!identifierBooking){
        return <div className="center">
            <Card>
                <h2>Could not find booking!</h2>
            </Card>
        </div>
    }

    if(isLoading){
        return <div className="center">
            <h1>Loading...</h1>
        </div>
    }

    return (
      <form className="booking-form" onSubmit={bookingUpdateSubmitHandler}>
      <Input
        id="fullName"
        element="input"
        type="text"
        label="Full Name"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={formState?.inputs?.fullName?.value}
        initialValid={formState?.inputs?.fullName?.isValid}
      />
      <Input
        id="date"
        type="date"
        label="Date"
        validators={[
          VALIDATOR_START_DATE(formState?.inputs?.date?.startDateValue || new Date()),
          VALIDATOR_END_DATE(formState?.inputs?.date?.endDateValue || new Date()),
        ]}
        onInput={inputHandler}
        initialStartValue={formState?.inputs?.date?.startDateValue}
        initialEndValue={formState?.inputs?.date?.endDateValue}
        initialEndValid={formState?.inputs?.date?.isValid}
      />
      <Button type="submit" disabled={!formState?.isValid}>
        UPDATE BOOKING
      </Button>
    </form>
    )
}

export default UpdateBooking;
