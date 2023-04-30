import { QuoteData } from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import { LeftMenuItem } from "./LeftMenuItem";
import * as React from "react";
import styles from "./LibraryLeftMenu.module.css";

const LEFT_MENU_ELEMENTS = [
  "All Quotes",
  "Favorites",
  "Authors",
  "Sources",
] as const;

export type LeftMenuElement = typeof LEFT_MENU_ELEMENTS[number];

export const LibraryLeftMenu: React.FunctionComponent = () => {
  const [selectedItem, setSelectedItem] =
    React.useState<LeftMenuElement>("All Quotes");

  return (
    <div className={styles.leftMenu}>
      {LEFT_MENU_ELEMENTS.map((menuElement) => (
        <LeftMenuItem
          key={menuElement}
          menuElement={menuElement}
          selectedItem={selectedItem}
          onClick={() => {
            setSelectedItem(menuElement);
          }}
        />
      ))}
    </div>
  );
};
