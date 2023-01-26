<template>
    <section style="background-color: #eee;">
        <div class="row">
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-body text-center">
                        <img :src="user.img" alt="avatar" class="rounded-circle img-fluid" style="width: 150px;">
                        <h5 class="my-3">{{ user.name }} {{ user.surname }}</h5>
                        <p class="text-muted mb-1">{{ user.status }}</p>
                        <button type="submit" class="btn btn-success" @click="myLogout">Logout</button>
                    </div>
                </div>
                <div class="card mb-4 mb-lg-0">
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush rounded-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i class="fab fa-github fa-lg" style="color: #333333;"></i>
                                <p class="mb-0">{{ user.github }}</p>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                                <i class="fab fa-instagram fa-lg" style="color: #ac2bac;"></i>
                                <p class="mb-0">{{ user.instagram }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Full Name</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ user.name }} {{ user.surname }}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Phone</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ user.phone }}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">
                                <p class="text-muted mb-0">{{ user.adress }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="center">
                    <p>Запам'ятай і відкрий всі зелені клітинки</p>
                    <BoardItem />
                </div>

            </div>
        </div>
    </section>
</template>

<script>
import BoardItem from "@/components/BoardItem.vue"
import { useAuthStore } from "@/stores/authStore";
import { mapState, mapActions } from "pinia";
export default {
    name: 'UserProfile',
    components: {
        BoardItem
    },
    data() {
        return {

        }
    },
    props: {

    },
    methods: {
        ...mapActions(useAuthStore, ["logout"]),
        myLogout() {
            this.logout();
            this.$router.push('/')
        }
    },
    computed: {
        ...mapState(useAuthStore, ["user"])
    },
}

</script>

<style>
section {
    width: 100%;
    padding: 20px;
    margin-top: 15px;
    border-radius: 12px;
}


.center p {
    text-align: center;
    color: green;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
