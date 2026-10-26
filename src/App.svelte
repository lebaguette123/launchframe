<script lang="ts">
  import type {CreationResult, PyProject} from '../shared/project-config';

  let project: PyProject = $state({
    name: '',
    description: '',
    gitInit: false,
    directory: ''
  });

  async function handleCreateProject(){
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
  <h1>Python Project Generator</h1>
  <form onsubmit={handleCreateProject}>
    <label for="name">Project Name:</label>
    <input type="text" id="name" bind:value={project.name} required />

    <label for="description">Description:</label>
    <textarea id="description" bind:value={project.description}></textarea>

    <label for="gitInit">Initialize Git Repository:</label>
    <input type="checkbox" id="gitInit" bind:checked={project.gitInit} />

    <label for="directory">Directory:</label>
    <span>{project.directory}</span>
    <button type="button" onclick={handleChooseDirectory}>Browse...</button>

    <button type="submit" disabled={isCreating}>Create Project</button>
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
