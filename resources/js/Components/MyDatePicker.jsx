import React, { useState } from "react";
import DatePicker from "react-date-picker";

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You can perform any additional logic here
  };

  return (
    <div className="w-full">
      <h2>Select a Date:</h2>
      <DatePicker
        onChange={handleDateChange}
        value={selectedDate}
        showTimeSelect
        timeFormat="HH:mm"
        className="p-10 text-white"
      />
      {/* Display the selected date (optional) */}
      <p>Selected Date: {selectedDate.toDateString()}</p>
    </div>
  );
}

export default MyDatePicker;
