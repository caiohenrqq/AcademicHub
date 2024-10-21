import { IonButton, IonIcon, IonInput, IonTextarea, IonItem, IonImg, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import usericon from "/usericon.svg";
import passwordicon from "/passwordicon.svg";
import './Page.css';

const Page: React.FC = () => {
  return (

    <IonPage>
      <IonContent fullscreen>
          <IonContent className='login-section'>
            <IonImg
              src="/favicon.png"
              alt="AcademicHub, sua comunidade universitária :)"
            ></IonImg>

              <IonTitle>
                Academic<span className="hub-letras">Hub</span>
              </IonTitle>

              <div className='login-inputs'>
                <IonItem>
                  <IonIcon slot="start" icon={usericon} aria-hidden="true" />
                  <IonInput placeholder="Escreva seu e-mail"></IonInput>
                </IonItem>

                <IonItem>
                  <IonIcon slot="start" icon={passwordicon} aria-hidden="true" />
                  <IonInput placeholder="Escreva sua senha" type="password"></IonInput>
                </IonItem>
            </div>
          </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Page;
