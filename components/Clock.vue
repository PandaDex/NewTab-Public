<template>
    <div
        class="absolute sm:top-5 text-black dark:text-white max-sm:top-0 max-sm:h-1/2 sm:left-5 max-sm:w-full max-sm:flex max-sm:justify-center max-sm:items-end max-sm:pb-36 min-h-[250px]">
        <div class="w-fit flex flex-col items-center">
            <h1 class="font-medium text-7xl select-none">{{ time.hour }}:{{ time.minute }}</h1>
            <!-- weather -->
            <span class="flex gap-1.5 items-center select-none">
                <span class="flex gap-0.5 items-center">
                    <p>{{ weather.description }}</p>
                </span>
                <p>{{ weather.temp }}°{{ weather.tempUnit }}</p>
                <span class="flex gap-0.5 items-center">
                    <MapPinIcon />
                    <p>{{ weather.city }}</p>
                </span>
            </span>
            <!-- weather -->
        </div>
    </div>
</template>

<script setup lang="js">
import { MapPinIcon } from 'lucide-vue-next';
const date = new Date();
const time = ref({ hour: date.getHours().toString().padStart(2, '0'), minute: date.getMinutes().toString().padStart(2, '0'), });
const weather = ref({ temp: 69, icon: 0, description: 'Test', city: 'Żydów', tempUnit: 'C' });

setInterval(() => {
    const date = new Date();
    time.value = {
        hour: date.getHours().toString().padStart(2, '0'),
        minute: date.getMinutes().toString().padStart(2, '0'),
    };
}, 1000);
</script>
