import { SingleSelectBox } from "./SelectBox/SingleSelectBox";
import styles from "./MainLogo.module.css";
export interface DatePickerProps {}

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

export const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
  return (
    <>
      <SingleSelectBox
        placeholder={"Days"}
        filterOptions={DAYS}
        onSelect={() => {}}
        width={80}
      />
      <SingleSelectBox
        placeholder={"Month"}
        filterOptions={MONTHS}
        onSelect={() => {}}
      />
      <SingleSelectBox
        placeholder={"Year"}
        filterOptions={YEARS}
        onSelect={() => {}}
      />
    </>
  );
};
