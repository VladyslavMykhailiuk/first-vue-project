<template>
    <div class="orange">
        <p> {{ card.name }}</p>
        <p> {{ Math.round(card.main.temp) }}</p>
        <input v-model="inputCard" @input="$emit('update:modelValue', $event.target.value)" type="text"
            class="updateInput">
        <button v-on:click="$emit('update', card.uid)" class="editBtn">Edit</button>
        <span v-on:click="$emit('delete', card.uid)" class="deleteBtn">x</span>
    </div>
</template>

<script>

export default {
    name: 'OneCard',
    data() {
        return {
            inputCard: '',
        }
    },
    props: {
        card: Object,
    },
    methods: {

    }
}

</script>

<style>
.orange {
    padding-top: 25px;
    width: 270px;
    height: 150px;
    background-color: rgb(14 165 233);
    border-radius: 6px;
    margin: 16px 5px 5px 16px;
    text-align: center;
    font-size: 30px;
    position: relative;
}

.delete {
    position: absolute;
    top: 0;
    right: 5px;
    font-size: 20px;
    cursor: pointer;
}

.orange input {
    width: 100px;
    height: 30px;
    background-color: rgb(249, 249, 249);
    border-radius: 6px;
    outline: none;
    display: block;
    text-align: center;
    margin-left: 10px;
}

.orange button {
    background-color: rgb(249, 249, 249);
    border: none;
    border-radius: 6px;
    width: 50px;
    font-size: 16px;
    position: absolute;
    bottom: 7px;
    right: 20px;
}

.orange span {
    position: absolute;
    top: -6px;
    right: 16px;
    color: #fff;
    cursor: pointer;
    font-size: 25px;
}

.orange p {
    padding: 0;
    margin: 0;
}
</style>
