import {app, BrowserWindow} from 'electron';
import path from 'path'

app.whenReady().then(() => {
    const win = new BrowserWindow({
        title: 'Main window',
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(import.meta.dirname, '../preload/index.js'),
        },
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        // Load your file
        win.loadFile('dist/index.html')
    }
})
