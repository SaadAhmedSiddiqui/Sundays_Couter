import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
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
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() + 7 - startDay);
    const datePointer = new Date(startDate);
    do {
      const _date = datePointer.getDate();
      if (_date < 28) {
        count++;
      }
      datePointer.setDate(_date + 7);
    } while (datePointer <= endDate);

    return count;
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sundayCount, setSundayCount] = useState(0);
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 1);
  const [minDate, setMinDate] = useState(null);
  const disableWeekends = (date) => {
    const currentDate = new Date(date);
    return currentDate.getDay() === 0;
  };

  const startDateChanged = (newValue, { validationError }) => {
    setEndDate(null);
    setSundayCount(0);
    if (!validationError) {
      setMinDate(addYears(new Date(newValue), 2));
      setStartDate(newValue);
    } else {
      setMinDate(null);
    }
  };

  const endDateChanged = (newValue, { validationError }) => {
    setSundayCount(0);
    if (!validationError) {
      setEndDate(newValue);
      const sundayCount = countSundaysInRange(
        new Date(startDate),
        new Date(newValue)
      );
      setSundayCount(sundayCount);
    }
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]} sx={{ padding: 2 }}>
          <DatePicker
            shouldDisableDate={disableWeekends}
            label="Start"
            minDate={dayjs(initialDate)}
            value={startDate}
            onChange={startDateChanged}
          />
          <DatePicker
            shouldDisableDate={disableWeekends}
            label="End"
            minDate={startDate ? dayjs(minDate) : null}
            disabled={!minDate}
            value={endDate}
            onChange={endDateChanged}
          />
        </DemoContainer>
      </LocalizationProvider>
      <p style={{ margin: 16 }}>
        Number of <b>Sundays</b> between the selected dates{" "}
        <span style={{ fontSize: "small" }}>(before the 28th)</span>:{" "}
      </p>
      <h1 style={{ marginLeft: 16 }}>{sundayCount || "--"}</h1>
    </>
  );
};

export default Page;
