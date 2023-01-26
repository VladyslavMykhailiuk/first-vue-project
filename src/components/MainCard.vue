<template>
    <div class="box">
        <div class="row">
            <div class="col-lg-9 col-md-9 col-sm-12">
                <form>
                    <GMapAutocomplete class="search-box" id="searched-city" v-bind:value="searchInput"
                        v-on:input="searchInput = $event.target.value" placeholder="Введіть ваше місто">
                    </GMapAutocomplete>
                    <button v-on:click="clickOnSearch" type="submit" class="form-btn" id="submit-btn">
                        <i class="fas fa-search"></i>
                    </button>
                    <button v-on:click="getCurrentLocation" type="button" class="form-btn" id="location-btn">
                        <i class="fas fa-location-arrow"></i>
                    </button>
                </form>
            </div>
            <div class="col-lg-3 col-md-3 text-center">
                <label class="active-unit" id="celsius-label-btn">
                    <button class="celsius-btn" id="celsius">
                        ºC
                    </button>
                </label>
            </div>
        </div>

        <h1 id="city">{{ cityName }}</h1>
        <div class="row">
            <div class="col date-description">
                <span id="date">{{ dateElement }}</span>
                <br />
                <span id="weather-description">{{ descriptionElement }}</span>
            </div>
            <div class="col">
                <img v-bind:src="weatherIconElement" alt="Rain" class="icon" id="weather-icon" />
            </div>
            <div class="col">
                <h2>
                    <span class="current-temp" id="temp">{{ tempElement }}</span><small
                        class="weather-unit unit">ºC</small>
                </h2>
            </div>
        </div>
        <div class="weather-extra">
            <ul>
                <li>Humidity: <span id="humidity">{{ humidityElement }}</span>%</li>
                <li>Wind: <span id="wind"></span>{{ windElement }} km/h</li>
            </ul>
        </div>
        <div class="row hour-forecast" id="forecast">
            <div class="col-2" v-for="(item, index) in forecast.slice(0, 6)" :key="index">
                <h6>
                    {{ this.formatHours(item.dt * 1000) }}
                </h6>
                <img :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`" height="75" />
                <div>
                    <strong><span class="max-temp">{{ Math.round(item.main.temp_max) }}</span></strong><span
                        class="forecast-unit unit">ºC</span> <span class="min-temp">
                        {{ Math.round(item.main.temp_min) }}
                    </span><span class="forecast-unit unit">ºC</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axiosInstance from '@/assets/AxiosInstance'
import { useWeatherStore } from "@/stores/weatherStore";
import { mapState, mapActions } from "pinia";

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];


export default {
    name: 'MainCard',
    data() {
        return {
            searchInput: '',
            cityName: '',
            dateElement: '',
            descriptionElement: '',
            weatherIconElement: '',
            tempElement: '',
            humidityElement: '',
            windElement: '',
            forecast: '',
            latitude: '',
            longitude: ''

        }
    },
    computed: {
        ...mapState(useWeatherStore, ["weather"]),
    },
    methods: {
        ...mapActions(useWeatherStore, ["getWeather"]),
        getCurrentLocation(event) {
            event.preventDefault()
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                axiosInstance.get('weather', {
                    params: {
                        "lat": this.latitude,
                        'lon': this.longitude,
                    },
                }).then(this.ShowRealTemp);

                axiosInstance.get('forecast', {
                    params: {
                        "lat": this.latitude,
                        'lon': this.longitude,
                    },
                }).then(this.displayForecast);
            });
        },
        ShowRealTemp(response) {
            this.cityName = response.data.name
            this.dateElement = this.formatDate(response.data.dt * 1000)
            this.descriptionElement = response.data.weather[0].description
            this.weatherIconElement = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            this.tempElement = Math.round(response.data.main.temp)
            this.humidityElement = response.data.main.humidity
            this.windElement = Math.round(response.data.wind.speed * 3.6)

        },
        displayForecast(response) {
            this.forecast = response.data.list;
        },
        clickOnSearch(event) {
            event.preventDefault();
            this.search(this.searchInput)
            localStorage.setItem('lastCity', JSON.stringify(this.searchInput))
            this.searchInput = ''

        },
        formatDate(timestamp) {
            const date = new Date(timestamp);

            const weekDay = weekDays[date.getDay()];

            return `${weekDay} ${this.formatHours(timestamp)}`;
        },
        formatHours(timestamp) {
            const date = new Date(timestamp);

            const hours = ("0" + date.getHours()).slice(-2);
            const minutes = ("0" + date.getMinutes()).slice(-2);

            return `${hours}:${minutes}`;
        },
        search(city) {
            axiosInstance.get('weather', {
                params: {
                    "q": city,
                },
            }).then(this.ShowRealTemp)
            axiosInstance.get('forecast', {
                params: {
                    "q": city,
                },
            }).then(this.displayForecast);
            this.getWeather()
        },
    },
    mounted() {
        this.search(JSON.parse(localStorage.getItem('lastCity')));
    }
}
</script>


<style>
.box {
    width: 600px;
    border: 0.7px solid #636363;
    border-radius: 10px;
    margin-bottom: 5px;
    background-color: rgb(5, 139, 201);
    margin: 20px auto 20px auto;
}

.fas {
    color: #636363;
}

.search-box {
    background-color: rgb(249, 249, 249);
    border: none;
    outline: none;
}

.search-box,
.form-btn,
.celsius-btn {
    margin-top: 15px;
    padding: 6px;
    border: 0.7px solid #636363;
}

.search-box,
.form-btn {
    border-radius: 5px;
}

.search-box {
    width: 300px;
    margin-left: 15px;
}

.form-btn,
.celsius-btn {
    background: none;
    width: 40px;
    margin-left: 10px;
}

.form-btn:hover {
    background: #f2f2f2;
}

.celsius-btn {
    border-radius: 10px;
}

.celsius-btn {
    margin-left: 23px;
    background: #f7e4df;
}

h1 {
    padding: 15px 0 5px 20px;
    font-size: 34px;
}

.date-description {
    margin-left: 37px;
    font-size: 14px;
    text-transform: capitalize;
}



h2 {
    margin-top: 22px;
}

.current-temp {
    font-size: 45px;
}

.weather-unit {
    position: relative;
    left: 2px;
    bottom: 12px;
}


li {
    list-style: none;
}

.hour-forecast {
    text-align: center;
    margin: 15px 0 15px 0;
    padding: 5px;
}

.hour-forecast img {
    display: block;
    margin: 0 auto;
    padding: 0;
    width: 100%;
}


h6 {
    padding: 0;
    margin: 0;
}

.forecast-unit {
    font-size: 11px;
    position: relative;
    bottom: 2.5px;
}

.forecasts {
    display: flex;
}
</style>