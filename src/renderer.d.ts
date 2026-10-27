import { PyProject, CreationResult, GoProject } from "../shared/project-config.ts";

declare global {
    interface Window{
        launchframe: {
            createPythonProject(project: PyProject): Promise<CreationResult>;
            createGoProject(project: GoProject): Promise<CreationResult>;
            chooseProjectDirectory(): Promise<string | null>;
        };
    }
}