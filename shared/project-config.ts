export interface PyProject{
    name: string;
    description: string;
    gitInit: boolean;
    directory: string;
}

interface Success{
    ok: true;
    projectDir: string;
}
interface Failure{
    ok: false;
    message: string;
    projectDir?: string;
    failedStep?: string;
    completedSteps?: readonly string[];
}

export type CreationResult = Success | Failure;