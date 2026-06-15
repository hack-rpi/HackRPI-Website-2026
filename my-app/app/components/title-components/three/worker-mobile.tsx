import { render } from "@react-three/offscreen";
import Scene from "./Scene";
import { useState } from "react";
import SceneOnLoad from "./Scene";

const [isLoading, setIsLoading] = useState(true);
render(<SceneOnLoad onLoaded={() => setIsLoading(false)} />);
