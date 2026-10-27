<script lang="ts">
    export type ProjectKind = 'python' | 'go';

    type Props = {
        value: ProjectKind;
        onChange: (language: ProjectKind) => void;
    };

    let { value, onChange }: Props = $props();
</script>

<nav class="language-selector" aria-label="Project language">
    <button
            class:active={value === 'python'}
            aria-pressed={value === 'python'}
            onclick={()=> onChange('python') }
    >
        Python
    </button>


    <button
            class:active={value === 'go'}
            aria-pressed={value === 'go'}
            onclick={()=> onChange('go') }
    >
        Go
    </button>
</nav>

