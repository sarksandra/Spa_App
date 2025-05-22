<template>
    <div class="about">
        <h1>Personlist</h1>
        <div class="personlist" >
            <DataTable :value="persons">
                <Column field="id" header="ID" style="color: black;" />
                <Column field="name" header="Name" style="color: black;" />
                <Column field="age" header="Vanus" style="color: black;" />
                <Column header="">
                    <template #body="{ data }">
                        <button @click="deletePerson(data.id)">Kustuta</button>
                        <br />
                        <button @click="editPerson(data)">Edit</button>
                    </template>
                </Column>
            </DataTable>
        </div>
        <br />
        <div class="add-people-from">
            <form @submit.prevent="addPerson">
                <h2>Lisa Inimene</h2>
                <div>
                    <label for="name">Name:</label>
                    <input v-model="newPerson.name" placeholder="Nimi" required />

                </div>
                <div>
                    <label for="age">Vanus:</label>
                    <input v-model="newPerson.age" placeholder="Vanus" required />

                </div>
                <button type="submit">Lisa inimene</button>
            </form>
        </div>

        <div v-if="editingPerson" class="edit-form">
            <h2>Edit Inimene</h2>
            <form @submit.prevent="updatePerson">
                <div>
                    <label for="name">Vanus:</label>
                    <input v-model="editingPerson.name" placeholder="Nimi" required />
                </div>
                <div>
                    <label for="age">Age:</label>
                    <input v-model="editingPerson.age" placeholder="Vanus" required />
                </div>
                <button type="submit">Salvesta</button>
                <button type="button" @click="editingPerson = null">Tuhista</button>
            </form>
        </div>
    </div>
    
</template>

<script setup lang="ts">

    import { ref, onMounted } from 'vue';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';

    interface Person {
        id: number;
        name: string;
        age: string;
 
    }

    const persons = ref<Person[]>([

    ]);

    const newPerson = ref<Omit<Person, 'id'>>({
        name: "",
        age: "",

    });

    const editingPerson = ref<Person | null>(null);

    const addPerson = () => {
        persons.value.push({
            id: persons.value.length + 1,
            ...newPerson.value
        });
        newPerson.value = { name: "", age: "" };
        SavePersonsToLocalStorage();
    };

    const deletePerson = (id: number) => {
        persons.value = persons.value.filter(p => p.id !== id);
        SavePersonsToLocalStorage();

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
        SavePersonsToLocalStorage();

    };
</script>