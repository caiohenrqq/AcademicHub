import { IonButton, IonImg, IonContent, IonPage } from "@ionic/react";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { firebaseApp } from "../firebase";

import './Style.css';

const Login = () => {
  const handleGoogleLogin = async () => {
    console.log("Google login initiated");
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User logged in:", user);

      if (user) {
        // Redirect to Topicos after successful login
        window.location.href = "/topicos";
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="login-section">
          <IonImg
            src="/favicon.png"
            alt="AcademicHub, sua comunidade universitária :)"
          />

          <div className="title">
            Academic<span className="hub-letras">Hub</span>
          </div>

          <div className="login-inputs">
            <IonButton shape="round" onClick={handleGoogleLogin}>
              Entrar com Google
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Login;
