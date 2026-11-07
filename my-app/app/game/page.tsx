"use client";

import { useEffect, useRef } from "react";
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/nav-bar/nav-bar";
import styles from "./game.module.css";

type UnityInstance = {
  Quit: () => Promise<void>;
  SetFullscreen: (fullscreen: 0 | 1) => void;
};

type UnityConfig = {
  arguments: string[];
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
  showBanner: (message: string, type: string) => void;
};

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: UnityConfig,
      onProgress: (progress: number) => void,
    ) => Promise<UnityInstance>;
  }
}

const BUILD_URL = "/game-build/Build";
const LOADER_URL = `${BUILD_URL}/WebClientBuild.loader.js`;

export default function Game() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const warningRef = useRef<HTMLDivElement>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const loadingBar = loadingBarRef.current;
    const progressBar = progressBarRef.current;
    const warningBanner = warningRef.current;
    const fullscreenButton = fullscreenButtonRef.current;

    if (
      !container ||
      !canvas ||
      !loadingBar ||
      !progressBar ||
      !warningBanner ||
      !fullscreenButton
    ) {
      return;
    }

    let cancelled = false;
    let unityInstance: UnityInstance | undefined;
    const nativeWebSocket = window.WebSocket;
    const bakedInServer = /^wss?:\/\/98\.87\.150\.200(:\d+)?/;
    const gameServer = "wss://game.hackrpi.com";

    const patchedWebSocket = new Proxy(nativeWebSocket, {
      construct(Target, args: ConstructorParameters<typeof WebSocket>) {
        const [originalUrl, protocols] = args;
        const url =
          typeof originalUrl === "string" && bakedInServer.test(originalUrl)
            ? originalUrl.replace(bakedInServer, gameServer)
            : originalUrl;

        return protocols === undefined ? new Target(url) : new Target(url, protocols);
      },
    });

    window.WebSocket = patchedWebSocket;

    const updateBannerVisibility = () => {
      warningBanner.style.display = warningBanner.children.length ? "block" : "none";
    };

    // Shows a temporary message banner/ribbon for a few seconds, or
    // a permanent error message on top of the canvas if type=='error'.
    // If type=='warning', a yellow highlight color is used.
    // Modify or remove this function to customize the visually presented
    // way that non-critical warnings and error messages are presented to the
    // user.
    const showBanner = (message: string, type: string) => {
      const banner = document.createElement("div");
      banner.textContent = message;
      warningBanner.appendChild(banner);

      if (type === "error") {
        banner.style.cssText = "background: red; padding: 10px;";
      } else {
        if (type === "warning") {
          banner.style.cssText = "background: yellow; padding: 10px;";
        }

        window.setTimeout(() => {
          banner.remove();
          updateBannerVisibility();
        }, 5000);
      }

      updateBannerVisibility();
    };

    const config: UnityConfig = {
      arguments: [],
      dataUrl: `${BUILD_URL}/WebClientBuild.data`,
      frameworkUrl: `${BUILD_URL}/WebClientBuild.framework.js`,
      codeUrl: `${BUILD_URL}/WebClientBuild.wasm`,
      streamingAssetsUrl: "/game-build/StreamingAssets",
      companyName: "Squister",
      productName: "EatEatCloudCloud",
      productVersion: "1.0",
      showBanner,
      // errorHandler: function(err, url, line) {
      //    alert("error " + err + " occurred at line " + line);
      //    // Return 'true' if you handled this error and don't want Unity
      //    // to process it further, 'false' otherwise.
      //    return true;
      // },
    };

    // By default, Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    // config.matchWebGLToCanvasSize = false;

    // If you would like all file writes inside Unity Application.persistentDataPath
    // directory to automatically persist so that the contents are remembered when
    // the user revisits the site the next time, uncomment the following line:
    // config.autoSyncPersistentDataPath = true;
    // This autosyncing is currently not the default behavior to avoid regressing
    // existing user projects that might rely on the earlier manual
    // JS_FileSystem_Sync() behavior, but in future Unity version, this will be
    // expected to change.

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:
      container.className = styles.mobile;
      canvas.className = styles.mobileCanvas;

      // To lower canvas resolution on mobile devices to gain some
      // performance, uncomment the following line:
      // config.devicePixelRatio = 1;
    } else {
      // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
      canvas.style.width = "1360px";
      canvas.style.height = "740px";
    }

    loadingBar.style.display = "block";

    const startGame = async () => {
      if (!window.createUnityInstance) {
        showBanner("The game loader could not be initialized.", "error");
        return;
      }

      try {
        const instance = await window.createUnityInstance(canvas, config, (progress) => {
          progressBar.style.width = `${100 * progress}%`;
        });

        if (cancelled) {
          await instance.Quit();
          return;
        }

        unityInstance = instance;
        loadingBar.style.display = "none";
        fullscreenButton.onclick = () => instance.SetFullscreen(1);
      } catch (error) {
        showBanner(error instanceof Error ? error.message : String(error), "error");
      }
    };

    let loaderScript: HTMLScriptElement | undefined;

    if (window.createUnityInstance) {
      void startGame();
    } else {
      loaderScript = document.createElement("script");
      loaderScript.src = LOADER_URL;
      loaderScript.async = true;
      loaderScript.onload = () => void startGame();
      loaderScript.onerror = () => showBanner("The game loader failed to download.", "error");
      document.body.appendChild(loaderScript);
    }

    return () => {
      cancelled = true;
      fullscreenButton.onclick = null;
      loaderScript?.remove();

      if (window.WebSocket === patchedWebSocket) {
        window.WebSocket = nativeWebSocket;
      }

      if (unityInstance) {
        void unityInstance.Quit();
      }
    };
  }, []);

  return (
    <div className={styles.page}>
      <NavBar showOnScroll={false} variant={2} />

      <main className={styles.gameStage}>
        <div ref={containerRef} id="unity-container" className={styles.desktop}>
          <canvas
            ref={canvasRef}
            id="unity-canvas"
            className={styles.canvas}
            width={960}
            height={540}
            tabIndex={-1}
          />

          <div ref={loadingBarRef} id="unity-loading-bar" className={styles.loadingBar}>
            <div id="unity-logo" className={styles.logo} />
            <div id="unity-progress-bar-empty" className={styles.progressBarEmpty}>
              <div
                ref={progressBarRef}
                id="unity-progress-bar-full"
                className={styles.progressBarFull}
              />
            </div>
          </div>

          <div ref={warningRef} id="unity-warning" className={styles.warning} />

          <div id="unity-footer" className={styles.unityFooter}>
            <div id="unity-logo-title-footer" className={styles.footerLogo} />
            <button
              ref={fullscreenButtonRef}
              id="unity-fullscreen-button"
              className={styles.fullscreenButton}
              type="button"
              aria-label="Enter fullscreen"
            />
            <div id="unity-build-title" className={styles.buildTitle}>
              EatEatCloudCloud
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.siteFooter}>
        <div id="footer-ellipse" className={styles.footerEllipse} />
        <Footer />
      </footer>
    </div>
  );
}
