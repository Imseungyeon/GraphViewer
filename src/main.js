const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    },
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

let currentX= [0, 0, 0];
let stepInterval;

let a = Math.PI / 540;
let count = 0;

ipcMain.on('startSinInterval', () => {
  sinInterval = setInterval(() => {
    const variable14Value = Math.sin(a * currentX[0]) * 127.5 + 0.5;
    const currentTime = new Date();
    const timeInterval = previousTime ? currentTime - previousTime : 0;
    previousTime = currentTime;
    mainWindow.webContents.send('variable14Value', { xValue: currentX[0], variable14Value });
    currentX[0] += timeInterval;
  }, 30);
});

let variable15Value = Math.floor(Math.random() * 255) - 127;

ipcMain.on('startRandomInterval', () => {
  randomInterval = setInterval(() => {
    count++;
    const currentTime = new Date();
    const timeInterval = previousTime ? currentTime - previousTime : 0;
    previousTime = currentTime;
    if (count > 16) {
      variable15Value = Math.floor(Math.random() * 255) - 127;
      count = 0;
    }
    mainWindow.webContents.send('variable15Value', { xValue: currentX[1], variable15Value });
    currentX[1] += timeInterval;
  }, 30);
});

let flag = true;
let variable16Value = -120;
let previousTime = null;
let variable1Value = 120;
let variable2Value = -100;

//30ms마다 랜덤값 변경
let variable3Value = 0;
let variable4Value = 0;
let variable5Value = 0;

//500ms마다 랜덤값 변경
let variable6Value = Math.floor(Math.random() * 255) - 127;
let variable7Value = Math.floor(Math.random() * 255) - 127;
let variable8Value = Math.floor(Math.random() * 255) - 127;
let variable9Value = Math.floor(Math.random() * 255) - 127;
let variable10Value = Math.floor(Math.random() * 255) - 127;
let variable11Value = Math.floor(Math.random() * 255) - 127;
let variable12Value = Math.floor(Math.random() * 255) - 127;
let variable13Value = -85;

ipcMain.on('startStepInterval', () => {
  stepInterval = setInterval(() => {
    const currentTime = new Date();
    const timeInterval = previousTime ? currentTime - previousTime : 0;
    previousTime = currentTime;
    if (variable16Value > 128 || variable16Value < -127) {
      flag = !flag;
    }

    if (count > 16 && flag) {
      variable15Value = Math.floor(Math.random() * 255) - 127;
      variable6Value = Math.floor(Math.random() * 255) - 127;
      variable7Value = Math.floor(Math.random() * 255) - 127;
      variable8Value = Math.floor(Math.random() * 255) - 127;
      variable9Value = Math.floor(Math.random() * 255) - 127;
      variable10Value = Math.floor(Math.random() * 255) - 127;
      variable11Value = Math.floor(Math.random() * 255) - 127;
      variable12Value = Math.floor(Math.random() * 255) - 127;
      variable16Value += 10;
      variable2Value += 10;
      variable1Value -= 10;
      count = 0;
    } else if (count > 16 && flag === false) {
      variable15Value = Math.floor(Math.random() * 255) - 127;
      variable6Value = Math.floor(Math.random() * 255) - 127;
      variable7Value = Math.floor(Math.random() * 255) - 127;
      variable8Value = Math.floor(Math.random() * 255) - 127;
      variable9Value = Math.floor(Math.random() * 255) - 127;
      variable10Value = Math.floor(Math.random() * 255) - 127;
      variable11Value = Math.floor(Math.random() * 255) - 127;
      variable12Value = Math.floor(Math.random() * 255) - 127;
      variable16Value -= 10;
      variable2Value -= 10;
      variable1Value += 10;
      count = 0;
    }
    
    mainWindow.webContents.send('variable16Value', { xValue: currentX[2], variable16Value });
    currentX[2] += timeInterval;
  }, 30);
});

ipcMain.on('startViewAll', () => {
  interval30 = setInterval(() => {
    count++;
    const currentTime = new Date();
    const timeInterval = previousTime ? currentTime - previousTime : 0;
    previousTime = currentTime;

    const variable14Value = Math.sin(a * currentX[0]) * 127.5 + 0.5;

    variable3Value = Math.floor(Math.random() * 255) - 127;
    variable4Value = Math.floor(Math.random() * 255) - 127;
    variable5Value = Math.floor(Math.random() * 255) - 127;
    
    //variable16Value 증가/감소 결정 위한 flag 설정
    if (variable16Value > 128 || variable16Value < -127) {
      flag = !flag;
    }
    // count > 16 : variable16Value, variable15Value 값 변경 주기 약 500ms로 설정
    if (count > 16 && flag) {
      variable15Value = Math.floor(Math.random() * 255) - 127;
      variable6Value = Math.floor(Math.random() * 255) - 127;
      variable7Value = Math.floor(Math.random() * 255) - 127;
      variable8Value = Math.floor(Math.random() * 255) - 127;
      variable9Value = Math.floor(Math.random() * 255) - 127;
      variable10Value = Math.floor(Math.random() * 255) - 127;
      variable11Value = Math.floor(Math.random() * 255) - 127;
      variable12Value = Math.floor(Math.random() * 255) - 127;
      variable16Value += 10;
      variable2Value += 10;
      variable1Value -= 10;
      count = 0;
    } else if (count > 16 && flag === false) {
      variable15Value = Math.floor(Math.random() * 255) - 127;
      variable6Value = Math.floor(Math.random() * 255) - 127;
      variable7Value = Math.floor(Math.random() * 255) - 127;
      variable8Value = Math.floor(Math.random() * 255) - 127;
      variable9Value = Math.floor(Math.random() * 255) - 127;
      variable10Value = Math.floor(Math.random() * 255) - 127;
      variable11Value = Math.floor(Math.random() * 255) - 127;
      variable12Value = Math.floor(Math.random() * 255) - 127;
      variable16Value -= 10;
      variable2Value -= 10;
      variable1Value += 10;
      count = 0;
    }

    mainWindow.webContents.send('allValue', {xValue: currentX[0], variable14Value, variable15Value, variable16Value, variable1Value, variable2Value, 
                                variable3Value, variable4Value, variable5Value, variable6Value, variable7Value, variable8Value, variable9Value,
                                variable10Value, variable11Value, variable12Value, variable13Value});
    mainWindow.webContents.send('viewSign',true);                            
    currentX[0] += timeInterval;
  }, 30)
});

ipcMain.on('stopScroll', () => {
  clearInterval(interval30);
});