# Full-Width Conversation

Removes the readable-width cap on the Web conversation so the transcript and
composer span the whole conversation pane. The sidebar and other panels are not
touched.

## Behavior

| Surface            | Before                          | After                                                   |
| ------------------ | ------------------------------- | ------------------------------------------------------- |
| Transcript column  | `min(64% of pane, 920px)`       | pane width minus a 32px gutter                          |
| Composer card      | transcript width + 32px, capped | pane width minus the composer's own 16px side clearance |
| Width drag handles | resized the capped column       | hidden, because the column is no longer capped          |

Only two width custom properties are overridden. Theme, typography, spacing, and
message-bubble geometry stay owned by the conversation renderer.

## Files

| File               | Purpose                                                  |
| ------------------ | -------------------------------------------------------- |
| `client.js`        | Client module that inserts the width override stylesheet |
| `index.js`         | Host half; required by the Loader, no Host behavior      |
| `cordis.patch.yml` | Inserts the plugin row into the profile patch            |
| `locale/*.json`    | Plugin-manager title and description                     |

## Install from source

Clone this repository, then install its directory through the DSH plugin
manager. Keep the checkout in place: a local directory installation links to
this source. The package name stays unchanged so an existing profile can keep
its registration.

## Development

After cloning, run `scripts/setup-hooks`. This installs the repository's hooks
without changing Git configuration. It refuses to replace custom hooks.

```sh
scripts/setup-hooks
node scripts/check.mjs
node scripts/check.mjs smoke
```

Install Gitleaks, markdownlint-cli2, Semgrep, Lizard, and OSV Scanner before
contributing. Missing tools and failed checks block the relevant hook. Commits
must be signed, signed off, and use a Conventional Commit subject with a purpose
body. Never bypass hooks with `--no-verify`.

The native gate checks source syntax and hygiene, package and locale shape,
privacy patterns, distribution exports, and module registration. Generic push
checks also scan signatures, secrets, dependencies, source security, and
function complexity. Exercise the installed plugin in a local Web UI before
delivery; module registration alone does not prove its visible behavior.
