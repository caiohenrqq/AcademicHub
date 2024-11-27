import React from "react";
import { IonButton, IonImg, IonContent, IonPage } from "@ionic/react";
import { useUser } from "../UserContext";
import { useHistory } from "react-router-dom";
import "./Style.css";

const Login = () => {
  const { loginWithGoogle } = useUser();
  const history = useHistory();

  const handleGoogleLogin = async () => {
    console.log("Google login initiated");
    try {
      await loginWithGoogle();
      console.log("Login successful, redirecting...");
      history.push("/topicos"); 
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