// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  closeApp: () => {
    ipcRenderer.send("close-app");
  },
  minimizeWindow: () => {
    ipcRenderer.send("minimize-window");
  },
});
