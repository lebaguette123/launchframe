<script lang="ts">
    import type {CreationResult, GoProject} from "../../shared/project-config";

    let GoProj: GoProject = $state({
        name: '',
        description: '',
        gitInit: false,
        directory: '',
        modulePath: '',
    });

    async function handleCreateProject(e: SubmitEvent){
        e.preventDefault();
        isCreating = true;
        creationResult = null;

        try{
            creationResult = await window.launchframe.createGoProject(GoProj);
        }
        catch (error: unknown){
            creationResult = {
                ok: false,
                message: error instanceof Error ? error.message : String(error)
            };
        }
        finally{
            isCreating = false;
        }
    }

    let creationResult = $state<CreationResult | null>(null);
    let isCreating = $state(false);

    async function handleChooseDirectory(project: { directory: string }){
        const directory = await window.launchframe.chooseProjectDirectory();

        if (directory !== null){
            project.directory = directory;
        }
    }
</script>

<div class="page-header">
    <p class="eyebrow">Launchframe</p>
    <h1>Go Project Generator</h1>
    <p class="intro">Set up a new Go project with a few simple details.</p>
</div>

<form class="go-project-form" onsubmit={handleCreateProject}>
    <div class="form-group">
        <label class="description-label" for="name">Project Name:</label>
        <input type="text" id="name" bind:value={GoProj.name} required />
    </div>

    <div class="form-group">
        <label class="description-label" for="description">Description:</label>
        <textarea id="description" bind:value={GoProj.description}></textarea>
    </div>

    <div class="form-group checkbox-group">
        <label for="gitInit">
            <input type="checkbox" id="gitInit" bind:checked={GoProj.gitInit} />
            <span>Initialize Git Repository</span>
        </label>
    </div>

    <div class="form-group">
        <label class="description-label" for="directory">Directory:</label>
        <div class="directory-controls">
            <span class="directory-value">{GoProj.directory || 'No directory selected'}</span>
            <button
                    type="button"
                    class="secondary-button"
                    onclick={() => handleChooseDirectory(GoProj)}
            >
                Browse...
            </button>
        </div>
    </div>

    <div class="module-path-group">
        <label class="description-label" for="modulePath">Module Path:</label>
        <input type="text" id="modulePath" bind:value={GoProj.modulePath} required />
    </div>

    <button type="submit" class="primary-button" disabled={isCreating}>
        {isCreating ? 'Creating Project...' : 'Create Project'}
    </button>
</form>
{#if creationResult}
    {#if creationResult.ok}
        <section role="status">
            <h2>Project created successfully</h2>
            <p>Location:</p>
            <code>{creationResult.projectDir}</code>
        </section>
    {:else}
        <section role="alert">
            <h2>Project creation failed</h2>
            <p>{creationResult.message}</p>

            {#if creationResult.failedStep}
                <p>Failed step: {creationResult.failedStep}</p>
            {/if}

            {#if creationResult.projectDir}
                <p>
                    A partially created project may remain at:
                    <code>{creationResult.projectDir}</code>
                </p>
            {/if}
        </section>
    {/if}
{/if}

<style>
    .go-project-form {
        display: grid;
        gap: 1.25rem;
        padding: 1.5rem;
        background: var(--surface-color);
        border: 1px solid var(--surface-border);
        border-radius: 0.75rem;
        box-shadow: 0 1.5rem 3rem rgb(0 0 0 / 18%);
    }

    .module-path-group {
        display: grid;
        gap: 0.45rem;
    }
</style>