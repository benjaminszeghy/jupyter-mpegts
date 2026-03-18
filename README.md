# jupyter_mpegts

[![Github Actions Status](https://github.com/benjaminszeghy/jupyter-mpegts/workflows/Build/badge.svg)](https://github.com/benjaminszeghy/jupyter-mpegts/actions/workflows/build.yml)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/benjaminszeghy/jupyter-mpegts/main?urlpath=lab)


A JupyterLab extension that adds an ipywidget for playing live MPEG-TS streams in notebooks.

## What This Extension Does

This package provides a simple Python widget API for playing an MPEG-TS stream in a notebook output.

### How To Use

- `display_mpegts(source: str)`: set the stream URL and return the widget.

Example:

```python
from jupyter_mpegts import mpegts_widget

player = mpegts_widget().display_mpegts("http://127.0.0.1:8080/stream.ts")
player
```

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyter_mpegts
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyter_mpegts
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyter_mpegts directory

# Set up a virtual environment and install package in development mode
uv venv
source .venv/bin/activate
uv pip install --editable "."

# Link your development version of the extension with JupyterLab
uv run jupyter labextension develop . --overwrite

# Rebuild extension Typescript source after making changes
# IMPORTANT: Unlike the steps above which are performed only once, do this step
# every time you make a change.
uv run jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
uv run jlpm watch
# Run JupyterLab in another terminal
uv run jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `uv run jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
uv run jupyter lab build --minimize=False
```

### Development uninstall

```bash
uv pip uninstall jupyter_mpegts
```

In development mode, you will also need to remove the symlink created by `uv run jupyter labextension develop`
command. To find its location, you can run `uv run jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyter-mpegts` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
uv run jlpm
uv run jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

## AI Coding Assistant Support

This project includes an `AGENTS.md` file with coding standards and best practices for JupyterLab extension development. The file follows the [AGENTS.md standard](https://agents.md) for cross-tool compatibility.

### Compatible AI Tools

`AGENTS.md` works with AI coding assistants that support the standard, including Cursor, GitHub Copilot, Windsurf, Aider, and others. For a current list of compatible tools, see [the AGENTS.md standard](https://agents.md).

Other conventions you might encounter:

- `.cursorrules` - Cursor's YAML/JSON format (Cursor also supports AGENTS.md natively)
- `CONVENTIONS.md` / `CONTRIBUTING.md` - For CodeConventions.ai and GitHub bots
- Project-specific rules in JetBrains AI Assistant settings

All tool-specific files should be symlinks to `AGENTS.md` as the single source of truth.

### What's Included

The `AGENTS.md` file provides guidance on:

- Code quality rules and file-scoped validation commands
- Naming conventions for packages, plugins, and files
- Coding standards (TypeScript)
- Development workflow and debugging
- Common pitfalls and how to avoid them

### Customization

You can edit `AGENTS.md` to add project-specific conventions or adjust guidelines to match your team's practices. The file uses plain Markdown with Do/Don't patterns and references to actual project files.

**Note**: `AGENTS.md` is living documentation. Update it when you change conventions, add dependencies, or discover new patterns. Include `AGENTS.md` updates in commits that modify workflows or coding standards.

### Packaging the extension

See [RELEASE](RELEASE.md)
