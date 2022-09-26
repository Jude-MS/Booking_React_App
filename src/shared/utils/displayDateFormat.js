export const displayDateFormat = (date) => {
    let newDate = new Date(date).toUTCString();
    return newDate;
  }