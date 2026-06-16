import { render } from "@react-three/offscreen";
import Scene from "./Scene";

render(<Scene />);

if (self.postMessage) {
  self.postMessage({ type: "three-scene-ready" });
}