<template>
    <v-app id="auth">
        <v-container class="auth">
            <div class="auth__boutons">
                <v-btn small outlined elevation="13" class="auth__boutons--ind" color="indigo black--text" @click="component='signup'" rounded>S'inscrire</v-btn>
                <v-btn small outlined elevation="13" class="auth__boutons--ind" color="indigo black--text green--hover" @click="component='login'" rounded>Se connecter</v-btn>
            </div>
            <component v-bind:is="component"></component>
        </v-container>
    </v-app>
</template>

<script>
    import Signup from "../components/Auth/Signup";
    import Login from "../components/Auth/Login";

    export default {
        name : "Auth",
        data(){
            return{
                component: ""
            }
        },
        components: {
            
            Login,
            Signup
        }
    }
</script>

<style lang="scss">

        #auth {
        background: no-repeat center top/150% url("../assets/icon.png");
        
        display: flex;
        flex-direction: row;

    }
    .auth {
        background: no-repeat center top/30% url("../assets/icon-above-font.svg");
        &__boutons{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 20%;
            margin-bottom: 2%;
            &--ind{
                margin: 4%;
                width: 130px ;
                
            }
        }
    }

    
</style>