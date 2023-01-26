import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        weather: {},
    }),
    getters: {
    },
    actions: {
        getWeather() {
            this.weather = { name: 'ivan' }
        },
    }
})