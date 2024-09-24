<script setup lang="ts">
useHead({
    title: 'New Tab',
    meta: [
        { name: 'description', content: 'Minimalistic New Tab Page' },
    ],
})

console.log(userConfig.get.clock().enabled)
</script>

<template>
    <Clock v-if="userConfig.get.clock().enabled === 'true'" />
</template>
