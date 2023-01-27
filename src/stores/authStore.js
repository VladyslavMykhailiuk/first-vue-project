import { users } from "@/assets/users";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        usersState: {},
        user: {},
    }),
    getters: {
        users: (state) => state.usersState,
    },
    actions: {
        getUsers() {
            this.usersState = users;
        },
        loginUser(data) {

            this.usersState.forEach(element => {
                if (data.username == element.username && data.password == element.password) {
                    this.user = element
                    localStorage.setItem('user', JSON.stringify(element))
                }
            });


        },
        logout() {
            this.user = {};
            localStorage.removeItem('user')
        }
    }
})