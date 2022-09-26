import React, { useReducer, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { validate } from "../../utils/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "CHANGE_DATE":
      return {
        ...state,
        startDateValue: action.start,
        endDateValue: action.end,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const options = [
  {
    label: "Hotels",
    value: "Hotels",
  },
  {
    label: "Villas",
    value: "Villas",
  },
  {
    label: "Apartments",
    value: "Apartments",
  },
  {
    label: "Guest Houses",
    value: "Guest-houses",
  },
];

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    startDateValue: props.initialStartValue || new Date(),
    endDateValue: props.initialEndValue || new Date(),
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, startDateValue, endDateValue, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, startDateValue, endDateValue, isValid);
  }, [id, value, startDateValue, endDateValue, isValid, onInput]);

  const changeInputHandler = (event) => {
    dispatch({
      type: "CHANGE_INPUT",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const changeDateHandler = (dates) => {
    dispatch({
      type: "CHANGE_DATE",
      id: props.id,
      start: dates[0],
      end: dates[1],
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeInputHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === "select" ? (
      <select
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onBlur={touchHandler}
        value={inputState.value}
        onChange={changeInputHandler}
      >
        <option value="">--Please choose a property--</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} >
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <DatePicker
        selected={inputState.startDateValue}
        onChange={changeDateHandler}
        startDate={inputState.startDateValue}
        endDate={inputState.endDateValue}
        onBlur={touchHandler}
        selectsRange
        inline
        id={props.id}
        minDate={new Date()}
        showDisabledMonthNavigation
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
