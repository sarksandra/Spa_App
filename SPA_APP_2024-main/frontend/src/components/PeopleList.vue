<template>
    <div class="about">
        <h1>PeopleList</h1>
        <div class="peoplelist">
            <DataTable :value="peoples" v-if="peoples.length > 0">
                <Column field="id" header="Inimese ID" style="color: black;" />
                <Column field="name" header="Inimese Nimi" style="color: black;" />
                <Column field="age" header="Inimese Vanus" style="color: black;" />
                <Column header="">
                    <template #body="slotProps">
                        <button @click="editPerson(data)">Edit</button>
                        <button @click="deletePeople(slotProps.data.id)">Kustuta</button>
                    </template>
                </Column>
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
        <div v-if="editingPerson" class="edit-people-form">
            <h2>Lisa Inimene</h2>
            <form @submit.prevent="updatePerson">
                <div>
                    <label for="name">Nimi:</label>
                    <input v-model="editingPerson.name" type="text" id="name" required />
                </div>
                <div>
                    <label for="age">Vanus:</label>
                    <input v-model="editingPerson.age" type="number" id="age" required />
                </div>
                <button type="submit" @click="editi">Salvesta</button>
                <button type="button" @click="editingPerson = null">Tuhista</button>
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
    const editingPerson = ref<Person | null>(null);

    const addPerson = () => {
        persons.value.push({
            id: persons.value.length + 1,
            ...newPerson.value
        });
        newPerson.value = { name: "", city: "", region: "", date: "" };
    };

    const deletePerson = (id: number) => {
        persons.value = persons.value.filter(p => p.id !== id);
    };

    const editPerson = (person: Person) => {
        editingPerson.value = { ...person };
    };

    const updatePerson = () => {
        if (!editingPerson.value) return;
        const index = persons.value.findIndex(p => p.id === editingPerson.value?.id);
        if (index !== -1) {
            persons.value[index] = { ...editingPerson.value };
        }
        editingPerson.value = null;
    };


    const deletePeople = async (id: number) => {
        peoples.value = peoples.value.filter(p => p.id !== id);
    };
  

    onMounted(async () => {
        peoplesStore.load();
    });


</script>