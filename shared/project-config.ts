export interface PyProject{
    name: string;
    description: string;
    gitInit: boolean;
    directory: string;
    framework: 'none' | 'flask';
}

export interface GoProject{
    name: string;
    description: string;
    gitInit: boolean;
    directory: string;
    modulePath: string;
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

export interface ProjInfo{
    name: string;
    directory: string;
}

export type CreationResult = Success | Failure;