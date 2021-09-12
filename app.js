import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// Initialize Cloud Firestore through Firebase
//import { initializeApp } from "firebase/app"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js"
import { doc, collection, getDocs, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyDzIoFHsobSzvberkP-j8hKbpggHy-2lXQ",

    authDomain: "notesapp-7c701.firebaseapp.com",

    projectId: "notesapp-7c701",

    storageBucket: "notesapp-7c701.appspot.com",

    messagingSenderId: "605181863957",

    appId: "1:605181863957:web:9ead08dbcae4d8e222061c"

};
const app = initializeApp(firebaseConfig)

const db = getFirestore();


const listaNotes = document.getElementById('notes_list')

const form = document.getElementById('add_note_form')

const renderList = (doc) => {
    let li = document.createElement('li')
    li.className = 'collection-item'
    li.setAttribute('data-id', doc.id)

    let div = document.createElement('div')
    let titulo = document.createElement('span')
    titulo.textContent = doc.data().Titulo

    let enlace = document.createElement('a')
    enlace.href = '#modal1'
    enlace.className = 'modal-trigger secondary-content'

    let editBtn = document.createElement('i')
    editBtn.className = 'material-icons'
    editBtn.innerText = 'edit'

    let delBtn = document.createElement('i')
    delBtn.className = 'material-icons secondary-content'
    delBtn.innerText = 'delete'

    enlace.appendChild(editBtn)
    div.appendChild(titulo)
    div.appendChild(delBtn)
    div.appendChild(enlace)
    li.appendChild(div)

    delBtn.addEventListener('click', e => {
        console.log('delete')
    })

    listaNotes.append(li)
}

//add note
form.addEventListener('submit', e => {
    e.preventDefault()

    try {
        const docRef = addDoc(collection(db, "notes"), {
            Titulo: form.titulo.value
        });
    } catch (e) {
        console.error("Error creando nota: ", e);
    }

    form.titulo.value = ''
})


const querySnapshot = await getDocs(collection(db, "notes"));
querySnapshot.forEach(dato => {

    renderList(dato)
})
