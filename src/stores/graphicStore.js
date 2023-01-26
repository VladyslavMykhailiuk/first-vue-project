import { defineStore } from "pinia";
import axiosInstance from '@/assets/AxiosInstance'

export const useGraphicStore = defineStore('graphicStore', {
    state: () => ({
        graphic: {
            city: {
                name: 'Kyiv'
            }
        },
    }),
    getters: {

    },
    actions: {
        getGraphic(name, labels, datasets, createChart) {
            axiosInstance.get('forecast', {
                params: {
                    "q": name,
                },
            }).then((response) => {
                this.graphic = response.data
                this.graphic.list.forEach(element => {
                    labels.push(element.dt_txt)
                    datasets.push(element.main.temp)
                });
                createChart();
            })
        },
    },
})