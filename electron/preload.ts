import {contextBridge, ipcRenderer} from 'electron';
import type {PyProject} from "../shared/project-config.ts";

contextBridge.exposeInMainWorld('launchframe', {
    createPythonProject: async (project: PyProject) => {
        return await ipcRenderer.invoke('project:create-python', project);
    },
    chooseProjectDirectory: async () => {
        return await ipcRenderer.invoke('dialog:choose-project-directory');
    }
});

