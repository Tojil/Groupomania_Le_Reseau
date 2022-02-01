<template>
    <v-app class="signup ma-auto mt-6" v-if="form">
        <v-card outlined elevation="13" class="signup__card" raised>
            <v-card-text>
                <v-form ref="form" v-model="valid">  <!--  Formulaire pour saisir un nouveau membre si les regles sont respectés  -->
                    <v-text-field  v-model="dataSignup.firstName" :rules="firstNameRules" label="Prénom" prepend-icon="mdi-account-outline" color="black" autofocus required></v-text-field>
                    <v-text-field  v-model="dataSignup.lastName" :rules="lastNameRules" label="Nom" prepend-icon="mdi-account-outline" color="black" required></v-text-field>
                    <v-text-field  v-model="dataSignup.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" color="black" required></v-text-field>  <!--  v-model Permet de lier la valeur d'un champ de saisie avec une variable reactive  -->
                    <v-text-field  v-model="dataSignup.password" :rules="passRules" error-count="4" type="password" label="Mot de passe" prepend-icon="mdi-lock-outline" color="black" required></v-text-field>
                </v-form>
                <template>
                  <div class="text-center">
                      <v-btn :disabled="!valid" class="success" v-bind="attrs" @click="sendSignup()">Confirmer</v-btn>
                    <v-dialog v-model="dialog" persistent width="500">  <!--  Boîte de dialogue de confirmation de creation de compte  -->
                        <v-card v-if="error" class="text-error">
                            <v-card-title class="text-center">
                                Cette email existe déjà ! <br/>
                                Veuillez vous connecter avec une autre adresse email .
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="closeDialog()" class="error">Fermer</v-btn>  <!--  Envoie le formulaire du nouveau membre à la base de données et se connect  -->
                            </v-card-actions>
                        </v-card>
                        <v-card v-if="success" class="text-success">
                            <v-card-title class="text-center">
                                Votre compte a été créé ! <br/>
                                Veuillez vous connecter pour accéder à l'intranet.
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="sendSignup()" class="success">Se connecter</v-btn>  <!--  Envoie le formulaire du nouveau membre à la base de données et se connect  -->
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                  </div>
                </template>
                <p v-if="msg">{{ message }}</p>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
import axios from "axios"

export default {
    name : "Signup",
    // Ici on stock les données et les regles que nous allons utiliser en tant que variables reactives
    data: () => ({

        // return{
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
            passRules: [
                v => !!v || 'Renseignez votre mot de passe',
                v => (v && v.length >= 5) || '5 caractères minimun',
                v => /(?=.*[A-Z])/.test(v) || 'Au moins une majuscule', 
                v => /(?=.*\d)/.test(v) || 'Au moins un chiffre',
            ],
            dataSignup:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            dataSignupS: "", 
            form: true,
            msg: false,
            message: "",
            dialog: false,
            error: false,
            success: false
        //}
    }),
    methods: {  // Methods permet de créer des méthodes afin d'y placer un block de code réutilisable dans la application
        closeDialog(){
            this.dialog = false;
        },
        sendSignup(){  // Cette methode envoie l'enregistrement du nouvel utilisateur dans la base de donnés
            this.dataSignupS = JSON.stringify(this.dataSignup)
            axios.post('http://localhost:3000/api/auth/signup', this.dataSignupS, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                let sign = JSON.parse(response.data);
                this.message = sign.message;
                this.form = false;
                this.msg = true;
                this.dialog = true;
                this.error = false;
            })
            .catch(error => {
                console.log(error);
                this.message = error;
                this.msg = true;
                this.error = true;
                this.dialog = true;
                });
        }
    }
}
</script>

<style lang="scss">
    .signup{
        position: flex;
        flex-direction: row;
        top: 5%;
        width: 350px;
        height: 200px;
        text-align: center;
    }
</style>
