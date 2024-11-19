import React from 'react';
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonImg,
  IonContent,
  IonPage,
} from "@ionic/react";
import { useHistory } from 'react-router-dom';
import usericon from "/usericon.svg";
import passwordicon from "/passwordicon.svg";
import loginicon from "/login.svg";
import cadastraricon from "/cadastrar.svg";
import { signInWithGoogle } from '../firebaseConfig';
import './Style.css';

const Login: React.FC = () => {
  const history = useHistory();

  // Function to navigate to topics after successful login
  const goToTopicos = () => {
    history.push('/topicos');
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      goToTopicos(); 
    } catch (error) {
      console.error('Google Login Error:', error);
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
            {/* Email Input */}
            <IonItem>
              <IonIcon slot="start" icon={usericon} aria-hidden="true" />
              <IonInput placeholder="Escreva seu e-mail"></IonInput>
            </IonItem>

            {/* Password Input */}
            <IonItem>
              <IonIcon slot="start" icon={passwordicon} aria-hidden="true" />
              <IonInput placeholder="Escreva sua senha" type="password"></IonInput>
            </IonItem>

            <a className="esqueceu-senha" href="#">
              Esqueceu sua senha?
            </a>

            {/* Existing Login Button */}
            <IonButton onClick={goToTopicos} shape="round">
              Entrar
              <IonIcon slot="icon-only" icon={loginicon}></IonIcon>
            </IonButton>

            {/* Button for Google Login */}
            <IonButton onClick={handleGoogleLogin} shape="round" color="secondary">
              Entrar com Google
            </IonButton>

            {/* Register Button */}
            <IonButton shape="round">
              Cadastrar
              <IonIcon slot="icon-only" icon={cadastraricon}></IonIcon>
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Login;
