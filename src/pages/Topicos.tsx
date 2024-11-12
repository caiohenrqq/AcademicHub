import {
  IonPage,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { search } from "ionicons/icons";

const PesquisaPage = () => {
  return (
<IonPage>
  <IonContent fullscreen>
    <section className="topicos-section">
      <div className="pesquisar">
        <div className="icone">
          <IonImg
            src="/favicon.png"
            alt="AcademicHub, sua comunidade universitária :)"
          />
        </div>

        <div className="container-pesquisar">
          <IonSearchbar
            className="rounded-searchbar"
            placeholder="Escolha seu tópico"
          />
          <IonButtons className="menuicon" slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
        </div>
      </div>
    </section>
  </IonContent>
</IonPage>

  );
};

export default PesquisaPage;
