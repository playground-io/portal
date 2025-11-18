<template>
  <div class="topbar-branding" title="Admin Portal">
    <div class="branding-label">AXIANS</div>
    <div class="service-label">Admin Portal</div>
  </div>
</template>

<script setup></script>

<style scoped>
.topbar-branding {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  line-height: 1.1;
  min-width: 0;
  padding:0 22px;
  color: var(--top-bar-btn-txt);
  user-select: none;
  /*transition: background-color var(--transition-fast) ease;*/
}

.topbar-branding .branding-label {
  font-size:1.3rem;
  font-weight:550;
  letter-spacing: 0.5px;
}

.topbar-branding .service-label {
  min-width:0;
  font-size:1.1rem;
  white-space:nowrap;
  letter-spacing: 1px;
}

.topbar-branding:hover {
  cursor: pointer;
  background-color: var(--top-bar-btn-bg-hover);
  color: var(--top-bar-btn-txt-hover);
}

.topbar-branding:active {
  transition: background-color 0s ease;
  background-color: var(--top-bar-btn-bg-active);
  color: var(--top-bar-btn-txt-active);
}
</style>