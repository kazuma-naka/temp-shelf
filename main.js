import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import os from "os";
import { app, BrowserWindow, screen, ipcMain } from "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  const { height } = screen.getPrimaryDisplay().workAreaSize;
  const windowHeight = height / 2;
  const centeredY = (height - windowHeight) / 2;

  mainWindow = new BrowserWindow({
    width: 250,
    height: windowHeight,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
    resizable: false,
    icon: path.join(__dirname, "img/place_item.png"),
    alwaysOnTop: true,
    x: 0,
    y: centeredY,
    frame: false,
  });

  mainWindow.loadFile("index.html");

  ipcMain.on("close-app", () => {
    app.quit();
  });

  ipcMain.on("minimize-window", () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle("save-file-to-temp", async (_, { name, data }) => {
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, name);
    await fs.promises.writeFile(tempFilePath, data);
    return tempFilePath;
  });

  ipcMain.handle("drag-files", async (_, files) => {
    const filePaths = files.map((file) => file.path);

    if (filePaths.every((filePath) => fs.existsSync(filePath))) {
      mainWindow.webContents.startDrag({
        files: filePaths,
        icon: path.join(__dirname, "img", "drag-and-drop.png"),
      });
      return { success: true };
    } else {
      console.error("One or more files do not have a valid path.");
    }
  });
}

app.whenReady().then(() => {
  createWindow();
});
