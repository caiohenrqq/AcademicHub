import { IonButtons, IonImg, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';

const Page: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonImg
            src="../public/favicon.png"
            alt="AcademicHub, sua comunidade universitária :)"
          ></IonImg>
          <IonTitle>Academic<span className='title-hub'>Hub</span></IonTitle>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Page;
