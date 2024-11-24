import { IonButton, IonImg, IonContent, IonPage } from "@ionic/react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../firebase";
import "./Style.css";

const Login = () => {
    const handleGoogleLogin = async () => {
    console.log("Google login initiated");
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user);
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
