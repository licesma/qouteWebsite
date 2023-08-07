import * as React from "react";
import Select, {
  components,
  ControlProps,
  MultiValue,
  Props,
  StylesConfig,
} from "react-select";
import styles from "./CreateButton.module.css";
import type { FilterOption, MultiSelectBoxProps } from "./SelectBoxTypes";
import { colourStyles } from "./SelectBoxTypes";

export const MultiSelectBox: React.FunctionComponent<MultiSelectBoxProps> = (
  props
) => {
  const {
    filterOptions: stringOptions,
    onSelect: onStringSelect,
    placeholder,
  } = props;
  const options: FilterOption[] = stringOptions?.map((stringOption) => ({
    value: stringOption,
    label: stringOption,
  }));

  const onSelect = (choices: MultiValue<FilterOption>) => {
    onStringSelect(choices.map((choice) => choice.value));
  };

  const onSingleSelect = (choices: MultiValue<FilterOption>) => {
    onStringSelect(choices.map((choice) => choice.value));
  };

  return (
    <Select
      closeMenuOnSelect={false}
      instanceId="authorSelector"
      placeholder={placeholder}
      options={options}
      isMulti
      styles={colourStyles}
      onChange={onSelect}
      noOptionsMessage={() => null} // remove if you want to display a messsage when there are no options
    />
  );
};
