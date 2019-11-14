// npm run electron : Run the electron script that opens a new window of the project as a Electron App
// electron-packager ./ Platzingery --platform=win32 --icon src\assets\img\logo_live.ico : Package the project as an electron App that build an exportable version. 

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/platzinger/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})