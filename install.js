module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://huggingface.co/spaces/autotrain-projects/flux-lora-ease app",
        ]
      }
    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        venv: "venv",                // Edit this to customize the venv folder path
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "pip install -r requirements_local.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: [
          "git clone https://github.com/ostris/ai-toolkit.git",
          "cd ai-toolkit",
          "git submodule update --init --recursive",
          "pip install -r requirements.txt"
        ]
      }
    },
    // Delete this step if your project does not use torch
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "venv",                // Edit this to customize the venv folder path
          path: "app/ai-toolkit",                // Edit this to customize the path to start the shell from
          // xformers: true   // uncomment this line if your project requires xformers
        }
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/venv"
      }
    }
  ]
}
