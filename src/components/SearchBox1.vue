<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-find" viewBox="0 0 24 24">
      <path d="M15.553 15.553a7.06 7.06 0 1 0-9.985-9.985a7.06 7.06 0 0 0 9.985 9.985m0 0L20 20" />
    </symbol>
  
    <symbol id="icon-find-clear" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </symbol>
  </svg>
  
  <div class="search-box-container">
    <input type="text" autocomplete="off" maxlength="100" placeholder="Search resources, services, and docs" />

    <button class="search-image-wrapper">
      <svg class="image-find">
        <use href="#icon-find"></use>
      </svg>
      <svg class="image-find-clear">
        <use href="#icon-find-clear"></use>
      </svg>
    </button>
  </div>
</template>

<script setup></script>

<style scoped>
.search-box-container {
  display: inline-flex;
  position: relative;
  height: 65%;
  width: 100%;
  align-items: center;
  border-radius: 2px;
  background-color: var(--search-bg-color);
}

.search-box-container .search-image-wrapper {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
  padding: 0 12px;
  background-color: transparent;
  border: transparent;
  fill: transparent;
  stroke: var(--search-placeholder-color);
}

.search-image-wrapper .image-find {
  display: block;
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  transform: scale(-1,1);
  opacity: 0;
}

.search-image-wrapper .image-find-clear {
  display: block;
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  transform: scale(-1,1);
  
  cursor: pointer;
  
  /* HIDE by default */
  opacity: 0;
  pointer-events: none; /* Prevents button interaction when invisible */
  transition: opacity 0.3s ease;
}

.search-box-container input {
  font-family: inherit;
  border: transparent;
  outline: transparent;
  background-color: transparent;
  color: var(--search-placeholder-color);
  height: 100%;
  width: 100%;
  font-size: 13px;
}

.search-box-container input:focus {
  color: var(--search-text-color);
}

.search-box-container input::placeholder {
  color: var(--search-placeholder-color);
}

.search-box-container:focus-within {
  background-color: white;
}

.search-box-container:focus-within .image-find  {
  opacity: 0;
}

.search-box-container input:not(:placeholder-shown) ~ .clear-button {
  opacity: 1;
  pointer-events: auto; /* Allow interaction when visible */
}
.search-box-container:focus-within input:not(:placeholder-shown) ~ .search-image-wrapper .image-find-clear {
  stroke: var(--search-text-color);
  opacity: 1;
  visibility: visible;
}
</style>