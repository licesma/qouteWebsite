import { inter_cn } from "@/components/fonts";
import * as React from "react";
import styles from "./Toggle.module.css";

export interface ToggleProps {
  leftLabel: string;
  rightLabel: string;
  onChange: () => void;
}

const width = 140;

export const Toggle: React.FunctionComponent<ToggleProps> = (props) => {
  const { leftLabel, rightLabel, onChange } = props;
  const [isToggelOn, setIsToggleOn] = React.useState(false);

  return (
    <button
      className={styles.container}
      style={{ width: `${width}px` }}
      onClick={() => {
        setIsToggleOn((past) => !past);
        onChange();
      }}
    >
      <div className={styles.pillContainer}>
        <div
          className={styles.pill}
          style={{
            transform: isToggelOn ? `translate(${width / 2 - 4}px)` : undefined,
          }}
        ></div>
      </div>
      <div className={styles.labelsContainer}>
        <div
          className={inter_cn(styles.leftLabel)}
          style={{
            width: width / 2,
            color: isToggelOn ? "#909090" : "#050505",
          }}
        >
          {leftLabel}
        </div>
        <div
          className={inter_cn(styles.rightLabel)}
          style={{
            width: width / 2,
            color: isToggelOn ? "#050505" : "#909090",
          }}
        >
          {rightLabel}
        </div>
      </div>
    </button>
  );
};
