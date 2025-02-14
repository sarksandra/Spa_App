import { type People } from "@/models/people";
import { ref } from "vue";
import { defineStore } from "pinia";
import useApi, { useApiRawRequest } from "../models/api";


export const usePeoplesStore = defineStore('peoplesStore', () => {
    const apiGetPeoples = useApi<People[]>('people');
    const peoples = ref<People[]>([]);
    let allPeople: People[] = [];

    const loadPeople = async () => {
        await apiGetPeoples.request();

        if (apiGetPeoples.response.value) {
            return apiGetPeoples.response.value;
        }
        return [];
    };

    const load = async () => {
        allPeople = await loadPeople();
        peoples.value = allPeople;
    };
    const getPeopleById = (id: Number) => {
        return allPeople.find((people) => people.id === id);
    };

    const addPeople = async (people: People) => {
        const apiAddPeople = useApi<People>('Peoples', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(people),
        });

        await apiAddPeople.request();
        if (apiAddPeople.response.value) {
            load();
        }
    };

    const updatePeople = async (people: People) => {
        const apiUpdatePeople = useApi<People>('peoples/' + people.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(people),
        });

        await apiUpdatePeople.request();
        if (apiUpdatePeople.response.value) {
            load();
        }
    };

    const deletePeople= async (people: People) => {
        const deletePeopleRequest = useApiRawRequest(`peoples/${people.id}`, {
            method: 'DELETE',
        });

        const res = await deletePeopleRequest();

        if (res.status === 204) {
            let id = peoples.value.indexOf(people);

            if (id !== -1) {
                peoples.value.splice(id, 1);
            }

            id = peoples.value.indexOf(people);

            if (id !== -1) {
                peoples.value.splice(id, 1);
            }
        }
    };

    return { peoples, load, getPeopleById, addPeople, updatePeople, deletePeople };

});

