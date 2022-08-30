<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import Logo from '@assets/images/logo.svg'
</script>

<template>
    <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer noopener">
            <Logo />
        </a>
        <a href="https://vuejs.org/" target="_blank" rel="noreferrer noopener">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
