import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js ";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBYd6vdeRvwnywCPqeWh5PcdcNJj1kLfoo",
    authDomain: "insancemerlang-2953a.firebaseapp.com",
    projectId: "insancemerlang-2953a",
    storageBucket: "insancemerlang-2953a.appspot.com",
    messagingSenderId: "134418826980",
    appId: "1:134418826980:web:ce438f43a3da1456b44ef1",
    measurementId: "G-K6CVYVCMZP"
}
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function toDoList () {
  const refDokumen = collection(db, "toDoList");
  const kueri = query(refDokumen, orderBy("toDoList"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id, 
      namabarang: dok.data().namabarang,
      jumlahbarang: dok.data().jumlahbarang,
      sisabarang: dok.data().sisabarang
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function ubahtoDoList(namabarang, jumlahbarang, sisabarang) {
  try {
    const dokRef = await addDoc(collection(db, 'toDoList'), {
      namabarang:  namabarang,
      jumlahbarang: jumlahbarang,
      sisabarang: sisabarang
    });
    console.log('Berhasil menambah toDoList' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah toDoList' + e);
  }
}

export async function hapustoDoList (docId) {
  await deleteDoc(doc(db, "toDoList", docId));
}

export async function tambahtoDoLis(docId, namabarang, jumlahbarang, sisabarang) {
  await updateDoc(doc(db, "stokopname", docId),{
    namabarang: namabarang,
    jumlahbarang: jumlahbarang,
    sisabarang: sisabarang
  });
}

export async function ambiltoDOLis(docId) {
  const docRef = await doc(db, "toDoList", docId);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}
let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const task = {
        name: taskName,
        completed: false,
        priority: "Normal",
        date: new Date().toLocaleString()
    };

    tasks.push(task);
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.name} - ${task.completed ? "Selesai" : "Belum Selesai"} - ${task.date}`;
        
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? "Tandai Belum Selesai" : "Tandai Selesai";
        completeButton.onclick = () => toggleComplete(index);
        
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.onclick = () => editTask(index);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = () => deleteTask(index);
        
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    const newTaskName = prompt("Edit tugas:", tasks[index].name);
    if (newTaskName !== null && newTaskName.trim() !== "") {
        tasks[index].name = newTaskName.trim();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
