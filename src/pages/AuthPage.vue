<template>
    <div class="overlay">
        <form @submit.prevent="sendCredentials">
            <div class="con">
                <header class="head-form">
                    <h2>Вхід</h2>
                    <p>Ввійдіть, використовуючи ваш логін та пароль</p>
                </header>
                <br>
                <div class="field-set">
                    <span class="input-item">
                        <i class="fa fa-user-circle"></i>
                    </span>
                    <input v-model="username" class="form-input" id="txt-input" type="text" placeholder="логін"
                        required>
                    <br>
                    <span class="input-item">
                        <i class="fa fa-key"></i>
                    </span>
                    <input v-model="userPassword" class="form-input" type="password" placeholder="пароль" id="pwd"
                        name="password" required>
                    <span>
                        <i @click="changePwd" class="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>
                    </span>
                    <br>
                    <button class="log-in"> Ввійти </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { mapState, mapActions } from "pinia";
export default {
    name: 'AuthPage',
    data() {
        return {
            username: '',
            userPassword: '',
            pwShown: 0,
        }
    },
    props: {

    },
    computed: {
        ...mapState(useAuthStore, ["users"]),
    },
    methods: {
        ...mapActions(useAuthStore, ["getUsers", "loginUser", "logout"]),
        sendCredentials() {
            const userData = {
                'username': this.username,
                'password': this.userPassword,
            };
            this.loginUser(userData);
            this.$router.push('/user')
        },
        show() {
            let p = document.getElementById('pwd');
            p.setAttribute('type', 'text');
        },
        hide() {
            let p = document.getElementById('pwd');
            p.setAttribute('type', 'password');
        },
        changePwd() {
            if (this.pwShown == 0) {
                this.pwShown = 1;
                this.show();
            } else {
                this.pwShown = 0;
                this.hide();
            }
        }

    },
    mounted() {
        this.getUsers();
    }
}

</script>

<style scoped>
.overlay {
    margin-top: 20px;
}

form {
    width: 450px;
    min-height: 500px;
    height: auto;
    border-radius: 5px;
    margin: 2% auto;
    box-shadow: 0 9px 50px hsla(20, 67%, 75%, 0.31);
    padding: 2%;
    background-image: linear-gradient(-225deg, #E3FDF5 50%, #FFE6FA 50%);
}

form .con {
    display: -webkit-flex;
    display: flex;

    -webkit-justify-content: space-around;
    justify-content: space-around;

    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;

    margin: 0 auto;
}

header {
    margin: 2% auto 10% auto;
    text-align: center;
}

header h2 {
    font-size: 250%;
    font-family: 'Playfair Display', serif;
    color: #3e403f;
}

header p {
    letter-spacing: 0.05em;
}

.input-item {
    background: #fff;
    color: #333;
    padding: 14.5px 0px 15px 9px;
    border-radius: 5px 0px 0px 5px;
}

#eye {
    background: #fff;
    color: #333;

    margin: 5.9px 0 0 0;
    margin-left: -20px;
    padding: 15px 9px 19px 0px;
    border-radius: 0px 5px 5px 0px;

    float: right;
    position: relative;
    right: 1%;
    top: -.2%;
    z-index: 5;

    cursor: pointer;
}

input[class="form-input"] {
    width: 240px;
    height: 50px;

    margin-top: 2%;
    padding: 15px;

    font-size: 16px;
    font-family: 'Abel', sans-serif;
    color: #5E6472;

    outline: none;
    border: none;

    border-radius: 0px 5px 5px 0px;
    transition: 0.2s linear;

}

input[id="txt-input"] {
    width: 250px;
}

input:focus {
    transform: translateX(-2px);
    border-radius: 5px;
}

button {
    display: inline-block;
    color: #252537;

    width: 280px;
    height: 50px;

    padding: 0 20px;
    background: #fff;
    border-radius: 5px;

    outline: none;
    border: none;

    cursor: pointer;
    text-align: center;
    transition: all 0.2s linear;

    margin: 7% auto;
    letter-spacing: 0.05em;
}

button:hover {
    transform: translatey(3px);
    box-shadow: none;
}

button:hover {
    animation: ani9 0.4s ease-in-out infinite alternate;
}

@keyframes ani9 {
    0% {
        transform: translateY(3px);
    }

    100% {
        transform: translateY(5px);
    }
}
</style>
