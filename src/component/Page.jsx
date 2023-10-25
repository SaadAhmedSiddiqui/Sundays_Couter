import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Page = () => {
  const addYears = (date, years) => {
    date.setFullYear(date.getFullYear() + years);
    return date;
  };
  const countSundaysInRange = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0 && currentDate.getDate() < 28) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  };
  const [startDate, setStartDate] = useState(null);
  const [sundayCount, setSundayCount] = useState(0);
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [endDate, setEndDate] = useState(null);
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 1);
  const [minDate, setMinDate] = useState(null);
  const disableWeekends = (date) => {
    const currentDate = new Date(date);
    return currentDate.getDay() === 0;
  };
  const changeHandler = (value, error) => {
    if (startDateRef.current && endDateRef.current) {
      const sundayCount = countSundaysInRange(
        new Date(startDateRef.current),
        new Date(endDateRef.current),
      );
      setSundayCount(sundayCount);
    }
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            shouldDisableDate={disableWeekends}
            label="Start"
            minDate={dayjs(initialDate)}
            value={startDate}
            onChange={(newValue, { validationError }) => {
              if (!validationError) {
                startDateRef.current = newValue;
                setMinDate(addYears(new Date(newValue), 2));
                changeHandler(newValue, validationError);
                setStartDate(newValue);
              }
            }}
          />
          <DatePicker
            shouldDisableDate={disableWeekends}
            label="End"
            minDate={startDate ? dayjs(minDate) : null}
            disabled={!startDate}
            value={endDate}
            onChange={(newValue, { validationError }) => {
              if (!validationError) {
                endDateRef.current = newValue;
                setEndDate(newValue);
                changeHandler(newValue, validationError);
              }
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <p>
        Number of Sundays between the selected dates (before the 28th):{" "}
        {sundayCount}
      </p>
    </>
  );
};

export default Page;
