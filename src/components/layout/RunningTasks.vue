<template>
  <Splitter 
      v-model="bottomHeight" 
      :is-locked="isLocked"
      @drag-end="onSplitterDragEnd"
    />
  
  <!-- 4. Resizable Bottom Bar -->
  <div class="tasks-container" :style="{ height: bottomHeight + 'px' }">
    <!-- Mode 1: Summary -->
      <div v-if="isLocked" class="bottom-summary">
        <div class="bottom-summary-text">
          <span style="color: var(--color-primary)">●</span> Console minimized ({{ logs.length }} logs)
        </div>
        <button @click="toggleLock" class="btn-sm">Unlock & Expand</button>
      </div>


      <!-- Mode 2: Full View -->
      <div v-else class="bottom-content">
        <div class="bottom-header">
          <h3>Console / Bottom Panel</h3>
          <div class="flex-row">
            <span class="badge">Height: {{ Math.round(bottomHeight) }}px</span>
            <button @click="toggleLock" class="btn-sm">Lock & Minimize</button>
          </div>
        </div>
          <ul class="task-list">
            <li 
              v-for="(task, index) in tasks" 
              :key="task.id"
              class="task-item"
            >
              <!-- Displaying the index (starting from 1) and the text property of the item -->
              <span class="task-index">{{ index + 1 }}.</span>
              <span class="task-text">{{ task.text }}</span>
              <span 
                :class="task.priority === 'High' ? 'task-priority priority-high' : task.priority === 'Low' ? 'task-priority priority-low' : 'task-priority priority-medium'"
              >
                {{ task.priority }}
              </span>
            </li>
          </ul>
        <div class="console-output">
          <p v-for="log in logs" :key="log.id">> {{ log.text }}</p>
        </div>
      </div>
  </div>
</template>

<script setup>

import { ref, watch } from 'vue';
import Splitter from '@/components/app/HorizontalSplitter.vue'
  import { useTasksStore } from '@/stores/taksStore.js';

  const store = useTasksStore();

  // Watch the store state
watch(
  () => store.triggerNotification,
  (newValue, oldValue) => {
    // If the value changes (which means the 'notify' action was called)
    if (newValue === !oldValue) {
      toggleLock();
    }
  }
);
// State
const bottomHeight = ref(250); 
const lastHeight = ref(250);
const isDragging = ref(false);
const isLocked = ref(false);
const logs = ref([]);

const addLog = (msg) => {
  logs.value.push({ id: Date.now(), text: msg });
};

const toggleLock = () => {
  if (isLocked.value) {
    bottomHeight.value = lastHeight.value;
    isLocked.value = false;
    addLog('Bottom panel restored');
  } else {
    lastHeight.value = bottomHeight.value;
    bottomHeight.value = 50;
    isLocked.value = true;
    addLog('Bottom panel minimized and locked');
  }
};

const onSplitterDragEnd = () => {
  isDragging.value = false;
  addLog(`Resized to ${Math.round(bottomHeight.value)}px`);
  console.log(`Resized to ${Math.round(bottomHeight.value)}px`);
};

  const tasks = [
    { id: 101, text: 'Review daily server logs for anomalies.', priority: 'High' },
    { id: 102, text: 'Respond to all pending support emails.', priority: 'High' },
    { id: 103, text: 'Write draft for the new documentation section.', priority: 'Low' },
    { id: 104, text: 'Prepare slides for the weekly status meeting.', priority: 'Medium' },
    { id: 105, text: 'Complete hardware inventory check.', priority: 'Low' }
  ];
</script>

<style scoped>
  .tasks-container {
    /*min-height: 50px;
    max-height: 300px;*/
    overflow-y: auto;
    height: 100%;
  }
  
  .task-list {
      list-style: none;
      padding: 0;
      margin: 0;
  }
 
  .task-item {
      display: flex;
      align-items: center;
      padding: 1px 12px;
      background-color: #f0f0f0;
      transition: background-color 0.15s ease;
      margin-top: 2px;
  }
  
  .task-item:first-child {
    margin-top: 10px;
  }
  
  .task-item:hover {
    background-color: #e0e7ff;
  }

  .task-index {
      font-weight: 600;
      color: #1d0bea;
      width: 32px;
      flex-shrink: 0;
  }
  
  .task-text {
      color: #374151;
      flex-grow: 1;
  }

  .task-priority {
      margin-left: 1rem; /* ml-4 */
      padding: 2px 12px; /* px-2 py-0.5 */
      font-size: 0.75rem; /* text-xs */
      font-weight: 500;
      color: white;
      border-radius: 9999px; /* rounded-full */
      flex-shrink: 0;
  }
  .priority-high {
      background-color: #ef4444; /* bg-red-500 */
  }
  .priority-low {
      background-color: #22c55e; /* bg-green-500 */
  }
  .priority-medium {
      background-color: #f97316; /* bg-orange-500 equivalent */
  }




  body.resizing {
  cursor: row-resize;
  user-select: none;
}

#app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

/* Common Layout Styles */
.top-bar {
  height: var(--header-height);
  background-color: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.main-content {
  flex-grow: 1;
  background-color: var(--color-bg-main);
  overflow: auto;
  padding: 32px;
}

.bottom-bar {
  background-color: var(--color-bg-white);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>