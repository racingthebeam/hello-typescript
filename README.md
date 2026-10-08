# hello-typescript

My standard TypeScript project template, supporting multiple "app" entry points, and shared libraries in `src/libs`.

It's deliberately simple - no linters, frameworks, Tailwind etc. I *have* included SASS, which these days I tend to use just as a bundler rather than leaning on its more advanced features.

Stack:

  - `esbuild`
  - `vitest`
  - `sass`

## Dependencies

  - [`hivemind`](https://github.com/darthsim/hivemind) - Go-based Procfile runner - `brew install hivemind`

## Usage

Run `npm install`, then:

  - `./scripts/dev`: for dev build watcher, test watcher, and local server
