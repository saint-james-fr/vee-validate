<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  
}
</style>
