<template>
    <div class="row">
        <div class="col-12">
            <div class="main-search-block">
                <GMapAutocomplete class="search-main" v-bind:value="test1" v-on:input="test1 = $event.target.value"
                    placeholder="Введіть ваше місто">
                </GMapAutocomplete>
                <button v-on:click="searchForCard(test1)" type="submit" class="form-btn main-btn">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/assets/AxiosInstance'
export default {
    name: 'MainSearch',
    data() {
        return {
            test1: '',
            card: {},
        }
    },
    methods: {
        createElement(param) {
            this.card = param
            this.$emit('push', this.card)
        },

        drawCard(response) {
            const forecast = response.data;
            this.createElement(forecast);
            this.test1 = '';
        },
        searchForCard(city) {
            axiosInstance.get('weather', {
                params: {
                    "q": city,
                },
            }).then(this.drawCard);
        }
    }

}
</script>

<style scoped>
.main-search-block {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.search-main {
    width: 300px;
    height: 40px;
    margin-top: 14px;
    border-radius: 10px;
    margin-right: 20px;
    background-color: rgb(249, 249, 249);
    border: none;
    outline: none;
}

.main-btn {
    background-color: rgb(249, 249, 249);
}

.fas {
    color: #636363;
}

.form-btn {
    margin-top: 15px;
    padding: 6px;
    border: 0.7px solid #636363;
}


.form-btn {
    border-radius: 5px;
}

.form-btn {
    width: 40px;
}

.form-btn:hover {
    background: #f2f2f2;
}
</style>