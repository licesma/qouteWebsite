import * as React from "react";
import type { LeftMenuElement } from "./LibraryLeftMenu";
import { Inter } from "@next/font/google";
import styles from "./LeftMenuItem.module.css";

export interface LeftMenuElementProps {
  menuElement: LeftMenuElement;
  selectedItem: LeftMenuElement;
  onClick: () => void;
}

export const LeftMenuItem: React.FunctionComponent<LeftMenuElementProps> = (
  props
) => {
  const { menuElement, selectedItem, onClick } = props;
  const isSelected = menuElement === selectedItem;

  React.useEffect(() => {
    console.log(menuElement, isSelected);
  });

  return (
    <div className={styles.leftMenuElement} key={menuElement}>
      <div
        className={styles.topBar}
        key={`${menuElement}_top`}
        style={{ display: isSelected ? undefined : "none" }}
      >
        <div className={styles.topBarInner} key={`${menuElement}_top_inner`} />
      </div>
      <div
        className={styles.leftMenuTextElement}
        key={`${menuElement}_text`}
        onClick={onClick}
        style={{
          backgroundColor: isSelected ? "rgb(238, 232, 217)" : "white",
          color: isSelected ? "rgb(49,49,49)" : "rgb(80,80,80)",
          fontWeight: isSelected ? "700" : undefined,
        }}
      >
        {menuElement}
      </div>
      <div
        className={styles.bottomBar}
        key={`${menuElement}_bottom`}
        style={{ display: isSelected ? undefined : "none" }}
      >
        <div
          className={styles.bottomBarInner}
          key={`${menuElement}_bottom_inner`}
        />
      </div>
    </div>
  );
};
