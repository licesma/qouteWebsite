import { Inter } from "@next/font/google";
import { useAnimation } from "@/hooks/useAnimation";
import * as React from "react";
import styles from "./auth.module.css";
import lottie, { AnimationItem } from "lottie-web";

const inter = Inter({ subsets: ["latin"] });

export default function SignInPage() {
  const container = React.useRef<HTMLDivElement>(null);

  const { triggerAnimation } = useAnimation({
    source: "Success",
    containerRef: container,
    triggerType: "Auto",
  });
  return (
    <>
      <main className={styles.main}>
        <div className="container">
          <div className="esteban" ref={container}>
            Esteban
          </div>
          <button onClick={triggerAnimation}>trigger animation</button>
        </div>
      </main>
      <div className={styles.footer}>Made with ♥ in CDMX.</div>
    </>
  );
}
