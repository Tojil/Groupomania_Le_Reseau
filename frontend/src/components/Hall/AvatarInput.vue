<template>
    <div>
        <input type="file" accept="image/*" class="hidden" ref="file" @change="change">
        <div class="profil-photo">
            <v-avatar size="150" color="grey">
                <img :src="src" alt="" class="rounded-full">
                
            </v-avatar>
            <div v-if="!editB" class="btn d-none">
                <button  @click="browse()">
                    <v-icon color="green">mdi-camera</v-icon>
                </button>
                <button @click="remove()">
                    <v-icon color="red">X</v-icon>
                </button>
            </div>
            <div v-else class="btn">
                <button  @click="browse()">
                    <v-icon color="green">mdi-camera</v-icon>
                </button>
                <button @click="remove()">
                    <v-icon color="red">X</v-icon>
                </button>
            </div>

        </div>

    </div>
</template>


<script>

export default {

    props: {
        value: File,
        defaultsrc: String,
    },

    data() {
        return {
            src: this.defaultsrc,
            file: null,
            editB: false,
        }
    },
    methods: {
        browse() {
            this.$refs.file.click();
        },
        remove() {
            this.file = null;
            this.src = this.defaultsrc;
            this.$emit('input', this.file);
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
    },
}
</script>

<style lang="scss">
.hidden {
    display: none;
}
.profil-photo {
    position: relative;
}
.btn{
    display: flex;
    justify-content: space-between;
}
</style>