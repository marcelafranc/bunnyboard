const {app, BrowserWindow} = require ('electron')

let mainWindow;

app.whenReady().then(() => {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    })  
    
    mainWindow.loadFile('index.html'); // oq ela (mainwindow) tem q carregar como conteudo da page

})