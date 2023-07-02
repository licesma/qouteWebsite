import * as React from "react";
import Select, { MultiValue } from "react-select";
import styles from "./SelectBox.module.css";
import type { SingleSelectBoxProps, FilterOption } from "./SelectBoxTypes";
import { colourStyles } from "./SelectBoxTypes";

export const SingleSelectBox: React.FunctionComponent<SingleSelectBoxProps> = (
  props
) => {
  const {
    filterOptions: stringOptions,
    onSelect: onStringSelect,
    defaultValue,
    placeholder,
    width,
  } = props;

  const [overrideDefault, setOverrideDefault] = React.useState<boolean>(false);

  const options: FilterOption[] = stringOptions?.map((stringOption) => ({
    value: stringOption,
    label: stringOption,
  }));

  const onSelect = (choice: MultiValue<FilterOption>) => {
    const choiceObj: any = choice; //TODO: Fix, I don't like this but Select is forcing a MultiValue type fsr.
    onStringSelect(choiceObj.value);
    setOverrideDefault(true);
  };

  return (
    <div className={styles.container} style={{ width: `${width}px` }}>
      <Select
        closeMenuOnSelect={true}
        instanceId="authorSelector"
        placeholder={placeholder}
        value={
          overrideDefault
            ? undefined
            : ({ value: defaultValue, label: defaultValue } as FilterOption)
        }
        options={options}
        styles={colourStyles}
        onChange={onSelect}
        noOptionsMessage={() => null} // remove if you want to display a messsage when there are no options
      />
    </div>
  );
};
