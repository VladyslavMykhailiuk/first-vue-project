<template>
    <div>
        <h1>Графіки зміни погодних умов</h1>
        <div class="search">
            <input v-model="inputValue" placeholder="Введіть ваше місто">
            <button v-on:click="deleteChart">Відрисувати графік</button>
        </div>
        <h3>Останнє введене місто: {{ cityName }}</h3>
        <canvas id="myChart"></canvas>

    </div>
</template>

<script>
import Chart from "chart.js/auto"
import axiosInstance from "@/assets/AxiosInstance"

export default {
    name: 'GraphicPage',
    data() {
        return {
            inputValue: '',

            cityName: '',

            test: null,

            config: {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Температура',
                        backgroundColor: 'rgb(255,99,132)',
                        borderColor: 'rgb(255,99,132)',
                        data: [],
                    }]
                },
                options: {}
            }
        }
    },
    props: {

    },
    computed: {
    },
    methods: {
        createChart() {
            this.test = new Chart(
                document.getElementById('myChart'),
                this.config
            )
        },
        deleteChart() {
            if (this.inputValue.length == 0) {
                alert('Введіть місто')
            }
            else {
                this.test.destroy()
                this.searchCity(this.inputValue);
                localStorage.setItem('lastGraphCity', JSON.stringify(this.inputValue))
            }
        },
        searchCity(name) {
            axiosInstance.get('forecast', {
                params: {
                    "q": name,
                },
            }).then((response) => {
                this.cityName = response.data.city.name;
                response.data.list.forEach(element => {
                    this.config.data.labels.push(element.dt_txt)
                    this.config.data.datasets[0].data.push(element.main.temp)
                });
                this.createChart();
                this.config.data.labels = [];
                this.config.data.datasets[0].data = [];
            })
        },

    },
    mounted() {
        this.searchCity(JSON.parse(localStorage.getItem('lastGraphCity')))
    }

}

</script>

<style scoped>
h1 {
    text-align: center;
    color: #fff;
}

h3 {
    margin-top: 20px;
    text-align: center;
    color: #fff;
}

#myChart {
    border: 3px solid blue;
    border-radius: 12px;
    background-color: bisque;
    margin-top: 20px;
    width: 1000px;
    height: 800px;
}

.search {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    border: none;
    outline: none;
    padding-left: 15px;
    border-radius: 6px;
    width: 300px;
    height: 40px;
}

button {
    margin-left: 25px;
    width: 200px;
    height: 40px;
    border-radius: 6px;
    color: #fff;
    background-color: #000;
    border: none;
}

button:hover {
    background-color: #fff;
    color: #000;
    transition: all 0.3s ease-in-out;
    animation: headShake;
    animation-duration: 2s;
}
</style>
