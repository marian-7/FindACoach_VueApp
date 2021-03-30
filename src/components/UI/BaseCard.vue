<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.base-card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 12px;
  padding: 1rem;
  margin: 2rem auto;
  background-color: #f0f4f4;
}
</style>