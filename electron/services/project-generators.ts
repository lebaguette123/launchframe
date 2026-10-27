import type {GoProject, PyProject} from '../../shared/project-config.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import {execFile} from "node:child_process";
import {promisify} from "node:util";
import {getErrorMessage, createProjectDirectory} from "../utilities/utility-functions.ts";
import {ProjectCreationError} from "./creation-error.ts";



export async function createPythonProject(project: PyProject): Promise<string> {
    const projectDir = await createProjectDirectory(project);

    const completedSteps = ['project directory'];
    let failedStep = 'virtual environment';

    try {
        await promisify(execFile)('python', ['-m', 'venv', '.venv'], {cwd: projectDir});
        completedSteps.push('virtual environment');

        failedStep = 'main.py';
        await fs.writeFile(path.join(projectDir, 'main.py'), "print(\"Hello, world!\")");
        completedSteps.push('main.py');

        failedStep = 'README.md';
        await fs.writeFile(path.join(projectDir, 'README.md'), `# ${project.name} \n\n ${project.description}`);
        completedSteps.push('README.md');

        failedStep = '.gitignore';
        await fs.writeFile(path.join(projectDir, '.gitignore'), ".venv/\n__pycache__/\n*.py[cod]\n");
        completedSteps.push('.gitignore');

        if (project.gitInit) {
            failedStep = 'git repository';
            await promisify(execFile)('git', ['init'], {cwd: projectDir});
            completedSteps.push('git repository');
        }

        return projectDir;
    } catch (error: unknown) {
        const operationError = new Error(`Error creating ${failedStep}: ${getErrorMessage(error)}`, {cause: error});

        throw new ProjectCreationError(
            `${operationError.message} The project was partially created at: ${projectDir}`,
            projectDir,
            failedStep,
            completedSteps,
            {cause: operationError},
        );
    }
}

export async function createGoProject(project: GoProject): Promise<string>{
    const projectDir = await createProjectDirectory(project);

    const completedSteps = ['project directory'];
    let failedStep = 'go module';

    try{
        await promisify(execFile)('go', ['mod', 'init', 'example.com/'+project.modulePath], {cwd: projectDir});
        completedSteps.push('go module');

        failedStep = 'main.go';
        await fs.writeFile(path.join(projectDir, 'main.go'), 'package main\n\nimport \"fmt\"\n\nfunc main(){\n\tfmt.Println(\"Hello, world!\")\n}');
        completedSteps.push('main.go');

        failedStep = 'README.md';
        await fs.writeFile(path.join(projectDir, 'README.md'), `# ${project.name} \n\n ${project.description}`);
        completedSteps.push('README.md');

        failedStep = '.gitignore';
        await fs.writeFile(path.join(projectDir, '.gitignore'), `# Compiled binaries
*.exe
*.exe~
*.dll
*.so
*.dylib

# Go test binaries
*.test

# Test and coverage output
*.out
coverage.*
*.coverprofile
*.cover
profile.cov

# Local environment variables
.env
`);
        completedSteps.push('.gitignore');

        if (project.gitInit) {
            failedStep = 'git repository';
            await promisify(execFile)('git', ['init'], {cwd: projectDir});
            completedSteps.push('git repository');
        }

        return projectDir;
    }
    catch (error: unknown){
        const operationError = new Error(`Error creating ${failedStep}: ${getErrorMessage(error)}`, {cause: error});

        throw new ProjectCreationError(
            `${operationError.message} The project was partially created at: ${projectDir}`,
            projectDir,
            failedStep,
            completedSteps,
            {cause: operationError},
        );
    }
}