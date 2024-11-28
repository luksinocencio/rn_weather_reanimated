export function convertDate12HrFormat(date: Date) {
  let hours = date.getHours();
  const currentHour = new Date().getHours();

  if (currentHour === hours) return "Now";

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours} ${ampm}`;
}

export const getDayOfWeek = (date: Date): [string, boolean] => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let today = new Date().getDay() === date.getDate();
  return [days[date.getDay()], today];
};
