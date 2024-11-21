import React from 'react';
import { IonButton, IonImg, IonContent, IonPage } from "@ionic/react";
import './Style.css';

interface LoginProps {
  signInWithGoogle: () => void;
}

const Login: React.FC<LoginProps> = ({ signInWithGoogle }) => {
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
            <IonButton onClick={signInWithGoogle} shape="round">
              Entrar com Google
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Login;
