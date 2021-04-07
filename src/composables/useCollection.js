import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true

        try {
            await projectFirestore.collection(collection).add(doc)
            isPending.value = false
        } catch(err) {
            console.log(ere.message)
            error.value = 'Could not send the message'
            isPending.value = false
        }
    }

    return { addDoc, error, isPending }
}

export default useCollection