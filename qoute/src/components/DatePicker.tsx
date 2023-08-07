import * as React from "react";
import styles from "./DatePicker.module.css";
import { SingleSelectBox } from "./SelectBox/SingleSelectBox";

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1).map((num) =>
  num.toString()
);
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEARS = Array.from({ length: 130 }, (_, i) => 2023 - i).map((num) =>
  num.toString()
);

export interface DatePickerProps {
  onChange?: (date: Date) => void;
  onDefault?: () => void;
  onNotDefault?: () => void;
  onReady?: () => void;
  defaultValue?: Date;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  const { onChange, onDefault, onNotDefault, onReady, defaultValue } = props;

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const [defaultDay, setDefaultDay] = React.useState<string | undefined>(
    undefined
  );
  const [defaultMonth, setDefaultMonth] = React.useState<string | undefined>(
    undefined
  );
  const [defaultYear, setDefaultYear] = React.useState<string | undefined>(
    undefined
  );
  const [selectedDay, setSelectedDay] = React.useState<number>(0);
  const [selectedMonth, setSelectedMonth] = React.useState<number>(0);
  const [selectedYear, setSelectedYear] = React.useState<number>(0);

  const updateDate = (day: number, month: number, year: number) => {
    if (day !== 0 && month !== 0 && year !== 0) {
      setSelectedDate(new Date(year, month, day));
    }
  };

  const onDayChange = (dayString: string) => {
    const day = parseInt(dayString);
    setSelectedDay(day);
    updateDate(day, selectedMonth, selectedYear);
  };

  const onMonthChange = (monthString: string) => {
    const month = getMonthNumber(monthString);
    setSelectedMonth(month);
    updateDate(selectedDay, month, selectedYear);
  };

  const onYearChange = (yearString: string) => {
    const year = parseInt(yearString);
    setSelectedYear(year);
    updateDate(selectedDay, selectedMonth, year);
  };

  React.useEffect(() => {
    if (defaultValue) {
      setDefaultDay(defaultValue.getDate().toString());
      setDefaultMonth(MONTHS[defaultValue.getMonth()]);
      setDefaultYear(defaultValue.getFullYear().toString());
      setSelectedDate(defaultValue);
    }
  }, [defaultValue]);

  React.useEffect(() => {
    if (selectedDate) {
      onChange?.(selectedDate);
      if (defaultValue === selectedDate) {
        onDefault?.();
      } else {
        onNotDefault?.();
      }
    }
  }, [selectedDate]);

  return (
    <div className={styles.datePickerContainer}>
      <SingleSelectBox
        placeholder={"Day"}
        filterOptions={DAYS}
        onSelect={onDayChange}
        defaultValue={defaultDay ?? undefined}
        width={100}
      />
      <SingleSelectBox
        placeholder={"Month"}
        filterOptions={MONTHS}
        onSelect={onMonthChange}
        defaultValue={defaultMonth ?? undefined}
      />
      <SingleSelectBox
        placeholder={"Year"}
        filterOptions={YEARS}
        defaultValue={defaultYear ?? undefined}
        onSelect={onYearChange}
      />
    </div>
  );
};

const getMonthNumber = (month: string) => {
  return MONTHS.indexOf(month);
};
