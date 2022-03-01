import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile('dist/index.html');
}

app.whenReady().then(() => {
  createWindow();
});
