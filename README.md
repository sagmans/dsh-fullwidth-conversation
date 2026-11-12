# Full-Width Conversation

Removes the readable-width cap on the Web conversation so the transcript and
composer span the whole conversation pane. Width overrides target the chat body.
The stylesheet also hides all width handles on the page. It has no screen-width
condition, so these rules are not desktop-only.

## Behavior

| Surface            | Before                          | After                                                   |
| ------------------ | ------------------------------- | ------------------------------------------------------- |
| Transcript column  | `min(64% of pane, 920px)`       | pane width minus a 32px gutter                          |
| Composer card      | transcript width + 32px, capped | pane width minus the composer's own 16px side clearance |
| Width drag handles | resized the capped column       | hidden, because the column is no longer capped          |

Only two width custom properties are overridden. Theme, typography, spacing, and
message-bubble geometry stay owned by the conversation renderer.

## Files

| File | Purpose |
| --- | --- |
| [client.js](client.js) | Client module that inserts the width override stylesheet |
| [index.js](index.js) | Host half; required by the Loader, no Host behavior |
| [cordis.patch.yml](cordis.patch.yml) | Inserts the plugin row into the profile patch |
| [Locales](locale/) | Plugin-manager title and description |

## Install from source

Clone this repository, then install its directory through the DSH plugin
manager. Keep the checkout in place: a local directory installation links to
this source. The package name stays unchanged so an existing profile can keep
its registration.

## Development

For source changes, read
[Development](https://github.com/sagmans/dsh-fullwidth-conversation/blob/main/docs/DEVELOPMENT.md)
for setup, hooks, validation, and live verification limits.
