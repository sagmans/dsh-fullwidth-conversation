/**
 * Full-width transcript and composer for the Web conversation.
 *
 * The conversation renderer caps its readable column at
 * `min(64% of the pane, 920px)` and repeats that cap for the composer card,
 * which leaves wide empty gutters on large windows. The renderer already
 * exposes each cap as a custom property on the conversation body element, so
 * this plugin raises the caps instead of reproducing layout rules against
 * hashed class names: the properties are the renderer's public width contract,
 * and they survive internal style refactors that rename module classes.
 *
 * Deliberate limits:
 * - Only the width properties are touched. Typography, colors, spacing, and
 *   the user-message bubble ratio stay owned by the renderer.
 * - A 32px gutter stays reserved for the transcript so prose does not touch the
 *   pane edges; the composer keeps its own 16px side clearance, so both surfaces
 *   align on the same left and right edges.
 * - The drag handles that resize the capped column are hidden: with no cap they
 *   would sit outside the pane and drag to a no-op, which reads as a bug.
 */
globalThis.__ModuleLoader__.load({
  id: '@local/fullwidth-conversation',
  factory() {
    /** Conversation body that carries the renderer's width properties. */
    const CONVERSATION_BODY_SELECTOR = '[data-conversation-content][data-conversation-region="chat"]';
    /** Reserved horizontal gutter, mirrored on both sides of the transcript. */
    const CONTENT_GUTTER_PX = 32;

    /**
     * Width contract overrides consumed by the transcript column, composer
     * card, composer dock, and wide tables.
     */
    const CSS = `
${CONVERSATION_BODY_SELECTOR} {
  --dsh-chat-content-width: calc(100% - ${CONTENT_GUTTER_PX}px) !important;
  --dsh-composer-card-max-width: 100% !important;
}

/* Resize handles belong to the capped layout only. */
[data-width-handle] {
  display: none !important;
}
`;

    return {
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.fullwidthConversation = '';
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => {
            style.remove();
          };
        }, 'fullwidth-conversation: width overrides');
      },
    };
  },
});
