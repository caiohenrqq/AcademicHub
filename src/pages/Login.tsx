import React from 'react';
import {
  IonButton,
  IonImg,
  IonContent,
  IonPage,
} from "@ionic/react";
import { useHistory } from 'react-router-dom';
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
            {/* Button for Google Login */}
            <IonButton onClick={handleGoogleLogin} shape="round" color="secondary">
              Entrar com Google
            </IonButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Login;