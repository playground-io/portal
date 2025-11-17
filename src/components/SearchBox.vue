<template>
  <div class="search-container" ref="searchContainerRef">
    <div class="input-wrapper">
      <AppIcon name='find' :size=20 class="search-icon" />

      <input
        type="text"
        v-model="searchText"
        @focus="isDropdownOpen = true"
        @input="handleInput"
        placeholder="Search resources"
        class="search-input"
      />

      <button
        v-if="searchText.length > 0"
        @click="clearSearch"
        class="clear-button"
      >
        &times;
      </button>
    </div>
    
    <div v-if="isLoading" class="loading-indicator">
        <div class="spinner"></div>
        Fetching Azure resources...
    </div>

    <ul v-if="showSuggestions && isDropdownOpen && !isLoading" class="suggestions-dropdown">
      <li v-if="filteredSuggestions.length === 0" class="no-results">
        No resources found for "{{ searchText }}"
      </li>
      <li
        v-for="item in filteredSuggestions"
        :key="item.id"
        @click="selectSuggestion(item)"
        class="suggestion-item"
      >
        <div class="item-header">
          <span class="item-name" v-html="highlightMatch(item.name)"></span>
          <span 
            :style="{ backgroundColor: getBadgeColor(item.type) }"
            class="item-type"
          >
            {{ item.type }}
          </span>
        </div>

        <div class="item-details">
            <span class="detail-label">RG:</span> {{ item.resourceGroup }} |
            <span class="detail-label">Loc:</span> {{ item.location }}
        </div>
        
        <div class="item-description">
          {{ item.description }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted, onBeforeUnmount } from 'vue';
import AppIcon from './AppIcons.vue';

const emit = defineEmits(['selected']);

// --- Data (Reactive State) ---
const searchText = ref('');
const minChars = 3; 
const isDropdownOpen = ref(false); 
const searchContainerRef = ref(null); 

const allSuggestions = ref([]);
const badgeColors = ref({});
const isLoading = ref(false);
let debounceTimer = null; 
const API_URL = 'http://localhost:5500/Portal/v2/resources';
const COLORS_API_URL = 'http://localhost:5500/Portal/v2/colors';

// --- Computed Properties ---
const filteredSuggestions = computed(() => {
  const query = searchText.value.toLowerCase();
  if (!showSuggestions.value) return []; 
  
  return allSuggestions.value.filter(item =>
    item.name.toLowerCase().includes(query) || 
    item.resourceGroup.toLowerCase().includes(query) ||
    item.location.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  );
});

const showSuggestions = computed(() => {
  return searchText.value.length >= minChars;
});

// --- Methods (Functions) ---

async function fetchBadgeColors() {
    try {
        const response = await fetch(COLORS_API_URL);
        if (response.ok) {
            badgeColors.value = await response.json();
        }
    } catch (error) {
        console.error("Error fetching badge colors:", error);
    }
}

function getBadgeColor(type) {
    return badgeColors.value[type] || '#666'; 
}

/**
 * Fetches Azure resource data and includes a simulated 1-second delay.
 */
async function fetchSuggestions() {
    if (!showSuggestions.value) {
        allSuggestions.value = [];
        return;
    }

    isLoading.value = true;
    try {
        // --- 1. Enforce a minimum delay for the loading indicator ---
        const [response] = await Promise.all([
            fetch(API_URL), // The actual API call
            new Promise(resolve => setTimeout(resolve, 1000)) // Simulated 1000ms delay
        ]);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allSuggestions.value = await response.json(); 
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        allSuggestions.value = []; 
    } finally {
        isLoading.value = false;
    }
}

function handleInput() {
  isDropdownOpen.value = true; 
  
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  if (showSuggestions.value) {
    debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);
  } else {
      allSuggestions.value = [];
      isLoading.value = false;
  }
}

const handleClickOutside = (event) => {
  if (searchContainerRef.value && !searchContainerRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

function clearSearch() {
  searchText.value = '';
  allSuggestions.value = [];
  isDropdownOpen.value = false; 
}

function selectSuggestion(item) {
  searchText.value = item.name; 
  isDropdownOpen.value = false; 
  emit('selected', item); 
}

function highlightMatch(text) {
  const query = searchText.value;
  if (!query || query.length === 0) return text; 

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  
  if (index === -1) {
    return text; 
  }

  const pre = text.substring(0, index);
  const match = text.substring(index, index + query.length);
  const post = text.substring(index + query.length);

  return `${pre}<strong>${match}</strong>${post}`;
}

// --- Lifecycle Hooks ---
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  fetchBadgeColors(); 
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>

<style scoped>
/* --- General Styles (Unchanged) --- */
.search-container {
  font-family: inherit;
  position: relative;
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 12px 40px; 
  font-size: 17px;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
}
.search-input:focus {
  border-color: #0078d4; 
  box-shadow: 0 0 8px rgba(0, 120, 212, 0.2);
}
.search-icon, .clear-button {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
}
.search-icon {
  left: 15px;
  width: 20px;
  pointer-events: none;
}
.clear-button {
  right: 15px;
  border: none;
  background: none;
  font-size: 24px;
  line-height: 1;
  color: #888;
  cursor: pointer;
  padding: 0;
}
/* --- Dropdown and Loading Styles (Modified) --- */
.suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  border: 1px solid #eee;
  border-radius: 10px;
  background: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
}

.loading-indicator {
    padding: 12px 18px;
    text-align: center;
    color: #0078d4;
    font-style: italic;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 8px;
    border: 1px solid #eee;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* Flexbox to align spinner and text */
    display: flex; 
    align-items: center;
    justify-content: center;
}

/* --- New Spinner Styles --- */
.spinner {
  border: 3px solid rgba(0, 120, 212, 0.3); /* Light Blue track */
  border-top: 3px solid #0078d4; /* Azure Blue spinning part */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* --- Suggestion Item Styles (Unchanged) --- */
.suggestion-item {
  padding: 12px 18px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}
.suggestion-item:hover {
  background-color: #e5f6ff; 
}
.suggestion-item strong {
    font-weight: 800;
    color: #000;
}
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.item-name {
  font-weight: normal; 
  font-size: 18px;
  color: #333;
}
.item-details {
    font-size: 13px;
    color: #666;
    margin-bottom: 4px;
}
.detail-label {
    font-weight: 600;
}
.item-type {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  margin-left: 10px;
}
.item-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
.no-results {
  padding: 12px 18px;
  color: #999;
  font-style: italic;
  text-align: center;
}
</style>