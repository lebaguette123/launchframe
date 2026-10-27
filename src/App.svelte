<script lang="ts">
  import type {CreationResult, PyProject} from '../shared/project-config';

  let project: PyProject = $state({
    name: '',
    description: '',
    gitInit: false,
    directory: ''
  });

  async function handleCreateProject(event: SubmitEvent){
    event.preventDefault();
    isCreating = true;
    creationResult = null;

    try{
      creationResult = await window.launchframe.createPythonProject($state.snapshot(project));
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

  async function handleChooseDirectory(){
    const directory = await window.launchframe.chooseProjectDirectory();

    if (directory !== null){
      project.directory = directory;
    }
  }

  let creationResult = $state<CreationResult | null>(null);
  let isCreating = $state(false);

</script>

<main>
  <div class="page-header">
    <p class="eyebrow">Launchframe</p>
    <h1>Python Project Generator</h1>
    <p class="intro">Set up a new Python project with a few simple details.</p>
  </div>
  <form class="python-project-form" onsubmit={handleCreateProject}>
    <div class="form-group">
      <label class="description-label" for="name">Project Name:</label>
      <input type="text" id="name" bind:value={project.name} required />
    </div>

    <div class="form-group">
      <label class="description-label" for="description">Description:</label>
      <textarea id="description" bind:value={project.description}></textarea>
    </div>

    <div class="form-group checkbox-group">
      <label for="gitInit">
        <input type="checkbox" id="gitInit" bind:checked={project.gitInit} />
        <span>Initialize Git Repository</span>
      </label>
    </div>

    <div class="form-group">
      <label class="description-label" for="directory">Directory:</label>
      <div class="directory-controls">
        <span class="directory-value">{project.directory || 'No directory selected'}</span>
        <button type="button" class="secondary-button" onclick={handleChooseDirectory}>Browse...</button>
      </div>
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
</main>
