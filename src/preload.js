const { contextBridge, ipcRenderer } = require('electron');

const electronApi = {
  startSinInterval: () => ipcRenderer.send('startSinInterval'),
  stopSinInterval: () => ipcRenderer.send('stopSinInterval'),
  startRandomInterval: () => ipcRenderer.send('startRandomInterval'),
  stopRandomInterval: () => ipcRenderer.send('stopRandomInterval'),
  startStepInterval: () => ipcRenderer.send('startStepInterval'),
  stopStepInterval: () => ipcRenderer.send('stopStepInterval'),
  onSinValue: (callback) => ipcRenderer.on('sinValue', (_, data) => callback(data)),
  onRandomValue: (callback) => ipcRenderer.on('randomValue', (_, data) => callback(data)),
  onStepValue: (callback) => ipcRenderer.on('stepValue', (_, data) => callback(data)),
  onAllValue: (callback) => ipcRenderer.on('allValue', (_, data) => callback(data)),
  onViewSign: (callback) => ipcRenderer.on('viewSign', (_, data) => callback(data)),
  onUpdatePlotLines: (callback) => ipcRenderer.on('viewSign', (_, data) => callback(data)),
  startViewAll: () => ipcRenderer.send('startViewAll'),
  stopScroll: () => ipcRenderer.send('stopScroll'),
};

contextBridge.exposeInMainWorld('electronApi', electronApi);