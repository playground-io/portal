<template>
  <div class="avatar-content">
    <button type="button">
      <div class="user-account-wrapper">
        <div class="account">jose.pereira@axians.com</div>
        <div class="company">AxiansEU Digital Solutions, S.A</div>
      </div>
      <div class="user-picture-wrapper" >
        <img class="user-picture" src="@/assets/pictures/default-avatar-profile.jpg"/>
      </div>
      <div class="avatar-content-tooltip">
        User Account
      </div>
    </button>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.avatar-content button {
  position: relative;
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

  /* --- Tooltip Styling --- */
  .avatar-content-tooltip {
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
    transform: translateX(50%);
  }

  .avatar-content button:hover {
    cursor: pointer;
  }
  
  .avatar-content button:hover .avatar-content-tooltip {
    visibility: visible;
    opacity: 1;
    }

  .avatar-content button:active {
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
    max-width: 160px;
  }

  .user-account-wrapper .company {
    font-size: 1rem;
    text-transform:uppercase;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 160px;
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

@media (max-width: $viewport-md) {
  .user-account-wrapper {
    display: none;
  }
}
</style>