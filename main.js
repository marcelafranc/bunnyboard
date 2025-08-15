const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 450,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    parent: null,
    modal: false
  });

  mainWindow.loadFile(path.join(__dirname, "login.html"));
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on("login-sucesso", () => {
  mainWindow.loadFile(path.join(__dirname, "lousa.html"));
});

// ipcMain.on("login-invalido", () => {
//   dialog.showErrorBox("Erro de Login", "Usuário ou senha inválidos.");
// });