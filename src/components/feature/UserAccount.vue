<template>
  <div class="avatar-content">
    <button type="button" title="User Account" aria-label="User Account Button">
      <div class="user-account-wrapper">
        <div class="account"> jose.pereira@axians.com</div>
        <div class="company">AxiansEU Digital Solutions, S.A</div>
      </div>
      <div class="user-picture-wrapper" >
        <img class="user-picture" src="@/assets/pictures/default-avatar-profile.jpg"/>
      </div>
    </button>
  </div>
</template>

<script setup>
</script>

<style scoped>
.avatar-content button {
  display: inline-flex;
  font-family: inherit; 
  color: var(--top-bar-btn-txt);
  background-color: transparent;
  border: none;
  height: 100%;
  padding: 0;
  align-items: center;
  transition: background-color var(--transition-medium) ease;
}

.avatar-content button:hover {
  background-color: var(--top-bar-btn-bg-hover);
  color: var(--top-bar-btn-txt-hover);
}

.avatar-content button:active {
  background-color: var(--top-bar-btn-bg-active);
  color: var(--top-bar-btn-txt-active);
}

.avatar-content button:focus-visible {
    outline: 1px dashed rgba(255,255,255,1);
    outline-offset: -1px;
  }

.user-account-wrapper {
  text-align: right;
  padding-left: 16px;
}

.user-account-wrapper .account {
  font-size: 1.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 160px;
}

.user-account-wrapper .company {
  font-size: 1rem;
  text-transform:uppercase;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 160px;
}

.user-picture-wrapper {
  padding: 0 6px 0 8px;
}

.user-picture {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: block;
}

@media (max-width: 992px) {
  .user-account-wrapper {
    display: none;
  }
}

</style>