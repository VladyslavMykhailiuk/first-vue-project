<template>
  <div class="container">
    <HeaderComp />
    <router-view v-slot="{ Component }">
      <keep-alive include="WeatherPage,GraphicPage,UserProfile">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue"
export default {
  name: 'App',
  components: {
    HeaderComp
  },
  methods: {

  }

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
