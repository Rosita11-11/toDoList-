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
let tasks = [];

function addTask() {
  const name = document.getElementById('taskName').value.trim();
  const date = document.getElementById('taskDate').value;
  const priority = document.getElementById('taskPriority').value;

  if (!name || !date || !priority) {
    alert("Semua input harus diisi!");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    date,
    priority,
    done: false
  };

  tasks.push(task);
  displayTasks();
  clearForm();
}

function toggleDone(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, done: !task.done } : task
  );
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function displayTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    li.innerHTML = `
      <span>${task.name} - ${task.priority} - ${task.date}</span>
      <div>
        <button onclick="toggleDone(${task.id})">${task.done ? 'Belum' : 'Selesai'}</button>
        <button onclick="deleteTask(${task.id})" style="background:#dc3545;">Hapus</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function clearForm() {
  document.getElementById('taskName').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskPriority').value = '';
}
