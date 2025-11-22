<template>
  <div class="topbar-branding" :title="$t('nav.branding.title')">
    <div class="branding-label">{{ $t('nav.branding.label') }}</div>
    <div class="service-label">{{ $t('nav.branding.service') }}</div>
  </div>
</template>

<script setup></script>

<style scoped>
.topbar-branding {
  display: flex;
  flex-direction: column;
  container-type: inline-size;
  justify-content: center;
  min-width: 10px;
  
  user-select: none;
  line-height: 1.2;
  color: var(--top-bar-btn-txt);
  transition: background-color var(--transition-medium) ease;
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
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0;
}

.topbar-branding:hover {
  cursor: pointer;
  background-color: var(--top-bar-btn-bg-hover);
  color: var(--top-bar-btn-txt-hover);
}

.topbar-branding:active {
  background-color: var(--top-bar-btn-bg-active);
  color: var(--top-bar-btn-txt-active);
  transition: background-color 0s ease;
}

@container (max-width: 100px) {
  .service-label {
    display: none;
  }
}
</style>