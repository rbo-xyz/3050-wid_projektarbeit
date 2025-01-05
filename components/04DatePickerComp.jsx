// Vorlage von https://mui.com/x/react-date-pickers/date-picker/

import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/de";
import dayjs from "dayjs";

export const DatePickerComp = ({ date, onDateChange }) => {
  const handleChange = (newDate) => {
    const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
    onDateChange(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DatePicker
        label="Wähle ein Datum aus"
        views={["year", "month", "day"]}
        openTo="day"
        value={dayjs(date)}
        // onChange={(newValue) => setDate(newValue)}
        onChange={handleChange}
        minDate={dayjs("2021-01-01")} // Frühestes Datum: 1. Januar 2000
        maxDate={dayjs("2024-12-31")} // Spätestes Datum: 31. Dezember 2030
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
