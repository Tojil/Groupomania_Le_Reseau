<template>
    <div>
        <input type="file" accept="image/*" class="hidden" ref="file" @change="change">
        <div class="profil-photo">
            <v-avatar size="150" color="indigo">
                <img :src="src" alt="" class="rounded-full object-cover">
            </v-avatar>
                <button @click="browse()" class="camera">
                    <v-icon color="white">mdi-camera</v-icon>
                </button>
                <button v-if="file" @click="remove()" class="cameraX">
                    <v-icon color="white">X</v-icon>
                </button>
        </div>
    
    </div>
</template>


<script>

export default {

    props: {
        value: File,
        defaultSrc: String

    },

    data() {
        return {
            src: this.defaultSrc,
            file: null
            
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
    top: 65px;
    left: 40px;
}
.cameraX {
    position: absolute;
    top: 65px;
    right: 40px;
}
</style>