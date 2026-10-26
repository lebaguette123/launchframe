import { PyProject, CreationResult } from "../shared/project-config.ts";

declare global {
    interface Window{
        launchframe: {
            createPythonProject(project: PyProject): Promise<CreationResult>;
            chooseProjectDirectory(): Promise<string | null>;
        };
    }
}