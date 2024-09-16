import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onFileAdded: (callback) => ipcRenderer.on("file-added", callback),
  dropFile: (file) => ipcRenderer.send("file-dropped", file),
  clearFiles: () => ipcRenderer.send("clear-files"),
});
