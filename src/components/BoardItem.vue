<template>
    <div class="board-wrapper">
        <div class="board">
            <BoardComponent :game-status="gameStatus" v-for="field in fields" :field="field" :key="'item-' + field.id"
                @selectField="selectField($event)" />
        </div>

        <p class="difficult">Складність: <strong>{{ difficult }}</strong></p>
        <p class="win" v-if="isWin">Вітаю! Продовжуємо грати!</p>
        <p class="fail" v-if="isFail">Вы програли. Спробуйте ще раз!</p>

        <button class="btn" @click="start" :disabled="!canStartGame">Старт</button>
    </div>
</template>

<script>
import BoardComponent from '@/components/BoardComponent.vue';
import useGameInit from "@/components/composables/useGameInit";
import useGameStart from "@/components/composables/useGameStart";
import useGameProcess from "@/components/composables/useGameProcess";
import { GAME_STATUS } from "@/assets/constants"
import { ref } from 'vue';
export default {
    name: 'BoardItem',
    props: {},
    components: {
        BoardComponent,
    },
    setup() {
        const number = 25;
        const gameStatus = ref(GAME_STATUS.NONE);

        const { difficult, fields, init } = useGameInit(number);

        const { start, canStartGame } = useGameStart(init, fields, difficult, number, gameStatus);
        const { selectField, isWin, isFail } = useGameProcess(fields, gameStatus, difficult, start);

        return {
            number,
            difficult,
            fields,
            init,
            start,
            gameStatus,
            canStartGame,
            selectField,
            isWin,
            isFail
        }
    },
}
</script>

<style scoped>
.board-wrapper {
    margin-bottom: 100px;
}

.board {
    width: 300px;
    background: #eee;
    margin: 0 auto;
}

.btn {
    background: #42b983cc;
    color: white;
    border: none;
    border-radius: 2px;
    padding: 10px 30px;
    cursor: pointer;
    outline: none;
    margin-left: 100px;
}

button:hover {
    background: #42b983;
}

button:disabled {
    opacity: .5;
}

.win {
    color: #42b983;
}

.fail {
    color: #ff000055;
}
</style>