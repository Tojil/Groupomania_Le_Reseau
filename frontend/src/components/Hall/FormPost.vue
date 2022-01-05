<template> <!-- Le template permet d'utiliser des directives de Vue sans créer un élément html -->
    <v-app id="formPost">
        <top-header/> <!-- Ici on récupére le composant Header.vue importé et declaré plus bas dans les components-->
        <h1 class="ml-12">Forum</h1>
        <v-card class="ma-3 ml-12">
            <v-card-title class="mb-3">
                <h2>Nouveau post</h2>
            </v-card-title>
            <input type="file" @change="onFileSelected($event)"> <!-- Ici nous allons chercher le fichier image -->
            <v-card-text>
                <v-form ref="form" class="ma-3" v-model="valid" >
                    <div>
                    <img :src="imagePreview" alt=""> <!-- Cest l'image que nous avons récupéré -->
                    </div>
                    <v-text-field v-model="dataPost.title" color="black" :rules="titleRules" :counter="50" label="Titre" autofocus required></v-text-field> <!-- Champ de saisie pour le titre si les regles sont respectés -->
                    <v-textarea v-model="dataPost.content" color="black" :rules="contentRules" label="Message" required></v-textarea> <!-- Champ de saisie pour le commentaire si les regles sont respectés -->
                </v-form>
            </v-card-text>


            <v-card-actions>
                <v-btn  :disabled="!valid" class="success" @click="sendPost">Poster</v-btn> <!-- Si les données sont valides le boutton est activé-->
                <v-btn text href="/hall/forum" color="black">Annuler</v-btn> <!-- Le bouton Annuler nous renvoie a la page du Forum.vue -->
            </v-card-actions>

        </v-card>
    </v-app>
</template>
<script>
// Ici on import les composants dont on a besoin 
import axios from "axios"
import Header from "./Header.vue"


export default {
    name: "FormPost",
    data(){ // Ici on stock les données et les regles que nous allons utiliser en tant que variables reactives
        return{
            valid: true,
            titleRules: [
                v => !!v || 'Titre de la publication',
                v => (v && v.length <= 50) || 'Le titre doit faire moins de 50 caractères',

            ],
            contentRules: [
                v => !!v || 'Ecrivez votre message',
            ],
            dataPost:{
                title: "",
                content:"",
                userId: localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
            imagePreview: null,
            image: undefined
        }
    },
    methods: {  // Methods permet de créer des méthodes afin d'y placer un block de code réutilisable dans la application
        onFileSelected(event) {  // La methode onFileSelected nous permet d'aller choisir une image dans nos fichiers
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview = e.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
            this.image = event.target.files[0];
        },
        sendPost(){ // La methode sendPost nous permet de stocker dans la base de données les infos renseignés par l'utilisateur
            let form = new FormData();
            form.append("title", this.dataPost.title);
            form.append("content", this.dataPost.content);
            form.append("image", this.image);
            form.append("userId", localStorage.userId);
            axios.post("http://localhost:3000/api/posts/", form, {headers: {'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;
                    this.$router.push('/Hall/Forum')
                    
                })
                .catch(error => {
                    console.log(error); 
                    this.message = error;
                    this.msg = true
                });
        },
    },
    components: { // Ici on declare le composant qu'on a recupéré
        "top-header": Header, 
    },
}
</script>
<style lang="scss">
img {
    max-width: 250px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.button {
    display: flex;
}

</style>