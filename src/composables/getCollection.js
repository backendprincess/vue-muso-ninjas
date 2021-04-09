import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query) => {
    const error = ref(null)
    const documents = ref(null)

    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')

    if (query) {
        collectionRef = collectionRef.where(...query)
    }

    const unsub = collectionRef.onSnapshot(snap => {
        console.log('snapshot');
        let results = []

        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push( { ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch the data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection