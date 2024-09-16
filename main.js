import { fileURLToPath } from "url";
import path from "path";
import { app, BrowserWindow, screen } from "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  const { height } = screen.getPrimaryDisplay().workAreaSize;
  const windowHeight = height / 2;
  const centeredY = (height - windowHeight) / 2;

  mainWindow = new BrowserWindow({
    width: 500,
    height: windowHeight,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    resizable: false,
    icon: path.join(__dirname, "img/place_item.png"),
    alwaysOnTop: true,
    x: 0,
    y: centeredY,
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
});
