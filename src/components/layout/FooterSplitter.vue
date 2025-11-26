<template>
  <div class="splitter">
    <div class="splitter-icon">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script setup>
  import ShowIcon from '@/components/core/ShowIcon.vue';
</script>

<style scoped>
 .splitter {
            display: block;
            position: relative;
            height: 5px;
            border-top: 1px solid var(--footer-border);
            background-color: #e5e5e5;
            /* HORIZONTAL CENTERING: Center the inline-block child */
            text-align: center; 
            padding: 0;
            margin: 0;
        }

        .splitter-icon {
            position: relative;
            /* Make the icon block behave like text, allowing text-align: center; on parent to work */
            display: block;
            /* VERTICAL CENTERING: Set line-height equal to container height */
            line-height: 5px; 
            height: 100%;
            width: 250px;
            vertical-align: middle;
            padding: 0;
            margin: 0;
            background-color: #c0c0c0;
        }

        .circle {
          position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #999999;
            transition: background-color 0.2s;
            padding: 0;
            margin: 0;
            /* Display circles as inline-block to respect line-height and allow margins */
            display: inline-block; 
            /* VERTICAL CENTERING: Align inline elements with line-height */
            vertical-align: middle; 
        }

        /* Separation of 5px, applied to all circles except the last one */
        .splitter-icon .circle:not(:last-child) {
            left: 25px; 
        }
</style>