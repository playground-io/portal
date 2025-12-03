<script setup>
  import { ref, onUnmounted } from 'vue';
  import { useSplitterStore } from '@/stores/useSplitterStore';

  const splitterStore = useSplitterStore();

  // --- Snap Configuration ---
  const SNAP_OFFSET = 50; // Pixels distance to snap
  const SNAP_POINTS = [
    300, 
    window.innerHeight * 0.5, 
    window.innerHeight * 0.9
  ];
  // -------------------------
  
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
  isDragging.value = true;
  startY.value = e.clientY;
  startHeight.value = splitterStore.bottomHeight;
console.log(startY.value, isDragging.value, startHeight.value);
  // Add styling to body to prevent text selection
  document.body.classList.add('resizing');

  // Attach global listeners
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
  emit('dragStart');
};

/*  const onDrag = (e) => {
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
  };*/

const onDrag = (e) => {
  if (!isDragging.value) return;
  const deltaY = startY.value - e.clientY;
  let newHeight = startHeight.value + deltaY; // Changed to 'let'
  // 1. Apply Snap Logic
  for (const snapPoint of SNAP_POINTS) {
    if (Math.abs(newHeight - snapPoint) <= SNAP_OFFSET) {
      newHeight = snapPoint; // Snap to the exact point
      break; 
    }
  }
  // 2. Apply Hard Constraints
  const minHeight = 100;
  const maxHeight = window.innerHeight * 0.8;
  
  // Ensure newHeight respects hard min/max constraints
  const finalHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));
  // 3. Update Model
  if (props.modelValue !== finalHeight) {
    emit('update:modelValue', finalHeight);
    splitterStore.setBottomHeight(finalHeight);
  }
  console.log('log',splitterStore.bottomHeight);
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

onUnmounted(
  () => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }
);
</script>

<template>
  <div class="splitter"
    @mousedown="startDrag"
  >
    <div class="splitter-handle"></div>
  </div>
</template>

<style lang=scss scoped>
body.resizing {
  user-select: none;
}

.splitter {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
  cursor: row-resize;
  background-color: var(--splitter-bg);
  transition: background-color var(--transition-fast) ease;

  &:hover, &:active {
    background-color: var(--splitter-bg-hover);
  }

  & .splitter-handle {
    width: 128px;
    height: 2px;
    background-color: var(--splitter-handle-bg);;
    border-radius: 2px;
    transition: background-color var(--transition-fast) ease;
  }

  &:hover .splitter-handle {
    background-color: var(--splitter-handle-bg-hover);
  }
}
</style>