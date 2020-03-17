import React, { useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import { Excalidraw } from "@mizchi/excalidraw";

function App(props: { initialState: any }) {
  const [state, setState] = useState<any | null>(props.initialState);

  const [age, setAge] = useState<number>(0);

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
          <div>
            <button
              onClick={() => {
                chrome.storage.sync.set({ state1: state }, () => {
                  console.log("saved");
                });
              }}
            >
              save[1]
            </button>
            <button
              onClick={() => {
                chrome.storage.sync.get(["state1"], result => {
                  setState(result.state1);
                  setAge(n => n + 1);
                });
              }}
            >
              load[1]
            </button>
            |
            <button
              onClick={() => {
                chrome.storage.sync.set({ state2: state }, () => {
                  console.log("saved");
                });
              }}
            >
              save[2]
            </button>
            <button
              onClick={() => {
                chrome.storage.sync.get(["state2"], result => {
                  setState(result.state2);
                  setAge(n => n + 1);
                });
              }}
            >
              load[2]
            </button>
          </div>
        </header>
        <div style={{ width: "100%", height: "calc(100% - 32px)" }}>
          <Excalidraw
            key={age}
            initialState={state || undefined}
            width={size.width}
            height={size.height}
            onChange={(appState: any) => {
              setState(appState);
            }}
          />
        </div>
      </div>
    )
  );
}

chrome.storage.sync.get(["state1"], result => {
  ReactDOM.render(
    <App initialState={result.state1} />,
    document.querySelector("main")
  );
});
