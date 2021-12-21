<template>
    <v-app id="accueil">
        <top-header/>  <!-- Ici on récupére le composant Header.vue importé et declaré plus bas dans les components-->
        <router-view></router-view>

        <v-carousel
            id="carousel"
            cycle
            height="auto"
            hide-delimiters
            :show-arrows="false"
            >
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
        </v-carousel>      

    </v-app>
</template>
<script>
import Header from "./Hall/Header"

export default {
    name: "Accueil",
    data(){
        return{
            items: [
            {
                src: require("../assets/images/luneChantier.jpg"),
            },
            {
                src: require("../assets/images/chateauV.jpg"),
            },
            {
                src: require("../assets/images/cartoucherie.jpg")
            },
            {
                src: require("../assets/images/laScene.jpg"),
            },
            {
                src: require("../assets/images/arretTrain.jpg"),
            },
            {
                src: require("../assets/images/chantier.jpg"),
            },
            ]
            
        }
    },
    components: {
        "top-header": Header,
    },
}
</script>
<style lang="scss">
    #accueil{
        background: no-repeat center top/20% url("../assets/icon-above-font.png");
        display: flex;
        flex-direction: row;
    }
    #carousel{
        width: 60%;
        margin-top: 17%;
        margin-left: 20%;
    }
    .header{
        background-color: rgb(253,45,1);
        color: white;
    }
    @media screen and (min-width: 200px) and (max-width: 640px) {
    #carousel {
    padding-right: 15%;
    width: 80%;
    } 
}
        
    
</style>