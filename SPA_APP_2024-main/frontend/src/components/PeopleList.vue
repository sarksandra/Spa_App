<template>
    <div class="about">
        <h1>PeopleList</h1>
        <div class="peoplelist">
            <DataTable :value="peoples" v-if="peoples.length > 0 ">
                <Column field="id" header="inimese id" style="color: black; " />
                <Column field="name" header="Inimese nimi" style="color: black; " />
                <Column field="age" header="Inimese vanus" style="color: black; " />
            </DataTable>      
            <div v-else>Inimene puuduvad</div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
    import { type People } from '@/models/people';
    import { usePeoplesStore } from "@/stores/peoplesStore";
    import { storeToRefs } from "pinia"; 
    import { defineProps, onMounted, watch, ref } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    watch(route, (to, from) => {
        if (to.path !== from.path || to.query !== from.query) {
            peoplesStore.load();
        }
    }, { deep: true });

    

    defineProps<{ title: String }>();
    const peoplesStore = usePeoplesStore();
    const { peoples } = storeToRefs(peoplesStore);

    onMounted(async () => {
        peoplesStore.load();
    });
</script>
<style>
</style>