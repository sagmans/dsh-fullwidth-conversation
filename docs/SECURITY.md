# Security boundaries

## Presentation and data

The [browser entry](../client.js) inserts static CSS. It does not read messages,
credentials, storage, or network data. The [Host entry](../index.js) requests no
services. Keep data access separate from this presentation-only purpose.

The stylesheet shares the application document. Its global handle selector can
hide controls outside the chat body. Treat selector scope as a UI trust boundary,
not as a sandbox. Read [Architecture](ARCHITECTURE.md) before CSS changes.

## Dependencies and distribution

The [manifest](../package.json) owns exports and the explicit distribution
allowlist. The [native checker](../scripts/check.mjs) rejects runtime, optional,
and development dependencies until dependency review changes that contract.
It also rejects exports outside the distributable file set.

Keep local paths, credentials, logs, screenshots, and development tooling outside
the package. Privacy patterns catch some sensitive content, not all secrets.
The shared [secret gate](../.githooks/lib/checks/secrets.sh) adds scanning at
commit and push boundaries. Neither check replaces source review.

## Local installation and release

A source-directory installation depends on the checkout location. Moving or
editing that checkout can affect the installed bundle. Use a local environment
for behavior evidence rather than a production profile.

The package is private. Its metadata does not authorize publishing or changes to
an installed profile. Keep release approval separate from validation.

The [push gate](../.githooks/lib/checks/push.sh) checks commit provenance and runs
applicable security scans. The repository push extension runs full validation
for each distinct non-deleted pushed tip. Read [Development](DEVELOPMENT.md)
for setup and gate ownership.
