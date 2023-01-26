<template>
    <div>
        <MainSearch @push="clicker" />
        <MainCard />
        <WeatherCards @update="updateCard" @delete="deleteCard" :cards="cardList" v-model="inputValue" />
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { mapState } from "pinia";
import axiosInstance from '@/assets/AxiosInstance'
import MainSearch from '@/components/MainSearch';
import MainCard from '@/components/MainCard'
import WeatherCards from '@/components/WeatherCards.vue'
import Swal from 'sweetalert2'
export default {
    name: 'WeatherPage',
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
    computed: {
        ...mapState(useAuthStore, ["user"]),
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
            if (Object.keys(this.user).length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Для взаємодії з картками потрібно авторизуватися',
                })
                this.$router.push('/auth')
            }
            else {
                this.cardList.forEach((element, index) => {
                    if (element.uid === id) {
                        this.cardList.splice(index, 1)
                        this.cityList.splice(index, 1)
                        localStorage.setItem('dataArray', JSON.stringify(this.cardList));
                        localStorage.setItem('cityArray', JSON.stringify(this.cityList))
                    }
                });
            }
        },
        updateCard(id) {
            if (Object.keys(this.user).length == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Потрібно ввійти для взаємодії з картками',
                })
                this.$router.push('/auth')
            }
            else {
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

</style>