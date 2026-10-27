const WINDOWS_RESERVED_NAMES = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i;
const WINDOWS_INVALID_NAME_CHARACTERS = /[<>:"/\\|?*\u0000-\u001f]/;

export function validateProjectName(name: string): string {
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

export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return error instanceof Error && 'code' in error;
}