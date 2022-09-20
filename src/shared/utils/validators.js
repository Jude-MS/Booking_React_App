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
  console.log('validators', validators)
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_START_DATE) {
      console.log('validator.val -- start', validator.val)
      isValid = isValid && validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_END_DATE) {
      console.log('validator.val -- end', validator.val)
      isValid = isValid && validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
  }
  console.log('isValid', isValid)
  return isValid;
};