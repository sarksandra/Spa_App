<template>
    <div class="about">
        <h1>PeopleList</h1>
        <div class="peoplelist">
            <DataTable :value="peoples" v-if="peoples.length > 0">
                <Column field="id" header="Inimese ID" style="color: black;" />
                <Column field="name" header="Inimese Nimi" style="color: black;" />
                <Column field="age" header="Inimese Vanus" style="color: black;" />
            </DataTable>
            <div v-else>Inimene puuduvad</div>
        </div>
        <div class="add-people-form">
            <h2>Lisa Inimene</h2>
            <form @submit.prevent="addPeople">
                <div>
                    <label for="name">Nimi:</label>
                    <input v-model="newPeople.name" type="text" id="name" required />
                </div>
                <div>
                    <label for="age">Vanus:</label>
                    <input v-model="newPeople.age" type="number" id="age" required />
                </div>
                <button type="submit">Lisa inimene</button>
            </form>
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

    const peoplesStore = usePeoplesStore();
    const { peoples } = storeToRefs(peoplesStore);

    const newPeople = ref({
        name: '',
        age: 0,
    });

    const addPeople = async () => {
        if (newPeople.value.name.trim() !== '' && newPeople.value.age > 0) {
            await peoplesStore.addPeople({
                ...newPeople.value,
                id: 0, 
            });

            newPeople.value = { name: '', age: 0 };
        } 
    };

    const deletePeople = async () => {
        if()
    }

    onMounted(async () => {
        peoplesStore.load();
    });


</script>