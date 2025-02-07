import { type People } from "@/models/people";
import { ref } from "vue";
import { defineStore } from "pinia";
import useApi, { useApiRawRequest } from "../models/api";

export const usePeoplesStore = defineStore('peoplesStore', () => {
    const apiGetPeoples = useApi<People[]>('people');
    const peoples = ref<People[]>([]);
    let allEvents: People[] = [];

})

