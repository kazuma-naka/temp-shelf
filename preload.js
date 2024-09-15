import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  readFile: (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsText(file);
  },
});
