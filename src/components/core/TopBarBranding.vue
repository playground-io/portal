<template>
  <div class="topbar-branding" :title="$t('nav.branding.title')">
    <div class="branding-label">{{ $t('nav.branding.label') }}</div>
    <div class="service-label">{{ $t('nav.branding.service') }}</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  @import "@/assets/scss/styles.scss";

.topbar-branding {
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

.branding-label {
  font-size: 1.3rem;
  white-space: nowrap;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.service-label {
  font-size: 1.1rem;
  white-space: nowrap;
  letter-spacing: 1px;
}

.branding-label:hover,
.service-label:hover {
  cursor: pointer;
}

.branding-label:active,
.service-label:active {
  color: var(--top-bar-btn-txt-active);
}

@media (max-width: $viewport-sm) {
  .service-label {
    display: none;
  }
}
</style>