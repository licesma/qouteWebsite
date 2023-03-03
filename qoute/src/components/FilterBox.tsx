import * as React from "react";
import Select, {
  components,
  ControlProps,
  MultiValue,
  Props,
  StylesConfig,
} from "react-select";
import styles from "./CreateButton.module.css";

export interface FilterBoxProps {
  placeholder: string;
  filterOptions: string[];
  onSelect: (selectedOptions: string[]) => void;
}

export interface FilterOption {
  readonly value: string;
  readonly label: string;
}

const colourStyles: StylesConfig<FilterOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
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

export const FilterBox: React.FunctionComponent<FilterBoxProps> = (props) => {
  const {
    filterOptions: stringOptions,
    onSelect: onStringSelect,
    placeholder,
  } = props;
  const options: FilterOption[] = stringOptions?.map((stringOption) => ({
    value: stringOption,
    label: stringOption,
  }));

  React.useEffect(() => console.log(stringOptions));

  const onSelect = (choices: MultiValue<FilterOption>) => {
    onStringSelect(choices.map((choice) => choice.value));
  };

  return (
    <Select
      closeMenuOnSelect={false}
      instanceId="authorSelector"
      placeholder={placeholder}
      isMulti
      options={options}
      styles={colourStyles}
      onChange={onSelect}
      noOptionsMessage={() => null} // remove if you want to display a messsage when there are no options
    />
  );
};
