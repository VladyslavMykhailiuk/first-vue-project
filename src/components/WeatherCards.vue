<template>
    <div class="smallWeather">
        <OneCard :cards="cards" v-for="card in cards" :key="card.uid" :card="card" @delete="deleteCard" @update="update"
            v-model="inputValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script>
import OneCard from './OneCard.vue';
export default {
    name: 'WeatherCards',
    data() {
        return {
            inputValue: ''
        }
    },
    props: {
        cards: Array,
    },
    components: {
        OneCard
    },
    methods: {
        deleteCard(id) {
            this.$emit('delete', id)
        },
        update(id) {
            this.$emit('update', id)
        }
    }
}
</script>

<style>
.smallWeather {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
</style>
