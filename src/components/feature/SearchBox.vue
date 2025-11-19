<template>
  <div class="search-container" ref="searchContainerRef">
    <div class="input-wrapper">
      <AppIcon name='find' :size=18 class="search-icon" />

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
import AppIcon from '@/components/core/ShowIcon.vue';

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
      isLoading.value = true;
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
  isDropdownOpen.value = true; 
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
.search-container {
  display: flex;
  position: relative;
  width: 100%;
}

.input-wrapper {
  display: inline-flex;
  position: relative;
  align-items: center;
  width: 100%;
}

.search-input {
  font-family: inherit;
  padding: 0px 25px; 
  border-radius: 2px;
  outline: none;
  height: 65%;
  width: 100%;
  border: none;
  transition: border-color 0.3s;
}

.search-icon,
.clear-button {
  display: flex;
  position: absolute;
}

.search-icon {
  left: 5px;
  pointer-events: none;
}
.clear-button {
  right: 10px;
  border: none;
  background: none;
  font-size: 20px;
  line-height: 1;
  color: #888;
  cursor: pointer;
  padding: 0;
}

.suggestions-dropdown {
  position: absolute;
  top: var(--top-bar-height);
  left: 0;
  right: 0;
  z-index: 10;
  padding: 0;
  list-style: none;
  margin-top: 8px;
  border: 1px solid #eee;
  border-radius: 3px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 250px;
  overflow-y: auto;
}

.loading-indicator {
  display: flex; 
  align-items: center;
  justify-content: center;
  position: absolute;
  top: var(--top-bar-height);
  left: 0;
  right: 0;
  padding: 12px 0;
  margin-top: 8px;
  text-align: center;
  color: var(--search-placeholder-color);
  font-style: italic;
  gap: 15px;
  border: 1px solid #eee;
  border-radius: 3px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.spinner {
  border: 2px solid #c1c1c176;
  border-top: 2px solid #1c1c1c;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.suggestion-item {
  padding: 4px 12px;
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