# Repository guide

This bundle changes conversation width through browser CSS.
The Host entry exists for bundle activation, not application behavior.

## Runtime map

- [client.js](client.js) owns the stylesheet and its disposal.
- [index.js](index.js) is the empty Host entry.
- [package.json](package.json) owns exports and distribution.
- [cordis.patch.yml](cordis.patch.yml) owns bundle registration.

## Invariants

Keep width overrides on the chat body's custom properties.
Leave renderer layout, typography, theme, and bubble geometry with the renderer.
Keep stylesheet creation inside the owned effect and removal in its cleanup.
The current handle selector is global, and the CSS has no media guard.
Treat those limits as compatibility constraints, not isolation guarantees.
Keep package identity aligned across registration, patch, and manifest.

## Read for the change

- Before CSS or lifecycle changes, read [Architecture](docs/ARCHITECTURE.md).
  It explains property ownership and selector limits.
- Before setup, validation, or hook changes, read
  [Development](docs/DEVELOPMENT.md).
  It defines the local gates and the limits of module smoke.
- Before dependency, data-access, or distribution changes, read
  [Security](docs/SECURITY.md).
  It defines privacy, package, and release boundaries.

Keep generic hook entrypoints and their library synchronized from the shared
source. Put repository checks in the hook extension directories.
