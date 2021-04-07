<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title">
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>
        <!-- upload playlist image -->
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange">

        <div class="error">{{ fileError }}</div>
        <button>Create</button>
    </form>
</template>

<script>
import useStorage from '@/composables/useStorage'
import { ref } from 'vue'
export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)

        const handleSubmit = async () => {
            if (file.value) {
                await uploadImage(file.value)
                console.log('Image uploaded, url: ', url.value)
            }
        }

        // allowed file types
        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpeg)'
            }
        }

        return { title, description, handleSubmit, handleChange, fileError }
    }
}
</script>

<style>
    form {
        background: white;
    }

    input[type="file"] {
        border: 0;
        padding: 0;
    }

    label {
        font-size: 12px;
        display: block;
        margin-top: 30px;
    }

    button {
        margin-top: 20px;
    }
</style>