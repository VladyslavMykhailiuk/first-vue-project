import { defineStore } from "pinia";
import axiosInstance from '@/assets/AxiosInstance'

export const useWeatherStore = defineStore('weatherStore', {
    state: () => ({
        weather: {
            data: {
                name: 'Kyiv'
            }
        },
        forecast: {},
    }),
    getters: {

    },
    actions: {
        searchWeather(city, temp, forecast) {
            axiosInstance.get('weather', {
                params: {
                    "q": city,
                },
            }).then((response) => {
                this.weather = response;
                temp(this.weather)
            })
            axiosInstance.get('forecast', {
                params: {
                    "q": city,
                },
            }).then((response) => {
                this.forecast = response;
                forecast(this.forecast)
            });
        },
    },
})