import { Inter } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { MainLogo } from "./MainLogo";
import { Overlay } from "./Overlay";
import styles from "./NavigationBar.module.css";

const inter = Inter({ subsets: ["latin"] });

export interface MainLogoProps {}

type NavigationBarItem = "YourLibrary" | "Explore" | "About";

export const NavigationBar: React.FunctionComponent<MainLogoProps> = (
  props
) => {
  const [selectedItem, setSelectedItem] =
    React.useState<NavigationBarItem>("YourLibrary");

  React.useEffect(() => console.log(selectedItem));

  return (
    <div className={styles.container}>
      <MainLogo />
      <div
        className={styles.card}
        onClick={() => setSelectedItem("YourLibrary")}
      >
        <h2
          className={inter.className}
          style={getDynamicStyle("YourLibrary", selectedItem)}
        >
          Your Library
          <span style={getSpanDynamicStyle("YourLibrary", selectedItem)}>
            -&gt;
          </span>
        </h2>
      </div>
      <div className={styles.card} onClick={() => setSelectedItem("Explore")}>
        <h2
          className={inter.className}
          style={getDynamicStyle("Explore", selectedItem)}
        >
          Explore
          <span style={getSpanDynamicStyle("Explore", selectedItem)}>
            -&gt;
          </span>
        </h2>
      </div>

      <div className={styles.card} onClick={() => setSelectedItem("About")}>
        <h2
          className={inter.className}
          style={getDynamicStyle("About", selectedItem)}
        >
          About
          <span style={getSpanDynamicStyle("About", selectedItem)}>-&gt;</span>
        </h2>
      </div>

      <a className={styles.card}>
        <h2
          className={inter.className}
          style={getDynamicStyle("About", selectedItem)}
        >
          Sign In
          <span style={getSpanDynamicStyle("About", selectedItem)}>-&gt;</span>
        </h2>
      </a>
    </div>
  );
};

const getDynamicStyle = (
  item: NavigationBarItem,
  selectedItem: NavigationBarItem
) => {
  return item === selectedItem
    ? {
        color: "hsl(237, 99%, 56%)",
        textShadow: "0 0 0.5em hsl(0 0% 100% / 0.3), 0 0 1em currentColor",
        fontWeight: "700",
      }
    : undefined;
};

const getSpanDynamicStyle = (
  item: NavigationBarItem,
  selectedItem: NavigationBarItem
) => {
  return item === selectedItem
    ? {
        display: "none",
      }
    : undefined;
};
