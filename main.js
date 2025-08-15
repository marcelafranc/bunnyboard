const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 550,
    height: 650,
    resizable: false,
    transparent: true,
    preload: path.join(__dirname, 'preload.js'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar:true,
    frame: false,
    parent: null,
    modal: false
  });
  
  mainWindow.loadFile(path.join(__dirname, "login.html"));
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// login bem sucedido!
ipcMain.on("login-sucesso", () => {
  mainWindow.loadFile(path.join(__dirname, "lousa.html"));
});

// ouve a msg de minimizar o app
ipcMain.on("minimize-app", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

// ouve a msg de fechar o app
ipcMain.on("close-app", () => {
  if (mainWindow) {
    mainWindow.close();
  }
});