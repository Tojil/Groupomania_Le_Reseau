<template>
    <v-app class="d-flex justify-space-between profil">
        <top-header/>  <!-- Ici on récupére le composant Header.vue importé et declaré plus bas dans les components-->
        <v-card class="ml-12 profilCard" raised>
                <div class="d-flex justify-center mb-6">
                    <form id="profile-form" class="p-5" @submit.prevent="submit">
                        <avatar-input ref="avatarInput" v-model="form.avatar" :defaultsrc="dataGet.imageProfil"></avatar-input>
                    </form>
                </div>
                <div class="pencil">
                    <v-icon @click="switchMode" color="orange">mdi-pencil</v-icon>
                </div>
                
                <v-card-title class="my-3">
                    <h1>{{ dataGet.firstName }} {{ dataGet.lastName }}</h1>
                </v-card-title>
                
                <v-card-text v-if="!editMode" class="ml-2 black--text">
                    <h2>Prénom : {{ dataGet.firstName }}</h2>
                    <h2>Nom : {{ dataGet.lastName }}</h2>
                    <h3>E-mail : {{ dataGet.email }}</h3>
                </v-card-text>
                <v-form v-else ref="form" v-model="valid">
                    <v-text-field v-model="dataUp.firstName" :rules="firstNameRules" label="Prénom" prepend-icon="mdi-account-outline" color="black" required></v-text-field>
                    <v-text-field  v-model="dataUp.lastName" :rules="lastNameRules" label="Nom" prepend-icon="mdi-account-outline" color="black" required></v-text-field>
                    <v-text-field v-model="dataUp.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" color="black" required></v-text-field>
                </v-form>
                <v-card-actions class="d-flex justify-space-between">
                    <v-btn @click.stop="updateUser" title="modifier mes informations">Valider</v-btn>
                    <v-btn @click.stop="dialogDel=true" title="supprimer mon profil" color="red">Supprimer</v-btn>
                </v-card-actions>
        </v-card>
        <v-dialog v-model="dialogDel" max-width="350px">
            <v-card>
                <v-card-title>
                    Êtes-vous sûr.e ?
                </v-card-title>
                <v-card-text>
                    <p>En supprimant votre profil, vous effacerez aussi tous vos posts ainsi que vos commentaires.</p>
                    <p>{{ msg }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogDel=false">
                        Annuler
                    </v-btn>
                    <v-btn text @click="deleteUser">
                        Supprimer mon profil
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>

// Ici on import les composants dont on a besoin
import Header from "./Header.vue"
import axios from "axios"
import AvatarInput from "./AvatarInput.vue"

export default {
    name: "Profil",
    data() { // Ici on stocke les données et les regles que nous allons utiliser en tant que variables reactives
        return{
            dialogDel: false,
            dialogUp: false,
            msg: "",
            editMode: false,
            dataGet: { 
                firstName: "",
                lastName: "",
                email: "",
                imageProfil: ""
            },
            dataUp: {
                firstName: "",
                lastName: "",
                email: "",
            },
            dataUpS: "",
            valid: true,
            firstNameRules: [
                v => !!v || 'Renseignez votre prénom',
                v => /^[A-Za-z]+$/.test(v) || "Votre prénom n'est pas valide",
            ],
            lastNameRules: [
                v => !!v || 'Renseignez votre nom',
                v => /^[A-Za-z]+$/.test(v) || "Votre nom n'est pas valide",
            ],
            emailRules: [
                v => !!v || 'Renseignez votre e-mail',
                v => /.+@.+\..+/.test(v) || "Votre e-mail n'est pas valide",
            ],
            form: {
                avatar: null
            }
        }
    },
    // Methods permet de créer des méthodes afin d'y placer un block de code réutilisable dans la application
    methods: {
        switchMode() {
            this.editMode = !this.editMode;
        },
        submit() {
            console.log('submitting', this.form)
        },
        deleteUser() {
            
            axios.delete("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                localStorage.userId = "";
                localStorage.token = "";
                this.$router.push('/');  
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        },
        updateUser() {
            this.dataUpS = JSON.stringify(this.dataUp);
            let form = new FormData();
            form.append("image", this.$refs['avatarInput'].file);
            form.append('firstName', this.dataUp.firstName);
            form.append("lastName", this.dataUp.lastName);
            form.append("email", this.dataUp.email);
            axios.post("http://localhost:3000/api/auth/", form, {headers: {'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                this.dialogUp = false;
                window.location.assign('http://localhost:8081/hall/profil');
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        },
    },
    mounted() {  // Cette methode se lance au moment du chargement du composant
        axios.get("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let profil = JSON.parse(response.data);
                this.dataGet.email = profil[0].email;
                this.dataGet.firstName = profil[0].firstName;
                this.dataGet.lastName = profil[0].lastName;
                this.$refs["avatarInput"].src = "http://localhost:3000/"+profil[0].imageProfil;
                this.dataUp.email = profil[0].email;
                this.dataUp.firstName = profil[0].firstName;
                this.dataUp.lastName = profil[0].lastName;
            })
            .catch(error => {
                console.log(error);
            });    
    },
    
    components: {
        "top-header": Header,
        AvatarInput
    }
}
</script>

<style lang="scss">

    .profil{
        margin-top: 0%;
        width: 95%;
    }
    .profilCard{
        margin-top: 10%;
    }
    h2{
        margin-bottom: 15px;
    }
    .pencil {
        position: absolute;
        top: 20px;
        right: 20px;
    }

</style>
