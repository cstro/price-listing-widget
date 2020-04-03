<template>
  <div id="app" class="widget-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import '@boughtbymany/patterns/src/sass/ui/ui.scss';

.widget-container {
  height: 100vh;
  max-width: 1200px;
}
</style>

