import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDMJeH3crLFSDkgpCzJxZ_17CL49yMneI0",
  authDomain: "academic-hub-5ccdb.firebaseapp.com",
  projectId: "academic-hub-5ccdb",
  storageBucket: "academic-hub-5ccdb.appspot.com",
  messagingSenderId: "7588056884",
  appId: "1:7588056884:web:bc687b9cdfd816d5655f61"
};

// Inicializa o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Exporte as instâncias
export { firebaseApp, auth, firestore };

