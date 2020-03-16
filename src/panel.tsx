import React, { useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { Excalidraw } from "@mizchi/excalidraw";

function App() {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );

  const headerHight = 32;

  // Resize
  useLayoutEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight - headerHight
    });
    const onResize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - headerHight
      });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    size && (
      <div style={{ width: "100vw", height: "100vh" }}>
        {/* Use extension header later */}
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "32px",
            color: "white",
            background: "#333"
          }}
        >
          --- excalidraw ---
        </header>
        <div style={{ width: "100%", height: "calc(100% - 32px)" }}>
          <Excalidraw
            width={size.width}
            height={size.height}
            onChange={(appState: any) => {
              console.log(appState);
            }}
          />
        </div>
      </div>
    )
  );
}

ReactDOM.render(<App />, document.querySelector("main"));
