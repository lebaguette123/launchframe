<script lang="ts">
  import LanguageSelector, {type ProjectKind} from "./lib/LanguageSelector.svelte";
  import PythonProjectForm from "./lib/PythonProjectForm.svelte";
  import GoProjectForm from "./lib/GoProjectForm.svelte";

  let selectedLanguage = $state<ProjectKind>('python');

  function selectLanguage(language: ProjectKind){
    selectedLanguage = language;
  }
</script>

<main>
  <div class="page-header">
    <p class="eyebrow">Launchframe</p>

    <h1>
      {selectedLanguage === 'python' ? 'Python' : 'Go'}
    </h1>
  </div>

  <LanguageSelector
          value={selectedLanguage}
          onChange={selectLanguage}
  />

  {#if selectedLanguage === 'python'}
    <PythonProjectForm/>
  {:else}
    <GoProjectForm/>
  {/if}
</main>
