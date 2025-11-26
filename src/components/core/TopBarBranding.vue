<template>
  <div class="topbar-branding">
    <div class="branding-label">{{ $t('nav.branding.label') }}</div>
    <div class="service-label">{{ $t('nav.branding.service') }}</div>
    <div class="topbar-branding-tooltip">
      {{ $t('nav.branding.title') }}
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.topbar-branding {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 16px;
  user-select: none;
  line-height: 1.2;
  color: var(--top-bar-btn-txt);
  background: transparent;
}

  /* --- Tooltip Styling --- */
  .topbar-branding-tooltip {
    position: absolute;
    visibility:hidden;
    opacity: 0;
    transition: opacity var(--transition-medium) ease;
    padding: 5px 10px;
    border: 1px solid var(--top-bar-btn-border-tooltip);
    border-radius: 4px;
    white-space: nowrap;
    color: var(--top-bar-btn-txt-tooltip);
    background-color: var(--top-bar-btn-bg-tooltip);
    font-size: 1.2rem;
    left: 0;
    top: 90%;
    font-weight: 100;
    transform: translateX(125%);
  }

  .topbar-branding:hover {
    cursor: pointer;
  }

  .topbar-branding:hover .topbar-branding-tooltip {
    visibility: visible;
    opacity: 1;
  }

  .topbar-branding:active {
    color: var(--top-bar-btn-txt-active);
  }

  .branding-label {
    font-size: 1.3rem;
    white-space: nowrap;
    letter-spacing: 0.5px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  .service-label {
    font-size: 1.1rem;
    white-space: nowrap;
    letter-spacing: 1px;
  }

@media (max-width: $viewport-sm) {
  .service-label {
    display: none;
  }

  .branding-label {
    max-width: 90px;
  }
}
</style>