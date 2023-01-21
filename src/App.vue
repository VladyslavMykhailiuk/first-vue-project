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
import Swal from 'sweetalert2'
export default {
  name: 'App',
  props: {

  },
  data() {
    return {
      inputValue: '',
      card: {},
      cityList: JSON.parse(localStorage.getItem('cityArray')) || [],
      cardList: JSON.parse(localStorage.getItem('dataArray')) || []
    }
  },
  components: {
    MainSearch,
    MainCard,
    WeatherCards,
  },
  methods: {
    clicker(card) {
      if (!this.cityList.includes(card.name)) {
        this.card = card;
        this.card.uid = this.card.id + Math.floor(Math.random() * 100000)
        this.cardList.push(this.card)
        this.cityList.push(this.card.name.split(',')[0])
        localStorage.setItem('cityArray', JSON.stringify(this.cityList))
        localStorage.setItem('dataArray', JSON.stringify(this.cardList));
      }
      else {
        this.showPopup();
      }
    },
    deleteCard(id) {
      this.cardList.forEach((element, index) => {
        if (element.uid === id) {
          this.cardList.splice(index, 1)
          this.cityList.splice(index, 1)
          localStorage.setItem('dataArray', JSON.stringify(this.cardList));
          localStorage.setItem('cityArray', JSON.stringify(this.cityList))
        }
      });
    },
    updateCard(id) {
      if (this.cityList.includes(this.inputValue)) {
        this.showPopup();
      }
      else {
        this.cardList.forEach((element, index) => {
          if (element.uid === id) {
            axiosInstance.get('weather', {
              params: {
                "q": this.inputValue,
              },
            }).then((response) => {
              this.card = response.data;
              this.card.uid = this.card.id + Math.floor(Math.random() * 100000)
              this.cardList.splice(index, 1, this.card)
              this.cityList.splice(index, 1, this.card.name.split(',')[0])
              localStorage.setItem('dataArray', JSON.stringify(this.cardList));
              localStorage.setItem('cityArray', JSON.stringify(this.cityList))

            });
          }
        })
      }
    },
    showPopup() {
      Swal.fire({
        icon: 'error',
        title: 'У вас вже є це місто в доданих, додайте нове.',
      })
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
