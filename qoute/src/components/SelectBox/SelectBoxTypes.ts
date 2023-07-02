import { StylesConfig } from "react-select";

export interface SelectBoxProps {
  placeholder: string;
  filterOptions: string[];
  width?: number;
}

export interface MultiSelectBoxProps extends SelectBoxProps {
  onSelect: (selectedOptions: string[]) => void;
}

export interface SingleSelectBoxProps extends SelectBoxProps {
  onSelect: (selectedOptions: string) => void;
  defaultValue?: string;
}

export interface FilterOption {
  readonly value: string;
  readonly label: string;
}

export const colourStyles: StylesConfig<FilterOption, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    height: "30px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = "white";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "black"
        : isFocused
        ? "gray"
        : undefined,
      color: isFocused ? "white" : "gray",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? "lightgray" : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "lightblue",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "gray",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "gray",
    ":hover": {
      backgroundColor: "blue",
      color: "white",
    },
  }),
};
