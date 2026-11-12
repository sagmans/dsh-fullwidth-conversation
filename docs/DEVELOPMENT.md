# Development

## Setup and hooks

Run these commands from the repository root:

```sh
scripts/setup-hooks
node scripts/check.mjs
node scripts/check.mjs smoke
```

The [setup wrapper](../scripts/setup-hooks) calls the
[installer](../scripts/setup-hooks.mjs). The installer links hooks and extension
directories into the default Git hooks directory. It never writes Git
configuration. Custom hooks or a different effective hook path block setup.
Resolve the conflict instead of replacing the existing hook. After a checkout
move, run setup again because links refer to that checkout.

Shared hook entrypoints and [library](../.githooks/lib/run-local.sh) come from a
shared template. Update them at that source, not in this repository.
Without authorized upstream access, report required shared changes to the
maintainer rather than editing these copies.
The repository owns [staged checks](../.githooks/pre-commit.d/20-source),
[merge checks](../.githooks/pre-merge-commit.d/20-source), and
[push checks](../.githooks/pre-push.d/20-project).
Generic checks run before these extensions.

## Native gate

The [native checker](../scripts/check.mjs) owns command modes, tool arguments,
format rules, and validation bounds. It uses local Node.js, Deno, and shfmt.
It does not install packages or rewrite source.

The full gate covers syntax, static lint, source hygiene, JSON shape, locale-key
parity, privacy patterns, distribution, and module registration.
The smoke mode runs the same gate. Semantic JavaScript type checking requires
application declarations and is not part of this gate.

For the exact staged source, run:

```sh
node scripts/check.mjs staged
```

Staged mode reads the selected index, including the hook-provided index for a
partial commit. It checks selected source files, not the full package contract.
Full mode also reads local hook extensions, including ignored local wrappers.
A failure in such a wrapper is still a local gate failure.

## Documentation and quality

Run the shared Markdown rules against the documentation:

```sh
markdownlint-cli2 --config .githooks/lib/markdownlint.jsonc AGENTS.md README.md 'docs/**/*.md'
```

The shared [Markdown gate](../.githooks/lib/checks/markdown.sh) reads staged
Markdown rather than unrelated worktree edits. Its configuration owns lint rules.
The [tool helper](../.githooks/lib/tools.sh) owns scanner requirements.
Missing tools and scanner errors block the relevant gate.

Commit and push gates also enforce secrets, signatures, DCO, and the
[commit convention](../.githooks/GIT_CONVENTION.md). Source-security, complexity,
dependency, and workflow scans apply to the relevant pushed files.
Keep these gates unchanged during documentation-only work.

## Evidence limits

Module smoke proves one client registration and an importable Host export.
It does not run the factory or prove CSS, DOM effects, cleanup, or panel layout.
There is no separate unit-test suite in this repository.

For runtime changes, exercise the installed bundle in a local Web UI.
Inspect transcript and composer width, sidebar layout, handle visibility, narrow
windows, and disposal. Include another panel that uses the handle attribute.
For documentation-only changes, re-read the final text, resolve relative links,
and run the Markdown and native gates. For code comments, also prove executable
equivalence against the base source.
