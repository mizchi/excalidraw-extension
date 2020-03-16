chrome.devtools.panels.create(
  "Excalidraw",
  "", // icon path
  "./panel.html",
  panel => {
    console.log("created", panel);
  }
);
