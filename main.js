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

export async function tambahtoDoList(namabarang, jumlahbarang, sisabarang) {
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

export async function ubahtoDoLis(docId, namabarang, jumlahbarang, sisabarang) {
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