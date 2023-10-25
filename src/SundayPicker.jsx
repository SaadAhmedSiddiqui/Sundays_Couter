import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

const SundayPicker = () => {
  const addYears = (date, years) => {
    date.setFullYear(date.getFullYear() + years);
    return date;
  };
  const [minDate, setMinDate] = useState(new Date());
  const today = new Date();
  const today2 = new Date();
  today2.setDate(today2.getDate() + 1);
  minDate.setDate(today.getDate() + 1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: minDate,
      endDate: addYears(today2, 2),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    console.log(ranges);
    setDateRange([
      {
        startDate: ranges.selection.startDate,
        endDate: addYears(new Date(ranges.selection.startDate), 2),
        key: "selection",
      },
    ]);
    setMinDate(addYears(new Date(ranges.selection.startDate), 2));
  };
  return (
    <div>
      <h1>Sundays Page</h1>
      <DateRange
        ranges={dateRange}
        onChange={(ranges) => handleSelect(ranges)}
        minDate={minDate}
      />
    </div>
  );
};

export default SundayPicker;
