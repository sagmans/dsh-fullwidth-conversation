/**
 * Renderer-owned width properties avoid a second layout tied to generated classes.
 * Typography, theme, spacing, and bubble geometry remain renderer-owned.
 * Selector compatibility remains the renderer integration boundary.
 */
globalThis.__ModuleLoader__.load({
  id: '@local/fullwidth-conversation',
  factory() {
    // Chat-body scope leaves sidebar width ownership with the renderer.
    const CONVERSATION_BODY_SELECTOR = '[data-conversation-content][data-conversation-region="chat"]';
    // The transcript needs edge clearance even after the readable-width cap is removed.
    const CONTENT_GUTTER_PX = 32;

    // Handles lose their purpose without the cap. Their selector is global, with no media guard.
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
        // Effect ownership keeps DOM changes out of registration and ties them to disposal.
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
