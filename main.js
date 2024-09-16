import { fileURLToPath } from "url";
import path from "path";
import { app, BrowserWindow } from "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    resizable: false,
    icon: null,
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(createWindow);
