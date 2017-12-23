const env = process.argv;
const electron = require('electron');
const default_config = require('./config/defaults');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require('path');
const url = require('url');
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  const app_url = (env[2] === 'development') ? default_config.HOST : url.format({
    pathname: path.join(__dirname, default_config.PUBLIC_ENTRY),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(app_url);

  // Open the DevTools.
  // Install React Dev Tools and Redux dev tools
  if((env[2] === 'development')){
    mainWindow.webContents.openDevTools();
    installExtension(REACT_DEVELOPER_TOOLS).then(extensionInstallSuccess).catch(extensionInstallError);
    installExtension(REDUX_DEVTOOLS).then(extensionInstallSuccess).catch(extensionInstallError);
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

}

function extensionInstallSuccess(name){
  console.log(`Added Extension:  ${name}`);
}

function extensionInstallError(err){
  console.log('An error occurred: ', err);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


ipcMain.on('test:added', (event, message) => {
  console.log(message);
});