const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_START_DATE = 'START_DATE';
const VALIDATOR_TYPE_END_DATE = 'END_DATE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_START_DATE = val => ({
  type: VALIDATOR_TYPE_START_DATE,
  val: val
});
export const VALIDATOR_END_DATE = val => ({
  type: VALIDATOR_TYPE_END_DATE,
  val: val
});
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_START_DATE) {
      isValid = isValid && validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_END_DATE) {
      isValid = isValid && validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
  }
  return isValid;
};

const getISOStringDate = (date) => {
  let newDate = date && typeof date === 'string' ? new Date(date) : date;
  return newDate.toDateString()
};

export const validateRegisteredDate = (start, end, state) => {
  return state.findIndex(booking => getISOStringDate(booking.date.startDateValue) === getISOStringDate(start) && getISOStringDate(booking.date.endDateValue) === getISOStringDate(end)) >= 0 ? true : false;
}