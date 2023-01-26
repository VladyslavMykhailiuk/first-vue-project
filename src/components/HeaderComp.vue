<template>
    <div class="header">
        <button @click="$router.push('/')">Головна</button>
        <div class="buttons-center">
            <button @click="$router.push('/weather')">Прогноз</button>
            <button @click="$router.push('/graphics')">Графіки</button>
            <button @click="$router.push('/auth')">Вхід</button>
        </div>
        <button @click="$router.push('/user')">Мій профіль</button>
    </div>
</template>

<script>

export default {
    name: 'HeaderComp',
    methods: {

    }

}

</script>

<style scoped>
.header {
    padding: 10px;
    margin-top: 7px;
    border-radius: 12px;
    background-color: blueviolet;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 18px;
    border: none;
}

button:hover {
    background-color: #fff;
    color: rgba(0, 0, 0, 1);
    transition: all 0.3s ease-in-out;
    animation: headShake;
    animation-duration: 2s;
}

.buttons-center button {
    margin-left: 20px;
}
</style>
