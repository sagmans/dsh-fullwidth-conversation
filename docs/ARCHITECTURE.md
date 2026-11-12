# Architecture

## Host and browser ownership

The [manifest](../package.json) separates the Host and browser entries.
The [patch](../cordis.patch.yml) activates the bundle under its package name.
The [Host entry](../index.js) stays empty because width changes need no Host
services. The [browser entry](../client.js) registers the same package identity
with the existing module loader. The browser entry is a classic script, not a
standalone ES module. Factory-local bindings keep concatenated bundles isolated.

## Width ownership

The browser stylesheet overrides the renderer's width custom properties on
`[data-conversation-content][data-conversation-region="chat"]`.
This avoids a second layout implementation tied to generated class names.
The renderer still owns typography, theme, spacing, and bubble geometry.

The transcript retains a horizontal gutter so text does not touch the pane
edges. The composer retains renderer-owned side clearance. The constants and
CSS in the browser entry own the exact values.

## Compatibility limits

The width-property selector targets the chat body rather than the sidebar.
However, the stylesheet hides every `[data-width-handle]` element on the page.
That separate rule is global. It does not prove that other panels stay
unaffected. The stylesheet also has no media guard, so desktop-only behavior is
not an enforced boundary.

Hidden handles avoid a resize control for the formerly capped layout. Before a
selector change, inspect the target renderer and other users of the handle
attribute. Source registration alone cannot establish compatibility with a new
renderer.

## Owned lifecycle

The module factory declares the stylesheet without DOM effects. The apply effect
creates one style element and returns cleanup that removes that element.
This ownership prevents stale overrides after disposal or reactivation.
The data attribute identifies the owned style element without changing the
application root.

For validation and live lifecycle evidence, read
[Development](DEVELOPMENT.md). For data and package boundaries, read
[Security](SECURITY.md).
