const { app, BrowserWindow, ipcMain, dialog } = require("electron");
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


// resposta de limpeza
ipcMain.on("mostrar-dialogo-confirmacao", (event) => {
  dialog.showMessageBox(mainWindow, { //mainWindow é a sua janela principal
    type: 'warning',
    buttons: ['Cancelar', 'Sim, limpar'], // O botão 0 é 'Cancelar', o 1 é 'Sim'
    defaultId: 0, // O botão 'Cancelar' é o padrão
    title: 'Confirmar Limpeza',
    message: 'Tem certeza que deseja limpar todo o conteúdo?',
    detail: 'Esta ação não pode ser desfeita.'
  }).then(resultado => {
    // se o índice do botão clicado for 1 ('Sim, limpar')
    if (resultado.response === 1) {
      // Envia uma mensagem de volta para a página para que ela execute a limpeza
      event.sender.send("limpeza-confirmada");
    }
  });
});