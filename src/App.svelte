<script lang="ts">
  import LanguageSelector, {type ProjectKind} from "./lib/LanguageSelector.svelte";
  import PythonProjectForm from "./lib/PythonProjectForm.svelte";
  import GoProjectForm from "./lib/GoProjectForm.svelte";

  let selectedLanguage = $state<ProjectKind | null>(null);

  function selectLanguage(language: ProjectKind) {
    selectedLanguage = language;
  }

  function goBackToLanguageSelection() {
    selectedLanguage = null;
  }
</script>

<main>
  {#if selectedLanguage === null}
    <div class="page-header">
      <p class="eyebrow">Launchframe</p>
      <h1>Choose a project language</h1>
      <p class="intro">Select a language to start creating your project.</p>
    </div>

    <LanguageSelector value={selectedLanguage} onChange={selectLanguage} />
  {:else}
    <button type="button" class="secondary-button back-button" onclick={goBackToLanguageSelection}>
      Back to language selection
    </button>

    {#if selectedLanguage === 'python'}
      <PythonProjectForm />
    {:else}
      <GoProjectForm />
    {/if}
  {/if}
</main>
