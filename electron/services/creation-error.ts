export class ProjectCreationError extends Error {
    readonly projectDir: string;
    readonly failedStep: string;
    readonly completedSteps: readonly string[];

    constructor(
        message: string,
        projectDir: string,
        failedStep: string,
        completedSteps: readonly string[],
        options?: ErrorOptions,
    ) {
        super(message, options);
        this.name = 'ProjectCreationError';
        this.projectDir = projectDir;
        this.failedStep = failedStep;
        this.completedSteps = completedSteps;
    }
}