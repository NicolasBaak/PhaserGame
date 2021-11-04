const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    backgroundColor: '#70DA9C',
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.setMenu(null)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
