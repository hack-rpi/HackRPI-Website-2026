import gsap from "gsap";

export function textAnimation(
  id: string,
  speed: number = 1.0,
  delay: number = 0.0,
  effect: number = 0
) {
  const elements = document.querySelectorAll(`[id="${id}"]`);
  if (elements === null) return;
  const tl = gsap.timeline();

  if (effect == 0) {
    elements.forEach((element) => {
      const offset = Array.from(elements).indexOf(element) * (0.2 + delay);
      if (element.firstElementChild?.tagName == "B") {
        tl.to(element.children[1], { width: "100%", duration: 0.6 * speed, ease: "power1.inOut" }, offset);
        tl.to(element, { clipPath: "inset(0px 0% 0px 0px)", duration: 0.6 * speed, ease: "power1.inOut" }, offset + 0.2 * speed);
        tl.to(element.children[1], { transform: "scale(0, 1)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.8 * speed);
      } else if (element.firstElementChild !== null) {
        tl.to(element.firstElementChild, { width: "100%", duration: 0.6 * speed, ease: "power1.inOut" }, offset);
        tl.to(element, { clipPath: "inset(0px 0% 0px 0px)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.2 * speed);
        tl.to(element.firstElementChild, { transform: "scale(0, 1)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.8 * speed);
      }
    });
  } else if (effect == 1) {
    elements.forEach((element) => {
      Array.from(element.children)
        .reverse()
        .forEach((child) => {
          const offset = Array.from(element.children).indexOf(child) * (0.2 + delay);
          tl.fromTo(
            child,
            { transform: "translateY(100%)", clipPath: "inset(0px 0% 100% 0px)" },
            { transform: "translateY(0%)", clipPath: "inset(0px 0% 0% 0px)", ease: "none", duration: 0.7 * speed, force3D: true },
            offset
          );
        });
    });
  }
}
