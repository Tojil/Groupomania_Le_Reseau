<template>
    <div>

        <input type="file" accept="image/*" class="hidden" ref="file" @change="change">
        <v-avatar size="50 relative inline-block">
            <img :src="src" alt="" class="rounded-full object-cover">
        </v-avatar>
            <div class="absolute top-0 w-full h-full bg-black bg-opacity-25">
                <button @click="browse()">Browse</button>
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
.avatar {
    
}
</style>