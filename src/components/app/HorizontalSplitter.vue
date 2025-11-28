<template>
  <div class="splitter"
    :class="{ 'locked': isLocked }"
    @mousedown="startDrag"
  >
    <div class="splitter-handle"></div>
  </div>
</template>

<script setup>
  import { ref, onUnmounted } from 'vue';
  import { useTasksStore } from '@/stores/taksStore.js';

  const store = useTasksStore();

  // Define Props
  const props = defineProps({
    modelValue: {
      type: Number,
      required: true
    },
    isLocked: {
      type: Boolean,
      default: false
    }
  });
  
  // Define Emits
  const emit = defineEmits(['update:modelValue', 'dragStart', 'dragEnd']);

  // Internal State
  const isDragging = ref(false);
  const startY = ref(0);
  const startHeight = ref(0);

  const startDrag = (e) => {
    if (props.isLocked) return;

    isDragging.value = true;
    startY.value = e.clientY;
    startHeight.value = props.modelValue;

    // Add styling to body to prevent text selection
    document.body.classList.add('resizing');

    // Attach global listeners
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);

    emit('dragStart');
  };

  const onDrag = (e) => {
    if (!isDragging.value) return;

    // Calculate delta (Movement UP means positive delta for bottom height)
    const deltaY = startY.value - e.clientY;
    const newHeight = startHeight.value + deltaY;

    // Constraints (Min 100px, Max 80% of window height)
    const minHeight = 100;
    const maxHeight = window.innerHeight * 0.8;
    
    if (newHeight >= minHeight && newHeight <= maxHeight) {
      emit('update:modelValue', newHeight);
      store.bottomHeight = newHeight;
      
    }
  };

  const stopDrag = () => {
    if (isDragging.value) {
      isDragging.value = false;
      document.body.classList.remove('resizing');
      emit('dragEnd');
    }

    // Clean up listeners
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  };

  onUnmounted(() => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  });
</script>

<style scoped>
.splitter {
  user-select: none;

  height: var(--splitter-height, 8px);
  background-color: var(--color-border, #5e90f4);
  cursor: row-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.15s;
}

.splitter:hover, .splitter:active {
  background-color: var(--color-primary-hover, #d36434);
}

.splitter.locked {
  cursor: default;
  background-color: #345391;
  border-top: 1px solid var(--color-border, #e5e7eb);
}

.splitter.locked:hover {
  background-color: #f3f4f6; 
}

.splitter-handle {
  width: 48px;
  height: 4px;
  background-color: #d1d5db;
  border-radius: 9999px;
  transition: background-color 0.15s;
}

.splitter:hover .splitter-handle {
  background-color: white;
}

.splitter.locked .splitter-handle {
  display: none;
}
</style>