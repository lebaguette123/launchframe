import type { PyProject } from '../../shared/project-config.js';
import path from 'node:path';
import fs from 'node:fs/promises';

const WINDOWS_RESERVED_NAMES = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
const WINDOWS_INVALID_NAME_CHARACTERS = /[<>:"/\\|?*\u0000-\u001f]/;

function validateProjectName(name: string): string {
    const trimmedName = name.trim();

    if (trimmedName === '') {
        throw new Error('Project name is required.');
    }

    if (trimmedName === '.' || trimmedName === '..') {
        throw new Error('Project name cannot be "." or "..".');
    }

    if (WINDOWS_INVALID_NAME_CHARACTERS.test(trimmedName)) {
        throw new Error('Project name contains characters that are not allowed in Windows directory names.');
    }

    if (/[. ]$/.test(trimmedName)) {
        throw new Error('Project name cannot end with a space or period on Windows.');
    }

    if (trimmedName.length > 255) {
        throw new Error('Project name cannot exceed 255 characters on Windows.');
    }

    if (WINDOWS_RESERVED_NAMES.test(trimmedName)) {
        throw new Error(`"${trimmedName}" is reserved by Windows and cannot be used as a project name.`);
    }

    return trimmedName;
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return error instanceof Error && 'code' in error;
}

export async function createProject(project: PyProject): Promise<string> {
    const projectName = validateProjectName(project.name);
    const parentDir = project.directory.trim();

    if (parentDir === '') {
        throw new Error('Project directory is required.');
    }

    if (!path.isAbsolute(parentDir)) {
        throw new Error('Project directory must be an absolute path.');
    }

    let parentStats: Awaited<ReturnType<typeof fs.stat>>;

    try{
        parentStats = await fs.stat(parentDir);
    } catch (err: unknown){
        if (isNodeError(err) && err.code === 'ENOENT') {
            throw new Error(`Parent directory does not exist: ${parentDir}`, { cause: err });
        }

        throw new Error(`Unable to inspect parent directory: ${parentDir}`, { cause: err });
    }

    if (!parentStats.isDirectory()) {
        throw new Error(`Project parent path is not a directory: ${parentDir}`);
    }

    const projectDir = path.join(parentDir, projectName);

    try {
        await fs.mkdir(projectDir);
    } catch (err: unknown) {
        if (isNodeError(err) && err.code === 'EEXIST') {
            throw new Error(`A project directory already exists at: ${projectDir}`, { cause: err });
        }

        throw new Error(`Unable to create project directory: ${projectDir}`, { cause: err });
    }

    return projectDir;
}