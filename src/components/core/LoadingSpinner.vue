<template>
  <div id="loading"></div>
    <div class="loader-line-scale">
      <div></div><div></div><div></div><div></div><div></div>
    </div>
</template>

<script setup></script>

<style scoped>
  #loading {
    display: inline-block;
    width: 25px;
    height: 25px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }

 /* Loader 9: Line Scale Spinner */
.loader-line-scale {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  height: 30px;
}
.loader-line-scale div {
  display: inline-flex;
  background-color: #ffffff;
  width: 2px;
  height: 10px;
  border-radius: 0px;
  margin: 1px;
  animation: line-scale 1s infinite ease-in-out;
}
.loader-line-scale div:nth-child(1) { animation-delay: -0.9s; }
.loader-line-scale div:nth-child(2) { animation-delay: -0.8s; }
.loader-line-scale div:nth-child(3) { animation-delay: -0.7s; }
.loader-line-scale div:nth-child(4) { animation-delay: -0.6s; }
.loader-line-scale div:nth-child(5) { animation-delay: -0.5s; }
@keyframes line-scale {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}
</style>