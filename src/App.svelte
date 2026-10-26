<script lang="ts">
  import type { PyProject } from '../shared/project-config';

  let project: PyProject = $state({
    name: '',
    description: '',
    gitInit: false,
    directory: ''
  });

</script>

<main>
  <h1>Python Project Generator</h1>

</main>
