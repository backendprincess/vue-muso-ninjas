import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {
    const error = ref(null)
    const document = ref(null)

    let documentRef = projectFirestore.collection(collection).doc(id)

    const unsub = documentRef.onSnapshot(doc => {
        if (doc.data()) {
            document.value = { ...doc.data(), id: doc.id }
        } else {
            error.value = 'That document does not exist'
        }

        document.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch the data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { document, error }
}

export default getDocument