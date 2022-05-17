<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /*第一个参数是x坐标  第二个参数是y  第三个参数是晕染程度*/
    box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
  }
</style>
