<template>   <!-- Le template permet d'utiliser des directives de Vue sans créer un élément html -->
    <div class="head">  <!-- Bar de navigation vertical -->
        <v-navigation-drawer  
            v-model="drawer"
            color="black"
            expand-on-hover
            mini-variant
            mini-variant-width=40
            bottom
            permanent
            absolute
            dark
        >
            <v-list dense nav>
                <v-list-item two-line class="px-0 ">
                    <v-list-item-avatar>
                        <v-img :src=imageProfil alt="Photo du profil" contain></v-img>
                    </v-list-item-avatar>
                        
                    <v-list-item-content>
                        <v-list-item-title> <!--  Nom du profil  -->
                            <h2>{{ firstName }} {{ lastName}}</h2>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="item in items" :key="item.title">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <router-link :to=item.link>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="this.modo==1">
                    <v-list-item-icon>
                        <v-icon>mdi-security</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="moderation" class="lien">
                        <v-list-item-title>Modération</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content @click="logout" class="lien">
                        <v-list-item-title>Se déconnecter</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name : 'Header',
    data(){ // Ici on stock les données et les regles que nous allons utiliser en tant que variables reactives
        return {
            modo: "",
            drawer: true,
            imageProfil: "",
            firstName: "",
            lastName: "",
            items: [
                { title: 'Accueil', icon: 'mdi-home', link: '/Accueil'  },
                { title: 'Profil', icon: 'mdi-account', link: '/hall/profil'},
                { title: 'Forum', icon: 'mdi-forum', link: '/hall/forum' },
            ],
        }
    },
    methods: {  // Methods permet de créer des méthodes afin d'y placer un block de code réutilisable dans la application
        logout(){  // Cette methode permet de se deconecter du reseau groupomania
            localStorage.userId = "";
            localStorage.token = "";
            localStorage.moderation = "";
             this.$router.push('/');
        },
        moderation(){  // Cette methode ouvre la page moderateur
            this.$router.push('/hall/moderation')
        }
    },
    mounted(){  // Cette methode se lance au moment du chargement du composant
        this.modo = localStorage.moderation;
        axios.get("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let profil = JSON.parse(response.data);
                this.imageProfil = "http://localhost:3000/"+profil[0].imageProfil;
                this.firstName = profil[0].firstName;
                this.lastName = profil[0].lastName
            })
    }
}
</script>

<style lang="scss">
    a {
        text-decoration: none;
        color: white!important;
        
    }
    a:hover {
        color: #F13E18!important;
        text-decoration: underline;     
    }
    .lien {
        cursor: pointer;
    }
    .lien:hover {
        color: #F13E18!important;
        text-decoration: underline;
    }
</style>