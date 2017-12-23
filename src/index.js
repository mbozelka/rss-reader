
import './assets/styles/index.scss';
import { ipcRenderer } from 'electron';


// example calling the IPC Renderer in electron
// set in electron-index.js
ipcRenderer.send('test:added', 'Hello from index.js');

