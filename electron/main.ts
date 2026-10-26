import {app, BrowserWindow, dialog} from 'electron';
import path from 'path'
import { ipcMain } from 'electron';
import type {CreationResult, PyProject} from "../shared/project-config.ts";
import {createProject, ProjectCreationError} from "./services/project-generators.ts";

app.whenReady().then(() => {
    const win = new BrowserWindow({
        title: 'Main window',
        width: 800, height: 600,
        webPreferences: {
            preload: path.join(import.meta.dirname, 'preload.mjs'),
        },
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        // Load your file
        win.loadFile('dist/index.html')
    }
})

ipcMain.handle('project:create-python', async (_event, project: PyProject): Promise<CreationResult> => {
    try {
        const dir = await createProject(project);
        return {ok: true, projectDir: dir};
    } catch (error: unknown){
        if (error instanceof ProjectCreationError) {
            return {
                ok: false,
                message: error.message,
                projectDir: error.projectDir,
                failedStep: error.failedStep,
                completedSteps: error.completedSteps
            };
        }

        return {
            ok: false,
            message: error instanceof Error ? error.message : String(error)
        };
    }
});

ipcMain.handle('dialog:choose-project-directory', async (): Promise<string | null> => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory'],
    });
    const [directory] = result.filePaths;
    return result.canceled ? null : directory ?? null;
});
