import lottie, { AnimationItem } from "lottie-web";
import * as React from "react";

export type AnimationTrigger = "Click" | "Auto";

export type AnimationSource = "Success";

export interface UseAnimationProps {
  source: AnimationSource;
  containerRef: React.RefObject<HTMLDivElement>;
  allowOnClickInterruption?: boolean;
  triggerType: AnimationTrigger;
  loop?: boolean;
}

export interface UseAnimationResponse {
  triggerAnimation: () => void;
}

export const useAnimation = (
  props: UseAnimationProps
): UseAnimationResponse => {
  const { source, containerRef, triggerType, loop, allowOnClickInterruption } =
    props;
  const [hasAnimationLoaded, setHasAnimationLoaded] = React.useState(false);
  const [isAnimationCompleted, setIsAnimationCompleted] = React.useState(false);
  const [animation, setAnimation] = React.useState<AnimationItem | undefined>(
    undefined
  );

  React.useEffect(() => {
    console.log("current", containerRef.current);
    if (containerRef.current && !hasAnimationLoaded) {
      const animationItem = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: !!loop,
        autoplay: triggerType === "Auto",
        animationData: getAnimationPath(source),
      });
      setAnimation(animationItem);

      animationItem.addEventListener("complete", () => {
        setIsAnimationCompleted(true);
      });

      setHasAnimationLoaded(true);
    }
  }, [
    containerRef,
    hasAnimationLoaded,
    source,
    allowOnClickInterruption,
    loop,
    triggerType,
  ]);

  const triggerAnimation = React.useCallback(() => {
    if (triggerType === "Click") {
      console.log(animation);
      animation?.goToAndPlay(0, true);
      setIsAnimationCompleted(false);
    }
  }, [animation]);

  React.useEffect(() => console.log(animation), [animation]);
  React.useEffect(() => console.log(triggerAnimation), [triggerAnimation]);
  return { triggerAnimation };
};

const getAnimationPath = (source: AnimationSource): NodeRequire => {
  switch (source) {
    case "Success":
      return require("./../../public/animation.json");
  }
};
