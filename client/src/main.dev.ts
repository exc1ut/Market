/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

const Evilscan = require('evilscan');

declare const global: any;

let address;

const options = {
  target: '172.20.10.0-172.20.10.255',
  port: '5000',
  status: 'TROU', // Timeout, Refused, Open, Unreachable
  banner: true,
};

const getServerAddress = () =>
  new Promise((res, rej) => {
    new Evilscan(options, (err: any, scan: any) => {
      if (err) {
        console.log(err);
        rej(err);
      }

      scan.on('result', (data: any) => {
        // fired when item is matching options
        console.log('response', data);
        if (data.status == 'open') res(data);
      });

      scan.on('error', () => {
        rej('error');
      });

      scan.on('done', () => {
        rej('not found');
      });

      scan.run();
    });
  });

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  try {
    address = (await getServerAddress()) as any;
    console.log('here', address);
    global.serverAddress = `${address.ip}:${address.port}`;

    mainWindow = new BrowserWindow({
      show: false,
      width: 1124,
      height: 768,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        nativeWindowOpen: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    mainWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(url);
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.allowRendererProcessReuse = false;
app
  .whenReady()
  .then(() => {
    // installExtension(REDUX_DEVTOOLS)
    //   .then((name) => console.log(`Added Extension:  ${name}`))
    //   .catch((err) => console.log('An error occurred: ', err));
  })
  .then(createWindow)
  .catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
