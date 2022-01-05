<template>
    <div>
        <input type="file" accept="image/*" class="hidden" ref="file" @change="change">
        <div class="profil-photo">
            <v-avatar size="150" color="grey">
                <img :src="src" alt="" class="rounded-full object-cover">
            </v-avatar>
            <button @click="browse()" class="camera">
                <v-icon color="green">mdi-camera</v-icon>
            </button>
            <button v-if="file" @click="remove()" class="cameraX">
                <v-icon color="red">X</v-icon>
            </button>
        </div>

    </div>
</template>


<script>
import axios from "axios"

export default {

    props: {
        value: File,
        defaultSrc: String

    },

    data() {
        return {
            src: this.defaultSrc,
            file: null,
            imagePreviewProfil: null,
            imageProfil: undefined
        }
    },

    methods: {
        browse() {
            this.$refs.file.click();
        },
        remove() {
            this.file = null;
            this.src = this.defaultSrc;
            this.$$emit('input', this.file);
        },
        change(e) {
            this.file = e.target.files[0];
            this.$emit('input', this.file);

            let reader = new FileReader();

            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
                this.src = e.target.result;
            }
        },
        sendProfilPost() {
            let form = new FormData();
            form.append("imageProfil", this.imageProfil);
            axios.post("http://localhost:3000/api/users/", form, {headers: {'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + localStorage.token}})
        }
    }
}
</script>

<style lang="scss">
.hidden {
    display: none;
}
.profil-photo {
    position: relative;
}
.camera {
    position: absolute;
    bottom: -10px;
    left: 0px;
}
.cameraX {
    position: absolute;
    bottom: -10px;
    right: 0px;
}
</style>