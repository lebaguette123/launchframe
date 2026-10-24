<script lang="ts">
  interface Project{
    name: string,
    description: string,
    license: string,
    language: string,
    languageVersion: string,
    framework: string,
    buildTool: string,
    projectType: string //?
    folderLayout: string //?
    packageManager: string,
    dependencies: string[],
    testingFramework: string,
    containerization: boolean,
    ciCd: boolean,
    git: boolean,
  }

  function createProject(): Project{
    return{
      name: "my-project",
        description: "A sample project",
        license: "MIT",
        language: "TypeScript",
        languageVersion: "7.0.0",
        framework: "Svelte",
        buildTool: "Vite",
        projectType: "Web Application",
        folderLayout: "Standard",
        packageManager: "npm",
        dependencies: ["svelte", "vite"],
        testingFramework: "Jest",
        containerization: false,
        ciCd: false,
        git: true
    }
  }

  const project = createProject();
</script>

<main>
  <h1>Project Details</h1>
  <p><strong>Name:</strong> {project.name}</p>
  <p><strong>Description:</strong> {project.description}</p>
  <p><strong>License:</strong> {project.license}</p>
  <p><strong>Language:</strong> {project.language} (v{project.languageVersion})</p>
  <p><strong>Framework:</strong> {project.framework}</p>
  <p><strong>Build Tool:</strong> {project.buildTool}</p>
  <p><strong>Project Type:</strong> {project.projectType}</p>
  <p><strong>Folder Layout:</strong> {project.folderLayout}</p>
  <p><strong>Package Manager:</strong> {project.packageManager}</p>
  <p><strong>Dependencies:</strong> {project.dependencies.join(', ')}</p>
  <p><strong>Testing Framework:</strong> {project.testingFramework}</p>
  <p><strong>Containerization:</strong> {project.containerization ? 'Yes' : 'No'}</p>
  <p><strong>CI/CD:</strong> {project.ciCd ? 'Yes' : 'No'}</p>
  <p><strong>Git Initialized:</strong> {project.git ? 'Yes' : 'No'}</p>
</main>
