import { IonButton, IonIcon, IonInput, IonTextarea, IonItem, IonImg, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import usericon from "/usericon.svg";
import passwordicon from "/passwordicon.svg";
import './Page.css';

const Page: React.FC = () => {
  return (

    <IonPage>
      <IonContent className="no-scroll" fullscreen>
        <div className="login-container">
          <IonContent>
            <IonImg
              src="/favicon.png"
              alt="AcademicHub, sua comunidade universitária :)"
            ></IonImg>
            <IonTitle>
              Academic<span className="title-hub">Hub</span>
            </IonTitle>

            <IonItem className="input-item">
              <IonIcon slot="start" icon={usericon} aria-hidden="true" />
              <IonInput placeholder="Escreva seu e-mail"></IonInput>
            </IonItem>

            <IonItem className="input-item">
              <IonIcon slot="start" icon={passwordicon} aria-hidden="true" />
              <IonInput placeholder="Escreva sua senha" type="password"></IonInput>
            </IonItem>
          </IonContent>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page;
