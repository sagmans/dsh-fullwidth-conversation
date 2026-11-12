/**
 * Host half of the full-width conversation bundle.
 *
 * The capability is presentation-only: it lives entirely in a Client module
 * that overrides the conversation width custom properties. A Host half is still
 * required because the Loader activates bundle rows as Host plugins even when
 * the visible effect is rendered in the browser.
 */
export function apply() {}
