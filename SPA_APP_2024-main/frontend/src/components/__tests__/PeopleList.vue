<template>
    <div class="about">
        <h1>Peoplelist</h1>
        <div class="peoplelist">
            <DataTable :value="events" v-if="events.length > 0 ">
                <Column field="id" header="S�ndmuse id" style="color: black; " />
                <Column field="type" header="S�ndmuse t��p" style="color: black; " />
                <Column field="description" header="Kirjeldus" style="color: black; " />
                <Column field="location" header="Asukoht" style="color: black;" />
                <Column field="date" header="Kuup�ev" style="color: black;" />
            </DataTable>
            <div v-else>S�ndmused puuduvad</div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { type Event } from '@/models/event';
import { useEventsStore } from "@/stores/eventsStore";
import { storeToRefs } from "pinia";
import { defineProps, onMounted, watch, ref  } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

watch(route, (to, from) => {
  if (to.path !== from.path || to.query !== from.query) {
    eventsStore.load();
  }
}, { deep: true });

defineProps<{ title: String }>();
const eventsStore = useEventsStore();
const { events } = storeToRefs(eventsStore);

onMounted(async () => {
  eventsStore.load();
});
</script>
<style>
</style>