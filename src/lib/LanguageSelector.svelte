<script lang="ts">
    import pythonLogo from '../assets/python_logo.svg';
    import goLogo from '../assets/go_logo.svg';
    export type ProjectKind = 'python' | 'go';

    type Props = {
        value: ProjectKind | null;
        onChange: (language: ProjectKind) => void;
    };

    let { value, onChange }: Props = $props();
</script>

<nav class="language-selector" aria-label="Project language">
    <button
            type="button"
            class:active={value === 'python'}
            aria-pressed={value === 'python'}
            onclick={()=> onChange('python') }
    >
        <span class="icon-area">
            <img src={pythonLogo} alt="" class="language-icon python-icon"/>
        </span>
        <span>Python</span>
    </button>


    <button
            type="button"
            class:active={value === 'go'}
            aria-pressed={value === 'go'}
            onclick={()=> onChange('go') }
    >
        <span class="icon-area">
            <img src={goLogo} alt="" class="language-icon go-icon"/>
        </span>
        <span>Go</span>
    </button>
</nav>

<style>
    .language-selector{
        display: grid;
        grid-template-columns: repeat(2, minmax(9rem, 1fr));
        gap: clamp(0.75rem, 3vw, 1.25rem);
        width: min(100%, 36rem);
        margin-inline: auto;
    }

    .language-selector button{
        display: flex;
        min-height: 11rem;
        aspect-ratio: 1 / 1;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: clamp(1rem, 4vw, 1.5rem);
        color: var(--primary-text);
        background: var(--surface-color);
        border: 1px solid var(--surface-border);
        border-radius: 0.75rem;
        font-family: var(--primary-font), monospace;
        font-size: 1rem;
        font-weight: 700;
        transition:
                background-color 120ms ease,
                border-color 120ms ease,
                transform 120ms ease;
    }

    .language-selector button:hover,
    .language-selector button.active {
        background: rgb(125 211 252 / 10%);
        border-color: var(--accent-color);
    }

    .language-selector button:hover{
        transform: translateY(-2px);
    }

    .icon-area {
        display: flex;
        width: 100%;
        min-height: 0;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding: 0.25rem;
    }

    .language-icon{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    @media (max-width: 22rem){
        .language-selector{
            grid-template-columns: 1fr;
        }

        .language-selector button{
            aspect-ratio: auto;
            min-height: 10rem;
        }
    }
</style>
