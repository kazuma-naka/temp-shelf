const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  closeApp: () => {
    ipcRenderer.send("close-app");
  },
  minimizeWindow: () => {
    ipcRenderer.send("minimize-window");
  },
  saveFileToTemp: async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      // eslint-disable-next-line no-undef
      const buffer = Buffer.from(arrayBuffer);
      return await ipcRenderer.invoke("save-file-to-temp", {
        name: file.name,
        data: buffer,
      });
    } catch (error) {
      console.error("Error in saveFileToTemp:", error);
      throw error;
    }
  },
  startDrag: (files) => {
    const fileData = files.map((file) => ({
      name: file.name,
      path: file.path,
    }));
    ipcRenderer.send("start-drag", fileData);
  },
});
