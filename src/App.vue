<template>
  <div class="container">
    <MainSearch @push="clicker" />
    <MainCard />
    <WeatherCards @update="updateCard" @delete="deleteCard" :cards="cardList" v-model="inputValue" />
  </div>
</template>

<script>
import axiosInstance from '@/assets/AxiosInstance'
import MainSearch from '@/components/MainSearch';
import MainCard from '@/components/MainCard'
import WeatherCards from '@/components/WeatherCards.vue'
export default {
  name: 'App',
  props: {

  },
  data() {
    return {
      inputValue: '',
      card: {},
      cardList: JSON.parse(localStorage.getItem('dataArray')) || []
    }
  },
  components: {
    MainSearch,
    MainCard,
    WeatherCards
  },
  methods: {
    clicker(card) {
      this.card = card;
      this.card.uid = this.card.id + Math.floor(Math.random() * 100000)
      this.cardList.push(this.card)
      localStorage.setItem('dataArray', JSON.stringify(this.cardList));
    },
    deleteCard(id) {
      this.cardList.forEach((element, index) => {
        if (element.uid === id) {
          this.cardList.splice(index, 1)
          localStorage.setItem('dataArray', JSON.stringify(this.cardList));
        }
      });
    },
    updateCard(id) {
      this.cardList.forEach((element, index) => {
        if (element.uid === id) {
          axiosInstance.get('weather', {
            params: {
              "q": this.inputValue,
            },
          }).then((response) => {
            this.cardList.splice(index, 1, response.data)
            localStorage.setItem('dataArray', JSON.stringify(this.cardList));
          });
        }
      });
    }
  },
}
</script>

<style>
body {
  background-color: rgb(8, 69, 94) !important;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
